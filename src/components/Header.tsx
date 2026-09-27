import React from 'react';
import { 
  GitCompare, 
  ShieldAlert, 
  FileText, 
  Layers, 
  BookOpen, 
  Lock, 
  PlusCircle, 
  HelpCircle, 
  Printer,
  ChevronDown
} from 'lucide-react';
import { PatientCase } from '../types/medical';

export type ActiveTabType = 'matrix' | 'redflags' | 'visitprep' | 'archetypes' | 'prd' | 'privacy';

interface HeaderProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  activeCase: PatientCase;
  allCases: PatientCase[];
  onSelectCase: (c: PatientCase) => void;
  onOpenNewIntake: () => void;
  onOpenGlossary: () => void;
  onPrintAgenda: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeCase,
  allCases,
  onSelectCase,
  onOpenNewIntake,
  onOpenGlossary,
  onPrintAgenda
}) => {
  const [caseDropdownOpen, setCaseDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCaseDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 no-print">
      {/* Top Banner: Clinical Neutrality & Zero-Knowledge Guarantee */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="font-semibold text-teal-400">Zero-Cloud Privacy Guarantee:</span>
          <span>All clinical notes and doctor opinions remain 100% encrypted in your local browser.</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-slate-400">
          <button 
            onClick={onOpenGlossary} 
            className="hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
            <span>Clinical Glossary</span>
          </button>
          <span aria-hidden="true" className="text-slate-600">|</span>
          <span>Non-Diagnostic Advocacy Tool</span>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand — 5 Nav Links — Primary Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('matrix')} 
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
              Consilium
            </span>
          </button>
          
          {/* Active Case Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCaseDropdownOpen(!caseDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium border border-slate-200 transition-colors cursor-pointer max-w-[220px] sm:max-w-[280px]"
              title={activeCase.title}
            >
              <span className="truncate">{activeCase.patientAlias}: {activeCase.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </button>

            {caseDropdownOpen && (
              <div className="absolute left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  Switch Case / Scenario
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {allCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCase(c);
                        setCaseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex flex-col gap-0.5 transition-colors cursor-pointer ${
                        c.id === activeCase.id ? 'bg-teal-50/70 text-teal-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">{c.patientAlias}</span>
                        <span className="text-[10px] text-slate-400">{c.specialtyArea.split('/')[0]}</span>
                      </div>
                      <span className="text-slate-500 line-clamp-1">{c.title}</span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-2">
                  <button
                    onClick={() => {
                      setCaseDropdownOpen(false);
                      onOpenNewIntake();
                    }}
                    className="w-full py-1.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create New Dilemma Case</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: 4-6 Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-slate-100 text-teal-800 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GitCompare className="w-4 h-4 text-teal-600" />
            <span>Comparison Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('redflags')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'redflags'
                ? 'bg-slate-100 text-teal-800 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Red Flag Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('visitprep')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'visitprep'
                ? 'bg-slate-100 text-teal-800 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Doctor Visit Prep</span>
          </button>

          <button
            onClick={() => setActiveTab('archetypes')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'archetypes'
                ? 'bg-slate-100 text-teal-800 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 text-slate-600" />
            <span>Case Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('prd')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'prd'
                ? 'bg-slate-100 text-teal-800 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>PRD Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-slate-100 text-teal-800 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-4 h-4 text-slate-500" />
            <span>Privacy Vault</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Action Buttons */}
        <div className="flex items-center gap-2">
          {activeTab === 'visitprep' && (
            <button
              onClick={onPrintAgenda}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-300 transition-colors cursor-pointer"
              title="Print SBAR Visit Brief"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Visit Agenda</span>
            </button>
          )}

          <button
            onClick={onOpenNewIntake}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Log Dilemma</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 gap-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium ${
            activeTab === 'matrix' ? 'bg-teal-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Matrix
        </button>
        <button
          onClick={() => setActiveTab('redflags')}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium ${
            activeTab === 'redflags' ? 'bg-amber-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Red Flags
        </button>
        <button
          onClick={() => setActiveTab('visitprep')}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium ${
            activeTab === 'visitprep' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Visit Prep
        </button>
        <button
          onClick={() => setActiveTab('archetypes')}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium ${
            activeTab === 'archetypes' ? 'bg-slate-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Scenarios
        </button>
        <button
          onClick={() => setActiveTab('prd')}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium ${
            activeTab === 'prd' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          PRD Blueprint
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-3 py-1 text-xs rounded-full whitespace-nowrap font-medium ${
            activeTab === 'privacy' ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Privacy Vault
        </button>
      </div>
    </header>
  );
};
