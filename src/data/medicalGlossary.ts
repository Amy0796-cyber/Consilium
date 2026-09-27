export interface GlossaryTerm {
  term: string;
  pronunciation?: string;
  category: 'Diagnostic Concepts' | 'Clinical Practice' | 'Patient Advocacy' | 'Biopsies & Imaging';
  definition: string;
  patientTakeaway: string;
  clinicalExample: string;
}

export const MEDICAL_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Inter-Observer Variability',
    category: 'Diagnostic Concepts',
    definition: 'The difference in interpretations, measurements, or diagnoses made by two or more qualified clinicians when examining the exact same clinical evidence, MRI scan, or pathology slide.',
    patientTakeaway: 'Medicine is an interpretive science. Two excellent board-certified specialists can legitimately see different nuances in the same MRI slice or biopsy stain.',
    clinicalExample: 'One radiologist notes a "moderate 5mm disc bulge with mild effacement", while another terms it a "severe extrusion with nerve root impingement".'
  },
  {
    term: 'Standard of Care Divergence',
    category: 'Clinical Practice',
    definition: 'When multiple established, guideline-supported treatment strategies exist for the same condition, ranging from aggressive early intervention to conservative watchful waiting.',
    patientTakeaway: 'Disagreement between doctors does not automatically mean one doctor is incompetent; they may simply favor different guideline-approved treatment schools of thought.',
    clinicalExample: 'A surgeon recommends immediate arthroscopic knee surgery while a physiatrist recommends 12 weeks of structured physical therapy and hyaluronic acid injections.'
  },
  {
    term: 'Diagnostic Ambiguity / Gray Zone',
    category: 'Diagnostic Concepts',
    definition: 'A clinical scenario where physical symptoms and diagnostic test findings fall near borderline thresholds (e.g., intermediate lesion size or borderline antibody titers), preventing a definitive 100% classification.',
    patientTakeaway: 'When test results are in the gray zone, time (watchful surveillance) or higher-resolution specialized tests are often needed before making drastic decisions.',
    clinicalExample: 'Breast ductal proliferation measuring 1.8mm—just beneath the official 2.0mm diagnostic cutoff separating ADH (benign high-risk) from DCIS (carcinoma in situ).'
  },
  {
    term: 'SBAR Framework',
    category: 'Patient Advocacy',
    definition: 'A structured clinical communication technique (Situation, Background, Assessment, Request) developed to convey critical patient information rapidly and clearly to medical teams.',
    patientTakeaway: 'Using SBAR helps you present your second opinion dilemma to your doctor in the exact structured format they were trained to process in hospital rounds.',
    clinicalExample: 'Situation: "I am having persistent foot numbness." Background: "I had an MRI showing an L5-S1 disc herniation." Assessment: "Dr. Vance advised surgery, but Dr. Lin advised an epidural." Request: "Can we define what signs mean I should transition from epidural to surgery?"'
  },
  {
    term: 'Subspecialty Bias (Clinical Anchoring)',
    category: 'Clinical Practice',
    definition: 'The cognitive tendency of medical specialists to conceptualize and treat a condition through the specific therapeutic modalities of their own specialty.',
    patientTakeaway: '"To a hammer, everything looks like a nail." Surgeons are trained to operate, interventionalists to catheterize/stent, and physiatrists to rehabilitate.',
    clinicalExample: 'An interventional cardiologist may prioritize placing a stent for a 65% stenosis, whereas a preventive cardiologist prioritizes intensive lipid lowering.'
  },
  {
    term: 'Shared Decision Making (SDM)',
    category: 'Patient Advocacy',
    definition: 'A collaborative clinical process wherein clinicians provide evidence-based trade-offs regarding treatments, and patients articulate their values, lifestyle goals, and risk tolerances to choose the optimal path.',
    patientTakeaway: 'You have the right to co-pilot your healthcare. When clinical outcomes are equivalent between two paths, your personal risk tolerance is the deciding factor.',
    clinicalExample: 'Choosing between a rapid surgical recovery with a small risk of surgical complications versus a slower 3-month conservative therapy pathway.'
  },
  {
    term: 'Discordant Pathology Second Read',
    category: 'Biopsies & Imaging',
    definition: 'Submitting original tissue biopsy slides or digital DICOM imaging to an independent subspecialized pathologist or radiologist at an academic tertiary institution for an un-blinded or blinded second review.',
    patientTakeaway: 'Before undergoing major surgery or chemotherapy based on a rare or borderline biopsy result, getting a subspecialty pathology second opinion is standard medical best practice.',
    clinicalExample: 'Sending lymphoma or sarcoma biopsy slides to a major NCI-designated comprehensive cancer center for consensus review.'
  }
];
