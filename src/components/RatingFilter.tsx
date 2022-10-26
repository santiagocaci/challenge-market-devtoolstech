import { useState } from 'react';
import type { FC } from 'react';
import { Filter } from '../types/Filter';

type Props = {
  onChange: (filter: Filter) => void;
};

export const RatingFilter: FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  const handleChange = (rating: number, isChecked: boolean) => {
    const draft: Set<number> = structuredClone(selected);
    isChecked ? draft.add(rating) : draft.delete(rating);

    onChange(draft.size ? product => draft.has(product.rating) : null);

    setSelected(draft);
  };

  return (
    <div className='border px-3 py-1 rounded'>
      <h2 className='text-xl font-semibold'>Rating</h2>
      <ul>
        {[5, 4, 3, 2, 1].map(rating => (
          <label className='flex' key={String(rating)}>
            <input
              type='checkbox'
              name='color'
              id=''
              value={rating}
              onChange={e => handleChange(rating, e.target.checked)}
            />
            <span className='capitalize pl-2 text-yellow-500'>
              {'★'.repeat(rating).padEnd(5, '☆')}
            </span>
          </label>
        ))}
      </ul>
    </div>
  );
};
