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
      name: 'variants',
      title: 'Product Variants (Color, Storage, Price)',
      type: 'array',
      description: 'Add different versions of the product here (e.g., Blue 128GB, Blue 512GB)',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'color', type: 'string', title: 'Color' },
            { name: 'storage', type: 'string', title: 'Storage (e.g., 128GB or 8GB RAM)' },
            { name: 'price', type: 'number', title: 'Price (₹)' },
            { 
              name: 'variantImage', 
              type: 'image', 
              title: 'Variant Image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'color',
              subtitle: 'storage',
              media: 'variantImage'
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `${title || 'No Color'} - ${subtitle || 'No Storage'}`,
                media
              }
            }
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1).error('You must add at least one variant.')
    },
    {
      name: 'description',
      type: 'text',
      title: 'Details',
    },
  ],
}