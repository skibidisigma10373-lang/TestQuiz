import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator as CalcIcon, 
  Delete, 
  RotateCcw, 
  History, 
  Sparkles, 
  KeyRound, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { playClickSound, playSuccessSound, playSecretUnlockSound } from '../utils/sound';
import { SecretPortalTarget, PORTAL_TARGETS } from './MizuPortalViewer';

interface Props {
  onUnlockPortal: (portalId: SecretPortalTarget['id'], code: string) => void;
  isFloating?: boolean;
  onCloseFloating?: () => void;
}

export const Calculator: React.FC<Props> = ({ 
  onUnlockPortal, 
  isFloating = false, 
  onCloseFloating 
}) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<Array<{ eq: string; res: string }>>([
    { eq: '15 * 8 + 4', res: '124' },
    { eq: '√(144) + 5²', res: '37' }
  ]);
  const [showHistory, setShowHistory] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [unlockedPortalId, setUnlockedPortalId] = useState<SecretPortalTarget['id']>('mizu');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isDeciphering, setIsDeciphering] = useState(false);
  const [decipherText, setDecipherText] = useState('');
  const [decipheringPortalId, setDecipheringPortalId] = useState<SecretPortalTarget['id']>('mizu');
  const [isSciMode, setIsSciMode] = useState(true);

  const displayInputRef = useRef<HTMLInputElement>(null);

  // Check for secret commands: {234+0} or {0001}
  const detectSecretTrigger = (val: string): SecretPortalTarget['id'] | null => {
    const clean = val.replace(/\s+/g, '');
    if (clean === '{234+0}' || clean === '{234+0}=' || clean.includes('{234+0}')) {
      return 'mizu';
    }
    if (clean === '{0001}' || clean === '{0001}=' || clean.includes('{0001}')) {
      return 'salvador';
    }
    return null;
  };

  const triggerEasterEgg = (portalId: SecretPortalTarget['id']) => {
    playSecretUnlockSound();
    setDecipheringPortalId(portalId);
    setIsDeciphering(true);

    const targetPortal = PORTAL_TARGETS[portalId];
    const chars = '0123456789ABCDEF!@#$%&*';
    let iterations = 0;
    const finalCode =
      portalId === 'salvador'
        ? `SALVADOR-0001-AI-${Math.floor(1000 + Math.random() * 9000)}`
        : `MIZU-234-HEALTH-${Math.floor(1000 + Math.random() * 9000)}`;

    const interval = setInterval(() => {
      iterations++;
      const scrambled = Array(18)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');
      setDecipherText(`DECRYPTING: ${scrambled}`);

      if (iterations > 14) {
        clearInterval(interval);
        setIsDeciphering(false);
        setSecretUnlocked(true);
        setUnlockedPortalId(portalId);
        setGeneratedCode(finalCode);
        setDisplay(finalCode);
        setEquation(`SECRET KEY: ${targetPortal.secretKey} VERIFIED`);
        playSuccessSound();
        // Open the portal directly in TestQuiz site
        setTimeout(() => {
          onUnlockPortal(portalId, finalCode);
        }, 600);
      }
    }, 80);
  };

  const handleInput = (char: string) => {
    playClickSound();

    if (isDeciphering) return;

    if ((display === '0' || secretUnlocked || display === 'Error' || display === 'Syntax Error') && !['+', '-', '*', '/', '.', '^'].includes(char)) {
      setSecretUnlocked(false);
      setEquation('');
      setDisplay(char);
      return;
    }

    const nextVal = display + char;
    setDisplay(nextVal);

    // Check if the user has completed typing a secret key
    const matchedPortal = detectSecretTrigger(nextVal);
    if (matchedPortal) {
      triggerEasterEgg(matchedPortal);
    }
  };

  const handleClear = () => {
    playClickSound();
    setDisplay('0');
    setEquation('');
    setSecretUnlocked(false);
  };

  const handleBackspace = () => {
    playClickSound();
    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const evaluateExpression = () => {
    playClickSound();

    // Check secret
    const matchedPortal = detectSecretTrigger(display);
    if (matchedPortal) {
      triggerEasterEgg(matchedPortal);
      return;
    }

    try {
      // Clean and sanitize expression for evaluation
      // Replace braces with parentheses
      let expr = display
        .replace(/\{/g, '(')
        .replace(/\}/g, ')')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, `${Math.PI}`)
        .replace(/e/g, `${Math.E}`);

      // Handle square root √(n) or √n
      expr = expr.replace(/√\(([0-9.]+)\)/g, 'Math.sqrt($1)');
      expr = expr.replace(/√([0-9.]+)/g, 'Math.sqrt($1)');

      // Handle trig
      expr = expr.replace(/sin\(([0-9.]+)\)/g, (_, val) => `Math.sin((${val} * Math.PI) / 180)`);
      expr = expr.replace(/cos\(([0-9.]+)\)/g, (_, val) => `Math.cos((${val} * Math.PI) / 180)`);
      expr = expr.replace(/tan\(([0-9.]+)\)/g, (_, val) => `Math.tan((${val} * Math.PI) / 180)`);
      expr = expr.replace(/log\(([0-9.]+)\)/g, 'Math.log10($1)');
      expr = expr.replace(/ln\(([0-9.]+)\)/g, 'Math.log($1)');

      // Only allow safe characters
      if (/[^0-9+\-*/().Math,sqrtisncologeEPI\s]/.test(expr)) {
        // If unrecognized, try safe evaluate
      }

      // Safe evaluation using Function
      const resultVal = new Function(`return (${expr})`)();

      if (resultVal === undefined || isNaN(resultVal)) {
        setDisplay('Error');
      } else {
        const rounded = Number.isInteger(resultVal) 
          ? resultVal.toString() 
          : parseFloat(resultVal.toFixed(8)).toString();

        setHistory(prev => [{ eq: display, res: rounded }, ...prev.slice(0, 9)]);
        setEquation(`${display} =`);
        setDisplay(rounded);
      }
    } catch {
      setDisplay('Syntax Error');
    }
  };

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in another input/textarea
      if (
        document.activeElement && 
        document.activeElement.tagName === 'INPUT' && 
        document.activeElement !== displayInputRef.current
      ) {
        return;
      }
      if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      const key = e.key;

      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '{', '}', '(', ')', '^'].includes(key)) {
        handleInput(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        evaluateExpression();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display]);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col ${
      isFloating ? 'w-84 sm:w-96' : 'w-full max-w-md mx-auto'
    }`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
            <CalcIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">TestQuiz Smart Calculator</h3>
            <span className="text-[10px] text-sky-300 font-medium">Standard &amp; Scientific Evaluator</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSciMode(prev => !prev)}
            className={`text-[11px] px-2 py-0.5 rounded font-mono transition ${
              isSciMode ? 'bg-sky-500 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Scientific Keypad"
          >
            {isSciMode ? 'SCI' : 'STD'}
          </button>

          <button
            onClick={() => setShowHistory(prev => !prev)}
            className={`p-1.5 rounded-lg transition ${
              showHistory ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Calculation History"
          >
            <History className="w-4 h-4" />
          </button>

          {isFloating && onCloseFloating && (
            <button
              onClick={onCloseFloating}
              className="p-1 rounded-lg text-slate-300 hover:bg-rose-500/30 hover:text-rose-200 transition"
              title="Close Calculator"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Secret Deciphering Animation or Display */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-col justify-end text-right min-h-[96px] relative overflow-hidden">
        {isDeciphering ? (
          <div className="flex flex-col items-center justify-center py-2 text-emerald-400">
            <Sparkles className="w-5 h-5 animate-spin text-amber-400 mb-1" />
            <span className="font-mono text-xs tracking-wider animate-pulse font-bold">{decipherText}</span>
            <span className="text-[10px] text-slate-400 mt-1">
              Decrypting {PORTAL_TARGETS[decipheringPortalId].name} Access Protocol...
            </span>
          </div>
        ) : (
          <>
            <div className="text-xs font-mono text-slate-400 h-5 truncate select-none">
              {equation || '\u00A0'}
            </div>
            
            <div className={`font-mono font-bold tracking-tight select-all truncate ${
              secretUnlocked 
                ? 'text-lg text-emerald-400 animate-pulse' 
                : display.length > 12 
                  ? 'text-xl text-white' 
                  : 'text-2xl sm:text-3xl text-white'
            }`}>
              {display}
            </div>

            {secretUnlocked && (
              <div className="mt-1 flex items-center justify-end gap-1.5 text-[11px] text-emerald-400 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PORTAL_TARGETS[unlockedPortalId].name} Activated!</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Secret code prompt alert if unlocked */}
      {secretUnlocked && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/40 p-3 flex items-center justify-between gap-2 text-emerald-200 text-xs">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Secret Code Generated!</p>
              <p className="font-mono text-[11px] text-emerald-300">{generatedCode}</p>
            </div>
          </div>
          <button
            onClick={() => onUnlockPortal(unlockedPortalId, generatedCode)}
            className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg font-bold text-xs shadow-md transition shrink-0 flex items-center gap-1"
          >
            <span>{unlockedPortalId === 'salvador' ? 'Open SalvadorAI' : 'Open Mizu'}</span>
            <Sparkles className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* History panel overlay */}
      {showHistory && (
        <div className="bg-slate-50 border-b border-slate-200 p-3 max-h-48 overflow-y-auto text-xs">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200 text-slate-500">
            <span className="font-semibold text-[11px]">CALCULATION LOG</span>
            <button
              onClick={() => setHistory([])}
              className="text-[10px] text-rose-600 hover:underline"
            >
              Clear Log
            </button>
          </div>
          {history.length === 0 ? (
            <p className="text-slate-400 italic py-2 text-center text-xs">No previous equations</p>
          ) : (
            <div className="space-y-1.5">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setDisplay(item.res);
                    setEquation(item.eq + ' =');
                  }}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-slate-200/70 cursor-pointer font-mono"
                >
                  <span className="text-slate-600 truncate max-w-[170px]">{item.eq}</span>
                  <span className="font-bold text-slate-900">= {item.res}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Keypad */}
      <div className="p-3 bg-slate-100 flex flex-col gap-2">
        {/* Scientific Row 1: Curly Braces { and } are right here! */}
        {isSciMode && (
          <div className="grid grid-cols-5 gap-1.5 pb-1 border-b border-slate-200">
            <button
              onClick={() => handleInput('{')}
              className="py-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 font-mono font-bold text-sm border border-sky-300/60 shadow-xs transition active:scale-95"
              title="Open Curly Brace {"
            >
              {'{'}
            </button>
            <button
              onClick={() => handleInput('}')}
              className="py-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 font-mono font-bold text-sm border border-sky-300/60 shadow-xs transition active:scale-95"
              title="Close Curly Brace }"
            >
              {'}'}
            </button>
            <button
              onClick={() => handleInput('(')}
              className="py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono font-medium text-xs shadow-xs transition active:scale-95"
            >
              (
            </button>
            <button
              onClick={() => handleInput(')')}
              className="py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono font-medium text-xs shadow-xs transition active:scale-95"
            >
              )
            </button>
            <button
              onClick={() => handleInput('^')}
              className="py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono font-medium text-xs shadow-xs transition active:scale-95"
              title="Power x^y"
            >
              xʸ
            </button>
          </div>
        )}

        {/* Scientific Row 2: Functions */}
        {isSciMode && (
          <div className="grid grid-cols-5 gap-1.5 pb-1 border-b border-slate-200">
            <button
              onClick={() => handleInput('sin(')}
              className="py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-mono text-[11px] font-medium transition active:scale-95"
            >
              sin
            </button>
            <button
              onClick={() => handleInput('cos(')}
              className="py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-mono text-[11px] font-medium transition active:scale-95"
            >
              cos
            </button>
            <button
              onClick={() => handleInput('tan(')}
              className="py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-mono text-[11px] font-medium transition active:scale-95"
            >
              tan
            </button>
            <button
              onClick={() => handleInput('√(')}
              className="py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-mono text-[11px] font-medium transition active:scale-95"
            >
              √x
            </button>
            <button
              onClick={() => handleInput('π')}
              className="py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-mono text-[11px] font-medium transition active:scale-95"
            >
              π
            </button>
          </div>
        )}

        {/* Main Standard Keypad: 4 columns */}
        <div className="grid grid-cols-4 gap-1.5">
          {/* Row 1 */}
          <button
            onClick={handleClear}
            className="py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-sm shadow-xs border border-rose-200 transition active:scale-95"
          >
            AC
          </button>
          <button
            onClick={handleBackspace}
            className="py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-sm shadow-xs transition active:scale-95"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleInput('%')}
            className="py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm shadow-xs transition active:scale-95"
          >
            %
          </button>
          <button
            onClick={() => handleInput('/')}
            className="py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-xs transition active:scale-95"
          >
            ÷
          </button>

          {/* Row 2: 7, 8, 9, * */}
          <button
            onClick={() => handleInput('7')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            7
          </button>
          <button
            onClick={() => handleInput('8')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            8
          </button>
          <button
            onClick={() => handleInput('9')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            9
          </button>
          <button
            onClick={() => handleInput('*')}
            className="py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-xs transition active:scale-95"
          >
            ×
          </button>

          {/* Row 3: 4, 5, 6, - */}
          <button
            onClick={() => handleInput('4')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            4
          </button>
          <button
            onClick={() => handleInput('5')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            5
          </button>
          <button
            onClick={() => handleInput('6')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            6
          </button>
          <button
            onClick={() => handleInput('-')}
            className="py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-xs transition active:scale-95"
          >
            −
          </button>

          {/* Row 4: 1, 2, 3, + */}
          <button
            onClick={() => handleInput('1')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            1
          </button>
          <button
            onClick={() => handleInput('2')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            2
          </button>
          <button
            onClick={() => handleInput('3')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            3
          </button>
          <button
            onClick={() => handleInput('+')}
            className="py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base shadow-xs transition active:scale-95"
          >
            +
          </button>

          {/* Row 5: 0, ., = */}
          <button
            onClick={() => handleInput('0')}
            className="col-span-2 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            0
          </button>
          <button
            onClick={() => handleInput('.')}
            className="py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-base shadow-xs border border-slate-200 transition active:scale-95"
          >
            .
          </button>
          <button
            onClick={evaluateExpression}
            className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition active:scale-95 flex items-center justify-center"
          >
            =
          </button>
        </div>
      </div>

      {/* Footer hint */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-mono">Supports physical keyboard</span>
        <span className="text-[10px] text-slate-400">Press Esc to clear</span>
      </div>

    </div>
  );
};
