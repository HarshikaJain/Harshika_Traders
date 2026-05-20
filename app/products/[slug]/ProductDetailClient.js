"use client";
import React, { useState } from 'react';
import { urlFor } from '../../../sanity/lib/image';

export default function ProductDetailClient({ product }) {
  // Extract images stack array smoothly
  const imageList = product.images && product.images.length > 0 
    ? product.images.map(img => urlFor(img).url()) 
    : ['/placeholder.jpg'];

  // Dynamic States
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

  // Calculate prices dynamically based on the active state selection configuration
  const currentPrice = selectedVariant ? selectedVariant.price : 0;
  const originalPrice = selectedVariant ? selectedVariant.originalPrice : 0;
  
  // Calculate discount percentage rate values
  const discountPercentage = currentPrice && originalPrice && originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const handleWhatsAppOrder = () => {
    const businessPhoneNumber = "91XXXXXXXXXX"; // Replace with your father's phone number
    
    const textMessage = `Hello Harshika Traders! I want to order a product:\n\n` +
                        `*Product:* ${product.title}\n` +
                        `*Color:* ${selectedColor ? selectedColor.colorName : 'Default'}\n` +
                        `*Variant:* ${selectedVariant ? selectedVariant.configuration : 'Standard'}\n` +
                        `*Price:* ₹${currentPrice.toLocaleString('en-IN')}\n\n` +
                        `📍 Delivery requested inside Ratlam local limits.`;

    window.open(`https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(textMessage)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-16 px-4 max-w-7xl mx-auto">
      
      {/* Breadcrumb Navigation Line Tracking Header */}
      <nav className="text-xs font-medium text-slate-500 mb-6 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap pb-2">
        <span>Home</span> <span>/</span>
        <span>{product.category || 'Mobiles'}</span> <span>/</span>
        <span>{product.brand}</span> <span>/</span>
        <span className="text-slate-800 truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* Main Structural Dual Panel Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Dynamic Quad Gallery Layout Stack */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sticky top-24">
          {imageList.slice(0, 4).map((url, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveImage(idx)}
              className={`relative bg-white border rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-4 cursor-pointer transition-all duration-200 ${
                activeImage === idx ? 'border-blue-600 ring-2 ring-blue-50' : 'border-slate-100'
              }`}
            >
              <img src={url} alt={`View ${idx + 1}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Variable Selectors & Details Breakdown */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          
          {/* Header Metadata Section */}
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {product.brand} Store
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-3 mb-2 leading-tight">
              {product.title} {selectedColor && `(${selectedColor.colorName})`}
            </h1>
            
            {/* Star Rating Badge System */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                  <span>{Number(product.rating).toFixed(1)}</span>
                  <span>★</span>
                </div>
                {product.ratingCount && (
                  <span className="text-xs text-slate-400 font-medium">({product.ratingCount.toLocaleString()} ratings)</span>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Interactive Pricing Area Matrix */}
          <div className="py-4 border-y border-slate-100 my-5 flex items-center flex-wrap gap-3">
            {discountPercentage > 0 && (
              <span className="text-2xl font-bold text-emerald-600 flex items-center gap-0.5">
                ↓{discountPercentage}%
              </span>
            )}
            {originalPrice && (
              <span className="text-base text-slate-400 line-through font-medium mt-1">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Variable Selector 1: Available Colors Array Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Selected Color: <span className="text-slate-800 font-semibold normal-case">{selectedColor?.colorName}</span>
              </h4>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hexCode }}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      selectedColor?.colorName === color.colorName 
                        ? 'scale-110 border-blue-600 ring-4 ring-blue-50' 
                        : 'border-white shadow-xs ring-1 ring-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variable Selector 2: Dynamic Storage & RAM Array Badges */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Variant (Storage & RAM):
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    disabled={!v.isAvailable}
                    onClick={() => setSelectedVariant(v)}
                    className={`relative px-4 py-3 rounded-xl text-xs font-bold border transition-all ${
                      !v.isAvailable
                        ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed overflow-hidden'
                        : selectedVariant?.configuration === v.configuration
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>{v.configuration}</div>
                    {v.price && <div className={`text-[10px] font-medium mt-0.5 ${selectedVariant?.configuration === v.configuration ? 'text-slate-300' : 'text-slate-400'}`}>₹{v.price.toLocaleString('en-IN')}</div>}
                    
                    {!v.isAvailable && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-[140%] h-[1.5px] bg-red-500 transform rotate-12 opacity-60" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Core Feature List Block Highlights Container */}
          {product.specialFeatures && product.specialFeatures.length > 0 && (
            <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Key Highlights & Special Features:
              </h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                {product.specialFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Execution Target Container Area */}
          <div className="mt-8 border-t border-slate-100 pt-5">
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl mb-4 text-xs font-medium text-amber-800 flex items-center gap-2">
              <span>📍</span>
              <span><strong>Delivery Limitations Note:</strong> Deliveries are exclusively handled directly within local Ratlam boundaries. Orders originating outside will not process.</span>
            </div>
            
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#111827] hover:bg-slate-800 text-white font-bold text-sm py-4 rounded-xl transition duration-150 shadow-md active:scale-[0.99] uppercase tracking-wider"
            >
              Buy Now
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}