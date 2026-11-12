import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Lock, 
  ExternalLink, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  X, 
  Copy, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export interface SecretPortalTarget {
  id: 'mizu' | 'salvador';
  name: string;
  url: string;
  secretKey: string;
}

export const PORTAL_TARGETS: Record<'mizu' | 'salvador', SecretPortalTarget> = {
  mizu: {
    id: 'mizu',
    name: 'Mizu In-App Portal',
    url: 'https://mizu.hellohealthiness.co.uk/',
    secretKey: '{234+0}',
  },
  salvador: {
    id: 'salvador',
    name: 'SalvadorAI Chat Portal',
    url: 'https://salvadorai-apichat.ai.studio/',
    secretKey: '{0001}',
  },
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accessCode: string;
  portal?: SecretPortalTarget;
}

export const MizuPortalViewer: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  accessCode,
  portal = PORTAL_TARGETS.mizu
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIframeKey(k => k + 1);
    }
  }, [isOpen, portal.url]);

  if (!isOpen) return null;

  const targetUrl = portal.url;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(k => k + 1);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 ${
      isFullscreen ? 'p-0' : ''
    }`}>
      <div className={`w-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700/40 transition-all duration-300 ${
        isFullscreen ? 'h-full rounded-none' : 'h-[92vh] max-w-6xl'
      }`}>
        
        {/* Top Browser Bar Header */}
        <div className="bg-slate-900 text-slate-100 px-4 py-2.5 flex items-center justify-between gap-3 border-b border-slate-800 select-none">
          {/* Left: Window controls & Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition flex items-center justify-center text-rose-950 group"
                title="Close Portal"
              >
                <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
              </button>
              <button 
                onClick={() => setIsFullscreen(prev => !prev)}
                className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition"
                title="Toggle Size"
              />
              <button 
                onClick={handleRefresh}
                className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition"
                title="Reload"
              />
            </div>
            
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-700 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{portal.name}</span>
            </div>
          </div>

          {/* Center: Address Bar */}
          <div className="flex-1 max-w-2xl mx-2 flex items-center bg-slate-800/90 rounded-lg px-3 py-1.5 text-xs text-slate-300 border border-slate-700">
            <Lock className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" />
            <span className="font-mono text-emerald-300 select-all truncate">{targetUrl}</span>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-slate-400 pl-2">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span className="hidden md:inline">Encrypted</span>
            </div>
          </div>

          {/* Right: Actions & Code pill */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Generated Code Badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-md text-[11px] text-emerald-300">
              <span className="text-slate-400 font-mono">Code:</span>
              <span className="font-mono font-bold">{accessCode}</span>
              <button 
                onClick={handleCopyCode}
                className="ml-1 p-0.5 hover:text-white transition"
                title="Copy Access Code"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Refresh Frame"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Pop-out in new window */}
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
              title="Open directly in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 transition"
              title="Close Portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verification banner bar */}
        <div className="bg-emerald-50 px-4 py-1.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
              SECRET UNLOCK
            </span>
            <span>
              Generated from calculator secret key{' '}
              <code className="font-mono bg-emerald-100/80 px-1 py-0.5 rounded text-emerald-950 font-bold">
                {portal.secretKey}
              </code>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 hidden sm:inline">Portal Active inside TestQuiz</span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Code Copied!' : `Copy ${accessCode}`}</span>
            </button>
          </div>
        </div>

        {/* Main Content Area - Embedded Iframe */}
        <div className="relative flex-1 w-full bg-slate-900">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 z-10 text-white gap-3">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-emerald-400">
                Loading {portal.name} directly within TestQuiz...
              </p>
              <span className="text-xs text-slate-400 font-mono">Connecting to {targetUrl}</span>
            </div>
          )}

          <iframe
            key={iframeKey}
            src={targetUrl}
            title={portal.name}
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIsLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          />

          {/* Quick Notice footer helper in case browser CSP prevents full framing */}
          <div className="absolute bottom-2 right-3 z-20 pointer-events-auto">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] bg-slate-900/90 hover:bg-slate-900 text-slate-300 hover:text-white px-3 py-1.5 rounded-full shadow-lg border border-slate-700/80 backdrop-blur-sm transition"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>Launch external tab if frame is blocked</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
