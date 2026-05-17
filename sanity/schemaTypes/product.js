export default {
  name: 'product',
  type: 'document',
  title: 'Shop Products',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
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
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'color', type: 'string', title: 'Color' },
            { name: 'storage', type: 'string', title: 'Storage' },
            { 
              name: 'price', 
              type: 'string', 
              title: 'Price (₹)',
              description: 'e.g. 1,49,900'
            },
            { 
              name: 'variantImage', 
              type: 'image', 
              title: 'Image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'color',
              subtitle: 'price',
              media: 'variantImage'
            },
            prepare({ title, subtitle, media }) {
              return {
                title: `${title || 'No Color'}`,
                subtitle: subtitle ? `₹${subtitle}` : 'No Price',
                media
              }
            }
          }
        }
      ],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Details',
    },
  ],
}