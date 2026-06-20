export default {
  name: 'storeSettings',
  title: 'Store Settings',
  type: 'document',
  fields: [
    { name: 'address', title: 'Store Address', type: 'text' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'mapLink', title: 'Google Maps Link', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'youtube', title: 'YouTube URL', type: 'url' },
    { name: 'justdial', title: 'Justdial Profile URL', type: 'url' }
  ]
}