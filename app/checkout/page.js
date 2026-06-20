import { client } from '../../sanity/lib/client';
import OrderButton from '../../components/OrderButton';

export default async function CheckoutPage({ searchParams }) {
  // Await the params correctly
  const params = await searchParams;
  const productName = params.product || "Selected Item";
  const productPrice = params.price || "Contact for Price";

  const settings = await client.fetch(`*[_type == "checkoutSettings"][0]`);

  return (
    <div className="max-w-2xl mx-auto pt-32 px-6">
      <h1 className="text-3xl font-black mb-8">Checkout Summary</h1>
      
      {/* Container for the details */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
        <h2 className="text-xl font-bold mb-2">{productName}</h2>
        <p className="text-2xl font-extrabold text-blue-600 mb-6">₹{productPrice}</p>
        
        <p className="text-slate-600 mb-4">{settings?.deliveryInfo}</p>
        <div className="bg-slate-50 p-4 rounded-xl mb-8">
            <p className="font-bold">Payment Methods:</p>
            <p>{settings?.paymentMethods}</p>
        </div>
        
        <OrderButton 
          productName={productName} 
          productPrice={productPrice}
          whatsappNumber={settings?.whatsappNumber} 
        />
      </div>
    </div>
  );
}