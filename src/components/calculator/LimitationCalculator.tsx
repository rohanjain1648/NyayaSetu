import React, { useState } from 'react';
import { LIMITATION_RULES } from '../../data/limitationRules';
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Scale,
  Sparkles
} from 'lucide-react';
import {
  formatDateIndian,
  addDays,
  addMonths,
  addYears,
  getDaysDifference,
  computeS138Timeline
} from '../../utils/dateUtils';

interface LimitationCalculatorProps {
  initialRuleId?: string;
}

export const LimitationCalculator: React.FC<LimitationCalculatorProps> = ({
  initialRuleId
}) => {
  const [activeTab, setActiveTab] = useState<'s138' | 'general'>('s138');

  // S.138 Simulator State
  const defaultDishonourDate = new Date().toISOString().split('T')[0];
  const [dishonourDate, setDishonourDate] = useState(defaultDishonourDate);
  const [noticeSentDate, setNoticeSentDate] = useState('');

  // General Limitation State
  const [selectedRuleId, setSelectedRuleId] = useState(initialRuleId || LIMITATION_RULES[1].id);
  const [causeOfActionDate, setCauseOfActionDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const selectedRule = LIMITATION_RULES.find((r) => r.id === selectedRuleId) || LIMITATION_RULES[0];

  // Calculate S.138 Timeline
  const s138Result = computeS138Timeline(dishonourDate, noticeSentDate || undefined);

  // Calculate General Limitation Expiry
  const computeGeneralExpiry = () => {
    const startDate = new Date(causeOfActionDate);
    let expiryDate = new Date(startDate);

    if (selectedRule.periodYears) {
      expiryDate = addYears(startDate, selectedRule.periodYears);
    } else if (selectedRule.periodMonths) {
      expiryDate = addMonths(startDate, selectedRule.periodMonths);
    } else if (selectedRule.periodDays) {
      expiryDate = addDays(startDate, selectedRule.periodDays);
    }

    const today = new Date();
    const daysLeft = getDaysDifference(expiryDate, today);
    const isExpired = daysLeft < 0;

    return {
      startDate,
      expiryDate,
      daysLeft,
      isExpired
    };
  };

  const generalResult = computeGeneralExpiry();

  return (
    <div className="space-y-6 fade-in">
      {/* Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 font-mono-legal">
                The Limitation Act, 1963
              </span>
              <span className="text-xs text-slate-500">Statutory Procedure & Deadlines</span>
            </div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              NyayaKram: Statutory Limitation Calculator
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
              Prevent legal malpractice and non-suited claims. Calculate strict deadlines for Section 138 NI Act cheque dishonour, commercial mediation cooling windows, and Civil Suits under the Limitation Act.
            </p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveTab('s138')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 's138'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              S.138 Cheque Bounce Simulator
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'general'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Limitation Act 1963 Presets
            </button>
          </div>
        </div>
      </div>

      {/* S.138 CHEQUE BOUNCE SIMULATOR */}
      {activeTab === 's138' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm">
            <div>
              <h2 className="font-serif-legal text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="text-black" size={18} />
                Cheque Dishonour Parameters
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Input dates from the Bank Cheque Return Memo
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                  1. Cheque Return Memo Date (Date of Dishonour) *
                </label>
                <input
                  type="date"
                  value={dishonourDate}
                  onChange={(e) => setDishonourDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono-legal focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Triggers mandatory 30-day statutory notice clock under Section 138(b).
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                  2. Notice Dispatch Date (Optional)
                </label>
                <input
                  type="date"
                  value={noticeSentDate}
                  onChange={(e) => setNoticeSentDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono-legal focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Leave empty to calculate presumptive timeline based on full 30-day notice window.
                </span>
              </div>
            </div>

            {/* Stage Badge */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-legal text-slate-500 uppercase font-semibold">Current Stage</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    s138Result.currentStatus === 'Time Barred'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : s138Result.currentStatus === 'Filing Window'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {s138Result.currentStatus}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {s138Result.daysLeftInCurrentStage >= 0
                  ? `${s138Result.daysLeftInCurrentStage} Days Remaining in Current Stage`
                  : `${Math.abs(s138Result.daysLeftInCurrentStage)} Days Past Final Deadline`}
              </div>
            </div>
          </div>

          {/* Interactive Multi-Stage Timeline Output */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
            <div>
              <h2 className="font-serif-legal text-lg font-bold text-slate-900">
                Statutory Multi-Stage Countdown Schedule
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Strict adherence is mandatory under Section 138 read with Section 142(1)(b) NI Act.
              </p>
            </div>

            {/* Visual Timeline Steps */}
            <div className="space-y-3.5">
              {/* Step 1: Dishonour */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 shrink-0">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Stage 0: Cheque Dishonoured</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Bank Return Memo received with remark (e.g. Funds Insufficient).
                    </div>
                  </div>
                </div>
                <span className="font-mono-legal text-xs font-bold text-slate-900 shrink-0">
                  {formatDateIndian(s138Result.dishonourDate)}
                </span>
              </div>

              {/* Step 2: Notice Deadline */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Stage 1: Statutory Demand Notice Deadline (30 Days)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Legal notice under Section 138(b) must be posted via Registered Post / Speed Post before this date.
                    </div>
                  </div>
                </div>
                <span className="font-mono-legal text-xs font-bold text-slate-900 shrink-0">
                  {formatDateIndian(s138Result.noticeDispatchDeadline)}
                </span>
              </div>

              {/* Step 3: Cure Period */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Stage 2: Statutory 15-Day Cure Period Expires
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Drawer has 15 clear days to pay. No criminal complaint can be filed before this date.
                    </div>
                  </div>
                </div>
                <span className="font-mono-legal text-xs font-bold text-slate-900 shrink-0">
                  {formatDateIndian(s138Result.curePeriodEnd)}
                </span>
              </div>

              {/* Step 4: Final Complaint Filing Deadline */}
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-900 flex items-start justify-between gap-3 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white text-slate-900 shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Stage 3: Criminal Complaint Filing Deadline (30 Days)
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Complaint under Section 142(1)(b) must be instituted before the competent Metropolitan Magistrate / Judicial Magistrate.
                    </div>
                  </div>
                </div>
                <span className="font-mono-legal text-sm font-bold text-white shrink-0">
                  {formatDateIndian(s138Result.complaintFilingDeadline)}
                </span>
              </div>
            </div>

            {/* Strategic Practice Guidance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Scale size={14} className="text-black" />
                Judicial Precedent & Condonation Note:
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Under Section 142(1)(b) Proviso of the NI Act, the Magistrate is empowered to condone delay beyond 30 days if the complainant satisfies the Court with sufficient cause. However, delay in issuing the statutory 30-day notice under Section 138(b) cannot be condoned under any circumstance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* GENERAL LIMITATION ACT 1963 PRESETS */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Preset Selector */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm">
            <div>
              <h2 className="font-serif-legal text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="text-black" size={18} />
                Statute & Cause of Action
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select statutory action to calculate exact period of limitation
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                Select Cause of Action Type
              </label>
              <select
                value={selectedRuleId}
                onChange={(e) => setSelectedRuleId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
              >
                {LIMITATION_RULES.map((rule) => (
                  <option key={rule.id} value={rule.id}>
                    {rule.title} ({rule.article})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider mb-1.5">
                Cause of Action Accrual Date *
              </label>
              <input
                type="date"
                value={causeOfActionDate}
                onChange={(e) => setCauseOfActionDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-mono-legal focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Trigger: {selectedRule.triggerEvent}
              </span>
            </div>

            {/* Statute Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-600 font-mono-legal">
                <span>Article / Section:</span>
                <span className="text-slate-900 font-bold">{selectedRule.article}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-mono-legal">
                <span>Governing Enactment:</span>
                <span className="text-slate-900 font-medium">{selectedRule.statute}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 font-mono-legal">
                <span>Section 5 Condonation:</span>
                <span
                  className={`font-bold ${
                    selectedRule.condonationApplicable ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {selectedRule.condonationApplicable ? 'Permissible' : 'Strictly Barred for Suits'}
                </span>
              </div>
            </div>
          </div>

          {/* Limitation Expiry Result & Strategic Counsel */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-serif-legal text-xl font-bold text-slate-900">
                  {selectedRule.title}
                </h2>
                <span className="text-xs text-slate-500 font-mono-legal">
                  Statutory Duration: {selectedRule.periodYears ? `${selectedRule.periodYears} Years` : selectedRule.periodDays ? `${selectedRule.periodDays} Days` : `${selectedRule.periodMonths} Months`}
                </span>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  generalResult.isExpired
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {generalResult.isExpired ? 'Time-Barred' : 'Within Limitation'}
              </span>
            </div>

            {/* Key Computed Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono-legal text-slate-500 block">
                  Date of Cause of Action
                </span>
                <span className="font-mono-legal text-sm font-bold text-slate-900">
                  {formatDateIndian(generalResult.startDate)}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-900 space-y-1 shadow-sm">
                <span className="text-[10px] uppercase font-mono-legal text-slate-400 block">
                  Statutory Expiry Deadline
                </span>
                <span className="font-mono-legal text-base font-bold text-white">
                  {formatDateIndian(generalResult.expiryDate)}
                </span>
              </div>
            </div>

            {/* Status Summary Banner */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                generalResult.isExpired
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              {generalResult.isExpired ? (
                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
              ) : (
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
              )}
              <div className="text-xs leading-relaxed">
                <div className="font-bold mb-0.5">
                  {generalResult.isExpired
                    ? `Limitation expired ${Math.abs(generalResult.daysLeft)} days ago!`
                    : `${generalResult.daysLeft} days remaining before limitation closes.`}
                </div>
                <p className="text-slate-600 text-[11px]">{selectedRule.condonationNote}</p>
              </div>
            </div>

            {/* Statutory Guidance */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles size={14} className="text-black" /> Practitioner's Tactical Strategy:
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px] whitespace-pre-line">
                {selectedRule.statutoryAdvice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
