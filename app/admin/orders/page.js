'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase.from('orders').select('*');
      setOrders(data);
    };
    fetchAll();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    alert("Status updated!");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-black mb-6">Admin Dashboard</h1>
      {orders.map(o => (
        <div key={o.id} className="border p-4 mb-2 flex justify-between">
          <span>{o.product_name} - {o.customer_phone}</span>
          <select onChange={(e) => updateStatus(o.id, e.target.value)} defaultValue={o.status}>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
      ))}
    </div>
  );
}