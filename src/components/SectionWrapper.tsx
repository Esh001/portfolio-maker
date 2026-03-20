import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onToggleVisibility: () => void;
  defaultOpen?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  children,
  isVisible,
  onToggleVisibility,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#D1D5DB] bg-white mb-2">
      <div
        className="flex items-center justify-between px-3 py-2 bg-[#F3F4F6] border-b border-[#D1D5DB] cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown size={14} strokeWidth={1.5} />
          ) : (
            <ChevronRight size={14} strokeWidth={1.5} />
          )}
          <span className="text-[11px] font-semibold uppercase tracking-widest text-black">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className="p-1 hover:bg-[#D1D5DB] transition-colors"
          title={isVisible ? 'Hide in preview' : 'Show in preview'}
        >
          {isVisible ? (
            <Eye size={14} strokeWidth={1.5} className="text-black" />
          ) : (
            <EyeOff size={14} strokeWidth={1.5} className="text-[#9CA3AF]" />
          )}
        </button>
      </div>
      {isOpen && <div className="p-3">{children}</div>}
    </div>
  );
};
