import type { FC } from 'react';
import type { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { image, name, rating, price } = product;
  return (
    <div className='border rounded p-3 flex flex-col gap-3'>
      <img className='rounded-md' src={image} alt={name} />
      <h3 className='text-center text-2xl font-semibold'>{name}</h3>
      <p className='text-center text-xl'>
        Valoracion:{' '}
        <span className='text-yellow-500'>
          {'★'.repeat(rating).padEnd(5, '☆')}
        </span>
      </p>
      <p className='text-center text-xl'>
        {price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
      </p>
      <p>{product.categoryId}</p>
    </div>
  );
};
