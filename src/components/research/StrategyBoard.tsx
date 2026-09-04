import React, { useState } from 'react';
import { Scale, BookOpen, ChevronDown, Activity, ChevronRight, Landmark } from 'lucide-react';

interface TimelineNode {
  id: string;
  year: string;
  caseName: string;
  citation: string;
  bench: string;
  summary: string;
  impact: string;
}

const TIMELINES: Record<string, { title: string, desc: string, data: TimelineNode[] }> = {
  anticipatory_bail: {
    title: 'Evolution of Anticipatory Bail',
    desc: 'Trace the jurisprudential development of Section 438 CrPC (now Section 482 BNSS) through landmark Supreme Court rulings.',
    data: [
      { id: '1', year: '1980', caseName: 'Gurbaksh Singh Sibbia v. State of Punjab', citation: '(1980) 2 SCC 565', bench: '5 Judge Constitution Bench', summary: 'Laid the foundational principles of Anticipatory Bail. Held that Section 438 must be interpreted in light of Article 21 (Personal Liberty).', impact: 'Ruled that anticipatory bail should not be limited by a fixed time period, and courts should not impose unnecessary restrictions.' },
      { id: '2', year: '2011', caseName: 'Siddharam Satlingappa Mhetre v. State of Maharashtra', citation: '(2011) 1 SCC 694', bench: '2 Judge Bench', summary: 'Reiterated that anticipatory bail, once granted, should continue until the end of the trial unless cancelled under Section 439(2).', impact: 'Strengthened the protection of personal liberty, clarifying that normal bail conditions shouldn\'t restrict anticipatory bail lifespans.' },
      { id: '3', year: '2020', caseName: 'Sushila Aggarwal v. State (NCT of Delhi)', citation: '(2020) 5 SCC 1', bench: '5 Judge Constitution Bench', summary: 'Authoritatively settled the debate. Held that protection granted under Section 438 CrPC should not invariably be limited to a fixed period.', impact: 'Clarified that the life of anticipatory bail does not automatically end when the charge sheet is filed; it can continue until the end of the trial.' },
      { id: '4', year: '2022', caseName: 'Satender Kumar Antil v. CBI', citation: '(2022) 10 SCC 51', bench: '2 Judge Bench', summary: 'Provided comprehensive guidelines on bail. Categorized offenses into A, B, C, D to streamline the process of regular bail upon appearance.', impact: 'A landmark procedural reform aimed at decongesting jails and ensuring that routine arrests are not made in minor offenses.' }
    ]
  },
  privacy: {
    title: 'Right to Privacy (Puttaswamy)',
    desc: 'The journey from M.P. Sharma to the landmark 9-judge bench holding privacy as a fundamental right.',
    data: [
      { id: 'p1', year: '1954', caseName: 'M.P. Sharma v. Satish Chandra', citation: 'AIR 1954 SC 300', bench: '8 Judge Bench', summary: 'Held that the right to privacy is not a fundamental right under the Indian Constitution.', impact: 'Allowed state authorities broader search and seizure powers without privacy constraints.' },
      { id: 'p2', year: '1962', caseName: 'Kharak Singh v. State of U.P.', citation: 'AIR 1963 SC 1295', bench: '6 Judge Bench', summary: 'Reaffirmed M.P. Sharma. However, Subba Rao J. dissented, arguing privacy is an essential ingredient of personal liberty.', impact: 'The dissent planted the seed for future jurisprudence recognizing privacy.' },
      { id: 'p3', year: '2017', caseName: 'K.S. Puttaswamy v. Union of India', citation: '(2017) 10 SCC 1', bench: '9 Judge Constitution Bench', summary: 'Overruled M.P. Sharma and Kharak Singh. Held that the Right to Privacy is an intrinsic part of Article 21.', impact: 'Fundamentally changed Indian constitutional law, leading to the striking down of Section 377 and the drafting of the DPDP Act.' }
    ]
  },
  basic_structure: {
    title: 'Basic Structure Doctrine',
    desc: 'The epic constitutional battle over Parliament\'s power to amend the Constitution.',
    data: [
      { id: 'b1', year: '1951', caseName: 'Shankari Prasad v. Union of India', citation: 'AIR 1951 SC 458', bench: '5 Judge Bench', summary: 'Held that Parliament has absolute power to amend the Constitution, including Fundamental Rights.', impact: 'Gave Parliament unchecked amending power in the early years of the Republic.' },
      { id: 'b2', year: '1967', caseName: 'Golaknath v. State of Punjab', citation: '1967 AIR 1643', bench: '11 Judge Bench', summary: 'Held that Parliament cannot amend Fundamental Rights. Article 368 only lays down the procedure, not the power.', impact: 'Severely restricted Parliament, leading to the 24th Amendment.' },
      { id: 'b3', year: '1973', caseName: 'Kesavananda Bharati v. State of Kerala', citation: '(1973) 4 SCC 225', bench: '13 Judge Bench', summary: 'Overruled Golaknath. Held that Parliament can amend any part of the Constitution, but cannot alter its "Basic Structure".', impact: 'The most important decision in Indian history. Established judicial review over constitutional amendments.' }
    ]
  }
};

