import React from 'react';
import { Scale, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5">
          <div className="flex items-center gap-2 text-slate-900 font-serif-legal font-bold text-sm">
            <Scale size={16} className="text-black" />
            <span>NYAYASETU AI (न्यायसेतु)</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
              v2.4 LTS
            </span>
          </div>
          <p className="text-slate-500 max-w-md text-xs leading-relaxed">
            Built for the <strong className="text-slate-900 font-semibold">ILTN Legal Vibeathon 2026</strong>. Empowering India's advocates, corporate counsels, and law firms with automated Sanhita cross-migration, court limitation intelligence, and DPDP 2023 compliance auditing.
          </p>
        </div>

        {/* Center: Legal Badges */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono-legal text-[11px] font-medium text-slate-700">
            BNS 2023
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono-legal text-[11px] font-medium text-slate-700">
            BNSS 2023
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono-legal text-[11px] font-medium text-slate-700">
            BSA S.63
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono-legal text-[11px] font-medium text-slate-700">
            DPDP Act 2023
          </span>
        </div>

        {/* Right: Disclaimer */}
        <div className="text-center md:text-right text-xs text-slate-500 max-w-sm space-y-1">
          <div className="flex items-center justify-center md:justify-end gap-1.5 text-slate-800 font-semibold">
            <ShieldCheck size={14} className="text-slate-700" />
            <span>Statutory Verification Notice</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-tight">
            NyayaSetu AI is an assistive litigation intelligence system. Practitioners must cross-verify all statutory citations against official Gazettes before judicial filing.
          </p>
        </div>
      </div>
    </footer>
  );
};
