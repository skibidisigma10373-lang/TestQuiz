import React from 'react';

interface Props {
  diagram: 'right-triangle' | 'circle-radius' | 'parabola' | 'parallel-lines' | 'coordinate-plane' | 'cylinder-volume';
  labels?: {
    a?: string | number;
    b?: string | number;
    c?: string | number;
    r?: string | number;
    h?: string | number;
    angle?: string | number;
  };
}

export const GeometryDiagram: React.FC<Props> = ({ diagram, labels = {} }) => {
  if (diagram === 'right-triangle') {
    const a = labels.a ?? 6;
    const b = labels.b ?? 8;
    const c = labels.c ?? '?';
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-sky-50/60 rounded-xl border border-sky-100 my-3">
        <svg viewBox="0 0 260 180" className="w-56 h-36">
          {/* Right Triangle */}
          <polygon
            points="50,140 210,140 210,30"
            fill="rgba(14, 165, 233, 0.12)"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right Angle Square Mark */}
          <path
            d="M 195 140 L 195 125 L 210 125"
            fill="none"
            stroke="#0369a1"
            strokeWidth="2"
          />
          {/* Base Label (b) */}
          <text x="130" y="160" textAnchor="middle" fill="#0369a1" fontWeight="600" fontSize="14">
            b = {b}
          </text>
          {/* Vertical Leg Label (a) */}
          <text x="228" y="90" textAnchor="start" fill="#0369a1" fontWeight="600" fontSize="14">
            a = {a}
          </text>
          {/* Hypotenuse Label (c) */}
          <text x="115" y="75" textAnchor="middle" fill="#d97706" fontWeight="700" fontSize="15">
            c = {c}
          </text>
        </svg>
        <span className="text-xs text-sky-800 font-medium">Right-Angled Triangle (Pythagorean Theorem)</span>
      </div>
    );
  }

  if (diagram === 'circle-radius') {
    const r = labels.r ?? 7;
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 my-3">
        <svg viewBox="0 0 220 180" className="w-48 h-40">
          {/* Circle */}
          <circle
            cx="110"
            cy="90"
            r="65"
            fill="rgba(16, 185, 129, 0.12)"
            stroke="#059669"
            strokeWidth="3"
          />
          {/* Center Point */}
          <circle cx="110" cy="90" r="4" fill="#047857" />
          {/* Radius line */}
          <line
            x1="110"
            y1="90"
            x2="175"
            y2="90"
            stroke="#047857"
            strokeWidth="2.5"
            strokeDasharray="3 3"
          />
          {/* Radius Label */}
          <text x="142" y="82" textAnchor="middle" fill="#047857" fontWeight="600" fontSize="13">
            r = {r} cm
          </text>
        </svg>
        <span className="text-xs text-emerald-800 font-medium">Circle with Radius r = {r} cm</span>
      </div>
    );
  }

  if (diagram === 'cylinder-volume') {
    const r = labels.r ?? 3;
    const h = labels.h ?? 10;
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 my-3">
        <svg viewBox="0 0 200 180" className="w-44 h-40">
          {/* Top Ellipse */}
          <ellipse cx="100" cy="35" rx="50" ry="16" fill="rgba(99, 102, 241, 0.2)" stroke="#4f46e5" strokeWidth="2.5" />
          {/* Bottom Ellipse */}
          <ellipse cx="100" cy="140" rx="50" ry="16" fill="rgba(99, 102, 241, 0.1)" stroke="#4f46e5" strokeWidth="2.5" />
          {/* Sides */}
          <line x1="50" y1="35" x2="50" y2="140" stroke="#4f46e5" strokeWidth="2.5" />
          <line x1="150" y1="35" x2="150" y2="140" stroke="#4f46e5" strokeWidth="2.5" />
          {/* Center line and radius */}
          <line x1="100" y1="35" x2="150" y2="35" stroke="#4338ca" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="100" cy="35" r="3" fill="#4338ca" />
          <text x="125" y="28" textAnchor="middle" fill="#4338ca" fontWeight="600" fontSize="12">r = {r}</text>
          {/* Height marker */}
          <line x1="165" y1="35" x2="165" y2="140" stroke="#6366f1" strokeWidth="1.5" />
          <text x="180" y="92" textAnchor="start" fill="#4338ca" fontWeight="600" fontSize="13">h = {h}</text>
        </svg>
        <span className="text-xs text-indigo-800 font-medium">Right Circular Cylinder (V = πr²h)</span>
      </div>
    );
  }

  if (diagram === 'parallel-lines') {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-amber-50/60 rounded-xl border border-amber-100 my-3">
        <svg viewBox="0 0 240 150" className="w-52 h-32">
          {/* Line 1 */}
          <line x1="20" y1="45" x2="220" y2="45" stroke="#d97706" strokeWidth="3" />
          {/* Line 2 */}
          <line x1="20" y1="105" x2="220" y2="105" stroke="#d97706" strokeWidth="3" />
          {/* Transversal */}
          <line x1="60" y1="135" x2="180" y2="15" stroke="#0284c7" strokeWidth="2.5" />
          {/* Angle 1: 65 deg */}
          <path d="M 148 45 A 20 20 0 0 0 135 60" fill="none" stroke="#dc2626" strokeWidth="2" />
          <text x="156" y="70" fill="#dc2626" fontWeight="bold" fontSize="13">65°</text>
          {/* Consecutive interior */}
          <path d="M 102 105 A 20 20 0 0 1 115 90" fill="none" stroke="#2563eb" strokeWidth="2" />
          <text x="80" y="90" fill="#2563eb" fontWeight="bold" fontSize="13">?</text>
        </svg>
        <span className="text-xs text-amber-800 font-medium">Parallel Lines Cut by Transversal</span>
      </div>
    );
  }

  if (diagram === 'coordinate-plane') {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 my-3">
        <svg viewBox="0 0 220 160" className="w-48 h-36">
          {/* Grid lines */}
          <line x1="20" y1="80" x2="200" y2="80" stroke="#94a3b8" strokeWidth="2" />
          <line x1="110" y1="10" x2="110" y2="150" stroke="#94a3b8" strokeWidth="2" />
          {/* Arrow heads */}
          <polygon points="200,80 193,76 193,84" fill="#64748b" />
          <polygon points="110,10 106,17 114,17" fill="#64748b" />
          <text x="202" y="84" fontSize="11" fill="#64748b">x</text>
          <text x="114" y="14" fontSize="11" fill="#64748b">y</text>
          {/* Points A and B */}
          <circle cx="80" cy="110" r="4.5" fill="#2563eb" />
          <text x="50" y="125" fontSize="11" fontWeight="600" fill="#2563eb">A(-2, 3)</text>
          <circle cx="160" cy="40" r="4.5" fill="#059669" />
          <text x="165" y="35" fontSize="11" fontWeight="600" fill="#059669">B(4, 11)</text>
          {/* Segment */}
          <line x1="80" y1="110" x2="160" y2="40" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 2" />
          <text x="130" y="80" fontSize="12" fontWeight="700" fill="#ea580c">d = ?</text>
        </svg>
        <span className="text-xs text-slate-700 font-medium">Cartesian Coordinate Distance</span>
      </div>
    );
  }

  return null;
};