export const StrategyBoard: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<keyof typeof TIMELINES>('anticipatory_bail');
  
  const currentTimeline = TIMELINES[selectedTopic];
  
  // Default to the last node in the timeline
  const [activeNode, setActiveNode] = useState<string>(currentTimeline.data[currentTimeline.data.length - 1].id);

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTopic = e.target.value as keyof typeof TIMELINES;
    setSelectedTopic(newTopic);
    setActiveNode(TIMELINES[newTopic].data[TIMELINES[newTopic].data.length - 1].id);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900 text-white font-mono-legal">
              <Activity size={13} /> Doctrine Timeline
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Supreme Court</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {currentTimeline.title}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
            {currentTimeline.desc}
          </p>
        </div>
        <div className="shrink-0">
          <div className="relative">
            <select 
              value={selectedTopic}
              onChange={handleTopicChange}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
              <option value="anticipatory_bail">Anticipatory Bail</option>
              <option value="privacy">Right to Privacy (Puttaswamy)</option>
              <option value="basic_structure">Basic Structure (Kesavananda)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Main Interactive Timeline Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Timeline Axis (Left) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-100 pb-3">
            Chronology
          </h3>
          <div className="relative ml-3 border-l-2 border-slate-100 space-y-10">
            {currentTimeline.data.map((node) => {
              const isActive = activeNode === node.id;
              return (
                <div 
                  key={node.id} 
                  className={`relative pl-8 cursor-pointer group transition-all duration-300 ${isActive ? 'scale-105 origin-left' : 'hover:translate-x-1'}`}
                  onClick={() => setActiveNode(node.id)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 transition-colors duration-300 ${
                    isActive 
                      ? 'bg-black border-black shadow-[0_0_0_4px_rgba(0,0,0,0.1)]' 
                      : 'bg-white border-slate-300 group-hover:border-slate-500'
                  }`} />
                  
                  <div className="flex flex-col">
                    <span className={`text-xl font-extrabold font-mono-legal tracking-tight ${isActive ? 'text-black' : 'text-slate-400'}`}>
                      {node.year}
                    </span>
                    <h4 className={`text-sm md:text-base font-bold mt-1 leading-snug transition-colors ${isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'}`}>
                      {node.caseName}
                    </h4>
                    <span className="text-xs font-semibold text-slate-500 mt-1">
                      {node.citation}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed View (Right) */}
        <div className="lg:col-span-7 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800 sticky top-24 min-h-[400px] flex flex-col transition-all">
          {currentTimeline.data.map((node) => {
            if (activeNode !== node.id) return null;
            return (
              <div key={node.id} className="animate-fade-in flex-1 flex flex-col">
                <div className="flex items-start justify-between border-b border-slate-800 pb-6 mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold font-serif-legal text-white mb-2 leading-tight">
                      {node.caseName}
                    </h2>
                    <div className="flex items-center gap-3 text-xs font-mono-legal tracking-wider">
                      <span className="text-amber-400 font-bold">{node.citation}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Landmark size={12} /> {node.bench}
                      </span>
                    </div>
                  </div>
                  <div className="text-5xl font-black text-slate-800 font-mono-legal opacity-50 select-none">
                    {node.year}
                  </div>
                </div>

                <div className="space-y-8 flex-1">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Scale size={14} /> Ratio Decidendi
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-800/50 p-5 rounded-xl border border-slate-800/50">
                      "{node.summary}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BookOpen size={14} /> Jurisprudential Impact
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {node.impact}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <button className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition group">
                    Read Full Judgment <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
