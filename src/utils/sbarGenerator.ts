import { PatientCase, SbarBrief, ClinicalQuestion, ProviderOpinion, DiscrepancyPoint, DivergenceCategory } from '../types/medical';

export function generateSbarFromCase(patientCase: Partial<PatientCase>): SbarBrief {
  const patientName = patientCase.patientAlias || 'Patient';
  const age = patientCase.patientAge ? `${patientCase.patientAge}yo` : '';
  const symptoms = patientCase.primarySymptoms || 'unresolved clinical symptoms';
  const duration = patientCase.symptomDuration ? ` (${patientCase.symptomDuration})` : '';
  
  const providers = patientCase.providers || [];
  const pA = providers[0];
  const pB = providers[1];

  const provASummary = pA 
    ? `${pA.providerRole || pA.doctorName || 'Doctor A'} diagnosed "${pA.diagnosis || 'Diagnosis A'}" and recommended ${pA.recommendedTreatment || 'Treatment A'}.`
    : 'Doctor A provided initial diagnostic impression and treatment plan.';
    
  const provBSummary = pB
    ? `${pB.providerRole || pB.doctorName || 'Doctor B'} diagnosed "${pB.diagnosis || 'Diagnosis B'}" and recommended ${pB.recommendedTreatment || 'Treatment B'}.`
    : 'Doctor B provided a divergent second opinion.';

  const situation = `${patientName}${age ? ` (${age})` : ''} presenting with ${symptoms}${duration}, navigating divergent medical recommendations regarding diagnostic clarity and treatment path.`;
  const background = `${provASummary} In contrast, ${provBSummary}`;
  const assessment = `The primary divergence centers on ${patientCase.divergenceCategory || 'differing clinical treatment approaches'} and differing interpretations of clinical evidence and risk/benefit profiles.`;
  const request = `Reconcile the differing perspectives, establish clear objective criteria for conservative vs invasive escalation, and agree upon an actionable management protocol.`;

  return { situation, background, assessment, request };
}

export function generateClinicalQuestions(patientCase: Partial<PatientCase>): ClinicalQuestion[] {
  const providers = patientCase.providers || [];
  const pA = providers[0];
  const pB = providers[1];
  const questions: ClinicalQuestion[] = [];

  if (pA && pB) {
    questions.push({
      id: `cq-gen-1-${Date.now()}`,
      category: 'Second Opinion Reconciliation',
      targetDoctorLabel: pA.providerRole || 'Doctor A',
      question: `${pA.doctorName || 'Doctor A'}, ${pB.doctorName || 'Doctor B'} (${pB.specialty || 'Second Specialist'}) recommended "${pB.recommendedTreatment}" based on their assessment of my condition. How do you weigh their reasoning against your recommendation for "${pA.recommendedTreatment}"?`,
      whyThisMatters: 'Directly addresses the primary discrepancy in a respectful, objective manner.',
      physicianFriendlyScript: `I have great respect for your expertise. I consulted with ${pB.specialty || 'another specialist'} who suggested a different approach (${pB.recommendedTreatment}). Could you help me understand how your recommendation compares to theirs?`,
      isSelected: true
    });

    questions.push({
      id: `cq-gen-2-${Date.now()}`,
      category: 'Treatment Trade-Offs',
      targetDoctorLabel: pB.providerRole || 'Doctor B',
      question: `${pB.doctorName || 'Doctor B'}, if I follow your recommendation of "${pB.recommendedTreatment}", what specific timeline and measurable milestones should we use to confirm it is working, and when would we need to reconsider?`,
      whyThisMatters: 'Establishes clear criteria for measuring success or pivoting treatment.',
      physicianFriendlyScript: 'What is our expected timeline to evaluate progress, and what clinical markers will indicate whether this plan is succeeding?',
      isSelected: true
    });

    questions.push({
      id: `cq-gen-3-${Date.now()}`,
      category: 'Diagnostic Verification',
      targetDoctorLabel: 'Both Clinicians',
      question: `Are there any additional confirmatory diagnostic tests (e.g., specialized imaging, repeat labs, or independent pathology review) that could definitively clarify the disagreement between "${pA.diagnosis}" and "${pB.diagnosis}"?`,
      whyThisMatters: 'Determines if objective diagnostic testing can resolve the ambiguity.',
      physicianFriendlyScript: 'Is there a specific test or third review that could provide objective clarity between these two diagnoses?',
      isSelected: true
    });
  } else {
    questions.push({
      id: `cq-gen-default-${Date.now()}`,
      category: 'Diagnostic Verification',
      targetDoctorLabel: 'Primary Clinician',
      question: 'What are the main alternative diagnoses you considered, and what test findings led you to prioritize this specific diagnosis?',
      whyThisMatters: 'Clarifies the differential diagnostic reasoning.',
      physicianFriendlyScript: 'Could you walk me through the key reasons you reached this diagnosis over other possible explanations?',
      isSelected: true
    });
  }

  return questions;
}

