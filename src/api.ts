import type { Product } from './types/Product';

export type Category = {
  id: number;
  name: string;
  image: string;
};

const URL = 'http://localhost:3000/';

export const getProducts = async () => {
  const response = await fetch(`${URL}products`);
  const data: Product[] = await response.json();
  return data;
};

export const getCategories = async () => {
  const response = await fetch(`${URL}categories`);
  const data: Category[] = await response.json();
  return data;
};
