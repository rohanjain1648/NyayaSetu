import React, { useState } from 'react';
import {
  NoticeData,
  DEFAULT_SAMPLE_NOTICE_DATA,
  generateS138Notice,
  generateS80CpcNotice,
  generateConsumerComplaint,
  generateBnssBailPetition,
  generateBsaSection63Cert
} from '../../data/documentTemplates';
import {
  Printer,
  Copy,
  Download,
  Check,
  Building,
  User,
  ShieldAlert,
  Eye,
  SlidersHorizontal,
  FileCheck2
} from 'lucide-react';
import { exportCourtDraftToPrint, downloadTextFile } from '../../utils/documentExport';
import confetti from 'canvas-confetti';

type DocumentType = 's138' | 'consumer' | 's80cpc' | 'bail' | 'bsa63';

export const NoticeStudio: React.FC = () => {
  const [docType, setDocType] = useState<DocumentType>('s138');
  const [formData, setFormData] = useState<NoticeData>(DEFAULT_SAMPLE_NOTICE_DATA);
  const [paperTheme, setPaperTheme] = useState<'green' | 'ivory' | 'white'>('green');
  const [viewMode, setViewMode] = useState<'split' | 'preview'>('split');
  const [copied, setCopied] = useState(false);

  // Generate Current Draft
  const getDraftText = (): string => {
    switch (docType) {
      case 's138':
        return generateS138Notice(formData);
      case 'consumer':
        return generateConsumerComplaint(formData);
      case 's80cpc':
        return generateS80CpcNotice(formData);
      case 'bail':
        return generateBnssBailPetition(formData);
      case 'bsa63':
        return generateBsaSection63Cert(formData);
      default:
        return '';
    }
  };

  const getDocTitle = (): string => {
    switch (docType) {
      case 's138':
        return 'Statutory Legal Notice under Section 138 NI Act';
      case 'consumer':
        return 'Consumer Complaint under Section 35 CPA 2019 (e-Daakhil)';
      case 's80cpc':
        return 'Notice under Section 80 Code of Civil Procedure, 1908';
      case 'bail':
        return 'Bail Application under Section 483 BNSS 2023';
      case 'bsa63':
        return 'Section 63 BSA Electronic Record Admissibility Certificate';
    }
  };

  const draftContent = getDraftText();

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setCopied(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    exportCourtDraftToPrint(getDocTitle(), draftContent, paperTheme);
  };

  const handleDownload = () => {
    const filename = `${docType}_draft_${new Date().toISOString().split('T')[0]}.txt`;
    downloadTextFile(filename, draftContent);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Hero Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                <FileCheck2 size={13} /> Court-Ready Drafting
              </span>
              <span className="text-xs text-slate-500 font-mono-legal">Gazette Formats & Green Paper</span>
            </div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Vakalat Studio: Court Pleadings & Notice Generator
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
              Draft formal statutory notices and court pleadings in seconds. Formatted to authentic Indian Court specifications with 1.5" left stitching margin, docket stamps, and green legal ledger paper.
            </p>
          </div>

          {/* Document Type Selector */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shrink-0 max-w-md">
            {[
              { id: 's138', label: 'S.138 Cheque Notice' },
              { id: 'consumer', label: 'e-Daakhil Complaint' },
              { id: 's80cpc', label: 'S.80 CPC Notice' },
              { id: 'bail', label: 'BNSS Bail Petition' },
              { id: 'bsa63', label: 'S.63 BSA Certificate' }
            ].map((t) => {
              const isSelected = docType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setDocType(t.id as DocumentType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-black text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Workspace: Split or Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Field Inputs (Visible in split mode) */}
        {viewMode === 'split' && (
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5 max-h-[750px] overflow-y-auto shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-serif-legal text-base font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-black" />
                Case & Notice Parameters
              </h2>
              <button
                type="button"
                onClick={() => setFormData(DEFAULT_SAMPLE_NOTICE_DATA)}
                className="text-xs font-semibold text-slate-500 hover:text-black hover:underline"
              >
                Reset to Sample
              </button>
            </div>

            {/* Advocate Details */}
            <div className="space-y-3 pt-1">
              <div className="text-[11px] uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <User size={13} /> Advocate / Counsel Details
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Advocate Name</label>
                  <input
                    type="text"
                    value={formData.advocateName}
                    onChange={(e) => setFormData({ ...formData, advocateName: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Bar Enrolment No.</label>
                  <input
                    type="text"
                    value={formData.advocateBarReg}
                    onChange={(e) => setFormData({ ...formData, advocateBarReg: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Chamber Address</label>
                <input
                  type="text"
                  value={formData.advocateAddress}
                  onChange={(e) => setFormData({ ...formData, advocateAddress: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Client / Sender Details */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-[11px] uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <Building size={13} /> Complainant / Client Details
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Client / Complainant Name</label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Client Address</label>
                <input
                  type="text"
                  value={formData.senderAddress}
                  onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Opponent / Noticee Details */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-[11px] uppercase font-bold text-slate-900 tracking-wider flex items-center gap-1.5">
                <ShieldAlert size={13} /> Opposite Party / Noticee Details
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Noticee / Respondent Name</label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Noticee Address</label>
                <input
                  type="text"
                  value={formData.recipientAddress}
                  onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Specific Fields for S.138 */}
            {docType === 's138' && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="text-[11px] uppercase font-bold text-slate-900 tracking-wider">
                  Negotiable Instrument Particulars
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Cheque Number</label>
                    <input
                      type="text"
                      value={formData.chequeNumber}
                      onChange={(e) => setFormData({ ...formData, chequeNumber: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Cheque Amount (INR)</label>
                    <input
                      type="text"
                      value={formData.chequeAmount}
                      onChange={(e) => setFormData({ ...formData, chequeAmount: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Drawn On Bank</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Dishonour Date</label>
                    <input
                      type="date"
                      value={formData.dishonourDate}
                      onChange={(e) => setFormData({ ...formData, dishonourDate: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Specific Fields for Bail Petition */}
            {docType === 'bail' && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="text-[11px] uppercase font-bold text-slate-900 tracking-wider">
                  Criminal Case & FIR Particulars
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-semibold">FIR Number & Year</label>
                  <input
                    type="text"
                    value={formData.firNumber}
                    onChange={(e) => setFormData({ ...formData, firNumber: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Police Station</label>
                  <input
                    type="text"
                    value={formData.policeStation}
                    onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Sections Charged (BNS)</label>
                  <input
                    type="text"
                    value={formData.sectionsCharged}
                    onChange={(e) => setFormData({ ...formData, sectionsCharged: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs font-mono-legal focus:ring-2 focus:ring-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right Output: Court Docket Preview */}
        <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Paper Mode:</span>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPaperTheme('green')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    paperTheme === 'green'
                      ? 'bg-emerald-700 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Court Green
                </button>
                <button
                  type="button"
                  onClick={() => setPaperTheme('ivory')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    paperTheme === 'ivory'
                      ? 'bg-stone-800 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ivory Bond
                </button>
              </div>

              {/* Toggle Split/Preview */}
              <button
                onClick={() => setViewMode(viewMode === 'split' ? 'preview' : 'split')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
              >
                <Eye size={14} />
                <span>{viewMode === 'split' ? 'Full Preview' : 'Split Editor'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
              >
                <Download size={14} />
                <span>Download</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition"
              >
                <Printer size={14} />
                <span>Print Court Docket</span>
              </button>
            </div>
          </div>

          {/* Authentic Court Paper Render */}
          <div
            className={`p-8 sm:p-12 rounded-2xl transition-all overflow-y-auto max-h-[680px] ${
              paperTheme === 'green'
                ? 'court-paper-green'
                : paperTheme === 'ivory'
                ? 'court-paper-ivory'
                : 'bg-white text-slate-900 border border-slate-300 shadow-lg'
            }`}
          >
            {/* Docket Seal */}
            <div className="float-right border-2 border-dashed border-red-700 text-red-700 p-2.5 text-center text-[10px] font-sans -rotate-3 rounded uppercase font-bold tracking-wider mb-4 bg-white/60">
              <span>NyayaSetu AI • Verified</span>
              <div className="text-[8px] font-normal">Original Court Copy</div>
            </div>
            <div className="clear-both"></div>

            {/* Document Title Header */}
            <div className="text-center font-bold text-sm sm:text-base uppercase tracking-wider pb-3 border-b-2 border-slate-900/30 mb-6 font-serif">
              {getDocTitle()}
            </div>

            {/* Draft Body Text */}
            <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-serif text-justify text-slate-900">
              {draftContent}
            </div>

            {/* Bottom Verification Footer */}
            <div className="mt-12 pt-4 border-t border-slate-900/20 text-[10px] text-slate-600 flex justify-between font-sans">
              <span>Prepared via NyayaSetu AI Pleading Engine</span>
              <span>Court Margins: 1.5" Left Stitching Offset</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
