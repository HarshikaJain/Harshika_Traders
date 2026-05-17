export default {
  name: 'product',
  type: 'document',
  title: 'Shop Products',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
      description: 'Example: iPhone 17 Pro or HP Victus',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Mobile', value: 'Mobile' },
          { title: 'TV', value: 'TV' },
          { title: 'AC', value: 'AC' },
          { title: 'Hp laptop', value: 'Hp laptop' },
        ],
      },
    },
    {
      name: 'price',
      type: 'string',
      title: 'Price (₹)',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Product Photo',
      options: { hotspot: true }, // Allows cropping directly in the dashboard
    },
    {
      name: 'description',
      type: 'text',
      title: 'Details',
    },
  ],
}
