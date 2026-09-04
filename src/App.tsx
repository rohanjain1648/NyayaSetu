import React, { useState, useEffect } from 'react';
import { Preloader } from './components/common/Preloader';
import { Header, NavTabId } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/common/LandingPage';
import { SettingsModal } from './components/common/SettingsModal';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { SanhitaExplorer } from './components/sanhita/SanhitaExplorer';
import { LimitationCalculator } from './components/calculator/LimitationCalculator';
import { CourtFeeCalculator } from './components/calculator/CourtFeeCalculator';
import { NoticeStudio } from './components/drafting/NoticeStudio';
import { ContractAuditor } from './components/compliance/ContractAuditor';
import { VidhiCopilot } from './components/copilot/VidhiCopilot';
import { CauseListDiary } from './components/diary/CauseListDiary';
import { NyayaKosh } from './components/billing/NyayaKosh';
import { StrategyBoard } from './components/research/StrategyBoard';
import { AISettings } from './types/legal';
import { DEFAULT_AI_SETTINGS } from './utils/aiService';

export function App() {
  const [loading, setLoading] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTabId>('sanhita');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [sanhitaInitialQuery, setSanhitaInitialQuery] = useState('');
  const [calculatorInitialRule, setCalculatorInitialRule] = useState('');

  // Persistent AI Settings
  const [aiSettings, setAiSettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem('nyayasetu_ai_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_AI_SETTINGS;
  });

  const handleSaveSettings = (newSettings: AISettings) => {
    setAiSettings(newSettings);
    localStorage.setItem('nyayasetu_ai_settings', JSON.stringify(newSettings));
  };

  const handleQuickNavigate = (tab: NavTabId, query?: string) => {
    setActiveTab(tab);
    if (tab === 'sanhita' && query) {
      setSanhitaInitialQuery(query);
    }
    if (tab === 'calculator' && query) {
      setCalculatorInitialRule(query);
    }
  };

  return (
    <div className="min-h-screen flex text-slate-900 bg-white selection:bg-slate-200 selection:text-black font-sans">
      {/* Cinematic Legal Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main App Layout */}
      {!loading && isLanding && (
        <LandingPage onEnter={() => setIsLanding(false)} />
      )}
      {!loading && !isLanding && (
        <>
          {/* Left Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            onSelectTab={(tab) => {
              setActiveTab(tab);
              setIsMobileMenuOpen(false);
            }} 
            onGoHome={() => setIsLanding(true)} 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          {/* Right Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden bg-slate-50">
            {/* Header */}
            <Header
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              aiSettings={aiSettings}
              onOpenSettings={() => setSettingsModalOpen(true)}
              onOpenSearch={() => setSearchModalOpen(true)}
              onToggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />

            {/* Main Content Area */}
            <main className="flex-1 w-full p-6 sm:p-8">
              <div className="max-w-6xl mx-auto">
                {activeTab === 'sanhita' && (
                  <SanhitaExplorer
                    initialSearch={sanhitaInitialQuery}
                    onOpenDraftingWithSection={(sec) => {
                      setActiveTab('drafting');
                    }}
                  />
                )}

                {activeTab === 'calculator' && (
                  <div className="space-y-8">
                    <LimitationCalculator initialRuleId={calculatorInitialRule} />
                    <CourtFeeCalculator />
                  </div>
                )}

                {activeTab === 'drafting' && <NoticeStudio />}

                {activeTab === 'compliance' && <ContractAuditor />}

                {activeTab === 'copilot' && (
                  <VidhiCopilot
                    aiSettings={aiSettings}
                    onOpenSettings={() => setSettingsModalOpen(true)}
                  />
                )}

                {activeTab === 'diary' && <CauseListDiary />}

                {activeTab === 'billing' && <NyayaKosh />}

                {activeTab === 'strategy' && <StrategyBoard />}
              </div>
            </main>
          </div>

          {/* Settings Modal */}
          <SettingsModal
            isOpen={settingsModalOpen}
            onClose={() => setSettingsModalOpen(false)}
            settings={aiSettings}
            onSave={handleSaveSettings}
          />

          {/* Quick Command Palette Modal (Ctrl + K) */}
          <QuickSearchModal
            isOpen={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
            onNavigate={handleQuickNavigate}
          />
        </>
      )}
    </div>
  );
}

export default App;