export function autoDetectDivergence(providers: ProviderOpinion[]): { category: DivergenceCategory; points: DiscrepancyPoint[] } {
  if (providers.length < 2) {
    return {
      category: 'Standard Practice Variation',
      points: []
    };
  }

  const pA = providers[0];
  const pB = providers[1];
  const points: DiscrepancyPoint[] = [];

  let category: DivergenceCategory = 'Therapeutic Philosophy (Aggressive vs Conservative)';

  // Compare diagnoses
  if (pA.diagnosis.toLowerCase() !== pB.diagnosis.toLowerCase()) {
    if (pA.diagnosis.toLowerCase().includes('carcinoma') || pA.diagnosis.toLowerCase().includes('hyperplasia') || pA.testsReviewed.some(t => t.toLowerCase().includes('biopsy') || t.toLowerCase().includes('pathology'))) {
      category = 'Imaging / Pathology Discrepancy';
    } else {
      category = 'Diagnostic Ambiguity';
    }
  } else if (pA.treatmentType !== pB.treatmentType) {
    category = 'Therapeutic Philosophy (Aggressive vs Conservative)';
  }

  points.push({
    dimension: 'Primary Diagnosis & Classification',
    summaryComparison: `${pA.providerRole}: "${pA.diagnosis}" vs. ${pB.providerRole}: "${pB.diagnosis}"`,
    providerViews: {
      [pA.id]: pA.diagnosis,
      [pB.id]: pB.diagnosis
    },
    potentialClinicalReason: 'Diagnostic framing and threshold differences between clinical specialties.',
    clarificationPrompt: 'What specific clinical markers or imaging findings differentiate these two diagnoses?'
  });

  points.push({
    dimension: 'Recommended Therapeutic Strategy',
    summaryComparison: `${pA.providerRole}: ${pA.recommendedTreatment} (${pA.treatmentType}) vs. ${pB.providerRole}: ${pB.recommendedTreatment} (${pB.treatmentType})`,
    providerViews: {
      [pA.id]: pA.recommendedTreatment,
      [pB.id]: pB.recommendedTreatment
    },
    potentialClinicalReason: 'Differing specialty practice paradigms (Interventional/Surgical vs Medical/Conservative Management).',
    clarificationPrompt: 'If we choose the more conservative path first, what is the risk of delaying the more invasive option?'
  });

  if (pA.prescriptions.length > 0 || pB.prescriptions.length > 0) {
    const rxA = pA.prescriptions.map(p => p.drugName).join(', ') || 'No active medications';
    const rxB = pB.prescriptions.map(p => p.drugName).join(', ') || 'No active medications';
    points.push({
      dimension: 'Pharmacotherapy & Medication Regimen',
      summaryComparison: `${pA.providerRole}: ${rxA} vs. ${pB.providerRole}: ${rxB}`,
      providerViews: {
        [pA.id]: rxA,
        [pB.id]: rxB
      },
      potentialClinicalReason: 'Symptom palliation vs disease-modifying or neuro-modulating drug targets.',
      clarificationPrompt: 'Do any of these proposed medications interact or duplicate therapeutic goals?'
    });
  }

  return { category, points };
}
