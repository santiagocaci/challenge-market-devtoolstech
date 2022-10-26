import { useState } from 'react';
import type { FC } from 'react';
import type { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  matches: Product[];
};

export const SectionCard: FC<Props> = ({ matches }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const cardForPage = 6;

  const onClickNextPage = () =>
    setCurrentPage(current => current + cardForPage);
  const onClickPrevPage = () =>
    setCurrentPage(current => current - cardForPage);

  const filteredPage = (): Product[] =>
    matches.slice(currentPage, currentPage + cardForPage);

  return (
    <section className='p-4'>
      <h2 className='text-2xl font-semibold mb-2'>Results: {matches.length}</h2>
      <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3'>
        {filteredPage().map(product => (
          <article key={product.id}>
            <ProductCard product={product} />
          </article>
        ))}
      </div>
      <div className='text-center py-3'>
        <button
          disabled={currentPage <= 0}
          onClick={onClickPrevPage}
          className='px-3 mr-10 py-2 transition rounded border disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:text-white hover:bg-white hover:text-slate-900'
        >
          Prev
        </button>
        <button
          disabled={currentPage + cardForPage >= matches.length}
          onClick={onClickNextPage}
          className='px-3 py-2 transition rounded border disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:text-white hover:bg-white hover:text-slate-900'
        >
          Next
        </button>
      </div>
    </section>
  );
};
