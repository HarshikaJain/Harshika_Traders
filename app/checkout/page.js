import { client } from '../../sanity/lib/client';

export default async function Checkout({ searchParams }) {
  const settings = await client.fetch(`*[_type == "checkoutSettings"][0]`);
  const productName = searchParams.product || "Selected Item";

  const handleOrder = () => {
    const message = `Hello, I would like to buy: ${productName}. Please confirm availability and shipping to my address.`;
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto pt-32 px-6">
      <h1 className="text-3xl font-black mb-8">Checkout Summary</h1>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{productName}</h2>
        <p className="text-slate-600 mb-6">{settings?.deliveryInfo}</p>
        
        <div className="bg-slate-50 p-4 rounded-xl mb-8">
          <p className="font-bold">Payment Methods:</p>
          <p>{settings?.paymentMethods}</p>
        </div>

        <button 
          onClick={handleOrder}
          className="w-full py-4 bg-green-600 text-white rounded-2xl font-black hover:bg-green-700 transition-colors"
        >
          Confirm Order via WhatsApp
        </button>
      </div>
    </div>
  );
}