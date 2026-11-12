import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Layers, 
  Sparkles,
  Calculator
} from 'lucide-react';
import { formulaSheets } from '../data/formulaSheets';
import { MathCategory } from '../types/math';

interface Props {
  onOpenCalculator?: () => void;
}

export const FormulaGuide: React.FC<Props> = ({ onOpenCalculator }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MathCategory | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: Array<{ id: MathCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Formulas' },
    { id: 'algebra', label: 'Algebra' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'trigonometry', label: 'Trigonometry' },
    { id: 'calculus', label: 'Calculus' },
    { id: 'statistics', label: 'Statistics' }
  ];

  const filtered = formulaSheets.filter(f => {
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch = 
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.formula.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-3 border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Mathematics Reference</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Formulas &amp; Cheat Sheets</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Quick reference guides and standard formulas for algebra, Euclidean geometry, trigonometry, calculus, and probability.
          </p>
        </div>

        {onOpenCalculator && (
          <button
            onClick={onOpenCalculator}
            className="px-5 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-2xl shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Calculator</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center gap-4 justify-between">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search formulas or concepts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100">
                  {item.category}
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.formula)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  title="Copy Formula"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">{item.name}</h3>

              {/* Formula display block */}
              <div className="bg-slate-900 text-sky-300 font-mono text-sm sm:text-base font-bold p-3 rounded-xl mb-3 tracking-wide select-all">
                {item.formula}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 p-3 rounded-b-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Application Example</span>
              <p className="text-xs font-mono text-slate-800">{item.example}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
