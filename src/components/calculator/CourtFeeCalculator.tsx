import React, { useState } from 'react';
import { STATE_COURT_FEE_TIERS } from '../../data/courtFeesData';
import { formatINR } from '../../utils/documentExport';
import { Building2, Coins, Scale } from 'lucide-react';

export const CourtFeeCalculator: React.FC = () => {
  const [selectedStateId, setSelectedStateId] = useState(STATE_COURT_FEE_TIERS[0].id);
  const [suitValuation, setSuitValuation] = useState<number>(2500000); // 25 Lakhs default

  const currentTier =
    STATE_COURT_FEE_TIERS.find((t) => t.id === selectedStateId) || STATE_COURT_FEE_TIERS[0];

  const result = currentTier.calculatorFn(suitValuation);

  const quickAmounts = [
    { label: '₹5 Lakhs', val: 500000 },
    { label: '₹25 Lakhs', val: 2500000 },
    { label: '₹1 Crore', val: 10000000 },
    { label: '₹2.5 Crores', val: 25000000 },
    { label: '₹10 Crores', val: 100000000 }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
              State Court Fees & Valuation
            </span>
          </div>
          <h2 className="font-serif-legal text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Coins className="text-slate-900" size={22} />
            Pecuniary Jurisdiction & Ad-Valorem Fee Estimator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Calculate accurate institution court fees and determine competent forum (District Court vs High Court Original Side).
          </p>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-bold text-slate-700">Jurisdiction State:</label>
          <select
            value={selectedStateId}
            onChange={(e) => setSelectedStateId(e.target.value)}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
          >
            {STATE_COURT_FEE_TIERS.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
              Suit Valuation for Purpose of Court Fees (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono-legal text-base font-bold">
                ₹
              </span>
              <input
                type="number"
                value={suitValuation}
                onChange={(e) => setSuitValuation(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono-legal text-lg font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                step={50000}
              />
            </div>
          </div>

          {/* Quick Amount Chips */}
          <div>
            <span className="text-xs text-slate-500 block mb-2 font-medium">
              Quick Valuation Shortcuts:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((q) => {
                const isSelected = suitValuation === q.val;
                return (
                  <button
                    key={q.val}
                    type="button"
                    onClick={() => setSuitValuation(q.val)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-legal font-semibold transition-all border ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* State Jurisdiction Rules */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="text-slate-900 font-bold flex items-center gap-1.5">
              <Building2 size={15} className="text-slate-700" />
              {currentTier.courtName}
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              <strong className="text-slate-900 font-semibold">Pecuniary Cutoff:</strong> {currentTier.pecuniaryLimit}
            </p>
            <p className="text-slate-600 text-[11px]">
              <strong className="text-slate-800 font-semibold">Enactment:</strong> {currentTier.feeFormula}
            </p>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-900 space-y-5 shadow-md">
            <div>
              <span className="text-[11px] uppercase font-mono-legal tracking-wider text-slate-400 block font-semibold">
                Estimated Ad-Valorem Court Fee
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono-legal mt-1">
                {formatINR(result.courtFee)}
              </div>
              <span className="text-xs text-slate-400 font-mono-legal mt-1 block">
                On Suit Valuation of {formatINR(suitValuation)}
              </span>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] uppercase font-mono-legal tracking-wider text-slate-400 block font-semibold">
                Competent Judicial Forum
              </span>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <Scale size={18} className="text-emerald-400 shrink-0" />
                <span>{result.jurisdiction}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <div className="font-semibold text-slate-400 mb-1">Applied Statutory Formula:</div>
              <p className="text-slate-300 font-mono-legal text-xs leading-relaxed">
                {result.formulaUsed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
