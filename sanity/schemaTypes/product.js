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
      options: { source: 'title', maxLength: 96 },
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
      name: 'variants',
      title: 'Storage & RAM Options',
      type: 'array',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'variantOption',
          title: 'Variant Option',
          fields: [
            { name: 'configuration', title: 'Configuration (e.g., 256 GB + 128 GB)', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'variantHighlights',
              title: 'Variant Specific Highlights',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Add specific bullet callouts that apply to this storage tier.'
            },
            {
              name: 'colors',
              title: 'Available Colors for this Storage Tier',
              type: 'array',
              validation: (Rule) => Rule.required().min(1),
              of: [
                {
                  type: 'object',
                  name: 'colorOption',
                  title: 'Color Option',
                  fields: [
                    { name: 'colorName', title: 'Color Name (e.g., Monsoon Blue)', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'price', title: 'Price (₹)', type: 'number', validation: (Rule) => Rule.required() },
                    { name: 'originalPrice', title: 'Original Price (₹)', type: 'number' },
                    { name: 'isAvailable', title: 'Is Available', type: 'boolean', initialValue: true },
                    {
                      name: 'colorImages',
                      title: 'Images for this specific Color',
                      type: 'array',
                      validation: (Rule) => Rule.required().min(1),
                      of: [{ type: 'image', options: { hotspot: true } }]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
    }
  ]
}