import { client } from '../../sanity/lib/client';
import OrderButton from '../../components/OrderButton'; // Import your new client component

export default async function Checkout({ searchParams }) {
  const settings = await client.fetch(`*[_type == "checkoutSettings"][0]`);
  const productName = searchParams.product || "Selected Item";

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

        {/* Use the client component here */}
        <OrderButton productName={productName} whatsappNumber={settings?.whatsappNumber} />
      </div>
    </div>
  );
}