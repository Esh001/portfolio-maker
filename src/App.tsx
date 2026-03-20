import { useResume } from './hooks/useResume';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { PrintController } from './components/PrintController';
import { RotateCcw } from 'lucide-react';

function App() {
  const { resume, setResume, updateProfile, toggleVisibility, resetResume } =
    useResume();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      {/* ────── HEADER BAR ────── */}
      <header className="app-header flex items-center justify-between px-4 py-2 bg-black text-white border-b border-[#374151] shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em]">
            Resume Builder
          </span>
          <span className="text-[9px] text-[#6B7280] uppercase tracking-widest">
            Swiss Minimalist
          </span>
        </div>
        <button
          onClick={resetResume}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw size={12} strokeWidth={1.5} />
          Reset
        </button>
      </header>

      {/* ────── SPLIT PANE ────── */}
      <div className="flex-1 grid grid-cols-[1fr_1fr] overflow-hidden">
        {/* Left: Editor */}
        <div className="border-r border-[#D1D5DB] overflow-hidden">
          <Editor
            resume={resume}
            setResume={setResume}
            updateProfile={updateProfile}
            toggleVisibility={toggleVisibility}
          />
        </div>

        {/* Right: Preview */}
        <Preview resume={resume} />
      </div>

      {/* Floating Print Button */}
      <PrintController />
    </div>
  );
}

export default App;
