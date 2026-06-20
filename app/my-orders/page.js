import { getUserOrders } from '../../sanity/lib/sanity.queries';
export default async function MyOrdersPage() {
  // Replace this with your actual Auth logic (e.g., get session from NextAuth)
  const userEmail = "harshika@example.com"; 
  const orders = await getUserOrders(userEmail);

  return (
    <main className="min-h-screen p-10 pt-24">
      <h1 className="text-3xl font-black mb-8">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-6 border rounded-2xl bg-white shadow-sm">
              <div className="flex justify-between">
                <span className="font-bold">Order: {order._id.slice(-6)}</span>
                <span className="text-green-600 font-black">{order.status || 'Processing'}</span>
              </div>
              <p className="text-sm text-slate-500">{new Date(order._createdAt).toLocaleDateString()}</p>
              <p className="font-black mt-2">Total: ₹{order.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}