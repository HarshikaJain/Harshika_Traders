import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get('phone');

  // Fetch only orders that match this phone number
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_phone', phone); // Match the exact phone number

  if (error) return NextResponse.json({ orders: [] });

  return NextResponse.json({ orders: data });
}