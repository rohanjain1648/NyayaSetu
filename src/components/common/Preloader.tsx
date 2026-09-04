import React, { useEffect, useState } from 'react';
import { Scale, Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const LEGAL_QUOTES = [
  { quote: 'Fiat Justitia Ruat Caelum', meaning: 'Let justice be done though the heavens fall' },
  { quote: 'Satyameva Jayate', meaning: 'Truth alone triumphs (Mundaka Upanishad)' },
  { quote: 'Nemo Judex In Causa Sua', meaning: 'No one should be a judge in their own cause' },
  { quote: 'Ubi Jus Ibi Remedium', meaning: 'Where there is a right, there is a remedy' }
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Quote rotation
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % LEGAL_QUOTES.length);
    }, 900);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(quoteInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => {
      clearInterval(interval);
      clearInterval(quoteInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-900 select-none px-6">
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Scales Emblem */}
        <div className="relative mb-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-md">
          <div className="animate-scale-balance text-black">
            <Scale size={56} strokeWidth={1.75} />
          </div>
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-black text-white shadow-sm">
            <Sparkles size={14} />
          </div>
        </div>

        {/* Title */}
        <div className="font-serif-legal text-2xl md:text-3xl font-extrabold tracking-wider mb-1 text-slate-900">
          NYAYASETU <span className="text-slate-500 font-black">AI</span>
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-mono-legal mb-6">
          न्यायसेतु • India Legal OS
        </p>

        {/* Dynamic Legal Quote */}
        <div className="min-h-[56px] flex flex-col items-center justify-center mb-8 px-4">
          <p className="text-sm font-serif-legal italic text-slate-800 tracking-wide font-semibold">
            "{LEGAL_QUOTES[quoteIndex].quote}"
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {LEGAL_QUOTES[quoteIndex].meaning}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200 p-0.5">
          <div
            className="bg-black h-full rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center w-full mt-3 text-xs text-slate-500 font-mono-legal font-medium">
          <span>Initializing BNS / BNSS / BSA Matrix...</span>
          <span className="text-slate-900 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
