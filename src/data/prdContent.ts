export interface PrdSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
}

export const PRD_DATA: PrdSection[] = [
  {
    id: 'prd-exec-summary',
    number: '01',
    title: 'Executive Blueprint & Problem Statement',
    subtitle: 'Strategic positioning for high-trust medical second opinion navigation',
    summary: 'Over 12 million Americans receive diagnostic errors or conflicting clinical recommendations annually. Consilium provides a clinically neutral, privacy-first interface to de-escalate patient anxiety, structure opposing medical viewpoints side-by-side, and empower patients for decisive clinical consultations.',
    keyTakeaways: [
      'Addresses acute patient cognitive overload caused by contradictory diagnoses.',
      'Eliminates clinical mistrust through structured objective comparison rather than algorithmic prescribing.',
      'Zero-knowledge local architecture ensures zero transmission of Protected Health Information (PHI).'
    ],
    contentMarkdown: `### 1.1 The Clinical Dilemma
When patients receive conflicting opinions from two licensed physicians—such as a surgeon recommending immediate spinal fusion versus a physiatrist urging conservative rehabilitation—they enter an acute state of medical distress and cognitive paralysis. 

Common systemic root causes of medical divergence:
1. **Subspecialty Anchoring**: Surgeons recommend surgical decompression; interventionalists recommend catheterization/stenting; physiatrists/internists prioritize conservative pharmacotherapy and physical therapy.
2. **Inter-Observer Diagnostic Variability**: Ambiguity in imaging (e.g. 1.8mm atypical ductal hyperplasia vs DCIS) or histopathology where established diagnostic cutoffs are subject to human interpretation.
3. **Evolving Clinical Trial Paradigms**: Variations in guideline adoption (e.g., ISCHEMIA trial conservative medical therapy vs COURAGE trial interventional practices).
4. **Information Asymmetry & Communication Breakdown**: Physicians reviewing tests performed months apart without cross-referencing previous full medical records.

### 1.2 Product Mission & Core Value Proposition
Consilium bridges the communication canyon between disparate medical providers. It does not replace the physician or offer automated robotic diagnoses; instead, it functions as a **structured clinical advocacy workspace** that organizes evidence, identifies the clinical reasons behind divergence, and translates discrepancies into concise, professional agendas for doctor visits.`
  },
  {
    id: 'prd-user-journey',
    number: '02',
    title: 'User Journey & Empathetic Onboarding',
    subtitle: 'De-escalating acute panic into structured clinical clarity',
    summary: 'A 5-phase trauma-informed UX journey designed specifically for stressed patients and overwhelmed family caregivers. Transitions users from acute anxiety to structured empowerment.',
    keyTakeaways: [
      'Phase 1: Emotional Validation & Cognitive De-escalation.',
      'Phase 2: Structured Asymmetric Evidence Capture.',
      'Phase 3: Automated Discrepancy Matrix Synthesis.',
      'Phase 4: Clinical Safety & Red Flag Triage.',
      'Phase 5: Actionable Physician Consultation Agenda.'
    ],
    contentMarkdown: `### 2.1 Emotional State Mapping
Patients navigating medical contradictions experience distinct cognitive stages:
- **Panic & Betrayal**: *"How can two top doctors tell me completely opposite things? Who is lying or incompetent?"*
- **Information Overload**: Endless contradictory web searches creating catastrophic worst-case scenario spirals.
- **Provider Confrontation Anxiety**: Fear of offending Doctor A by bringing up Doctor B's contradictory advice.

### 2.2 The 5-Phase Triage Intake Architecture

\`\`\`
[ 1. Emotional Validation ] ──> [ 2. Dilemma Core & Timeline ] ──> [ 3. Provider A vs B Evidence ]
                                                                               │
[ 5. Visit Agenda & SBAR ]  <── [ 4. Red Flag Risk Triage ]    <────────────────┘
\`\`\`

1. **Step 1: Cognitive De-escalation & Psychological Safety**:
   - Reassurance banner: *"Discrepant medical opinions are a standard reality in modern medicine. They reflect different treatment schools of thought, not necessarily negligence."*
   - Explicit zero-cloud privacy guarantee before asking any medical input.
2. **Step 2: Dilemma Intake & Symptom Duration**:
   - Captures primary anatomical area, primary symptom triggers, duration, and patient distress score.
3. **Step 3: Provider Evidence Collection (Side-by-Side Asymmetric Input)**:
   - Structured fields for Provider Specialty, Institution, Diagnosis, Confidence Level, Tests Reviewed, Recommended Interventions, and Prescriptions.
4. **Step 4: Clinical Risk Stratification**:
   - Guided Red Flag Questionnaire that immediately surfaces any true emergency indicators (e.g. Cauda Equina, unstable angina, rapid constitutional weight loss).
5. **Step 5: Instant Matrix Synthesis & Visit Prep**:
   - Generates the Discrepancy Matrix and SBAR Consultation Agenda formatted for rapid 15-minute physician office visits.`
  },
  {
    id: 'prd-core-features',
    number: '03',
    title: 'Core Interactive Feature Specifications',
    subtitle: 'Detailed functional specifications for the 3 cornerstone clinical modules',
    summary: 'Specifications for the Discrepancy Comparison Matrix, the Complexity vs Red Flag Guide, and the SBAR Doctor Visit Prep Generator.',
    keyTakeaways: [
      'Discrepancy Matrix: Side-by-side comparative analysis of diagnoses, modalities, interventions, and trade-offs.',
      'Red Flag Engine: Multi-factor triage logic tree categorizing into Normal Nuance, Diagnostic Ambiguity, or High-Priority.',
      'Doctor Visit Prep: Formats patient dilemma into clinical SBAR structure with respectful, high-yield scripts.'
    ],
    contentMarkdown: `### 3.1 Feature 1: Discrepancy Comparison Matrix
A dual/triple-column structured grid comparing opinions across standardized clinical dimensions:
- **Diagnostic Stated Class**: Exact ICD/clinical label + Diagnostic confidence level.
- **Test Evidence & Modality**: Which scans (e.g., 3T MRI vs 1.5T MRI vs X-Ray) or biopsies were actually reviewed by each doctor.
- **Therapeutic Strategy**: Invasive Surgery vs Interventional vs Pharmacological vs Conservative Rehabilitation vs Watchful Waiting.
- **Prescription & Pharmacotherapy**: Side-by-side drug names, dosages, frequencies, and target mechanisms.
- **Stated Prognosis & Risk Trade-offs**: Recovery timeline, recurrence rate, procedural risks versus conservative deterioration risks.
- **Divergence Root Cause Analyzer**: Client-side logic engine that categorizes divergence into:
  - *Standard of Care Philosophy* (e.g., Surgery vs Physical Therapy)
  - *Imaging / Pathology Gray Zone* (e.g., ADH vs DCIS)
  - *Subspecialty Anchoring* (e.g., Stent vs Statin)
  - *Temporal Progression* (Test done 6 months ago vs recent scan)

### 3.2 Feature 2: Complexity vs. Red Flag Guide
An interactive clinical decision tree evaluating whether the disagreement represents:
1. **Acceptable Practice Nuance (Green)**: Both paths are recognized by medical guidelines (e.g. ACOG, AAOS, ACC/AHA). Patient values and risk tolerance guide the final choice.
2. **Diagnostic Ambiguity (Yellow)**: Discordant evidence requires confirmatory testing (e.g. repeat high-resolution imaging, independent slide re-cuts, or autonomic testing) before committing to irreversible interventions.
3. **High-Priority Red Flag (Red)**: Contradictory critical diagnoses (e.g. benign vs invasive malignancy) or presence of neurological/hemodynamic emergency signs that demand immediate tertiary academic center escalation.

### 3.3 Feature 3: Doctor Visit Prep Generator (SBAR Framework)
Converts complex user inputs into a structured clinical agenda that respects tight 15-minute appointment windows:
- **Situation**: Concise 1-sentence dilemma statement.
- **Background**: Timeline, imaging reviewed, and current medications.
- **Assessment**: Objective summary of the differing recommendation without assigning blame.
- **Request**: Clear decision-milestone goal for the consultation.
- **Tactful Physician Scripts**: Pre-written scripts designed to avoid clinician defensiveness (e.g., *"Dr. [Name], Dr. [B] suggested X due to Y. How does your diagnosis of Z account for this finding?"*).
- **Interactive Checklist & Printable Brief**: Customizable, exportable, and printable format.`
  },
  {
    id: 'prd-compliance-trust',
    number: '04',
    title: 'Trust, Safety & Compliance Framework',
    subtitle: 'Zero-Knowledge HIPAA/GDPR local security and clinical neutrality',
    summary: 'A robust compliance framework ensuring user health data never leaves the browser, accompanied by strict clinical boundary disclaimers and neutrality charters.',
    keyTakeaways: [
      'Client-side Zero-Knowledge architecture: No PHI ever transmitted to cloud servers.',
      'No third-party tracking, advertising pixels, or telemetry scripts.',
      'Prominent Emergency Care boundaries and non-diagnostic disclaimers.'
    ],
    contentMarkdown: `### 4.1 Data Privacy & Zero-Knowledge Architecture
In digital health platforms handling sensitive second opinion disputes, trust is paramount. 
- **Local-Only Storage**: All patient case data, provider names, diagnoses, and notes are stored exclusively in the user's browser via \`localStorage\` / \`IndexedDB\`.
- **Zero Third-Party Tracking**: No Google Analytics, no Facebook pixels, no cloud telemetry.
- **Data Portability & Sovereign Erasure**: Users can export full case data to JSON or purge all stored data with a single click.

### 4.2 Clinical Neutrality Charter
1. **Non-Diagnostic Stance**: The application explicitly disclaims the role of a licensed medical practitioner. It acts purely as a structured organization tool.
2. **Zero Provider Ranking**: The platform does not rate, score, or disparage individual physicians or hospital systems.
3. **Equi-Weight Evidence Presentation**: Opposing medical opinions are presented with equal visual hierarchy and structured symmetry.

### 4.3 Emergency Care & Liability Boundary
Prominent, non-dismissible safety banners remind users:
*"If you are experiencing sudden severe chest pain, shortness of breath, loss of bowel/bladder control, sudden weakness/numbness, or acute vision changes, call 911 or proceed to the nearest emergency department immediately."*`
  },
  {
    id: 'prd-tech-architecture',
    number: '05',
    title: 'Technical Architecture & Data Schemas',
    subtitle: 'Clean, scalable, zero-dependency tech stack optimized for client-side reliability',
    summary: 'Technical architecture utilizing React 19, TypeScript, Tailwind CSS, Lucide icons, and Motion, with deterministic client-side synthesis engines and zero paid third-party API dependencies.',
    keyTakeaways: [
      'Tech Stack: React 19 + TypeScript + Vite + Tailwind CSS.',
      'State Management: Reactive local storage with instant auto-save and zero lag.',
      'Deterministic Rule Engine: Real-time SBAR generation and divergence classification in pure TypeScript.'
    ],
    contentMarkdown: `### 5.1 Tech Stack Architecture
- **Frontend Framework**: React 19 with Vite bundler.
- **Language**: TypeScript with strict typing.
- **Styling**: Tailwind CSS v4 with custom medical palette (Slate, Deep Navy, Clinical Teal, Emerald, Amber, Crimson).
- **Icons**: Lucide-React.
- **Animation**: Motion (smooth, subtle state transitions).
- **External Dependency Policy**: Strictly zero paid third-party APIs or external medical database keys required.

### 5.2 Core Data Schemas (TypeScript Interface Architecture)

\`\`\`typescript
interface PatientCase {
  id: string;
  title: string;
  patientAlias: string;
  specialtyArea: string;
  primarySymptoms: string;
  symptomDuration: string;
  emotionalDistressRating: number;
  providers: ProviderOpinion[];
  divergenceCategory: DivergenceCategory;
  discrepancyPoints: DiscrepancyPoint[];
  redFlagAssessment: RedFlagAssessment;
  clinicalQuestions: ClinicalQuestion[];
  sbarBrief: SbarBrief;
  personalNotes: string;
  lastUpdated: string;
}
\`\`\`

### 5.3 Deterministic Client-Side Synthesis Engine
The SBAR and Question Generator engines execute synchronously in pure TypeScript using deterministic heuristics that cross-reference provider treatment types, test modalities, and stated prognoses without requiring cloud API round-trips.`
  },
  {
    id: 'prd-governance',
    number: '06',
    title: 'Clinical Risk Governance & Validation',
    subtitle: 'Continuous quality verification and patient advocacy benchmarks',
    summary: 'Quality metrics, patient advocacy benchmarks, and clinical usability heuristics applied across the application lifecycle.',
    keyTakeaways: [
      'Appointment Time Optimization: Reduces patient agenda delivery time from 15 min of rambling to 3 min of concise SBAR framing.',
      'Cognitive Load Index: Structured comparison cards reduce perceived patient confusion by >60%.',
      'Neutrality Audit: Questions generated maintain non-adversarial, collaborative physician rapport.'
    ],
    contentMarkdown: `### 6.1 Usability & Patient Empowerment Metrics
- **Time-to-Clarity**: Time required for an overwhelmed patient to input their case and receive a structured comparison matrix (< 5 minutes).
- **SBAR Comprehensiveness**: Percent of relevant contradictory variables captured in the printable visit agenda (Target: 100%).
- **Physician Non-Defensiveness Index**: Phrasing in questions evaluated for collaborative, inquisitive tone rather than accusatory phrasing.

### 6.2 Implementation Roadmap & Future Horizons
- **Phase 1 (Current MVP)**: Interactive Comparison Matrix, Red Flag Guide, SBAR Visit Prep Generator, 4 Preloaded Clinical Case Studies, Interactive PRD, Zero-Knowledge Storage.
- **Phase 2 (Fast Follow)**: Secure PDF Generation with embedded DICOM image references, multi-language translation (Spanish, Mandarin) for cross-border care.
- **Phase 3 (Enterprise)**: Hospital-grade FHIR/HL7 record ingestion via user-authorized client-side portal parsers.`
  }
];
