import { client } from './client';

export async function getUserOrders(userEmail) {
  const query = `*[_type == "order" && email == $userEmail] | order(_createdAt desc) {
    _id,
    _createdAt,
    totalPrice,
    status,
    items[] {
      product->{title, price},
      quantity
    }
  }`;
  return await client.fetch(query, { userEmail });
}