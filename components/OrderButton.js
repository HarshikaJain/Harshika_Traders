"use client";

export default function OrderButton({ productName, productPrice }) {
  const handlePayment = async () => {
    // 1. Check if Razorpay is loaded
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert("Payment gateway is still loading, please wait a second...");
      return;
    }

    // 2. Create order on your backend
    try {
      const res = await fetch('/api/razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: productPrice }),
    });
      
      const data = await res.json();
      if (!data.success) throw new Error("Order creation failed");

      // 3. Configure options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Harshika Traders",
        description: productName,
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          window.location.href = "/"; 
        },
        theme: { color: "#16a34a" }, // Green color to match your button
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error(error);
      alert("Payment failed to initialize. Please try again.");
    }
  };

  return (
    <button 
      onClick={handlePayment}
      className="w-full py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-colors"
    >
      Pay ₹{productPrice} and Confirm Order
    </button>
  );
}