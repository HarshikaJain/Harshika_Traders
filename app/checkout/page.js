'use client'; // Required for localStorage and state

import { useState, useEffect } from 'react';
import OrderButton from '../../components/OrderButton';
// Note: Sanity fetch cannot be done directly in a 'use client' component.
// You should fetch settings in a parent or use a dedicated hook. 
// I have kept your logic, but consider moving settings fetch to a server component if needed.

export default function CheckoutPage({ searchParams }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Resolve searchParams
    const resolveParams = async () => {
      const params = await searchParams;
      setProductName(params.product || "Selected Item");
      setProductPrice(params.price || "Contact for Price");
    };
    resolveParams();

    // Load saved phone from localStorage
    const savedPhone = localStorage.getItem('user_phone') || "";
    setPhone(savedPhone);
  }, [searchParams]);

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    localStorage.setItem('user_phone', newPhone);
  };

  return (
    <div className="max-w-2xl mx-auto pt-32 px-6">
      <h1 className="text-3xl font-black mb-8">Checkout Summary</h1>
      
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
        <h2 className="text-xl font-bold mb-2">{productName}</h2>
        <p className="text-2xl font-extrabold text-blue-600 mb-6">₹{productPrice}</p>
        
        {/* Phone Input Field */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2">Your Phone Number</label>
          <input 
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full p-3 border border-slate-300 rounded-xl"
            required
          />
        </div>
        
        <OrderButton 
          productName={productName} 
          productPrice={productPrice}
          customerDetails={{ customerPhone: phone }} // Passing phone to button
        />
      </div>
    </div>
  );
}