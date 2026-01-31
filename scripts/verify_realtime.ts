
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    console.log('Connecting to Supabase at', supabaseUrl);

    // Subscribe to notifications
    console.log('Subscribing to notifications...');
    const channel = supabase
        .channel('verification_channel')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
            },
            (payload) => {
                console.log('✅ RECEIVED REALTIME NOTIFICATION:', payload.new);
            }
        )
        .subscribe((status) => {
            console.log('Subscription status:', status);
        });

    // Wait for subscription to establish
    await new Promise(r => setTimeout(r, 2000));

    await triggerUpdate();

    // Check tables directly
    console.log('Checking database tables (waiting for triggers)...');
    await new Promise(r => setTimeout(r, 2000));

    const { data: logs, error: logError } = await supabase
        .from('product_change_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (logError) console.error('Error fetching logs:', logError);
    else console.log('Latest Log:', logs);

    const { data: notifs, error: notifError } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

    if (notifError) console.error('Error fetching notifications:', notifError);
    else console.log('Latest Notification:', notifs);

    // Explicit success criteria
    if (logs && logs.length > 0 && notifs && notifs.length > 0) {
        console.log('✅ Verification SUCCESS: Logs and Notifications created.');
        process.exit(0);
    } else {
        console.error('❌ Verification FAILED: Missing logs or notifications.');
        process.exit(1);
    }
}

async function triggerUpdate() {
    console.log('Triggering update...');

    // 1. Ensure Bank
    const { data: banks } = await supabase.from('banks').select('id').limit(1);
    let bankId;

    if (!banks || banks.length === 0) {
        console.log('Creating test bank...');
        const { data: newBank, error: bankError } = await supabase.from('banks').insert({
            name: 'Test Bank',
            type: 'Private'
        }).select().single();

        if (bankError) {
            console.error('Failed to create test bank:', bankError);
            process.exit(1);
        }
        bankId = newBank.id;
    } else {
        bankId = banks[0].id;
    }

    // 2. Ensure Card
    const { data: cards } = await supabase.from('credit_cards').select('id, annual_fee').limit(1);
    let cardId;
    let currentFee;

    if (!cards || cards.length === 0) {
        console.log('Creating test card...');
        const { data: newCard, error: cardError } = await supabase.from('credit_cards').insert({
            name: 'Verification Test Card',
            bank_id: bankId,
            annual_fee: 'Free',
            interest_rate: '10%'
        }).select().single();

        if (cardError) {
            console.error('Failed to create test card:', cardError);
            process.exit(1);
        }
        cardId = newCard.id;
        currentFee = newCard.annual_fee;
    } else {
        cardId = cards[0].id;
        currentFee = cards[0].annual_fee;
    }

    const newFee = currentFee === 'Free' ? '৳500' : 'Free';

    // 3. Update Card
    const { error } = await supabase
        .from('credit_cards')
        .update({ annual_fee: newFee })
        .eq('id', cardId);

    if (error) {
        console.error('Failed to update card:', error);
        process.exit(1);
    }
    console.log(`Updated card ${cardId} fee to ${newFee}.`);
}

verify();
