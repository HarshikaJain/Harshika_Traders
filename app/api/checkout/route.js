import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Secure credentials initialization from server environmental variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      customerName, 
      customerPhone, 
      customerAddress, 
      paymentMethod, 
      productTitle, 
      productBrand, 
      variantConfig, 
      colorName, 
      price,
      fatherNumber
    } = body;

    // 1. Generate an official unique tracking number format
    const trackingId = `HT-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderSummary = `${productTitle} (${variantConfig} - ${colorName})`;
    const localTrackingLink = `http://localhost:3000/track/${trackingId}`;

    // 2. BACKEND AUTO-SEND COMPLIANT SMS TO CUSTOMER WITH TRACKING LINK
    // Ensures country code is seamlessly forced dynamically
    const customerTargetPhone = customerPhone.startsWith('+91') ? customerPhone : `+91${customerPhone}`;
    
    await client.messages.create({
      from: process.env.TWILIO_SMS_NUMBER, 
      to: customerTargetPhone,
      body: `Hello ${customerName}, your order for ${productTitle} has been successfully received by Harshika Traders! Track your package updates live at: ${localTrackingLink}`
    });

    return NextResponse.json({ success: true, trackingId });

  } catch (error) {
    console.error('Notification Pipeline Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}