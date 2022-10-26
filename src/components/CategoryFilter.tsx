import { useState } from 'react';
import type { FC } from 'react';
import type { Category } from '../api';
import { Filter } from '../types/Filter';

type Props = {
  categories: Category[];
  onChange: (filter: Filter) => void;
};

export const CategoryFilter: FC<Props> = ({ categories, onChange }) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleClick = (value: number) => {
    let clone = [...selected];
    clone.includes(value)
      ? (clone = clone.filter(item => item !== value))
      : (clone = [...clone, value]);
    onChange(
      clone.length ? product => clone.includes(product.categoryId) : null
    );
    setSelected(clone);
  };

  return (
    <div className='flex justify-around'>
      {categories?.map(category => (
        <div
          onClick={() => handleClick(category.id)}
          className={`transition-all cursor-pointer border rounded px-6 py-4 mt-5 ${
            selected.includes(category.id) ? 'text-slate-900 bg-white' : ''
          }`}
          key={category.id}
        >
          {category.id}: {category.name}
        </div>
      ))}
    </div>
  );
};
