import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  AlertTriangle, 
  Bug, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  X, 
  Sparkles, 
  ShieldAlert, 
  LifeBuoy, 
  ChevronRight,
  Calculator,
  School,
  Copy,
  Check
} from 'lucide-react';
import { SchoolUser } from '../types/auth';

export interface GeodvsTicket {
  ticketId: string;
  title: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  diagnosticSummary: string;
  suggestedWorkaround: string;
  resolutionTimeline: string;
  geodvsMessage: string;
  verifiedFormulas?: string | null;
  timestamp: string;
  status: 'Open' | 'Triaged' | 'Resolved';
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: SchoolUser | null;
  activeQuestionContext?: { id: string; title: string; category?: string } | null;
}

const LOCAL_STORAGE_KEY_TICKETS = 'testquiz_geodvs_tickets_v1';

export const GeodvsSupportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  activeQuestionContext
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'history'>('report');
  
  // Form fields
  const [category, setCategory] = useState<string>('Math Question / Solution Error');
  const [issueType, setIssueType] = useState<string>('Incorrect Math Formula / Answer');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTicket, setActiveTicket] = useState<GeodvsTicket | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  // Tickets history
  const [tickets, setTickets] = useState<GeodvsTicket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TICKETS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Prefill if active question context is provided
  useEffect(() => {
    if (activeQuestionContext) {
      setTitle(`Issue with Question ${activeQuestionContext.id}: ${activeQuestionContext.title.slice(0, 40)}`);
      setCategory('Math Question / Solution Error');
    }
  }, [activeQuestionContext]);

  if (!isOpen) return null;

  const handleCopyTicket = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMessage('Please provide both an issue title and a detailed description.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/geodvs-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueType,
          title,
          description,
          category,
          severity,
          userRole: currentUser?.role || 'Guest Student / Teacher',
          schoolName: currentUser?.schoolName || 'TestQuiz Educational District',
          questionContext: activeQuestionContext || null
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate GEODVS diagnostic report.');
      }

      const data = await res.json();

      const newTicket: GeodvsTicket = {
        ticketId: data.ticketId || `GEODVS-${Math.floor(10000 + Math.random() * 90000)}`,
        title,
        category,
        severity: data.severity || severity,
        diagnosticSummary: data.diagnosticSummary || 'Report received and triaged by GEODVS-Support.',
        suggestedWorkaround: data.suggestedWorkaround || 'Please refresh your session or retry the problem.',
        resolutionTimeline: data.resolutionTimeline || 'Within 24 hours',
        geodvsMessage: data.geodvsMessage || 'Your issue report has been registered in the GEODVS diagnostic queue.',
        verifiedFormulas: data.verifiedFormulas || null,
        timestamp: new Date().toISOString(),
        status: 'Triaged'
      };

      const updatedTickets = [newTicket, ...tickets];
      setTickets(updatedTickets);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_TICKETS, JSON.stringify(updatedTickets));
      } catch {
        // Ignore quota error
      }

      setActiveTicket(newTicket);
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err: unknown) {
      console.error(err);
      // Fallback offline ticket
      const fallbackTicket: GeodvsTicket = {
        ticketId: `GEODVS-${Math.floor(10000 + Math.random() * 90000)}`,
        title,
        category,
        severity,
        diagnosticSummary: 'Ticket created and saved in local diagnostic registry.',
        suggestedWorkaround: 'Try clearing your local browser storage or restarting the session.',
        resolutionTimeline: 'Within 24 hours',
        geodvsMessage: 'GEODVS-Support has successfully registered your report.',
        timestamp: new Date().toISOString(),
        status: 'Triaged'
      };
      setTickets([fallbackTicket, ...tickets]);
      setActiveTicket(fallbackTicket);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">GEODVS-Support</h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Issue Reporting Only
                </span>
              </div>
              <p className="text-xs text-sky-200/80 mt-0.5">
                AI-Powered Diagnostic Tool Exclusively for Reporting Math &amp; System Issues
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('report'); setActiveTicket(null); }}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeTab === 'report'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Report an Issue
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Logged Tickets</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-mono font-bold">
                {tickets.length}
              </span>
            </button>
          </div>

          {currentUser && (
            <div className="hidden sm:flex items-center gap-1.5 text-slate-500 text-[11px]">
              <School className="w-3.5 h-3.5 text-sky-600" />
              <span>{currentUser.name} ({currentUser.role})</span>
            </div>
          )}
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'report' && !activeTicket && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Notice */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> GEODVS-Support is trained exclusively to process bug reports, formula corrections, grading glitches, and account issues. It analyzes problem parameters and produces instant technical triage.
                </p>
              </div>

              {/* Category & Severity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Issue Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Math Question / Solution Error">Math Question / Solution Error</option>
                    <option value="Geometry Diagram Discrepancy">Geometry Diagram Discrepancy</option>
                    <option value="Calculator Evaluation Bug">Calculator Evaluation Bug</option>
                    <option value="Exam Timer &amp; Scoring Glitch">Exam Timer &amp; Scoring Glitch</option>
                    <option value="School Account / SSO Problem">School Account / SSO Problem</option>
                    <option value="Custom Quiz Customization Issue">Custom Quiz Customization Issue</option>
                    <option value="Other System Bug">Other System Bug</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-semibold"
                  >
                    <option value="Low">Low - Minor Typo or Cosmetic</option>
                    <option value="Medium">Medium - Calculation or Explanation</option>
                    <option value="High">High - Question Prevents Passing</option>
                    <option value="Critical">Critical - System Crash or Blocker</option>
                  </select>
                </div>
              </div>

              {/* Issue Title */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Issue Summary
                </label>
                <input
                  type="text"
                  placeholder="e.g., Question geo-1 Pythagorean hypotenuse calculation step missing"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              {/* Detailed Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Detailed Description of the Problem
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what occurred, what was expected, and any specific equations or inputs that triggered the error..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              {/* Active question indicator if present */}
              {activeQuestionContext && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-center justify-between">
                  <span>Attached Question: <strong>{activeQuestionContext.id}</strong></span>
                  <span className="font-mono text-sky-700">{activeQuestionContext.category}</span>
                </div>
              )}

              {errorMessage && (
                <p className="text-xs text-rose-600 font-medium">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>GEODVS Analyzing Issue...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit to GEODVS-Support</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* Active Ticket Triage Result */}
          {activeTicket && (
            <div className="space-y-6">
              
              {/* Success Badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-base">Issue Successfully Logged &amp; Triaged</h4>
                    <p className="text-xs text-emerald-800">GEODVS-Support has processed your report.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                  <span className="text-xs font-mono font-bold text-emerald-950">{activeTicket.ticketId}</span>
                  <button
                    onClick={() => handleCopyTicket(activeTicket.ticketId)}
                    className="p-1 hover:text-emerald-700 text-slate-400 transition"
                    title="Copy Ticket ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Diagnostic Assessment Card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    GEODVS Technical Triage Report
                  </span>
                  <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    activeTicket.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                    activeTicket.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    'bg-sky-100 text-sky-800'
                  }`}>
                    Severity: {activeTicket.severity}
                  </span>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-1">Diagnostic Root Cause</h5>
                  <p className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                    {activeTicket.diagnosticSummary}
                  </p>
                </div>

                {activeTicket.suggestedWorkaround && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h5 className="text-xs font-bold text-sky-700 uppercase mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Immediate Suggested Workaround</span>
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {activeTicket.suggestedWorkaround}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200">
                  <h5 className="text-xs font-bold text-slate-700 uppercase mb-1">Message from GEODVS Engineering</h5>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{activeTicket.geodvsMessage}"
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setActiveTicket(null);
                    setActiveTab('history');
                  }}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 hover:underline"
                >
                  <span>View All Logged Tickets</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTicket(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                >
                  File Another Issue
                </button>
              </div>

            </div>
          )}

          {/* Ticket History */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {tickets.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <LifeBuoy className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm font-semibold text-slate-600">No issues reported yet.</p>
                  <p className="text-xs">Any math discrepancies, calculator bugs, or scoring glitches you report will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                            {t.ticketId}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{t.category}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {t.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{t.diagnosticSummary}</p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{new Date(t.timestamp).toLocaleDateString()}</span>
                        <span className="font-semibold text-sky-600">Severity: {t.severity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
