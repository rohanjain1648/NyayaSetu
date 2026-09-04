import React, { useState } from 'react';
import { SANHITA_MAPPINGS } from '../../data/sanhitaMapping';
import { SanhitaMapping, LawCategory } from '../../types/legal';
import {
  Search,
  ArrowRightLeft,
  FileText,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SanhitaExplorerProps {
  initialSearch?: string;
  onOpenDraftingWithSection?: (section: string) => void;
}

export const SanhitaExplorer: React.FC<SanhitaExplorerProps> = ({
  initialSearch = '',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'explorer' | 'fir_converter'>('explorer');
  const [categoryFilter, setCategoryFilter] = useState<LawCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedMapping, setSelectedMapping] = useState<SanhitaMapping | null>(SANHITA_MAPPINGS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // FIR Converter State
  const [firText, setFirText] = useState(
    `Complainant states that the accused entered into a commercial agreement, induced payment of Rs. 25,00,000, and subsequently forged delivery challans and misappropriated the consignment. An FIR was registered under Sections 420, 406, 468 read with Section 120B of the Indian Penal Code (IPC) and investigation initiated under Section 154 CrPC.`
  );
  const [convertedSections, setConvertedSections] = useState<SanhitaMapping[]>([]);
  const [hasConverted, setHasConverted] = useState(false);

  // Filtered Sanhita Mappings
  const filteredMappings = SANHITA_MAPPINGS.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.oldSection.toLowerCase().includes(q) ||
      item.newSection.toLowerCase().includes(q) ||
      item.oldTitle.toLowerCase().includes(q) ||
      item.newTitle.toLowerCase().includes(q) ||
      item.oldLaw.toLowerCase().includes(q) ||
      item.newLaw.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleConvertFir = () => {
    const found: SanhitaMapping[] = [];
    for (const mapping of SANHITA_MAPPINGS) {
      const oldSecNum = mapping.oldSection.replace(/\D/g, '');
      const regex = new RegExp(`\\b(${mapping.oldLaw}\\s*)?${oldSecNum}\\b|${mapping.oldSection}`, 'i');
      if (regex.test(firText) && !found.some(f => f.id === mapping.id)) {
        found.push(mapping);
      }
    }
    setConvertedSections(found);
    setHasConverted(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Module Hero Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                <Layers size={13} /> The New Penal Framework
              </span>
              <span className="text-xs text-slate-500 font-mono-legal">Enforced July 1, 2024</span>
            </div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              SanhitaX Migration & Statutory Cross-Matrix
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
              Instant statutory cross-mapping between legacy colonial codes (<strong className="text-slate-900">IPC, CrPC, IEA</strong>) and India's reformed criminal jurisprudence (<strong className="text-black">BNS, BNSS, BSA</strong>).
            </p>
          </div>

          {/* Sub Tab Switcher */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveSubTab('explorer')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'explorer'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Explorer
            </button>
            <button
              onClick={() => setActiveSubTab('fir_converter')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'fir_converter'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FIR / Charge-Sheet Migrator
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Search, Filter & List */}
          <div className="lg:col-span-5 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search section (e.g. 420, 302, 167) or keyword..."
                className="w-full pl-10 pr-16 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 text-xs font-medium overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Sanhitas' },
                { id: 'penal', label: 'IPC ↔ BNS' },
                { id: 'procedure', label: 'CrPC ↔ BNSS' },
                { id: 'evidence', label: 'IEA ↔ BSA' }
              ].map((pill) => {
                const isActive = categoryFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setCategoryFilter(pill.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* List of Sections */}
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredMappings.map((mapping) => {
                const isSelected = selectedMapping?.id === mapping.id;
                return (
                  <div
                    key={mapping.id}
                    onClick={() => setSelectedMapping(mapping)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono-legal text-xs font-bold ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                          {mapping.oldLaw} {mapping.oldSection}
                        </span>
                        <ArrowRightLeft size={12} className={isSelected ? 'text-white' : 'text-slate-400'} />
                        <span className={`font-mono-legal text-xs font-bold ${isSelected ? 'text-white' : 'text-black'}`}>
                          {mapping.newLaw} {mapping.newSection}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          mapping.bailable === 'Bailable'
                            ? isSelected 
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isSelected
                              ? 'bg-red-950 text-red-300 border-red-800'
                              : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {mapping.bailable}
                      </span>
                    </div>

                    <div className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {mapping.newTitle}
                    </div>

                    <div className={`flex items-center gap-3 mt-2 text-[11px] ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>Type: <strong className={isSelected ? 'text-slate-200' : 'text-slate-700'}>{mapping.offenseType}</strong></span>
                      <span>•</span>
                      <span>Compounding: <strong className={isSelected ? 'text-slate-200' : 'text-slate-700'}>{mapping.compoundable}</strong></span>
                    </div>
                  </div>
                );
              })}

              {filteredMappings.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded-xl">
                  No matching section found for "{searchQuery}". Try searching 420, 302, bail, theft, or remand.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Comparative Analysis & Details */}
          <div className="lg:col-span-7">
            {selectedMapping ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                {/* Header comparison banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold font-mono-legal uppercase tracking-wider">
                        {selectedMapping.category.toUpperCase()} MATRIX
                      </span>
                      <span className="text-xs font-mono-legal text-slate-400">
                        REF: {selectedMapping.id}
                      </span>
                    </div>
                    <h2 className="font-serif-legal text-xl sm:text-2xl font-bold text-slate-900">
                      {selectedMapping.newTitle}
                    </h2>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        `${selectedMapping.oldLaw} ${selectedMapping.oldSection} is now ${selectedMapping.newLaw} ${selectedMapping.newSection} (${selectedMapping.newTitle}). Punishment: ${selectedMapping.punishmentNew}`,
                        selectedMapping.id
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-semibold shadow-sm transition shrink-0"
                  >
                    {copiedId === selectedMapping.id ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="text-slate-600" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Side by side comparison cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Old Statute Card */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-[11px] font-bold font-mono-legal text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Pre-July 2024 Regime</span>
                      <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 text-[10px]">
                        {selectedMapping.oldLaw}
                      </span>
                    </div>
                    <div className="font-mono-legal text-lg font-bold text-slate-900">
                      {selectedMapping.oldSection}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      {selectedMapping.oldTitle}
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-xs">
                      <span className="text-slate-500 font-medium">Punishment:</span>
                      <p className="text-slate-800 font-semibold mt-0.5">{selectedMapping.punishmentOld}</p>
                    </div>
                  </div>

                  {/* New Sanhita Card */}
                  <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-900 space-y-2 shadow-sm">
                    <div className="text-[11px] font-bold font-mono-legal text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Current Sanhita Regime</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold">
                        {selectedMapping.newLaw}
                      </span>
                    </div>
                    <div className="font-mono-legal text-lg font-bold text-white">
                      {selectedMapping.newSection}
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {selectedMapping.newTitle}
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-xs">
                      <span className="text-slate-400 font-medium">Punishment / Sentencing:</span>
                      <p className="text-white font-semibold mt-0.5">{selectedMapping.punishmentNew}</p>
                    </div>
                  </div>
                </div>

                {/* Classification Badges */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Offense Category
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {selectedMapping.offenseType}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Bail Classification
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        selectedMapping.bailable === 'Bailable' ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {selectedMapping.bailable}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Compounding
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {selectedMapping.compoundable}
                    </span>
                  </div>
                </div>

                {/* Substantive Key Changes */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <Sparkles size={14} className="text-slate-700" /> Substantive Legal Modifications
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {selectedMapping.keyChanges.map((change, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-black font-bold shrink-0">•</span>
                        <span className="leading-relaxed">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Advocate Practical Strategy Note */}
                <div className="p-5 rounded-xl bg-slate-100 border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <Award size={14} className="text-slate-700" /> Strategic Drafting Note for Advocates
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {selectedMapping.practicalNote}
                  </p>
                </div>

                {/* Landmark Precedent */}
                {selectedMapping.landmarkPrecedent && (
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-mono-legal block">
                        Leading Supreme Court Citation
                      </span>
                      <span className="font-bold text-slate-900 font-serif-legal text-sm mt-0.5 block">
                        {selectedMapping.landmarkPrecedent}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-sm">
                Select any section on the left to view detailed Sanhita cross-matrix analysis.
              </div>
            )}
          </div>
        </div>
      )}

      {/* FIR / Charge-Sheet Converter View */}
      {activeSubTab === 'fir_converter' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="max-w-3xl">
            <h2 className="font-serif-legal text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="text-black" size={20} />
              FIR & Charge-Sheet Section Migration Parser
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Paste the verbatim text of an existing FIR, chargesheet, or legal notice drafted under old IPC/CrPC provisions. NyayaSetu's parser identifies all cited sections and builds a court-ready migration schedule.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase text-slate-700 tracking-wider">
              Paste FIR / Charge-Sheet Body Text
            </label>
            <textarea
              rows={5}
              value={firText}
              onChange={(e) => setFirText(e.target.value)}
              placeholder="Paste FIR text mentioning sections like IPC 420, 406, 468, 302, 120B..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono-legal leading-relaxed focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
            />
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs text-slate-500 font-mono-legal">
                Characters: {firText.length}
              </span>
              <button
                onClick={handleConvertFir}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-slate-800 text-white font-semibold text-xs transition shadow-sm"
              >
                <Sparkles size={14} /> Run Migration Parser
              </button>
            </div>
          </div>

          {/* Results Table */}
          {hasConverted && (
            <div className="space-y-4 pt-4 border-t border-slate-100 fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Identified {convertedSections.length} Statutory Cross-Mappings
                </h3>
              </div>

              {convertedSections.length > 0 ? (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-[11px] font-mono-legal text-slate-600 border-b border-slate-200 uppercase">
                      <tr>
                        <th className="p-3.5">Old Statute</th>
                        <th className="p-3.5">New Sanhita Section</th>
                        <th className="p-3.5">Offense Description</th>
                        <th className="p-3.5">Bail Classification</th>
                        <th className="p-3.5">Key Substantive Shift</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {convertedSections.map((sec) => (
                        <tr key={sec.id} className="hover:bg-slate-50 transition">
                          <td className="p-3.5 font-mono-legal font-bold text-slate-900">
                            {sec.oldLaw} {sec.oldSection}
                          </td>
                          <td className="p-3.5 font-mono-legal font-bold text-slate-900">
                            {sec.newLaw} {sec.newSection}
                          </td>
                          <td className="p-3.5 font-medium text-slate-800">
                            {sec.newTitle}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                sec.bailable === 'Bailable'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              {sec.bailable}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600 text-[11px]">
                            {sec.keyChanges[0] || 'Direct procedural substitution.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                  No standard old sections (IPC 420, 302, 406, 468, 154, etc.) were found in the text. Ensure section numbers are written clearly.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
