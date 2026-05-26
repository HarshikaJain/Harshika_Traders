export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'variants',
      title: 'Storage & RAM Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'configuration', title: 'Configuration (e.g., 8GB | 128GB)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'price', title: 'Price (₹)', type: 'number', validation: (Rule) => Rule.required() },
            { name: 'originalPrice', title: 'Original Price (₹)', type: 'number' },
            { name: 'isAvailable', title: 'Is Available', type: 'boolean', initialValue: true }
          ]
        }
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'highlights',
      title: 'Special Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add core bullet highlights (e.g., 50MP Sony LYT-600 Camera)'
    }
  ]
}