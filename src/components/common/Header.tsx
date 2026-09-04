import React from 'react';
import { Cpu, Search, Sparkles, Menu } from 'lucide-react';
import { AISettings } from '../../types/legal';

export type NavTabId = 'sanhita' | 'calculator' | 'drafting' | 'compliance' | 'copilot' | 'diary' | 'billing' | 'strategy';

interface HeaderProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  aiSettings: AISettings;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  aiSettings,
  onOpenSettings,
  onOpenSearch,
  onToggleSidebar
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Left Side: Page Title or Context */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            className="md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-md"
            onClick={onToggleSidebar}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg md:text-xl font-bold text-slate-900 capitalize flex items-center gap-2">
            {activeTab === 'sanhita' ? 'SanhitaX' : 
             activeTab === 'calculator' ? 'NyayaKram' : 
             activeTab === 'drafting' ? 'Vakalat Studio' :
             activeTab === 'compliance' ? 'NyayaDrishti' :
             activeTab === 'copilot' ? 'Vidhi Mitra Copilot' : 
             activeTab === 'billing' ? 'NyayaKosh Billing' : 
             activeTab === 'strategy' ? 'NyayaDhara Strategy Board' : 'Cause List Diary'}
             <Sparkles size={16} className="text-slate-400" />
          </h1>
        </div>

        {/* Center: Search Bar (hidden on very small screens) */}
        <div className="hidden sm:flex flex-1 max-w-xl px-4 md:px-8">
          <div 
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg cursor-pointer text-slate-500 transition-colors"
          >
            <Search size={16} className="text-slate-400" />
            <span className="flex-1 text-sm">Search laws, sections, cases...</span>
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">Ctrl K</kbd>
          </div>
        </div>

        {/* Right Side: Actions & Settings */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Online
          </div>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-slate-800 text-white transition text-xs font-semibold shadow-sm"
          >
            <Cpu size={14} />
            <span>AI: {aiSettings.provider === 'offline' ? 'Offline Vidhi' : aiSettings.provider.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
