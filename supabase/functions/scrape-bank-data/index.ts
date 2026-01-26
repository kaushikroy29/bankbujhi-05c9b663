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
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { bankId, action } = await req.json();
    
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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
              error: scrapeData.error
            });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          results.push({
            bank: bank.name,
            status: 'error',
            error: errorMessage
          });
        }
      }

      return new Response(
        JSON.stringify({ success: true, results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Single bank scrape
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
