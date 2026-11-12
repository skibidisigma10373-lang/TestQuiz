import React, { useState } from 'react';
import { 
  Calculator, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Globe,
  Sliders,
  Menu,
  X
} from 'lucide-react';
import { toggleSound, isSoundEnabled } from '../utils/sound';

export type ActiveTab = 'topics' | 'exams' | 'formulas' | 'calculator';

interface Props {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCalculatorModal: () => void;
  onOpenCustomQuiz: () => void;
  mizuUnlocked: boolean;
  mizuAccessCode: string;
  onOpenMizuPortal: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onTabChange,
  onOpenCalculatorModal,
  onOpenCustomQuiz,
  mizuUnlocked,
  mizuAccessCode,
  onOpenMizuPortal
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSound = () => {
    const updated = toggleSound();
    setSoundOn(updated);
  };

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'topics', label: 'Topics & Practice', icon: BookOpen },
    { id: 'exams', label: 'Exams & Benchmarks', icon: GraduationCap },
    { id: 'formulas', label: 'Formulas & Cheat Sheets', icon: FileText },
    { id: 'calculator', label: 'Math Calculator', icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => onTabChange('topics')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 border border-sky-100">
              <img 
                src="/assets/aistudio/image_34009fbb__1__679781ac.jpg" 
                alt="TestQuiz Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-800 bg-clip-text text-transparent">
                  TestQuiz
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 rounded-md">
                  MATH
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Interactive Learning, Exams &amp; Geometry
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Secret Unlocked Mizu Portal Pill (if activated) */}
            {mizuUnlocked && (
              <button
                onClick={onOpenMizuPortal}
                className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md hover:from-emerald-500 hover:to-teal-500 transition animate-pulse"
                title="Open Mizu In-Site Portal"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mizu Portal</span>
                <span className="w-2 h-2 rounded-full bg-emerald-200" />
              </button>
            )}

            {/* Custom Quiz button */}
            <button
              onClick={onOpenCustomQuiz}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition"
              title="Create Custom Quiz"
            >
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              <span>Custom Quiz</span>
            </button>

            {/* Quick Calculator launch */}
            <button
              onClick={onOpenCalculatorModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition"
              title="Quick Math Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Calculator</span>
            </button>

            {/* Sound Mute/Unmute */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title={soundOn ? 'Sound is ON (Click to mute)' : 'Sound is MUTED (Click to unmute)'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenCustomQuiz();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-sky-700 flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4" />
              <span>Build Custom Quiz</span>
            </button>

            {mizuUnlocked && (
              <button
                onClick={() => {
                  onOpenMizuPortal();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-emerald-600 flex items-center gap-1.5"
              >
                <Globe className="w-4 h-4" />
                <span>Open Mizu Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
