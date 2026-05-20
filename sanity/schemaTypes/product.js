export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL link identifier)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Product Images (Upload Stack)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'brand',
      title: 'Brand Name',
      type: 'string',
      options: {
        list: ['Apple', 'Samsung', 'Vivo', 'Oppo', 'Realme', 'OnePlus', 'Mi', 'HP']
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile', value: 'Mobile' },
          { title: 'TV', value: 'TV' },
          { title: 'AC', value: 'AC' },
          { title: 'Hp laptop', value: 'Hp laptop' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Product Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'ratingCount',
      title: 'Total Ratings Count',
      type: 'number'
    },
    {
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'colorName', title: 'Color Name (e.g., Master Gold)', type: 'string' },
            { name: 'hexCode', title: 'Hex Code (e.g., #E5D3B3)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'variants',
      title: 'Storage & RAM Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'configuration', title: 'Config (e.g., 256 GB + 12GB)', type: 'string', validation: Rule => Rule.required() },
            { name: 'price', title: 'Price for this variant (₹)', type: 'number', validation: Rule => Rule.required() },
            { name: 'originalPrice', title: 'Original Price / MRP (₹)', type: 'number' },
            { name: 'isAvailable', title: 'In Stock?', type: 'boolean', initialValue: true }
          ]
        }
      ]
    },
    {
      name: 'specialFeatures',
      title: 'Special Features / Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add core bullet highlights (e.g., 50MP Sony LYT-600 Camera, 45W SuperVOOC Charge)'
    }
  ]
}