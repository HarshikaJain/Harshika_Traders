"use client";

export default function OrderButton({ productName, whatsappNumber }) {
  const handleOrder = () => {
    const message = `Hello, I would like to buy: ${productName}. Please confirm availability.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button 
      onClick={handleOrder}
      className="w-full py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-colors"
    >
      Confirm Order via WhatsApp
    </button>
  );
}