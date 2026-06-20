export default {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { 
      name: 'image', 
      title: 'Achievement Image', 
      type: 'image', 
      options: { hotspot: true } // This allows you to crop the image in the studio
    },
    { name: 'brand', title: 'Brand', type: 'string' }
  ]
}