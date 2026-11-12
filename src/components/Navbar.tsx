import React, { useState } from 'react';
import { 
  Calculator, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Sliders,
  Menu,
  X,
  Bot,
  School,
  UserCheck
} from 'lucide-react';
import { toggleSound, isSoundEnabled } from '../utils/sound';
import { SchoolUser } from '../types/auth';

export type ActiveTab = 'topics' | 'exams' | 'custom-quizzes' | 'formulas' | 'calculator';

interface Props {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenCalculatorModal: () => void;
  onOpenSupportModal: () => void;
  onOpenLoginModal: () => void;
  currentUser: SchoolUser | null;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onTabChange,
  onOpenCalculatorModal,
  onOpenSupportModal,
  onOpenLoginModal,
  currentUser
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
    { id: 'custom-quizzes', label: 'Customize Quizzes', icon: Sliders },
    { id: 'formulas', label: 'Formulas & Reference', icon: FileText },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
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
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
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
            
            {/* GEODVS-Support Button */}
            <button
              onClick={onOpenSupportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 text-white text-xs font-bold shadow-xs border border-indigo-900/60 transition group cursor-pointer"
              title="GEODVS-Support (AI Issue Reporting Tool)"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
              <span>GEODVS-Support</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                Report Issue
              </span>
            </button>

            {/* School Login Button */}
            <button
              onClick={onOpenLoginModal}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentUser
                  ? 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs'
              }`}
              title={currentUser ? `Logged in as ${currentUser.name}` : 'School Login with Google or Clever'}
            >
              {currentUser ? (
                <>
                  <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                    currentUser.role === 'teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-sky-100 text-sky-700'
                  }`}>
                    {currentUser.role}
                  </span>
                </>
              ) : (
                <>
                  <School className="w-3.5 h-3.5 text-sky-600" />
                  <span className="hidden sm:inline">School Login</span>
                  <span className="text-[10px] text-slate-400 font-normal hidden md:inline">(Google/Clever)</span>
                </>
              )}
            </button>

            {/* Quick Calculator launch */}
            <button
              onClick={onOpenCalculatorModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition"
              title="Quick Math Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-sky-400" />
              <span>Calculator</span>
            </button>

            {/* Sound Mute/Unmute */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title={soundOn ? 'Sound is ON' : 'Sound is MUTED'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
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
                onOpenSupportModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-sky-700 flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-sky-600" />
              <span>GEODVS-Support Tool</span>
            </button>

            <button
              onClick={() => {
                onOpenLoginModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <School className="w-4 h-4 text-indigo-600" />
              <span>{currentUser ? currentUser.name : 'School SSO'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
