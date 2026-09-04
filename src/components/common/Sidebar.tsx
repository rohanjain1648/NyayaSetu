import React from 'react';
import { Scale, BookOpen, Clock, FileText, ShieldAlert, Calendar, Bot, IndianRupee, Activity, X } from 'lucide-react';
import { NavTabId } from './Header';

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  onGoHome: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, onGoHome, isOpen, onClose }) => {
  const tabs = [
    { id: 'sanhita' as NavTabId, label: 'SanhitaX', sub: 'BNS/BNSS/BSA', icon: BookOpen },
    { id: 'calculator' as NavTabId, label: 'NyayaKram', sub: 'Limitation & Fees', icon: Clock },
    { id: 'drafting' as NavTabId, label: 'Vakalat Studio', sub: 'Court Pleadings', icon: FileText },
    { id: 'compliance' as NavTabId, label: 'NyayaDrishti', sub: 'DPDP & Contracts', icon: ShieldAlert },
    { id: 'copilot' as NavTabId, label: 'Vidhi Mitra', sub: 'Legal AI Copilot', icon: Bot },
    { id: 'diary' as NavTabId, label: 'Cause Diary', sub: 'Hearing Tracker', icon: Calendar },
    { id: 'billing' as NavTabId, label: 'NyayaKosh', sub: 'Billing & Retainers', icon: IndianRupee },
    { id: 'strategy' as NavTabId, label: 'NyayaDhara', sub: 'Strategy Board', icon: Activity }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`w-64 h-screen fixed md:sticky top-0 bg-white border-r border-slate-200 flex flex-col shadow-2xl md:shadow-sm z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Area & Close Button */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-slate-100">
          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-black text-white shadow-md group-hover:scale-105 transition-transform">
              <Scale size={24} strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif-legal font-extrabold text-lg tracking-wider text-slate-900">
                  NYAYASETU
                </span>
                <span className="font-serif-legal font-black text-lg text-slate-500">AI</span>
              </div>
              <p className="text-[9px] text-slate-500 font-mono-legal tracking-widest uppercase mt-0.5">
                India Legal OS
              </p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-900 focus:outline-none">
              <X size={20} />
            </button>
          )}
        </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-slate-400 mb-4 px-2 uppercase tracking-wider">
          Modules
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-left ${
                isActive
                  ? 'bg-black text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
              <div>
                <div className={`text-sm ${isActive ? 'font-bold text-white' : 'font-semibold text-slate-900'}`}>{tab.label}</div>
                <div className={`text-[10px] leading-tight mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{tab.sub}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer / User info placeholder */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
            IL
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">ILTN Member</div>
            <div className="text-[10px] text-slate-500">Vibeathon 2026</div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};
