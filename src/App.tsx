import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { getCategories, getProducts } from './api';
import {
  CategoryFilter,
  ColorFilter,
  PriceRangeFilter,
  RatingFilter,
  SectionCard,
} from './components';
import type { Filter } from './types/Filter';

type Filters = Record<string, null | Filter>;

function App() {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useQuery(['products'], getProducts, {
    refetchOnWindowFocus: false,
  });

  const { data: categories } = useQuery(['category'], getCategories, {
    refetchOnWindowFocus: false,
  });

  const [filters, setFilters] = useState<Filters>({
    price: null,
    color: null,
    rating: null,
    category: null,
  });

  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);

    let matches = products;
    for (const filter of filtersToApply) {
      matches = matches?.filter(filter!);
    }
    return matches;
  }, [products, filters]);

  if (isLoading || isFetching) return <p>Loading...</p>;

  return (
    <div className=' bg-slate-900 text-white h-screen overflow-auto'>
      <CategoryFilter
        categories={categories!}
        onChange={(filter: Filter) =>
          setFilters(filters => ({ ...filters, category: filter }))
        }
      />
      <div className='flex'>
        <aside className='p-3'>
          <PriceRangeFilter
            onChange={(filter: Filter) =>
              setFilters(filters => ({ ...filters, price: filter }))
            }
          />
          <ColorFilter
            onChange={(filter: Filter) =>
              setFilters(filters => ({ ...filters, color: filter }))
            }
            products={products!}
          />
          <RatingFilter
            onChange={(filter: Filter) =>
              setFilters(filters => ({ ...filters, rating: filter }))
            }
          />
        </aside>
        <SectionCard matches={matches!} />
      </div>
    </div>
  );
}

export default App;
