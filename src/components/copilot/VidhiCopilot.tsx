import React, { useState, useRef, useEffect } from 'react';
import { AISettings, AIChatMessage } from '../../types/legal';
import { askVidhiAI } from '../../utils/aiService';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Scale,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface VidhiCopilotProps {
  aiSettings: AISettings;
  onOpenSettings: () => void;
}

const QUICK_PROMPTS = [
  'What are the statutory grounds for bail under Section 483 BNSS, 2023?',
  'Explain the 15-day police custody remand change under Section 187 BNSS vs CrPC 167',
  'What is the step-by-step limitation timetable for Section 138 NI Act cheque bounce?',
  'What are the key compliance requirements and penalties under the DPDP Act 2023?',
  'How do I certify WhatsApp chats under Section 63 BSA (replacing Section 65B IEA)?'
];

export const VidhiCopilot: React.FC<VidhiCopilotProps> = ({
  aiSettings,
  onOpenSettings
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Namaste. I am Vidhi Mitra AI (विधि मित्र), your specialized Indian Legal Research & Jurisprudence Copilot.

I can assist you with:
- New Criminal Codes: Cross-referencing BNS, BNSS, and BSA with legacy IPC, CrPC, and IEA provisions.
- Bail & Remand Strategy: Citing landmark Supreme Court ratios (Lalita Kumari, Arnesh Kumar, Satender Kumar Antil).
- Civil & Statutory Limitation: Timelines under the Limitation Act 1963 and Section 138 of the Negotiable Instruments Act.
- DPDP Act 2023 Compliance: Data fiduciary duties, consent notices, and penal liabilities.

How can I assist your legal practice today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        'Satender Kumar Antil v. CBI (2022) 10 SCC 51',
        'Lalita Kumari v. Govt. of U.P. (2014) 2 SCC 1'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMessage: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const historyContext = messages.map((m) => ({
        role: m.sender,
        content: m.text
      }));

      const response = await askVidhiAI(text, aiSettings, historyContext);

      const assistantMessage: AIChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e: any) {
      const errorMessage: AIChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Error processing query: ${e.message || 'Unknown error'}. Please verify your network connection or API settings.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'Chat history cleared. How may I assist your legal inquiry?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Hero Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 font-mono-legal">
                <Scale size={13} /> Grounded Indian Jurisprudence
              </span>
              <span className="text-xs text-slate-500">Supreme Court Precedents & Sanhitas</span>
            </div>
            <h1 className="font-serif-legal text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Vidhi Mitra: AI Legal Research & Copilot
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed">
              Ask complex questions on the BNS criminal codes, bail grounds, electronic evidence certifications, or DPDP Act compliance. Powered by Groq, OpenAI, or the built-in offline Indian legal reasoning engine.
            </p>
          </div>

          {/* Engine Status & Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold transition"
            >
              <Cpu size={14} />
              <span>Provider: {aiSettings.provider === 'offline' ? 'Offline Vidhi' : aiSettings.provider.toUpperCase()}</span>
            </button>
            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition"
              title="Reset Chat"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={12} className="text-black" /> Common Legal Queries:
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium text-left transition flex items-center gap-1.5 shadow-xs group"
            >
              <span>{q}</span>
              <ArrowRight size={12} className="text-slate-400 group-hover:text-black transition shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white border border-slate-200 rounded-2xl flex flex-col h-[580px] overflow-hidden shadow-sm">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUser
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-100 text-slate-900 border-slate-200 shadow-xs'
                  }`}
                >
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 border text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-slate-900 text-white border-slate-900 rounded-tr-none'
                      : 'bg-slate-50 text-slate-900 border-slate-200 rounded-tl-none shadow-xs'
                  }`}
                >
                  <div className={`flex items-center justify-between gap-4 pb-1.5 border-b text-[10px] font-mono-legal ${
                    isUser ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-500'
                  }`}>
                    <span className="font-bold">{isUser ? 'Advocate / Litigant' : 'Vidhi Mitra AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Body Text */}
                  <div className={`whitespace-pre-wrap font-sans leading-relaxed ${
                    isUser ? 'text-white' : 'text-slate-800'
                  }`}>
                    {isUser ? msg.text : msg.text.replace(/\*\*/g, '').replace(/\*/g, '')}
                  </div>

                  {/* Citations if available */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 space-y-1">
                      <div className="text-[10px] font-bold uppercase font-mono-legal text-slate-700 flex items-center gap-1">
                        <Scale size={11} /> Cited Judicial Authorities:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((c, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 font-serif-legal text-[11px] font-semibold text-slate-800"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Copy button */}
                  {!isUser && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="text-[11px] text-slate-500 hover:text-black flex items-center gap-1 font-mono-legal font-medium"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={12} className="text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Opinion</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 mr-auto max-w-md">
              <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0 animate-pulse">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-slate-900 animate-ping" />
                <span>Consulting Indian Statutory Gazettes & Supreme Court Rulings...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about BNS sections, bail grounds, limitation, or DPDP Act compliance..."
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="px-5 py-3 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
            >
              <Send size={15} />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
