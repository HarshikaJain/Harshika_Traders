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
      name: 'colors',
      title: 'Product Color Variants',
      type: 'array',
      description: 'Add color groups. Each individual color controls its own image asset stack and unique storage rules.',
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: 'object',
          name: 'colorVariant',
          fields: [
            { name: 'colorName', title: 'Color Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'hexCode', title: 'Hex Code (e.g. #000000)', type: 'string' },
            {
              name: 'images',
              title: 'Color Specific Images',
              type: 'array',
              validation: (Rule) => Rule.required().min(1),
              of: [{ type: 'image', options: { hotspot: true } }]
            },
            {
              name: 'variants',
              title: 'Storage & RAM Options for this Color',
              type: 'array',
              validation: (Rule) => Rule.required().min(1),
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'configuration', title: 'Configuration (e.g. 8GB | 128GB)', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'price', title: 'Selling Price (₹)', type: 'number', validation: (Rule) => Rule.required() },
                    { name: 'originalPrice', title: 'Original Price (₹)', type: 'number' },
                    { name: 'isAvailable', title: 'Is Available', type: 'boolean', initialValue: true },
                    {
                      name: 'specialFeatures',
                      title: 'Highlights Specific to this Storage Configuration',
                      type: 'array',
                      of: [{ type: 'string' }]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}