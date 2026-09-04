import React, { useState } from 'react';
import { auditContractText } from '../../data/complianceRules';
import { ComplianceAuditReport } from '../../types/legal';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Check,
  Copy,
  Info,
  ShieldAlert as ShieldIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_CONTRACTS = [
  {
    title: 'Employment Agreement (Post-Termination 2-Year Non-Compete)',
    text: `14. RESTRICTIVE COVENANTS & NON-COMPETE
The Employee agrees and covenants that for a period of 24 (twenty-four) months following the termination, cessation, or separation of their employment from the Company for any reason whatsoever, the Employee shall not work, provide services, be employed, or join any competitor or directly or indirectly engage in any business competing with the Company within the territory of India. Any breach shall entitle the Company to immediate injunctive relief and liquidated damages of Rs. 10,00,000.`
  },
  {
    title: 'Commercial Supply Agreement (Unilateral Sole Arbitrator Clause)',
    text: `21. DISPUTE RESOLUTION & ARBITRATION
In the event of any claim, difference, or dispute arising out of or in connection with this Agreement, the same shall be referred to arbitration. The Managing Director of the Company shall nominate and appoint the Sole Arbitrator. The venue of arbitration shall be New Delhi. The agreement was executed on plain paper without stamp duty.`
  },
  {
    title: 'Digital Platform Privacy Policy (Deficient DPDP 2023 Consent Notice)',
    text: `4. DATA COLLECTION & CONSENT
By downloading or using our mobile application, the user grants blanket consent for all future purposes to collect and monetize personal data without notice. The platform tracks minors and conducts behavioral monitoring of children under 18 years for targeted advertising. Users may opt-out only by terminating their accounts in writing.`
  }
];

export const ContractAuditor: React.FC = () => {
  const [contractText, setContractText] = useState(SAMPLE_CONTRACTS[0].text);
  const [report, setReport] = useState<ComplianceAuditReport | null>(
    auditContractText(SAMPLE_CONTRACTS[0].text)
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAudit = () => {
    const res = auditContractText(contractText);
    setReport(res);
    if (res.score > 70) {
      confetti({ particleCount: 40, spread: 50 });
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setContractText(sampleText);
    const res = auditContractText(sampleText);
    setReport(res);
  };

  const handleCopyRemedy = (remedy: string, id: string) => {
    navigator.clipboard.writeText(remedy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Hero Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 font-mono-legal">
                <ShieldIcon size={13} /> Statutory Risk Intelligence
              </span>
              <span className="text-xs text-slate-500">DPDP Act 2023 & Contract Act S.27</span>
            </div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              NyayaDrishti: Contract & DPDP 2023 Auditor
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
              Audit contracts, terms of service, and privacy policies against Indian Law. Flags void non-competes under Section 27, unilateral arbitrator traps under *Perkins Eastman*, and severe DPDP Act non-compliance penalties up to ₹250 Crores.
            </p>
          </div>

          <button
            onClick={handleAudit}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-slate-800 text-white font-semibold text-xs transition shadow-sm shrink-0"
          >
            <Sparkles size={16} />
            <span>Audit Contract Text</span>
          </button>
        </div>
      </div>

      {/* Preset Sample Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-bold flex items-center gap-1 uppercase tracking-wider text-[11px]">
          <Info size={13} className="text-black" /> Load Preset Sample:
        </span>
        {SAMPLE_CONTRACTS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleLoadSample(s.text)}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition shadow-xs"
          >
            {s.title.split('(')[0]}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Editor */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-serif-legal text-base font-bold text-slate-900">
              Contract Text / Clause Input
            </h2>
            <span className="text-xs font-mono-legal text-slate-400">
              {contractText.length} Characters
            </span>
          </div>

          <textarea
            rows={14}
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Paste contract clause or policy text here to scan for legal risks..."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono-legal leading-relaxed focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
          />

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setContractText('')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700"
            >
              Clear Editor
            </button>
            <button
              onClick={handleAudit}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition"
            >
              Run Deep Compliance Scan
            </button>
          </div>
        </div>

        {/* Right Column: Scorecard & Findings */}
        <div className="lg:col-span-6 space-y-4">
          {report && (
            <>
              {/* Scorecard Header */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  {/* Circular Score Display */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono-legal border shadow-xs ${
                      report.score >= 80
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : report.score >= 50
                        ? 'border-amber-200 bg-amber-50 text-amber-800'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    <span className="text-2xl font-black leading-none">{report.score}</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">/ 100</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Contract Health Assessment
                    </span>
                    <h3 className="font-serif-legal text-lg font-bold text-slate-900 mt-0.5">
                      Status: {report.status}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 max-w-sm">
                      {report.summary}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[10px] text-slate-400 font-mono-legal block uppercase font-bold">
                    Total Findings
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 font-mono-legal">
                    {report.findings.length}
                  </span>
                </div>
              </div>

              {/* Findings List */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {report.findings.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-xl border space-y-3 transition bg-white ${
                      item.severity === 'critical'
                        ? 'border-red-200 shadow-xs'
                        : item.severity === 'warning'
                        ? 'border-amber-200 shadow-xs'
                        : 'border-emerald-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {item.severity === 'critical' ? (
                          <ShieldAlert size={16} className="text-red-600" />
                        ) : item.severity === 'warning' ? (
                          <AlertTriangle size={16} className="text-amber-600" />
                        ) : (
                          <ShieldCheck size={16} className="text-emerald-600" />
                        )}
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          {item.category}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                          item.severity === 'critical'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : item.severity === 'warning'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {item.severity.toUpperCase()}
                      </span>
                    </div>

                    {/* Matched Snippet */}
                    <div className="p-3 rounded-lg bg-slate-50 font-mono-legal text-[11px] text-slate-800 border border-slate-200">
                      "{item.clauseSnippet}"
                    </div>

                    {/* Statutory Risk Description */}
                    <div className="text-xs leading-relaxed text-slate-700">
                      <strong className="text-slate-900 font-bold block mb-0.5">
                        Statutory Risk ({item.statutoryReference}):
                      </strong>
                      {item.riskDescription}
                    </div>

                    {/* Recommended Remedy */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">
                          ✓ Recommended Remedial Redraft:
                        </span>
                        <button
                          onClick={() => handleCopyRemedy(item.remedyRecommendation, item.id)}
                          className="text-[11px] text-slate-500 hover:text-black flex items-center gap-1 font-mono-legal font-semibold"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check size={12} className="text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Fix</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        {item.remedyRecommendation}
                      </p>
                    </div>

                    {/* Precedent Citation */}
                    {item.casePrecedent && (
                      <div className="text-[11px] text-slate-500 font-mono-legal">
                        Leading Authority: <span className="font-bold text-slate-800">{item.casePrecedent}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
