import React, { useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface DynamicListProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export const DynamicList: React.FC<DynamicListProps> = ({
  items,
  onChange,
  placeholder = 'Enter item...',
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, '');
      onChange(newItems);
      // Focus the new input after render
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 50);
    }
    if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault();
      const newItems = items.filter((_, i) => i !== index);
      onChange(newItems);
      setTimeout(() => {
        const focusIdx = Math.max(0, index - 1);
        inputRefs.current[focusIdx]?.focus();
      }, 50);
    }
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, '']);
    setTimeout(() => {
      inputRefs.current[items.length]?.focus();
    }, 50);
  };

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1 group">
          <span className="text-[10px] text-[#9CA3AF] w-4 text-right font-mono shrink-0">
            {index + 1}.
          </span>
          <input
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-b border-[#D1D5DB] focus:border-black outline-none text-[12px] py-1 px-1 font-mono transition-colors"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#FEE2E2] transition-all"
            title="Remove"
          >
            <Trash2 size={12} strokeWidth={1.5} className="text-[#EF4444]" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-black mt-1 transition-colors"
      >
        <Plus size={12} strokeWidth={1.5} />
        <span className="uppercase tracking-wider font-medium">Add</span>
      </button>
    </div>
  );
};
