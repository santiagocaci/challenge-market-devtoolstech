import { useMemo, useState } from 'react';
import type { FC } from 'react';
import type { Product } from '../types/Product';
import { Filter } from '../types/Filter';

type Props = {
  products: Product[];
  onChange: (filter: Filter) => void;
};

export const ColorFilter: FC<Props> = ({ products, onChange }) => {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [colors, setColors] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useMemo(() => {
    return setColors(
      Array.from(new Set(products.map(product => product.color)))
    );
  }, [products]);

  const handleChange = (color: string, isChecked: boolean) => {
    const draft: Set<string> = structuredClone(selected);
    isChecked ? draft.add(color) : draft.delete(color);

    onChange(draft.size ? product => draft.has(product.color) : null);

    setSelected(draft);
  };

  const filterColors = colors.filter(item =>
    item.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className='border mb-3 px-3 py-1 rounded'>
      <h2 className='text-xl font-semibold'>Colors</h2>
      <input
        type='text'
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='Enter color'
        className='w-full rounded text-black pl-2 py-1 my-2'
      />
      <ul>
        {filterColors.map(color => (
          <label className='flex' key={color}>
            <input
              type='checkbox'
              name='color'
              id=''
              value={color}
              onChange={e => handleChange(color, e.target.checked)}
            />
            <span className='capitalize pl-2'>{color}</span>
          </label>
        ))}
      </ul>
    </div>
  );
};
