import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Major Bangladesh bank websites to scrape
const BANK_URLS = {
  'city-bank': {
    name: 'City Bank',
    website: 'https://www.thecitybank.com',
    cardsPage: 'https://www.thecitybank.com/cards'
  },
  'brac-bank': {
    name: 'BRAC Bank',
    website: 'https://www.bracbank.com',
    cardsPage: 'https://www.bracbank.com/en/personal/cards'
  },
  'standard-chartered': {
    name: 'Standard Chartered',
    website: 'https://www.sc.com/bd',
    cardsPage: 'https://www.sc.com/bd/credit-cards'
  },
  'hsbc': {
    name: 'HSBC Bangladesh',
    website: 'https://www.hsbc.com.bd',
    cardsPage: 'https://www.hsbc.com.bd/1/2/personal/cards'
  },
  'ebl': {
    name: 'Eastern Bank Limited',
    website: 'https://www.ebl.com.bd',
    cardsPage: 'https://www.ebl.com.bd/personal/cards'
  },
  'dbbl': {
    name: 'Dutch-Bangla Bank',
    website: 'https://www.dutchbanglabank.com',
    cardsPage: 'https://www.dutchbanglabank.com/cards'
  }
} as const;

// Valid bank IDs for allowlist validation
const VALID_BANK_IDS = Object.keys(BANK_URLS);
const VALID_ACTIONS = ['scrape-all', 'scrape-single'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    // Validate user authentication
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Input validation
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid request body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid request format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { bankId, action } = body as { bankId?: unknown; action?: unknown };

    // Validate action parameter
    if (action !== undefined && (typeof action !== 'string' || !VALID_ACTIONS.includes(action))) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid action parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate bankId parameter
    if (bankId !== undefined && (typeof bankId !== 'string' || !VALID_BANK_IDS.includes(bankId))) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid bank identifier' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Scraping service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (action === 'scrape-all') {
      const results = [];
      
      for (const [id, bank] of Object.entries(BANK_URLS)) {
        console.log(`Scraping ${bank.name}...`);
        
        try {
          // Scrape cards page
          const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: bank.cardsPage,
              formats: ['markdown', 'links'],
              onlyMainContent: true,
            }),
          });

          const scrapeData = await scrapeResponse.json();
          
          if (scrapeData.success) {
            results.push({
              bank: bank.name,
              status: 'success',
              content: scrapeData.data?.markdown?.substring(0, 500) || 'No content',
              links: scrapeData.data?.links?.slice(0, 10) || []
            });
          } else {
            results.push({
              bank: bank.name,
              status: 'failed',
              error: 'Scraping failed'
            });
          }
        } catch (error) {
          results.push({
            bank: bank.name,
            status: 'error',
            error: 'Processing error'
          });
        }
      }

      return new Response(
        JSON.stringify({ success: true, results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Single bank scrape - bankId is validated above
    const bank = BANK_URLS[bankId as keyof typeof BANK_URLS];
    if (!bank) {
      return new Response(
        JSON.stringify({ success: false, error: 'Bank not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: bank.cardsPage,
        formats: ['markdown', 'html', 'links'],
        onlyMainContent: true,
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        bank: bank.name,
        data: data.data || data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Scrape error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Processing error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
