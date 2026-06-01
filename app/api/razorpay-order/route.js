import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay with your sandbox keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { price } = body;

    // Razorpay processes Indian Paise. 1 Rupee = 100 Paise.
    // We must multiply your price by 100 so it reads correctly!
    const amountInPaise = Math.round(Number(price) * 100);

    const options = {
      amount: amountInPaise, 
      currency: "INR",
      receipt: `rcpt_${Math.floor(100000 + Math.random() * 900000)}`,
    };

    // Ask Razorpay to generate a secure transaction order token
    const order = await razorpay.orders.create(options);

    // Pass the order details back to the frontend
    return NextResponse.json({ 
      success: true, 
      orderId: order.id, 
      amount: order.amount 
    });

  } catch (error) {
    console.error('Razorpay Order Creation Failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}