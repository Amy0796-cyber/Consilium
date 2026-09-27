import React, { useState } from 'react';
import { 
  X, 
  HeartHandshake, 
  User, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react';
import { PatientCase, ProviderOpinion, PrescriptionItem, ConfidenceLevel } from '../types/medical';
import { generateSbarFromCase, generateClinicalQuestions, autoDetectDivergence } from '../utils/sbarGenerator';

interface EmpatheticIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCase: (newCase: PatientCase) => void;
}

export const EmpatheticIntakeModal: React.FC<EmpatheticIntakeModalProps> = ({
  isOpen,
  onClose,
  onSaveCase
}) => {
  const [step, setStep] = useState<number>(1);

  // Step 2: Patient Context
  const [patientAlias, setPatientAlias] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [specialtyArea, setSpecialtyArea] = useState('Orthopedics / Spine');
  const [primarySymptoms, setPrimarySymptoms] = useState('');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [emotionalDistress, setEmotionalDistress] = useState<number>(7);
  const [dilemmaTitle, setDilemmaTitle] = useState('');

  // Step 3: Doctor A
  const [docAName, setDocAName] = useState('');
  const [docASpecialty, setDocASpecialty] = useState('');
  const [docAClinic, setDocAClinic] = useState('');
  const [docADiagnosis, setDocADiagnosis] = useState('');
  const [docAConfidence, setDocAConfidence] = useState<ConfidenceLevel>('High');
  const [docATests, setDocATests] = useState('');
  const [docATreatment, setDocATreatment] = useState('');
  const [docATreatmentType, setDocATreatmentType] = useState<ProviderOpinion['treatmentType']>('Surgical / Invasive');
  const [docARxList, setDocARxList] = useState<PrescriptionItem[]>([
    { id: '1', drugName: '', dosage: '', frequency: '', rationale: '' }
  ]);
  const [docAReasoning, setDocAReasoning] = useState('');

  // Step 4: Doctor B
  const [docBName, setDocBName] = useState('');
  const [docBSpecialty, setDocBSpecialty] = useState('');
  const [docBClinic, setDocBClinic] = useState('');
  const [docBDiagnosis, setDocBDiagnosis] = useState('');
  const [docBConfidence, setDocBConfidence] = useState<ConfidenceLevel>('High');
  const [docBTests, setDocBTests] = useState('');
  const [docBTreatment, setDocBTreatment] = useState('');
  const [docBTreatmentType, setDocBTreatmentType] = useState<ProviderOpinion['treatmentType']>('Physical Therapy / Conservative');
  const [docBRxList, setDocBRxList] = useState<PrescriptionItem[]>([
    { id: '1', drugName: '', dosage: '', frequency: '', rationale: '' }
  ]);
  const [docBReasoning, setDocBReasoning] = useState('');

  if (!isOpen) return null;

  const handleAddRxA = () => {
    setDocARxList([...docARxList, { id: `${Date.now()}`, drugName: '', dosage: '', frequency: '', rationale: '' }]);
  };
  const handleRemoveRxA = (id: string) => {
    setDocARxList(docARxList.filter(r => r.id !== id));
  };

  const handleAddRxB = () => {
    setDocBRxList([...docBRxList, { id: `${Date.now()}`, drugName: '', dosage: '', frequency: '', rationale: '' }]);
  };
  const handleRemoveRxB = (id: string) => {
    setDocBRxList(docBRxList.filter(r => r.id !== id));
  };

  const handleFinalSubmit = () => {
    const p1: ProviderOpinion = {
      id: `prov-a-${Date.now()}`,
      providerRole: 'Doctor A (First Opinion)',
      doctorName: docAName || 'Doctor A',
      specialty: docASpecialty || 'Primary Specialist',
      clinicOrHospital: docAClinic || 'First Clinic',
      visitDate: new Date().toISOString().slice(0, 10),
      diagnosis: docADiagnosis || 'Primary Diagnostic Impression',
      diagnosticConfidence: docAConfidence,
      testsReviewed: docATests ? docATests.split(',').map(t => t.trim()) : ['Physical Examination', 'Routine Diagnostics'],
      testInterpretationNotes: `Reviewed ${docATests || 'clinical symptoms and baseline tests'} and diagnosed ${docADiagnosis || 'the condition'}.`,
      recommendedTreatment: docATreatment || 'Initial standard treatment',
      treatmentType: docATreatmentType,
      prescriptions: docARxList.filter(r => r.drugName.trim() !== ''),
      statedPrognosis: 'Follow recommended therapeutic protocol for expected recovery.',
      expectedTimeline: '2-4 weeks evaluation',
      riskTradeoffs: 'Standard procedural and treatment trade-offs.',
      coreReasoning: docAReasoning || 'Based on clinical presentation and exam.'
    };

    const p2: ProviderOpinion = {
      id: `prov-b-${Date.now()}`,
      providerRole: 'Doctor B (Second Opinion)',
      doctorName: docBName || 'Doctor B',
      specialty: docBSpecialty || 'Second Specialist',
      clinicOrHospital: docBClinic || 'Second Clinic',
      visitDate: new Date().toISOString().slice(0, 10),
      diagnosis: docBDiagnosis || 'Second Diagnostic Impression',
      diagnosticConfidence: docBConfidence,
      testsReviewed: docBTests ? docBTests.split(',').map(t => t.trim()) : ['Second Review of Diagnostics'],
      testInterpretationNotes: `Independent assessment regarding ${docBDiagnosis || 'the diagnosis'}.`,
      recommendedTreatment: docBTreatment || 'Alternative treatment pathway',
      treatmentType: docBTreatmentType,
      prescriptions: docBRxList.filter(r => r.drugName.trim() !== ''),
      statedPrognosis: 'Alternative clinical outcome projection.',
      expectedTimeline: '4-8 weeks follow up',
      riskTradeoffs: 'Alternative conservative/interventional risks.',
      coreReasoning: docBReasoning || 'Alternative interpretation of test results and natural disease progression.'
    };

    const detected = autoDetectDivergence([p1, p2]);

    const partialCase: Partial<PatientCase> = {
      id: `case-${Date.now()}`,
      title: dilemmaTitle || `${specialtyArea}: ${docADiagnosis || 'Opinion A'} vs ${docBDiagnosis || 'Opinion B'}`,
      patientAlias: patientAlias || 'Patient',
      patientAge: patientAge || '45',
      specialtyArea: specialtyArea,
      primarySymptoms: primarySymptoms || 'Unresolved symptoms causing clinical divergence',
      symptomDuration: symptomDuration || 'Recent onset',
      emotionalDistressRating: emotionalDistress,
      providers: [p1, p2],
      divergenceCategory: detected.category,
      discrepancyPoints: detected.points,
      personalNotes: `Dilemma logged on ${new Date().toLocaleDateString()}. Discrepancy between ${p1.doctorName} (${p1.specialty}) and ${p2.doctorName} (${p2.specialty}).`,
      lastUpdated: new Date().toISOString(),
      redFlagAssessment: {
        completed: false,
        selectedFlagIds: [],
        urgencyLevel: 'Standard Nuance',
        rationale: 'Initial intake completed. Complete the Red Flag Guide to evaluate clinical urgency indicators.',
        recommendedNextStep: 'Review side-by-side comparison matrix and run the Red Flag Guide.',
        keySafetyNotes: ['Seek emergency care if severe new symptoms arise.']
      }
    };

    const sbar = generateSbarFromCase(partialCase);
    const questions = generateClinicalQuestions(partialCase);

    const fullCase: PatientCase = {
      ...partialCase,
      sbarBrief: sbar,
      clinicalQuestions: questions
    } as PatientCase;

    onSaveCase(fullCase);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="text-base font-semibold">Structured Clinical Dilemma Intake</h2>
              <p className="text-xs text-slate-400">Step {step} of 4 · Guided Cognitive De-escalation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          <div className={`h-full transition-all duration-300 ${
            step === 1 ? 'w-1/4 bg-teal-500' :
            step === 2 ? 'w-2/4 bg-teal-500' :
            step === 3 ? 'w-3/4 bg-teal-500' : 'w-full bg-teal-600'
          }`} />
        </div>

        {/* Step Contents */}
        <div className="p-6">
          {/* STEP 1: Psychological Validation & Emotional De-escalation */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-teal-50/70 border border-teal-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-teal-900">
                      When Doctors Disagree, You Are Not Alone.
                    </h3>
                    <p className="text-xs text-teal-800 mt-1.5 leading-relaxed">
                      Receiving contradictory diagnoses or conflicting treatment plans is terrifying. 
                      However, medical disagreement is very common and often stems from differences in subspecialty training, 
                      clinical guidelines, or borderline test thresholds—not necessarily doctor error.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">How Consilium Helps You Navigate This:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="font-semibold text-slate-900 block mb-1">1. Structure Evidence</span>
                    <span className="text-slate-600">Break down Doctor A vs. Doctor B diagnoses, MRI/lab reviews, and medications side-by-side.</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="font-semibold text-slate-900 block mb-1">2. Red Flag Triage</span>
                    <span className="text-slate-600">Verify whether the conflict is a normal clinical nuance or requires urgent tertiary escalation.</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="font-semibold text-slate-900 block mb-1">3. Doctor Visit Agenda</span>
                    <span className="text-slate-600">Generate respectful, high-yield clinical questions formatted for 15-minute consultations.</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>100% Client-Side Encrypted: No health data is uploaded to remote cloud servers.</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <span>Begin Structured Intake</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Patient Context & Dilemma Core */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-700" />
                  <span>Step 2: Patient Context & Dilemma Overview</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Help us understand the symptoms and clinical context behind this second opinion dilemma.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Patient Alias / Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Elena R. or Myself"
                    value={patientAlias}
                    onChange={(e) => setPatientAlias(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Age & Gender</label>
                  <input
                    type="text"
                    placeholder="e.g. 48, Female"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Medical Specialty Area</label>
                  <select
                    value={specialtyArea}
                    onChange={(e) => setSpecialtyArea(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="Orthopedics / Spine">Orthopedics / Spine Surgery</option>
                    <option value="Cardiology / Interventional">Cardiology & Vascular</option>
                    <option value="Oncology / Pathology">Oncology / Biopsy & Pathology</option>
                    <option value="Neurology / Rheumatology">Neurology & Rheumatology</option>
                    <option value="Gastroenterology / Surgery">Gastroenterology & General Surgery</option>
                    <option value="Endocrinology / Metabolic">Endocrinology & Thyroid</option>
                    <option value="Other Complex Dilemma">Other Multi-Specialist Dilemma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Dilemma Summary Title</label>
                  <input
                    type="text"
                    placeholder="e.g. L5 Disc Surgery vs Conservative Physio"
                    value={dilemmaTitle}
                    onChange={(e) => setDilemmaTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Symptoms & Functional Impact</label>
                <textarea
                  rows={2}
                  placeholder="Describe the main pain, mobility limitation, or symptom triggers..."
                  value={primarySymptoms}
                  onChange={(e) => setPrimarySymptoms(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Symptom Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 8 weeks, 6 months, 2 years"
                    value={symptomDuration}
                    onChange={(e) => setSymptomDuration(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-700">Emotional Distress Level</label>
                    <span className="text-xs font-mono font-semibold text-teal-700">{emotionalDistress} / 10</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={emotionalDistress}
                    onChange={(e) => setEmotionalDistress(parseInt(e.target.value))}
                    className="w-full accent-teal-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Mild Uncertainty</span>
                    <span>Acute Panic & Paralysis</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next: Doctor A's Opinion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Doctor A Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  <span>Step 3: Doctor A (First Medical Opinion)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter what the first doctor or hospital diagnosed and recommended.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Doctor Name & Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Arthur Vance, MD"
                    value={docAName}
                    onChange={(e) => setDocAName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Spine Surgery / Orthopedics"
                    value={docASpecialty}
                    onChange={(e) => setDocASpecialty(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Clinic / Hospital</label>
                  <input
                    type="text"
                    placeholder="e.g. Metro Spine Center"
                    value={docAClinic}
                    onChange={(e) => setDocAClinic(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Doctor A's Diagnosis</label>
                  <input
                    type="text"
                    placeholder="e.g. L5-S1 Extruded Disc with Nerve Impingement"
                    value={docADiagnosis}
                    onChange={(e) => setDocADiagnosis(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Diagnostic Confidence</label>
                  <select
                    value={docAConfidence}
                    onChange={(e) => setDocAConfidence(e.target.value as ConfidenceLevel)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="High">High Confidence (Definitive)</option>
                    <option value="Moderate">Moderate Confidence (Probable)</option>
                    <option value="Tentative">Tentative / Working Hypothesis</option>
                    <option value="Rule-Out Hypothesis">Rule-Out / Preliminary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Recommended Treatment / Procedure</label>
                  <input
                    type="text"
                    placeholder="e.g. L5-S1 Microdiscectomy Surgery"
                    value={docATreatment}
                    onChange={(e) => setDocATreatment(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Treatment Classification</label>
                  <select
                    value={docATreatmentType}
                    onChange={(e) => setDocATreatmentType(e.target.value as ProviderOpinion['treatmentType'])}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Surgical / Invasive">Surgical / Invasive Procedure</option>
                    <option value="Interventional">Interventional (Injections, Catheters)</option>
                    <option value="Pharmacological">Pharmacological (Prescription Meds)</option>
                    <option value="Physical Therapy / Conservative">Physical Therapy / Conservative</option>
                    <option value="Active Surveillance / Watchful Waiting">Active Surveillance / Watchful Waiting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Tests & Evidence Reviewed (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Lumbar MRI 1.5T, Standing X-Rays, Physical Exam"
                  value={docATests}
                  onChange={(e) => setDocATests(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Why Doctor A recommends this (Core Reasoning)</label>
                <input
                  type="text"
                  placeholder="e.g. Believes waiting risks permanent nerve damage; wants fast relief."
                  value={docAReasoning}
                  onChange={(e) => setDocAReasoning(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Doctor A Prescriptions */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Doctor A Prescriptions (Optional)</span>
                  <button
                    type="button"
                    onClick={handleAddRxA}
                    className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Medication</span>
                  </button>
                </div>
                {docARxList.map((rx, idx) => (
                  <div key={rx.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Medication name (e.g. Medrol Dosepak)"
                      value={rx.drugName}
                      onChange={(e) => {
                        const updated = [...docARxList];
                        updated[idx].drugName = e.target.value;
                        setDocARxList(updated);
                      }}
                      className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="Dosage & frequency"
                      value={rx.dosage}
                      onChange={(e) => {
                        const updated = [...docARxList];
                        updated[idx].dosage = e.target.value;
                        setDocARxList(updated);
                      }}
                      className="w-48 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {docARxList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRxA(rx.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1.5 px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <span>Next: Doctor B's Second Opinion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Doctor B Details & Contradiction */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  <span>Step 4: Doctor B (Second Medical Opinion & Discrepancy)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter what the second doctor diagnosed and how their proposed plan differs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Doctor Name & Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Sarah Lin, MD"
                    value={docBName}
                    onChange={(e) => setDocBName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Physiatry / PM&R"
                    value={docBSpecialty}
                    onChange={(e) => setDocBSpecialty(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Clinic / Hospital</label>
                  <input
                    type="text"
                    placeholder="e.g. University Spine Care"
                    value={docBClinic}
                    onChange={(e) => setDocBClinic(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Doctor B's Diagnosis</label>
                  <input
                    type="text"
                    placeholder="e.g. L5-S1 Radiculopathy (Motor Strength Intact 5/5)"
                    value={docBDiagnosis}
                    onChange={(e) => setDocBDiagnosis(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Diagnostic Confidence</label>
                  <select
                    value={docBConfidence}
                    onChange={(e) => setDocBConfidence(e.target.value as ConfidenceLevel)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="High">High Confidence (Definitive)</option>
                    <option value="Moderate">Moderate Confidence (Probable)</option>
                    <option value="Tentative">Tentative / Working Hypothesis</option>
                    <option value="Rule-Out Hypothesis">Rule-Out / Preliminary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Recommended Treatment / Procedure</label>
                  <input
                    type="text"
                    placeholder="e.g. Epidural Injection + 6-8 weeks Physical Therapy"
                    value={docBTreatment}
                    onChange={(e) => setDocBTreatment(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Treatment Classification</label>
                  <select
                    value={docBTreatmentType}
                    onChange={(e) => setDocBTreatmentType(e.target.value as ProviderOpinion['treatmentType'])}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="Physical Therapy / Conservative">Physical Therapy / Conservative</option>
                    <option value="Interventional">Interventional (Injections, Catheters)</option>
                    <option value="Pharmacological">Pharmacological (Prescription Meds)</option>
                    <option value="Surgical / Invasive">Surgical / Invasive Procedure</option>
                    <option value="Active Surveillance / Watchful Waiting">Active Surveillance / Watchful Waiting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Tests & Evidence Reviewed (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Lumbar MRI, Comprehensive Motor Exam"
                  value={docBTests}
                  onChange={(e) => setDocBTests(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Why Doctor B recommends this (Core Reasoning)</label>
                <input
                  type="text"
                  placeholder="e.g. 80% heal spontaneously without surgery; wants to avoid surgical scarring."
                  value={docBReasoning}
                  onChange={(e) => setDocBReasoning(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Doctor B Prescriptions */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Doctor B Prescriptions (Optional)</span>
                  <button
                    type="button"
                    onClick={handleAddRxB}
                    className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Medication</span>
                  </button>
                </div>
                {docBRxList.map((rx, idx) => (
                  <div key={rx.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Medication name (e.g. Gabapentin 300mg)"
                      value={rx.drugName}
                      onChange={(e) => {
                        const updated = [...docBRxList];
                        updated[idx].drugName = e.target.value;
                        setDocBRxList(updated);
                      }}
                      className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="Dosage & frequency"
                      value={rx.dosage}
                      onChange={(e) => {
                        const updated = [...docBRxList];
                        updated[idx].dosage = e.target.value;
                        setDocBRxList(updated);
                      }}
                      className="w-48 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {docBRxList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRxB(rx.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-teal-200" />
                  <span>Synthesize & Build Matrix</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
