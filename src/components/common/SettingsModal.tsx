import React, { useState } from 'react';
import { AISettings } from '../../types/legal';
import { X, Cpu, Key, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (settings: AISettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [current, setCurrent] = useState<AISettings>(settings);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(current);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs fade-in">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="font-serif-legal text-lg font-bold text-slate-900">
                AI Engine & Provider Settings
              </h3>
              <p className="text-xs text-slate-500">
                Configure Groq, OpenAI, or Built-in Offline Jurisprudence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select AI Engine
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Offline Engine */}
              <button
                type="button"
                onClick={() => setCurrent({ ...current, provider: 'offline' })}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  current.provider === 'offline'
                    ? 'border-black bg-black text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <ShieldCheck size={18} className={current.provider === 'offline' ? 'text-white' : 'text-slate-500'} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    current.provider === 'offline' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>Default</span>
                </div>
                <div>
                  <div className={`font-bold text-xs ${current.provider === 'offline' ? 'text-white' : 'text-slate-900'}`}>Vidhi Offline</div>
                  <div className={`text-[10px] leading-tight mt-0.5 ${current.provider === 'offline' ? 'text-slate-300' : 'text-slate-500'}`}>Zero key, instant</div>
                </div>
              </button>

              {/* Groq Engine */}
              <button
                type="button"
                onClick={() => setCurrent({ ...current, provider: 'groq', model: current.model || 'llama-3.3-70b-versatile' })}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  current.provider === 'groq'
                    ? 'border-black bg-black text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Zap size={18} className={current.provider === 'groq' ? 'text-white' : 'text-slate-500'} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    current.provider === 'groq' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>Fast</span>
                </div>
                <div>
                  <div className={`font-bold text-xs ${current.provider === 'groq' ? 'text-white' : 'text-slate-900'}`}>Groq Cloud</div>
                  <div className={`text-[10px] leading-tight mt-0.5 ${current.provider === 'groq' ? 'text-slate-300' : 'text-slate-500'}`}>Llama 3.3 70B</div>
                </div>
              </button>

              {/* OpenAI Engine */}
              <button
                type="button"
                onClick={() => setCurrent({ ...current, provider: 'openai', model: 'gpt-4o-mini' })}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  current.provider === 'openai'
                    ? 'border-black bg-black text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Sparkles size={18} className={current.provider === 'openai' ? 'text-white' : 'text-slate-500'} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    current.provider === 'openai' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>GPT-4o</span>
                </div>
                <div>
                  <div className={`font-bold text-xs ${current.provider === 'openai' ? 'text-white' : 'text-slate-900'}`}>OpenAI</div>
                  <div className={`text-[10px] leading-tight mt-0.5 ${current.provider === 'openai' ? 'text-slate-300' : 'text-slate-500'}`}>GPT-4o API</div>
                </div>
              </button>
            </div>
          </div>

          {/* API Key Input if Groq or OpenAI */}
          {current.provider !== 'offline' && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Key size={14} className="text-black" />
                  {current.provider === 'groq' ? 'Groq API Key (gsk_...)' : 'OpenAI API Key (sk-...)'}
                </label>
                <input
                  type="password"
                  value={current.apiKey}
                  onChange={(e) => setCurrent({ ...current, apiKey: e.target.value })}
                  placeholder={current.provider === 'groq' ? 'gsk_xxxxxxxxxxxxxxxxxxxx' : 'sk-proj-xxxxxxxxxxxxxxxxxxxx'}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono-legal text-xs focus:ring-2 focus:ring-black focus:bg-white focus:outline-none"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Your API key remains strictly in your browser's local storage and is never saved to any external database.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Model Selection
                </label>
                {current.provider === 'groq' ? (
                  <select
                    value={current.model}
                    onChange={(e) => setCurrent({ ...current, model: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white focus:outline-none"
                  >
                    <option value="llama-3.3-70b-versatile">Llama-3.3-70b-versatile (Recommended)</option>
                    <option value="llama-3.1-8b-instant">Llama-3.1-8b-instant (Fastest)</option>
                    <option value="mixtral-8x7b-32768">Mixtral-8x7b-32768</option>
                  </select>
                ) : (
                  <select
                    value={current.model}
                    onChange={(e) => setCurrent({ ...current, model: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-black focus:bg-white focus:outline-none"
                  >
                    <option value="gpt-4o-mini">GPT-4o-mini (Fast & Economical)</option>
                    <option value="gpt-4o">GPT-4o (Most Intelligent)</option>
                  </select>
                )}
              </div>
            </div>
          )}

          {/* Offline Engine Info */}
          {current.provider === 'offline' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-black" /> Offline Indian Jurisprudence Engine Active
              </div>
              <p>
                NyayaSetu includes built-in knowledge bases for BNS, BNSS, BSA, S.138 NI Act, DPDP 2023, and landmark Supreme Court citations. Works without internet or API keys!
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-100">
          <span className="text-xs text-emerald-600 font-bold">
            {savedNotice ? '✓ Settings Saved!' : ''}
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-semibold shadow-sm"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
