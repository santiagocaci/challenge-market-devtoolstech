import { useState } from 'react';
import type { FC } from 'react';
import { Filter } from '../types/Filter';

type Props = {
  onChange: (filter: Filter) => void;
};

export const PriceRangeFilter: FC<Props> = ({ onChange }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const handleChangeMin = (value: number) => {
    setMin(value);
    onChange(
      value ? product => product.price >= value && product.price <= max : null
    );
  };
  const handleChangeMax = (value: number) => {
    setMax(value);
    onChange(
      value ? product => product.price >= min && product.price <= value : null
    );
  };

  return (
    <div className='border px-3 py-1 pb-2 mb-3 rounded'>
      <h2 className='text-xl font-semibold'>Price</h2>
      <ul className='flex flex-col gap-2'>
        <label className='flex justify-between gap-2'>
          From:
          <input
            className='pl-2 rounded text-black'
            type='number'
            name='color'
            id=''
            value={min}
            onChange={e => handleChangeMin(Number(e.target.value))}
          />
        </label>
        <label className='flex justify-between gap-2'>
          To:
          <input
            className='pl-2 rounded text-black'
            type='number'
            name='color'
            id=''
            value={max}
            onChange={e => handleChangeMax(Number(e.target.value))}
          />
        </label>
      </ul>
    </div>
  );
};
