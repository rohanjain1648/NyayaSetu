import React from 'react';
import { Shield, BookOpen, Scale, ArrowRight, FileText, Bot, Calendar, IndianRupee, Activity, Lock, CheckCircle } from 'lucide-react';
import { Footer } from './Footer';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen w-full flex-1 flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-200 selection:text-black">
      {/* Header / Nav */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">NyayaSetu AI</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Litigation OS</p>
            </div>
          </div>
          <button
            onClick={onEnter}
            className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            Launch Workspace <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 py-20 min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold uppercase tracking-widest text-slate-600 mb-8">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              ILTN Legal Vibeathon 2026
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              The Executive Suite for <br className="hidden md:block"/> Modern Indian Law.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed mx-auto">
              NyayaSetu AI is an end-to-end litigation operating system. Unify legal research, drafting, compliance, and case management with state-of-the-art secure AI.
            </p>
            <button
              onClick={onEnter}
              className="px-8 py-4 bg-black text-white text-lg font-bold rounded-md hover:bg-slate-800 transition-all flex items-center gap-3 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Enter NyayaSetu <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-slate-50 border-t border-slate-200 py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">The Complete Litigation Suite</h3>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Designed specifically for the complexities of the Indian judicial system.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, title: "SanhitaX Explorer", desc: "Navigate the new BNS, BNSS, and BSA with semantic search and intelligent cross-references." },
                { icon: FileText, title: "Vakalat Studio", desc: "Draft notices, plaints, and contracts using professional executive templates." },
                { icon: Activity, title: "NyayaDhara Strategy", desc: "Interactive timelines mapping the evolution of Supreme Court doctrines and precedents." },
                { icon: IndianRupee, title: "NyayaKosh Billing", desc: "Monochromatic dashboard for tracking billable hours, retainers, and generating PDF invoices." },
                { icon: Bot, title: "Vidhi Mitra Copilot", desc: "Your legal AI assistant for case strategy, DPDP Act compliance, and legal drafting." },
                { icon: Calendar, title: "Cause List Diary", desc: "Track upcoming hearings, limitations, and court fee calculations seamlessly." }
              ].map((f, i) => (
                <div key={i} className="p-8 bg-white border border-slate-200 rounded-xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Banner */}
        <section className="bg-slate-900 text-white py-24 px-6 md:px-8 border-y border-slate-800">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold uppercase tracking-widest text-slate-300 mb-6">
                <Lock size={14} /> 100% Data Privacy
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                Offline Vidhi Engine.<br/>Zero Cloud Risk.
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Client confidentiality is paramount. NyayaSetu features a specialized Offline Vidhi Engine that runs entirely on your local hardware. No API keys. No cloud servers. Complete DPDP Act compliance out of the box.
              </p>
              <ul className="space-y-4">
                {[
                  "No data leaves your device",
                  "Air-gapped litigation strategy",
                  "Compliant with Advocates Act confidentiality"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
                  <Shield size={32} className="text-emerald-400" />
                  <div>
                    <h4 className="text-lg font-bold text-white">Secure Workspace Active</h4>
                    <p className="text-xs text-slate-400 font-mono">ENCRYPTION: AES-256-GCM</p>
                  </div>
                </div>
                <div className="space-y-4 font-mono text-xs text-slate-300">
                  <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Engine</span>
                    <span className="text-emerald-400 font-bold">Offline Local LLM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Telemetry</span>
                    <span className="text-emerald-400 font-bold">Disabled</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                    <span>Network</span>
                    <span className="text-amber-400 font-bold">Air-gapped Mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-24 px-6 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <Scale size={48} className="text-slate-900 mb-8" />
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Ready to modernize your practice?
            </h3>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Join the next generation of Indian advocates leveraging AI for faster research, smarter strategy, and secure drafting.
            </p>
            <button
              onClick={onEnter}
              className="px-10 py-5 bg-black text-white text-lg font-bold rounded-md hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1"
            >
              Launch NyayaSetu OS <ArrowRight size={20} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
