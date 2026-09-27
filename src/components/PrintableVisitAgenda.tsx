import React from 'react';
import { PatientCase } from '../types/medical';

interface PrintableVisitAgendaProps {
  activeCase: PatientCase;
}

export const PrintableVisitAgenda: React.FC<PrintableVisitAgendaProps> = ({ activeCase }) => {
  const pA = activeCase.providers[0];
  const pB = activeCase.providers[1];
  const selectedQuestions = (activeCase.clinicalQuestions || []).filter(q => q.isSelected);

  return (
    <div className="hidden print:block print-only p-8 text-black bg-white max-w-4xl mx-auto space-y-6 text-sm">
      {/* Print Header */}
      <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            CONSILIUM CLINICAL CONSULTATION BRIEF
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Structured Patient Advocacy & Second-Opinion Reconciliation Document
          </p>
        </div>
        <div className="text-right text-xs">
          <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
          <div><strong>Specialty:</strong> {activeCase.specialtyArea}</div>
        </div>
      </div>

      {/* Patient & Dilemma Header */}
      <div className="grid grid-cols-3 gap-4 border border-slate-300 p-4 rounded text-xs">
        <div>
          <strong>Patient Name / Alias:</strong> {activeCase.patientAlias}
        </div>
        <div>
          <strong>Age / Demographics:</strong> {activeCase.patientAge ? `${activeCase.patientAge} years old` : 'Not specified'}
        </div>
        <div>
          <strong>Symptom Duration:</strong> {activeCase.symptomDuration}
        </div>
        <div className="col-span-3 pt-2 border-t border-slate-200">
          <strong>Primary Symptoms:</strong> {activeCase.primarySymptoms}
        </div>
      </div>

      {/* SBAR Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1">
          1. SBAR Clinical Overview
        </h2>

        <div className="space-y-2 text-xs">
          <div className="p-2 border border-slate-200 rounded">
            <strong>[S] SITUATION:</strong> {activeCase.sbarBrief?.situation}
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <strong>[B] BACKGROUND:</strong> {activeCase.sbarBrief?.background}
          </div>
          <div className="p-2 border border-slate-200 rounded">
            <strong>[A] ASSESSMENT:</strong> {activeCase.sbarBrief?.assessment}
          </div>
          <div className="p-2 border border-slate-200 rounded bg-slate-50 font-medium">
            <strong>[R] REQUEST FOR TODAY'S VISIT:</strong> {activeCase.sbarBrief?.request}
          </div>
        </div>
      </div>

      {/* Summary of Divergent Opinions */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1">
          2. Summary of Divergent Clinical Opinions
        </h2>

        <div className="grid grid-cols-2 gap-4 text-xs">
          {pA && (
            <div className="border border-slate-300 p-3 rounded space-y-1">
              <div className="font-bold text-slate-900">{pA.providerRole} ({pA.doctorName})</div>
              <div><strong>Diagnosis:</strong> {pA.diagnosis}</div>
              <div><strong>Recommended Plan:</strong> {pA.recommendedTreatment}</div>
              <div><strong>Key Tests Reviewed:</strong> {pA.testsReviewed.join(', ')}</div>
            </div>
          )}

          {pB && (
            <div className="border border-slate-300 p-3 rounded space-y-1">
              <div className="font-bold text-slate-900">{pB.providerRole} ({pB.doctorName})</div>
              <div><strong>Diagnosis:</strong> {pB.diagnosis}</div>
              <div><strong>Recommended Plan:</strong> {pB.recommendedTreatment}</div>
              <div><strong>Key Tests Reviewed:</strong> {pB.testsReviewed.join(', ')}</div>
            </div>
          )}
        </div>
      </div>

      {/* Priority Clarification Questions */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase border-b border-slate-400 pb-1">
          3. Priority Clinical Questions for Today's Consultation
        </h2>

        <div className="space-y-2 text-xs">
          {selectedQuestions.map((q, idx) => (
            <div key={q.id} className="border border-slate-200 p-2.5 rounded flex items-start gap-2">
              <div className="font-bold font-mono text-slate-600">[{idx + 1}]</div>
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-900">{q.question}</div>
                <div className="text-slate-500 text-[11px] italic">Script: "{q.physicianFriendlyScript}"</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinician Notes & Agreed Milestone Section */}
      <div className="space-y-2 pt-4 border-t border-slate-400">
        <h2 className="text-sm font-bold uppercase">
          4. Clinician Action Plan & Agreed Stop-Loss Milestones
        </h2>
        <div className="border border-slate-300 h-28 rounded p-3 text-xs text-slate-400">
          (Doctor Notes, Next Diagnostic Tests, Prescriptions Agreed Upon, and Follow-Up Date)
        </div>
      </div>

      {/* Footer Legal Disclaimers */}
      <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-200">
        This document is prepared by the patient using Consilium for organized communication during clinical consultations. It does not constitute medical advice or a substitute for clinical judgment.
      </div>
    </div>
  );
};
