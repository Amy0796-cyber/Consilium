import { RedFlagQuestion } from '../types/medical';

export const RED_FLAG_QUESTIONS: RedFlagQuestion[] = [
  {
    id: 'rf-cauda-equina',
    category: 'Neurological',
    prompt: 'Any sudden loss of bowel or bladder control, numbness in the groin/saddle area, or progressive foot drop/paralysis?',
    explanation: 'Saddle anesthesia and acute sphincter dysfunction signal Cauda Equina Syndrome or acute spinal cord compression, which require emergency surgical decompression within 24-48 hours.',
    severity: 'Urgent Emergency'
  },
  {
    id: 'rf-chest-pain-rest',
    category: 'Organ Function',
    prompt: 'Chest pain or pressure occurring at rest, lasting >10 minutes, or accompanied by diaphoresis (sweating), syncope (fainting), or radiating to the jaw/arm?',
    explanation: 'Unstable resting chest pain or hemodynamic compromise indicates potential Acute Coronary Syndrome (ACS), requiring immediate emergency department evaluation rather than outpatient consultation.',
    severity: 'Urgent Emergency'
  },
  {
    id: 'rf-discordant-malignancy',
    category: 'Pathology & Tissue',
    prompt: 'Is there a direct contradiction between a "Benign" pathology report and a "High-Grade Malignant / Invasive" pathology report from the same tissue specimen?',
    explanation: 'Pathology discordance where one pathologist identifies invasive malignancy requires immediate blinded tertiary pathology consensus review before irreversible surgical resection or delay.',
    severity: 'High-Priority Specialist'
  },
  {
    id: 'rf-systemic-red-flags',
    category: 'Systemic & Constitutional',
    prompt: 'Unexplained rapid weight loss (>10% of body weight in 3 months), drenching night sweats, persistent high fever (>101°F / 38.3°C), or new severe bone pain?',
    explanation: 'B-symptoms and severe constitutional deterioration may signify occult malignancy, systemic vasculitis, or deep-seated infection that takes precedence over chronic symptom management.',
    severity: 'High-Priority Specialist'
  },
  {
    id: 'rf-drug-interaction',
    category: 'Treatment Toxicity',
    prompt: 'Were you prescribed contradicting medications that interact dangerously (e.g., dual anticoagulation without monitoring, concurrent high-dose NSAIDs with active peptic ulcer, or duplicate CNS depressants)?',
    explanation: 'Medication regimens from independent physicians who did not reconcile prescriptions create severe adverse drug event (ADE) risks that must be immediately audited by a clinical pharmacist or primary physician.',
    severity: 'High-Priority Specialist'
  },
  {
    id: 'rf-acute-vision-loss',
    category: 'Neurological',
    prompt: 'Sudden painless vision loss, acute double vision (diplopia), or severe thunderclap headache reaching maximum intensity in seconds?',
    explanation: 'These neurological indicators suggest temporal arteritis, acute stroke, or intracranial hemorrhage requiring immediate emergency assessment.',
    severity: 'Urgent Emergency'
  }
];
