import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (!source) return null;
  return builder.image(source).auto('format').width(800).url();
}