import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  Activity, 
  Sparkles,
  GitBranch
} from 'lucide-react';
import { PatientCase } from '../types/medical';
import { CASE_ARCHETYPES } from '../data/caseArchetypes';

interface CaseArchetypesViewProps {
  activeCase: PatientCase;
  onSelectArchetype: (c: PatientCase) => void;
  onNavigateToMatrix: () => void;
}

export const CaseArchetypesView: React.FC<CaseArchetypesViewProps> = ({
  activeCase,
  onSelectArchetype,
  onNavigateToMatrix
}) => {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Preloaded Clinical Case Library</span>
              <span aria-hidden="true">·</span>
              <span>4 Real-World Diagnostic Archetypes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-slate-700" />
              <span>Interactive Clinical Dilemma Scenarios</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore realistic, fully populated medical disagreement scenarios across spine surgery, cardiology, pathology/oncology, and rheumatology. Click any case to load its comparison matrix, red-flag triage, and visit prep agenda.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Archetypes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CASE_ARCHETYPES.map((arch) => {
          const isCurrent = arch.id === activeCase.id;
          const pA = arch.providers[0];
          const pB = arch.providers[1];

          return (
            <div
              key={arch.id}
              className={`bg-white border rounded-xl shadow-xs overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                isCurrent
                  ? 'border-teal-400 ring-2 ring-teal-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Specialty Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                    {arch.specialtyArea}
                  </span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-teal-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Currently Active Case</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {arch.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>Patient: {arch.patientAlias} ({arch.patientAge}yo)</span>
                    <span aria-hidden="true">·</span>
                    <span>Duration: {arch.symptomDuration}</span>
                  </div>
                </div>

                {/* Primary Symptom */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                  <strong className="text-slate-800 block mb-0.5">Clinical Dilemma Core:</strong>
                  <p className="text-slate-600 line-clamp-2 leading-relaxed">
                    {arch.personalNotes}
                  </p>
                </div>

                {/* Opposing Opinions Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-teal-50/60 p-2.5 rounded-lg border border-teal-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                      {pA.providerRole.split('(')[0]}
                    </span>
                    <div className="font-semibold text-slate-900 text-[11px] line-clamp-1">{pA.diagnosis}</div>
                    <div className="text-teal-900 font-medium text-[11px] line-clamp-1">↳ {pA.recommendedTreatment}</div>
                  </div>

                  <div className="bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">
                      {pB.providerRole.split('(')[0]}
                    </span>
                    <div className="font-semibold text-slate-900 text-[11px] line-clamp-1">{pB.diagnosis}</div>
                    <div className="text-indigo-900 font-medium text-[11px] line-clamp-1">↳ {pB.recommendedTreatment}</div>
                  </div>
                </div>

                {/* Divergence Vector */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                  <GitBranch className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate"><strong>Root Divergence:</strong> {arch.divergenceCategory}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {arch.discrepancyPoints.length} Comparison Dimensions · {arch.clinicalQuestions.length} Questions
                </span>

                {isCurrent ? (
                  <button
                    onClick={onNavigateToMatrix}
                    className="flex items-center gap-1 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSelectArchetype(arch);
                      onNavigateToMatrix();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors cursor-pointer"
                  >
                    <span>Load & Explore Case</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
