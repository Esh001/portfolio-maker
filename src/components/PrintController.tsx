import React from 'react';
import { Printer } from 'lucide-react';

export const PrintController: React.FC = () => {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-controller fixed bottom-6 right-6 bg-black text-white px-5 py-3 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer z-50"
    >
      <Printer size={16} strokeWidth={1.5} />
      <span className="text-[12px] font-semibold uppercase tracking-widest">
        Print to PDF
      </span>
    </button>
  );
};
