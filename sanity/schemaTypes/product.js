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
  name: 'images',
  title: 'Product Images',
  type: 'array',
  of: [
    {
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }
      ]
    }
  ],
  validation: (Rule) => Rule.required().min(1).error('At least one product image is required.'),
},
    {
      name: 'description',
      type: 'text',
      title: 'Details',
    },
  ],
}
