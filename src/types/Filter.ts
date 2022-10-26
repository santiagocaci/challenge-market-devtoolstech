import { Product } from './Product';

export type Filter = null | ((product: Product) => boolean);
