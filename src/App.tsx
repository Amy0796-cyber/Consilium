/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTabType } from './components/Header';
import { DiscrepancyMatrix } from './components/DiscrepancyMatrix';
import { RedFlagGuide } from './components/RedFlagGuide';
import { DoctorVisitPrep } from './components/DoctorVisitPrep';
import { CaseArchetypesView } from './components/CaseArchetypesView';
import { PRDBlueprintView } from './components/PRDBlueprintView';
import { PrivacyComplianceCenter } from './components/PrivacyComplianceCenter';
import { EmpatheticIntakeModal } from './components/EmpatheticIntakeModal';
import { GlossaryModal } from './components/GlossaryModal';
import { PrintableVisitAgenda } from './components/PrintableVisitAgenda';
import { PatientCase } from './types/medical';
import { 
  loadInitialActiveCase, 
  loadAllSavedCases, 
  saveActiveCaseToStorage, 
  saveCustomCase 
} from './utils/storage';
import { CASE_ARCHETYPES } from './data/caseArchetypes';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('matrix');
  const [activeCase, setActiveCase] = useState<PatientCase>(loadInitialActiveCase);
  const [allCases, setAllCases] = useState<PatientCase[]>(loadAllSavedCases);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  useEffect(() => {
    saveActiveCaseToStorage(activeCase);
  }, [activeCase]);

  const handleSelectCase = (selected: PatientCase) => {
    setActiveCase(selected);
  };

  const handleUpdateCase = (updated: PatientCase) => {
    setActiveCase(updated);
    saveCustomCase(updated);
    setAllCases(loadAllSavedCases());
  };

  const handleSaveNewCase = (newCase: PatientCase) => {
    setActiveCase(newCase);
    saveCustomCase(newCase);
    setAllCases(loadAllSavedCases());
    setActiveTab('matrix');
  };

  const handlePrintAgenda = () => {
    window.print();
  };

  const handleResetToDefault = () => {
    setActiveCase(CASE_ARCHETYPES[0]);
    setAllCases(CASE_ARCHETYPES);
    setActiveTab('matrix');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeCase={activeCase}
        allCases={allCases}
        onSelectCase={handleSelectCase}
        onOpenNewIntake={() => setIsIntakeModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onPrintAgenda={handlePrintAgenda}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 no-print">
        {activeTab === 'matrix' && (
          <DiscrepancyMatrix
            activeCase={activeCase}
            onUpdateCase={handleUpdateCase}
            onNavigateToRedFlags={() => setActiveTab('redflags')}
            onNavigateToVisitPrep={() => setActiveTab('visitprep')}
          />
        )}

        {activeTab === 'redflags' && (
          <RedFlagGuide
            activeCase={activeCase}
            onUpdateCase={handleUpdateCase}
            onNavigateToVisitPrep={() => setActiveTab('visitprep')}
          />
        )}

        {activeTab === 'visitprep' && (
          <DoctorVisitPrep
            activeCase={activeCase}
            onUpdateCase={handleUpdateCase}
            onPrintAgenda={handlePrintAgenda}
          />
        )}

        {activeTab === 'archetypes' && (
          <CaseArchetypesView
            activeCase={activeCase}
            onSelectArchetype={handleSelectCase}
            onNavigateToMatrix={() => setActiveTab('matrix')}
          />
        )}

        {activeTab === 'prd' && (
          <PRDBlueprintView />
        )}

        {activeTab === 'privacy' && (
          <PrivacyComplianceCenter
            activeCase={activeCase}
            onImportCase={handleSaveNewCase}
            onResetToDefault={handleResetToDefault}
          />
        )}
      </main>

      {/* Printable Paper SBAR Handout (Visible only during window.print()) */}
      <PrintableVisitAgenda activeCase={activeCase} />

      {/* Empathetic Multi-Step Intake Wizard Modal */}
      <EmpatheticIntakeModal
        isOpen={isIntakeModalOpen}
        onClose={() => setIsIntakeModalOpen(false)}
        onSaveCase={handleSaveNewCase}
      />

      {/* Clinical Medical Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Clean, Non-Slop Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">Consilium</span>
            <span aria-hidden="true">·</span>
            <span>Medical Discrepancy & Second-Opinion Navigator</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Glossary
            </button>
            <button 
              onClick={() => setActiveTab('prd')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Strategic PRD
            </button>
            <button 
              onClick={() => setActiveTab('privacy')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Privacy Architecture
            </button>
          </div>

          <div>
            <span>Client-side sandbox. Not a substitute for formal medical evaluation.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
