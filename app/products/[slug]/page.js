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
            { 
              name: 'colorName', 
              type: 'string', 
              title: 'Color Name', 
              description: 'e.g. Cosmic Orange' 
            },
            { 
              name: 'colorCode', 
              type: 'string', 
              title: 'Color Hex Code', 
              description: 'e.g. #FF7F50 (Used for the circles)' 
            },
            { 
              name: 'storage', 
              type: 'string', 
              title: 'Storage/RAM', 
              description: 'e.g. 512 GB' 
            },
            { 
              name: 'price', 
              type: 'string', 
              title: 'Price (₹)', 
              description: 'e.g. 1,49,900' 
            },
            { 
              name: 'variantImage', 
              type: 'image', 
              title: 'Variant Image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: {
              title: 'colorName',
              subtitle: 'storage',
              media: 'variantImage'
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