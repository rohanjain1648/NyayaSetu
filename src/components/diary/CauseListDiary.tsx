import React, { useState } from 'react';
import { CauseListItem } from '../../types/legal';
import {
  Calendar,
  Building,
  Plus,
  Copy,
  Check,
  Filter,
  CalendarCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_CAUSE_LIST: CauseListItem[] = [
  {
    id: 'case-1',
    caseNumber: 'BAIL APPLN. 1420/2026',
    courtName: 'High Court of Delhi (Court Room No. 24)',
    judgeName: 'Hon’ble Mr. Justice Sanjeev Khanna',
    itemNumber: 14,
    parties: 'Rohan Verma v. State (NCT of Delhi)',
    stage: 'Bail Hearing',
    hearingDate: new Date().toISOString().split('T')[0],
    notes: 'Urgent regular bail under Section 483 BNSS. Emphasize S.479 first-time undertrial parity and absence of custodial need.',
    status: 'Upcoming',
    nextDate: ''
  },
  {
    id: 'case-2',
    caseNumber: 'CC NI ACT 8904/2026',
    courtName: 'Patiala House Courts (Court No. 12, MM NI Act)',
    judgeName: 'Sh. Amit Kumar, Ld. Metropolitan Magistrate',
    itemNumber: 3,
    parties: 'Apex Global Tech Pvt Ltd v. Singhania Logistics LLP',
    stage: 'Arguments',
    hearingDate: new Date().toISOString().split('T')[0],
    notes: 'Final arguments on Section 138 statutory presumption under Section 139 NI Act. Cheque dishonoured for ₹14.5 Lakhs.',
    status: 'Upcoming',
    nextDate: ''
  },
  {
    id: 'case-3',
    caseNumber: 'CS (COMM) 421/2025',
    courtName: 'High Court of Judicature at Bombay (Original Side)',
    judgeName: 'Hon’ble Justice R.D. Dhanuka',
    itemNumber: 27,
    parties: 'Mahindra Retail v. Nexus Logistics',
    stage: 'Framing of Charges',
    hearingDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Draft issues submitted. S.12A Commercial Pre-institution mediation compliance verified.',
    status: 'Upcoming',
    nextDate: ''
  },
  {
    id: 'case-4',
    caseNumber: 'CONSUMER CASE 102/2026',
    courtName: 'District Consumer Disputes Redressal Commission, South Delhi',
    judgeName: 'President, District Commission',
    itemNumber: 8,
    parties: 'Dr. Anita Roy v. Star Care Health Insurance Co.',
    stage: 'Orders',
    hearingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Reserved for final order on repudiation of genuine medical reimbursement claim under Consumer Protection Act 2019.',
    status: 'Upcoming',
    nextDate: ''
  }
];

export const CauseListDiary: React.FC = () => {
  const [cases, setCases] = useState<CauseListItem[]>(INITIAL_CAUSE_LIST);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'disposed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // New Case State
  const [newCase, setNewCase] = useState<Partial<CauseListItem>>({
    caseNumber: '',
    courtName: 'High Court of Delhi',
    judgeName: '',
    itemNumber: 1,
    parties: '',
    stage: 'Arguments',
    hearingDate: new Date().toISOString().split('T')[0],
    notes: '',
    status: 'Upcoming'
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredCases = cases.filter((c) => {
    if (filter === 'today') return c.hearingDate === todayStr;
    if (filter === 'upcoming') return c.status === 'Upcoming';
    if (filter === 'disposed') return c.status === 'Disposed';
    return true;
  });

  const handleStatusChange = (id: string, newStatus: CauseListItem['status']) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleAddCase = () => {
    if (!newCase.caseNumber || !newCase.parties) return;
    const created: CauseListItem = {
      id: `case-${Date.now()}`,
      caseNumber: newCase.caseNumber || 'CASE/2026',
      courtName: newCase.courtName || 'District Court',
      judgeName: newCase.judgeName || 'Hon’ble Judge',
      itemNumber: Number(newCase.itemNumber) || 1,
      parties: newCase.parties || 'Petitioner v. Respondent',
      stage: (newCase.stage as any) || 'Arguments',
      hearingDate: newCase.hearingDate || todayStr,
      notes: newCase.notes || '',
      status: 'Upcoming'
    };
    setCases([created, ...cases]);
    setShowAddModal(false);
    confetti({ particleCount: 30, spread: 45 });
  };

  const handleCopyCauseList = () => {
    const text = cases
      .map(
        (c) =>
          `[Item #${c.itemNumber}] ${c.caseNumber} | ${c.courtName}\nParties: ${c.parties}\nStage: ${c.stage} | Date: ${c.hearingDate}\nNotes: ${c.notes}\n---`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Hero Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 font-mono-legal">
                <CalendarCheck2 size={13} /> Advocate Chamber Management
              </span>
              <span className="text-xs text-slate-500">Daily Roster & Hearing Strategy</span>
            </div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Daily Cause List & Hearing Diary
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
              Track court board item numbers, proceeding stages, tactical hearing notes, and next dates across High Courts, District Courts, and Consumer Commissions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyCauseList}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition flex items-center gap-2"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Diary' : 'Copy Daily Roster'}</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-black hover:bg-slate-800 text-white font-semibold text-xs transition shadow-sm"
            >
              <Plus size={15} />
              <span>Add Hearing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 mr-1">
          <Filter size={13} className="text-black" /> Filter Roster:
        </span>
        {[
          { id: 'all', label: `All Matters (${cases.length})` },
          { id: 'today', label: `Today's Board (${cases.filter((c) => c.hearingDate === todayStr).length})` },
          { id: 'upcoming', label: 'Pending Upcoming' },
          { id: 'disposed', label: 'Disposed' }
        ].map((btn) => {
          const isActive = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-black text-white border-black shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Cause List Table / Cards */}
      <div className="space-y-3">
        {filteredCases.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs hover:border-slate-300 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-900 font-mono-legal font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                  #{item.itemNumber}
                </span>
                <div>
                  <span className="font-mono-legal text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {item.caseNumber}
                  </span>
                  <div className="text-base font-bold text-slate-900 font-serif-legal">
                    {item.parties}
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 font-mono-legal px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">{item.stage}</span>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold border focus:outline-none transition ${
                    item.status === 'Upcoming'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : item.status === 'Disposed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Passed Over">Passed Over</option>
                  <option value="Adjourned">Adjourned</option>
                  <option value="Disposed">Disposed</option>
                </select>
              </div>
            </div>

            {/* Middle Row: Court & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Building size={14} className="text-slate-400" />
                <span>{item.courtName} • {item.judgeName}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 font-mono-legal text-slate-700 font-semibold">
                <Calendar size={14} className="text-black" />
                <span>Hearing Date: {item.hearingDate}</span>
              </div>
            </div>

            {/* Tactical Notes */}
            {item.notes && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold">Chamber Strategy: </strong>
                {item.notes}
              </div>
            )}
          </div>
        ))}

        {filteredCases.length === 0 && (
          <div className="p-12 bg-white border border-slate-200 rounded-2xl text-center text-xs text-slate-500 shadow-sm">
            No hearing matters found for selected filter.
          </div>
        )}
      </div>

      {/* Add Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4">
            <h3 className="font-serif-legal text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Docket New Court Hearing
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Case Number / Appeal Number *</label>
                <input
                  type="text"
                  placeholder="e.g. CRL.M.C. 1892/2026"
                  value={newCase.caseNumber}
                  onChange={(e) => setNewCase({ ...newCase, caseNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Parties (Petitioner v. Respondent) *</label>
                <input
                  type="text"
                  placeholder="e.g. ABC Pvt Ltd v. State & Anr"
                  value={newCase.parties}
                  onChange={(e) => setNewCase({ ...newCase, parties: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Court Name & Room</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi High Court, Court 18"
                    value={newCase.courtName}
                    onChange={(e) => setNewCase({ ...newCase, courtName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Cause List Item #</label>
                  <input
                    type="number"
                    value={newCase.itemNumber}
                    onChange={(e) => setNewCase({ ...newCase, itemNumber: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Hearing Date</label>
                  <input
                    type="date"
                    value={newCase.hearingDate}
                    onChange={(e) => setNewCase({ ...newCase, hearingDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Proceeding Stage</label>
                  <select
                    value={newCase.stage}
                    onChange={(e) => setNewCase({ ...newCase, stage: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white"
                  >
                    <option value="Framing of Charges">Framing of Charges</option>
                    <option value="Arguments">Arguments</option>
                    <option value="Cross Examination">Cross Examination</option>
                    <option value="Orders">Orders</option>
                    <option value="Bail Hearing">Bail Hearing</option>
                    <option value="Admission">Admission</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Hearing Strategy / File Notes</label>
                <textarea
                  rows={3}
                  placeholder="Key case precedents to cite, documents to be tendered..."
                  value={newCase.notes}
                  onChange={(e) => setNewCase({ ...newCase, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCase}
                className="px-5 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold shadow-sm"
              >
                Save to Diary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
