export default {
  name: 'banner',
  title: 'Banners',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
   {
      name: 'link',
      title: 'Redirect Product Link',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Select the specific product this banner links to'
    },
    {
      name: 'isActive',
      title: 'Active Status',
      type: 'boolean',
      initialValue: true
    }
  ]
};