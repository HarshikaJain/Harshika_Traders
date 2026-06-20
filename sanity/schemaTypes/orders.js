export default {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    { name: 'customerPhone', title: 'Customer Phone', type: 'string' },
    { name: 'productName', title: 'Product Name', type: 'string' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['Confirmed', 'Shipped', 'Delivered'] } },
    { name: 'razorpayPaymentId', title: 'Payment ID', type: 'string' },
    { name: 'createdAt', title: 'Booking Date', type: 'datetime' }
  ]
}