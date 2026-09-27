import React, { useState } from 'react';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Terminal, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PRD_DATA, PrdSection } from '../data/prdContent';

export const PRDBlueprintView: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(PRD_DATA[0].id);
  const [copiedAll, setCopiedAll] = useState(false);

  const activeSection = PRD_DATA.find(s => s.id === selectedSectionId) || PRD_DATA[0];

  const handleCopyFullPrd = () => {
    const fullText = PRD_DATA.map(s => `
================================================================================
SECTION ${s.number}: ${s.title.toUpperCase()}
${s.subtitle}
================================================================================
${s.summary}

KEY ARCHITECTURAL HIGHLIGHTS:
${s.keyTakeaways.map(t => `- ${t}`).join('\n')}

DETAILED SPECIFICATION:
${s.contentMarkdown}
`).join('\n\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-emerald-800">Senior Health-Tech Product Strategy</span>
              <span aria-hidden="true">·</span>
              <span>Architecture & Implementation Blueprint</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-emerald-700" />
              <span>Product Requirements Document (PRD)</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete architectural blueprint, user journey mapping, clinical safety governance, and technical frontend specifications for high-trust medical discrepancy navigation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleCopyFullPrd}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Copied Full PRD!' : 'Copy PRD to Markdown'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main PRD Layout: Sidebar navigation + Content view */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-1 lg:sticky lg:top-24">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            PRD Specification Chapters
          </div>
          {PRD_DATA.map((section) => {
            const isActive = section.id === activeSection.id;
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSectionId(section.id)}
                className={`w-full text-left p-3 rounded-lg text-xs transition-colors flex items-start gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200 shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {section.number}
                </span>
                <div className="space-y-0.5 flex-1">
                  <div className="line-clamp-1">{section.title}</div>
                  <div className={`text-[10px] line-clamp-1 ${isActive ? 'text-emerald-700 font-normal' : 'text-slate-400'}`}>
                    {section.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* PRD Main Content Viewer */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Section Header */}
            <div className="border-b border-slate-200 pb-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700">
                <span>SECTION {activeSection.number}</span>
                <span aria-hidden="true">·</span>
                <span>HEALTH-TECH SPECIFICATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activeSection.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {activeSection.subtitle}
              </p>
            </div>

            {/* Executive Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Executive Synthesis
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeSection.summary}
              </p>

              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-800 block">Core Architecture Highlights:</span>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {activeSection.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-600">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Markdown / Technical Outline Body */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-800">
              <div className="whitespace-pre-line font-sans leading-relaxed">
                {activeSection.contentMarkdown}
              </div>
            </div>

            {/* Interactive Section Switcher Bottom */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              {(() => {
                const currentIndex = PRD_DATA.findIndex(s => s.id === activeSection.id);
                const prev = PRD_DATA[currentIndex - 1];
                const next = PRD_DATA[currentIndex + 1];

                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => setSelectedSectionId(prev.id)}
                        className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>← {prev.number}. {prev.title}</span>
                      </button>
                    ) : <div />}

                    {next ? (
                      <button
                        onClick={() => setSelectedSectionId(next.id)}
                        className="text-xs text-emerald-800 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>{next.number}. {next.title} →</span>
                      </button>
                    ) : <div />}
                  </>
                );
              })()}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
