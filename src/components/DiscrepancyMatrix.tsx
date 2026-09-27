import React, { useState } from 'react';
import { 
  GitCompare, 
  Stethoscope, 
  Pill, 
  Activity, 
  AlertCircle, 
  HelpCircle, 
  Plus, 
  Edit3, 
  FileCheck2, 
  Calendar,
  Building,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { PatientCase, ProviderOpinion } from '../types/medical';
import { autoDetectDivergence, generateSbarFromCase, generateClinicalQuestions } from '../utils/sbarGenerator';

interface DiscrepancyMatrixProps {
  activeCase: PatientCase;
  onUpdateCase: (updatedCase: PatientCase) => void;
  onNavigateToRedFlags: () => void;
  onNavigateToVisitPrep: () => void;
}

export const DiscrepancyMatrix: React.FC<DiscrepancyMatrixProps> = ({
  activeCase,
  onUpdateCase,
  onNavigateToRedFlags,
  onNavigateToVisitPrep
}) => {
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);

  // New Provider State
  const [newRole, setNewRole] = useState('Doctor C (Third Specialist)');
  const [newName, setNewName] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newClinic, setNewClinic] = useState('');
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [newTreatment, setNewTreatment] = useState('');
  const [newTreatmentType, setNewTreatmentType] = useState<ProviderOpinion['treatmentType']>('Active Surveillance / Watchful Waiting');
  const [newReasoning, setNewReasoning] = useState('');
  const [newTests, setNewTests] = useState('');

  const providers = activeCase.providers;

  const handleAddThirdProvider = () => {
    const newProv: ProviderOpinion = {
      id: `prov-extra-${Date.now()}`,
      providerRole: newRole || 'Doctor C (Third Specialist)',
      doctorName: newName || 'Dr. Third Opinion, MD',
      specialty: newSpecialty || 'Subspecialist',
      clinicOrHospital: newClinic || 'Tertiary Medical Center',
      visitDate: new Date().toISOString().slice(0, 10),
      diagnosis: newDiagnosis || 'Consensus / Alternative Diagnostic View',
      diagnosticConfidence: 'Moderate',
      testsReviewed: newTests ? newTests.split(',').map(t => t.trim()) : ['Comprehensive Independent Review'],
      testInterpretationNotes: `Tertiary review of previous diagnostic scans and exam.`,
      recommendedTreatment: newTreatment || 'Specialized targeted intervention',
      treatmentType: newTreatmentType,
      prescriptions: [],
      statedPrognosis: 'Long-term surveillance with targeted therapy.',
      expectedTimeline: '3-6 months review',
      riskTradeoffs: 'Balancing invasive benefits against conservative risks.',
      coreReasoning: newReasoning || 'Synthesizes both perspectives or offers subspecialized guideline approach.'
    };

    const updatedProviders = [...providers, newProv];
    const detected = autoDetectDivergence(updatedProviders);
    const updatedCase: PatientCase = {
      ...activeCase,
      providers: updatedProviders,
      divergenceCategory: detected.category,
      discrepancyPoints: detected.points,
      sbarBrief: generateSbarFromCase({ ...activeCase, providers: updatedProviders }),
      clinicalQuestions: generateClinicalQuestions({ ...activeCase, providers: updatedProviders }),
      lastUpdated: new Date().toISOString()
    };

    onUpdateCase(updatedCase);
    setShowAddProviderModal(false);
    // Reset inputs
    setNewName('');
    setNewSpecialty('');
    setNewDiagnosis('');
    setNewTreatment('');
  };

  const handleRemoveProvider = (providerId: string) => {
    if (providers.length <= 2) {
      alert('A discrepancy matrix requires at least 2 medical opinions to compare.');
      return;
    }
    const updatedProviders = providers.filter(p => p.id !== providerId);
    const detected = autoDetectDivergence(updatedProviders);
    const updatedCase: PatientCase = {
      ...activeCase,
      providers: updatedProviders,
      divergenceCategory: detected.category,
      discrepancyPoints: detected.points,
      sbarBrief: generateSbarFromCase({ ...activeCase, providers: updatedProviders }),
      clinicalQuestions: generateClinicalQuestions({ ...activeCase, providers: updatedProviders }),
      lastUpdated: new Date().toISOString()
    };
    onUpdateCase(updatedCase);
  };

  return (
    <div className="space-y-8">
      {/* Dilemma Summary Hero Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-teal-800">{activeCase.specialtyArea}</span>
              <span aria-hidden="true">·</span>
              <span>Patient: {activeCase.patientAlias} ({activeCase.patientAge || 'Age N/A'})</span>
              <span aria-hidden="true">·</span>
              <span>Duration: {activeCase.symptomDuration}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {activeCase.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Primary Symptoms:</strong> {activeCase.primarySymptoms}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-2 shrink-0">
            <div className="text-right">
              <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Divergence Type</span>
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 inline-block mt-0.5">
                {activeCase.divergenceCategory}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onNavigateToRedFlags}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Check Red Flags
              </button>
              <button
                onClick={onNavigateToVisitPrep}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Prep Doctor Agenda
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-teal-700" />
              <span>Side-by-Side Medical Discrepancy Matrix</span>
            </h2>
            <p className="text-xs text-slate-500">
              Structured comparison of diagnoses, test interpretations, procedures, and medication regimens.
            </p>
          </div>

          {providers.length < 3 && (
            <button
              onClick={() => setShowAddProviderModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-teal-700" />
              <span>Add 3rd Opinion</span>
            </button>
          )}
        </div>

        {/* The Comparison Columns Grid */}
        <div className={`grid grid-cols-1 ${providers.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
          {providers.map((prov, index) => (
            <div
              key={prov.id}
              className={`bg-white border rounded-xl shadow-xs overflow-hidden flex flex-col ${
                index === 0 ? 'border-teal-200' : index === 1 ? 'border-indigo-200' : 'border-purple-200'
              }`}
            >
              {/* Provider Header Card */}
              <div
                className={`p-4 border-b ${
                  index === 0 ? 'bg-teal-50/80 border-teal-100' : index === 1 ? 'bg-indigo-50/80 border-indigo-100' : 'bg-purple-50/80 border-purple-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {prov.providerRole}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {prov.doctorName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">{prov.specialty}</p>
                  </div>
                  {providers.length > 2 && (
                    <button
                      onClick={() => handleRemoveProvider(prov.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Remove provider"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 border-t border-slate-200/60 pt-2">
                  <div className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[160px]">{prov.clinicOrHospital}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prov.visitDate}</span>
                  </div>
                </div>
              </div>

              {/* Comparison Body Rows */}
              <div className="p-5 space-y-5 flex-1 text-xs">
                
                {/* Row 1: Diagnosis & Confidence */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Stated Diagnosis
                  </span>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      {prov.diagnosis}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <span className="font-medium text-slate-700">Diagnostic Confidence:</span>
                      <span className="font-semibold text-teal-800">{prov.diagnosticConfidence}</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Tests Reviewed & Finding Interpretation */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Diagnostic Evidence Reviewed
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                      {prov.testsReviewed.map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs bg-slate-50/80 p-2.5 rounded border border-slate-100 leading-relaxed italic">
                      "{prov.testInterpretationNotes}"
                    </p>
                  </div>
                </div>

                {/* Row 3: Recommended Treatment / Procedure */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Recommended Treatment & Strategy
                  </span>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-slate-900 text-xs leading-snug">
                        {prov.recommendedTreatment}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      <span className="text-slate-500">Modality:</span>
                      <span className="font-semibold text-slate-700">{prov.treatmentType}</span>
                    </div>
                  </div>
                </div>

                {/* Row 4: Prescriptions & Medications */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-slate-500" />
                    <span>Prescriptions / Pharmacotherapy</span>
                  </span>
                  {prov.prescriptions.length > 0 ? (
                    <div className="space-y-2">
                      {prov.prescriptions.map((rx) => (
                        <div key={rx.id} className="bg-slate-50 p-2.5 rounded border border-slate-200/80 text-[11px]">
                          <div className="font-bold text-slate-900">{rx.drugName}</div>
                          <div className="text-slate-600 font-mono mt-0.5">{rx.dosage}</div>
                          <div className="text-slate-500 text-[10px] mt-1">{rx.rationale}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs py-1">No active prescriptions proposed</p>
                  )}
                </div>

                {/* Row 5: Stated Prognosis & Timeline */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Prognosis & Recovery Expectations
                  </span>
                  <div className="text-slate-700 text-xs bg-slate-50 p-2.5 rounded border border-slate-100 space-y-1 leading-relaxed">
                    <p>{prov.statedPrognosis}</p>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                      <strong>Timeline:</strong> {prov.expectedTimeline}
                    </div>
                  </div>
                </div>

                {/* Row 6: Risk Trade-Offs */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Clinical Risk Envelope
                  </span>
                  <p className="text-slate-600 text-xs bg-slate-50 p-2.5 rounded border border-slate-100 leading-relaxed">
                    {prov.riskTradeoffs}
                  </p>
                </div>

                {/* Row 7: Core Clinical Philosophy */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Physician Reasoning Paradigm
                  </span>
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    {prov.coreReasoning}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divergence Vector & Root Cause Deconstruction */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-teal-400">
          <Activity className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Divergence Vector & Root Cause Analysis</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          Why did these clinicians arrive at opposing recommendations? Understanding the clinical mechanisms of divergence enables productive, non-defensive doctor discussions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {activeCase.discrepancyPoints.map((pt, idx) => (
            <div key={idx} className="bg-slate-800/90 border border-slate-700 rounded-lg p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-bold text-teal-300">{pt.dimension}</span>
                <span className="text-[10px] text-slate-400 font-mono">Vector 0{idx + 1}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">
                {pt.summaryComparison}
              </p>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 space-y-1 text-[11px]">
                <span className="text-teal-400 font-semibold block">Underlying Clinical Cause:</span>
                <p className="text-slate-400 leading-relaxed">{pt.potentialClinicalReason}</p>
              </div>
              <div className="text-[11px] text-slate-300 pt-1">
                <strong className="text-amber-300">Clarification Key:</strong> {pt.clarificationPrompt}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs text-slate-400">
          <span>Need to evaluate if any critical emergency red flags exist?</span>
          <button
            onClick={onNavigateToRedFlags}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Launch Red Flag Decision Tree →
          </button>
        </div>
      </div>

      {/* Modal: Add 3rd Opinion */}
      {showAddProviderModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>Add 3rd Medical Opinion (Doctor C / Subspecialist)</span>
              </h3>
              <button onClick={() => setShowAddProviderModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jordan Reed, MD"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Neurology / Pain Management"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Clinic / Hospital</label>
                <input
                  type="text"
                  placeholder="e.g. Tertiary Academic Health Sciences"
                  value={newClinic}
                  onChange={(e) => setNewClinic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Doctor C Diagnosis</label>
                <input
                  type="text"
                  placeholder="e.g. Diagnostic impression..."
                  value={newDiagnosis}
                  onChange={(e) => setNewDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Recommended Treatment</label>
                  <input
                    type="text"
                    placeholder="e.g. Conservative trial with monitoring"
                    value={newTreatment}
                    onChange={(e) => setNewTreatment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Treatment Type</label>
                  <select
                    value={newTreatmentType}
                    onChange={(e) => setNewTreatmentType(e.target.value as ProviderOpinion['treatmentType'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  >
                    <option value="Active Surveillance / Watchful Waiting">Active Surveillance</option>
                    <option value="Physical Therapy / Conservative">Conservative</option>
                    <option value="Pharmacological">Pharmacological</option>
                    <option value="Interventional">Interventional</option>
                    <option value="Surgical / Invasive">Surgical / Invasive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Tests & Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Blinded MRI re-read, EMG/NCS"
                  value={newTests}
                  onChange={(e) => setNewTests(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowAddProviderModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddThirdProvider}
                  className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded font-semibold cursor-pointer"
                >
                  Add to Comparison Matrix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
