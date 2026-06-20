"use client";
import Script from "next/script";

export default function OrderButton({ productName, productPrice, customerDetails }) {
  const handlePayment = async () => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert("Payment gateway is loading...");
      return;
    }

    try {
      // 1. Create order
      const res = await fetch('/api/razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: productPrice }),
      });
      const data = await res.json();

      // 2. Setup Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Harshika Traders",
        description: productName,
        order_id: data.orderId,
        handler: async function (response) {
          // 3. Verify and Save - Passing customerDetails here
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productTitle: productName,
              // Sending phone from the customerDetails prop
              customerPhone: customerDetails?.customerPhone, 
            }),
          });

          const result = await verifyRes.json();
          if (result.success) {
            alert("Payment Successful! Order saved.");
            window.location.href = "/my-orders";
          } else {
            alert("Payment verified but failed to save to database. Contact support.");
          }
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed to initialize.");
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={handlePayment}
        className="w-full py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-colors"
      >
        Pay ₹{productPrice} and Confirm Order
      </button>
    </>
  );
}