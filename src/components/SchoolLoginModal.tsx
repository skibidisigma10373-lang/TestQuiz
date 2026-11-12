import React, { useState } from 'react';
import { 
  GraduationCap, 
  School, 
  UserCheck, 
  Check, 
  X, 
  Building2, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { SchoolUser, UserRole, SSOProvider } from '../types/auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: SchoolUser) => void;
  currentUser: SchoolUser | null;
  onLogout: () => void;
}

const SAMPLE_DISTRICTS = [
  'Metro Public Schools (Unified K-12)',
  'Horizon STEM Academy District',
  'Lincoln Regional High School District',
  'Oak Ridge Community School District',
  'Pacific Coast High School'
];

export const SchoolLoginModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLogin,
  currentUser,
  onLogout
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider>('google');
  const [schoolDistrict, setSchoolDistrict] = useState(SAMPLE_DISTRICTS[0]);
  const [customName, setCustomName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [cleverBadgeMode, setCleverBadgeMode] = useState(false);

  if (!isOpen) return null;

  const handleSimulateLogin = (provider: SSOProvider) => {
    setIsAuthenticating(true);
    setSelectedProvider(provider);

    setTimeout(() => {
      let defaultName = '';
      let defaultEmail = '';
      let gradeOrSubject = '';

      if (selectedRole === 'student') {
        defaultName = customName.trim() || (provider === 'google' ? 'Jordan Martinez' : 'Alex Chen');
        defaultEmail = `${defaultName.toLowerCase().replace(/\s+/g, '.')}@student.${schoolDistrict.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`;
        gradeOrSubject = 'Grade 10 • Geometry & Algebra II';
      } else {
        defaultName = customName.trim() || (provider === 'google' ? 'Dr. Sarah Rodriguez' : 'Mr. David Vance');
        defaultEmail = `${defaultName.toLowerCase().replace(/\s+/g, '.')}@teacher.${schoolDistrict.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`;
        gradeOrSubject = 'Mathematics Dept. Lead • AP Calculus & Geometry';
      }

      const user: SchoolUser = {
        id: 'usr-' + Date.now(),
        name: defaultName,
        email: defaultEmail,
        role: selectedRole,
        provider,
        schoolName: schoolDistrict,
        districtName: schoolDistrict,
        gradeOrSubject,
        studentId: selectedRole === 'student' ? 'STU-' + Math.floor(100000 + Math.random() * 900000) : undefined,
        teacherCode: selectedRole === 'teacher' ? 'TCH-MATH-402' : undefined,
        cleverBadgeId: provider === 'clever' ? 'CLV-BDG-' + Math.floor(1000 + Math.random() * 9000) : undefined,
        savedQuizzesCount: 0
      };

      onLogin(user);
      setIsAuthenticating(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 space-y-6 relative overflow-hidden">
        
        {/* Subtle decorative banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-indigo-600 to-blue-600" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">School Account Single Sign-On</h3>
              <p className="text-xs text-slate-500">Sign in with Google Classroom or Clever</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If already logged in */}
        {currentUser ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{currentUser.name}</h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    currentUser.role === 'teacher' ? 'bg-indigo-100 text-indigo-800' : 'bg-sky-100 text-sky-800'
                  }`}>
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{currentUser.schoolName}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-sm"
              >
                Sign Out of School Account
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div className="space-y-5">
            
            {/* Role Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Select Your School Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                    selectedRole === 'student'
                      ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-500/20 text-sky-950 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedRole === 'student' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm block">Student</span>
                    <span className="text-[11px] text-slate-500 font-normal">Take tests, earn badges, save progress</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('teacher')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition cursor-pointer ${
                    selectedRole === 'teacher'
                      ? 'border-indigo-500 bg-indigo-50/80 ring-2 ring-indigo-500/20 text-indigo-950 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedRole === 'teacher' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sm block">Teacher / Educator</span>
                    <span className="text-[11px] text-slate-500 font-normal">Build custom quizzes, manage exams</span>
                  </div>
                </button>
              </div>
            </div>

            {/* School / District Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Select School District or Academy
              </label>
              <select
                value={schoolDistrict}
                onChange={e => setSchoolDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                {SAMPLE_DISTRICTS.map((dist, idx) => (
                  <option key={idx} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Optional Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder={selectedRole === 'student' ? 'e.g. Jordan Martinez' : 'e.g. Dr. Sarah Rodriguez'}
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* SSO Action Buttons: Google and Clever */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Choose Login Provider
              </label>

              {/* Google Classroom / Workspace */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => handleSimulateLogin('google')}
                className="w-full py-3 px-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
              >
                {/* Google Multi-Color G SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google School Account</span>
              </button>

              {/* Clever Instant Login */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => handleSimulateLogin('clever')}
                className="w-full py-3 px-4 rounded-2xl bg-[#0052cc] hover:bg-[#0747a6] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
              >
                {/* Clever Blue Badge Icon */}
                <div className="w-5 h-5 rounded-md bg-white text-[#0052cc] font-black text-xs flex items-center justify-center">
                  C
                </div>
                <span>Log in with Clever / Badge</span>
              </button>
            </div>

            {/* Authenticating indicator */}
            {isAuthenticating && (
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-center gap-2 justify-center">
                <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                <span>Connecting to school SSO directory...</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 text-center">
              FERPA &amp; COPPA compliant educational authentication.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};
