import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// THIS IS THE LINE THAT WAS MISSING
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('orders')
      .insert([{ 
        customer_phone: body.customerPhone || "N/A", 
        razorpay_payment_id: body.razorpay_payment_id || "N/A",
        product_name: body.productTitle || "N/A",
        status: 'Confirmed'
      }]);

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}