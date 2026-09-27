export type DivergenceCategory =
  | 'Standard Practice Variation'
  | 'Diagnostic Ambiguity'
  | 'Imaging / Pathology Discrepancy'
  | 'Therapeutic Philosophy (Aggressive vs Conservative)'
  | 'Disease Progression Timing'
  | 'Subspecialty Perspective Gap';

export type ConfidenceLevel = 'High' | 'Moderate' | 'Tentative' | 'Rule-Out Hypothesis';

export interface PrescriptionItem {
  id: string;
  drugName: string;
  dosage: string;
  frequency: string;
  rationale: string;
}

export interface ProviderOpinion {
  id: string;
  providerRole: string; // e.g. "Doctor A (Primary Care)" or "Doctor B (Spine Surgeon)"
  doctorName: string;
  specialty: string;
  clinicOrHospital: string;
  visitDate: string;
  diagnosis: string;
  diagnosticConfidence: ConfidenceLevel;
  testsReviewed: string[];
  testInterpretationNotes: string;
  recommendedTreatment: string;
  treatmentType: 'Surgical / Invasive' | 'Interventional' | 'Pharmacological' | 'Physical Therapy / Conservative' | 'Active Surveillance / Watchful Waiting';
  prescriptions: PrescriptionItem[];
  statedPrognosis: string;
  expectedTimeline: string;
  riskTradeoffs: string;
  coreReasoning: string;
}

export interface DiscrepancyPoint {
  dimension: string; // e.g., "Primary Diagnosis", "Key Test Evidence", "Recommended Action", "Medication Strategy", "Risk Profile"
  summaryComparison: string;
  providerViews: { [providerId: string]: string };
  potentialClinicalReason: string;
  clarificationPrompt: string;
}

export interface RedFlagQuestion {
  id: string;
  category: 'Neurological' | 'Systemic & Constitutional' | 'Pathology & Tissue' | 'Organ Function' | 'Treatment Toxicity';
  prompt: string;
  explanation: string;
  severity: 'Urgent Emergency' | 'High-Priority Specialist' | 'Routine Clinical Nuance';
}

export interface RedFlagAssessment {
  completed: boolean;
  selectedFlagIds: string[];
  urgencyLevel: 'Standard Nuance' | 'Diagnostic Ambiguity' | 'High-Priority Specialist Review' | 'Emergency Escalation';
  rationale: string;
  recommendedNextStep: string;
  keySafetyNotes: string[];
}

export interface ClinicalQuestion {
  id: string;
  category: 'Diagnostic Verification' | 'Treatment Trade-Offs' | 'Test Clarification' | 'Second Opinion Reconciliation' | 'Prognosis & Watchful Waiting';
  targetDoctorLabel: string;
  question: string;
  whyThisMatters: string;
  physicianFriendlyScript: string;
  isSelected: boolean;
  isCustom?: boolean;
}

export interface SbarBrief {
  situation: string;
  background: string;
  assessment: string;
  request: string;
}

export interface PatientCase {
  id: string;
  title: string;
  patientAlias: string;
  patientAge: string;
  patientGender?: string;
  specialtyArea: string;
  primarySymptoms: string;
  symptomDuration: string;
  emotionalDistressRating: number; // 1-10
  providers: ProviderOpinion[];
  divergenceCategory: DivergenceCategory;
  discrepancyPoints: DiscrepancyPoint[];
  redFlagAssessment: RedFlagAssessment;
  clinicalQuestions: ClinicalQuestion[];
  sbarBrief: SbarBrief;
  personalNotes: string;
  lastUpdated: string;
  isPreloaded?: boolean;
}
