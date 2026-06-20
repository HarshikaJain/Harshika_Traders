export default {
  name: 'checkoutSettings',
  title: 'Checkout Settings',
  type: 'document',
  fields: [
    { name: 'deliveryInfo', title: 'Delivery Info', type: 'text' },
    { name: 'paymentMethods', title: 'Accepted Payment Methods', type: 'string' },
    { name: 'whatsappNumber', title: 'Order WhatsApp Number', type: 'string' }
  ]
}