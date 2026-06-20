'use client';
import { useEffect, useState } from 'react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async (phone) => {
      try {
        const res = await fetch(`/api/get-orders?phone=${phone}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    const phone = localStorage.getItem('user_phone');
    if (phone) {
      fetchOrders(phone);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="pt-32 text-center font-bold tracking-widest animate-pulse text-slate-400">LOADING ORDERS...</div>;

  return (
    <div className="max-w-4xl mx-auto pt-32 px-6 pb-20">
      <h1 className="text-4xl font-black mb-10 text-slate-900 tracking-tighter">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 font-medium">No orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{order.product_name}</h3>
                  <p className="text-sm text-slate-500 mt-2 font-mono">Payment ID: {order.razorpay_payment_id}</p>
                </div>
                <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-wider border border-green-200">
                  {order.status || "Confirmed"}
                </span>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                {/* TRACK ORDER BUTTON */}
                <button 
                  onClick={() => window.location.href = `/order-tracking?payment_id=${order.razorpay_payment_id}`}
                  className="px-6 py-2 bg-blue-600 text-white text-xs font-black rounded-full hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  TRACK ORDER
                </button>
                
                <div className="flex items-center gap-3">
                  <p className="text-xs font-bold text-slate-400 uppercase">Status updated</p>
                  <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}