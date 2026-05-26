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
      title: 'Redirect Link (Optional)',
      type: 'string',
      description: 'e.g., /category/Mobile or external link'
    },
    {
      name: 'isActive',
      title: 'Active Status',
      type: 'boolean',
      initialValue: true
    }
  ]
};