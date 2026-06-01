import imageUrlBuilder from '../sanity/image-url';
import { client } from './client'; // Connects to client.js right above it

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return '';
  return builder.image(source).url();
}