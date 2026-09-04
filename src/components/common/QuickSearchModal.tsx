import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, Clock, FileText, ShieldAlert } from 'lucide-react';
import { SANHITA_MAPPINGS } from '../../data/sanhitaMapping';
import { LIMITATION_RULES } from '../../data/limitationRules';
import { NavTabId } from './Header';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTabId, query?: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Sanhita Mappings
  const matchedSanhitas = SANHITA_MAPPINGS.filter(
    (item) =>
      item.oldSection.toLowerCase().includes(q) ||
      item.newSection.toLowerCase().includes(q) ||
      item.oldTitle.toLowerCase().includes(q) ||
      item.newTitle.toLowerCase().includes(q)
  ).slice(0, 4);

  // Search Limitation Rules
  const matchedLimitations = LIMITATION_RULES.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.article.toLowerCase().includes(q) ||
      item.statute.toLowerCase().includes(q)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-xs fade-in">
      <div className="relative w-full max-w-2xl bg-white shadow-2xl border border-slate-200 rounded-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search size={20} className="text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search BNS section, IPC 420, limitation period, bail, DPDP..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 mr-2"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500 font-mono font-semibold shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Category Jumpers when empty */}
          {!q && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Navigation Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { onNavigate('sanhita'); onClose(); }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen size={16} className="text-slate-900" />
                    <div>
                      <div className="font-bold text-slate-900">SanhitaX Explorer</div>
                      <div className="text-[11px] text-slate-500">IPC to BNS cross-sections</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-black transition" />
                </button>

                <button
                  onClick={() => { onNavigate('calculator'); onClose(); }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-slate-900" />
                    <div>
                      <div className="font-bold text-slate-900">NyayaKram Calculator</div>
                      <div className="text-[11px] text-slate-500">S.138 & Limitation deadlines</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-black transition" />
                </button>

                <button
                  onClick={() => { onNavigate('drafting'); onClose(); }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-slate-900" />
                    <div>
                      <div className="font-bold text-slate-900">Vakalat Studio</div>
                      <div className="text-[11px] text-slate-500">Notice & Court drafting</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-black transition" />
                </button>

                <button
                  onClick={() => { onNavigate('compliance'); onClose(); }}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert size={16} className="text-slate-900" />
                    <div>
                      <div className="font-bold text-slate-900">NyayaDrishti Auditor</div>
                      <div className="text-[11px] text-slate-500">DPDP & S.27 Contract check</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-black transition" />
                </button>
              </div>
            </div>
          )}

          {/* Sanhita Mappings Match */}
          {matchedSanhitas.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-2 flex items-center gap-1.5">
                <BookOpen size={13} /> Criminal Laws (BNS / BNSS / BSA)
              </div>
              <div className="space-y-1.5">
                {matchedSanhitas.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onNavigate('sanhita', m.newSection);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer flex items-center justify-between transition group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-legal text-xs font-bold text-slate-600">
                          {m.oldLaw} {m.oldSection}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span className="font-mono-legal text-xs font-bold text-slate-900">
                          {m.newLaw} {m.newSection}
                        </span>
                      </div>
                      <div className="text-xs text-slate-800 font-semibold mt-0.5">{m.newTitle}</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-black transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Limitation Rules Match */}
          {matchedLimitations.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-2 flex items-center gap-1.5">
                <Clock size={13} /> Statutory Limitation & Deadlines
              </div>
              <div className="space-y-1.5">
                {matchedLimitations.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      onNavigate('calculator', l.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer flex items-center justify-between transition group shadow-xs"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{l.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono-legal mt-0.5">
                        {l.article} • {l.statute}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-black transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && matchedSanhitas.length === 0 && matchedLimitations.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No direct matches for "{query}". Try searching "420", "bail", "theft", "138", or "cheque".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
