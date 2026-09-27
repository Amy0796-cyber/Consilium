import { PatientCase } from '../types/medical';

export const CASE_ARCHETYPES: PatientCase[] = [
  {
    id: 'archetype-spine-l5s1',
    title: 'Lumbar L5-S1 Radiculopathy: Surgery vs Conservative Physical Therapy',
    patientAlias: 'Elena R.',
    patientAge: '44',
    patientGender: 'Female',
    specialtyArea: 'Spine / Orthopedics & Physiatry',
    primarySymptoms: 'Sharp radiating right buttock-to-calf pain (L5 dermatome), numbness in great toe, aggravated by sitting >20 min.',
    symptomDuration: '8 weeks following gym injury',
    emotionalDistressRating: 8,
    isPreloaded: true,
    divergenceCategory: 'Therapeutic Philosophy (Aggressive vs Conservative)',
    lastUpdated: '2026-09-25T14:20:00Z',
    personalNotes: 'Doctor A warned that delaying surgery might cause permanent nerve root damage. Doctor B stated that 80% of disc herniations reabsorb spontaneously within 3-6 months and wanted to avoid surgical scar tissue.',
    providers: [
      {
        id: 'prov-spine-1',
        providerRole: 'Doctor A (Orthopedic Spine Surgeon)',
        doctorName: 'Dr. Arthur Vance, MD, FAAOS',
        specialty: 'Orthopedic Spine Surgery',
        clinicOrHospital: 'Metro Spine & Joint Institute',
        visitDate: '2026-09-12',
        diagnosis: 'L5-S1 Paracentral Disc Extrusion with S1 Nerve Root Compression',
        diagnosticConfidence: 'High',
        testsReviewed: ['Lumbar Spine MRI (Non-contrast, 1.5T)', 'Standing Lumbar X-rays'],
        testInterpretationNotes: '7mm right paracentral disc herniation causing moderate-to-severe lateral recess stenosis and displacement of the descending S1 nerve root.',
        recommendedTreatment: 'Right L5-S1 Single-Level Microdiscectomy (Outpatient, 45 min)',
        treatmentType: 'Surgical / Invasive',
        prescriptions: [
          {
            id: 'rx-1',
            drugName: 'Oxycodone-Acetaminophen 5/325mg',
            dosage: '1 tablet q6h PRN severe pain (Qty: 12)',
            frequency: 'As needed for severe breakthrough radiculopathy',
            rationale: 'Pain control pending pre-op clearance'
          },
          {
            id: 'rx-2',
            drugName: 'Methylprednisolone Dose Pack (Medrol)',
            dosage: '6-day oral taper (24mg down to 4mg)',
            frequency: 'Daily per blister pack',
            rationale: 'Acute anti-inflammatory bridging'
          }
        ],
        statedPrognosis: 'Rapid pain relief within 48-72 hours post-op; 90% return to unrestricted activity by week 6.',
        expectedTimeline: 'Schedule within 2 weeks to avoid chronic neural fibrosis.',
        riskTradeoffs: '1-3% risk of dural tear, 5-8% lifetime recurrent disc herniation, post-op surgical site soreness.',
        coreReasoning: 'Persistent radicular pain beyond 6 weeks with clear MRI correlation justifies definitive decompression before chronic neuropathic sensitization occurs.'
      },
      {
        id: 'prov-spine-2',
        providerRole: 'Doctor B (Physical Medicine & Rehabilitation / PM&R)',
        doctorName: 'Dr. Sarah Lin, MD, FAAPMR',
        specialty: 'Interventional Physiatry & Sports Medicine',
        clinicOrHospital: 'University Medical Center Spine Care',
        visitDate: '2026-09-20',
        diagnosis: 'L5-S1 Radiculopathy secondary to Herniated Nucleus Pulposus (Motor Intact: 5/5 EHL/Plantarflexion)',
        diagnosticConfidence: 'High',
        testsReviewed: ['Lumbar Spine MRI', 'Comprehensive Neurological Physical Exam'],
        testInterpretationNotes: 'Confirms 7mm extrusion, but notes absence of progressive motor weakness, cauda equina red flags, or severe central canal occlusion.',
        recommendedTreatment: 'Transforaminal Epidural Steroid Injection (TFESI) + Targeted McKenzie Physical Therapy (6-8 weeks)',
        treatmentType: 'Physical Therapy / Conservative',
        prescriptions: [
          {
            id: 'rx-3',
            drugName: 'Gabapentin (Neurontin)',
            dosage: '300mg titrated to 600mg TID',
            frequency: 'Three times daily with meals',
            rationale: 'Membrane stabilization for radicular neuropathic calf pain'
          },
          {
            id: 'rx-4',
            drugName: 'Meloxicam (Mobic)',
            dosage: '15mg daily',
            frequency: 'Once daily with breakfast',
            rationale: 'Sustained COX-2 predominant NSAID reduction of chemical nerve root irritation'
          }
        ],
        statedPrognosis: 'Natural immune phagocytosis will resorb extruded disc material in 75-80% of patients within 12-16 weeks; 1-year outcomes are statistically equivalent to surgery (SPORT Trial data).',
        expectedTimeline: 'Re-evaluate in 6 weeks post-epidural injection before considering surgical referral.',
        riskTradeoffs: 'Takes 4-8 weeks longer for complete pain resolution; potential need for delayed surgery if motor weakness emerges.',
        coreReasoning: 'As long as motor strength is intact (5/5), natural history favors tissue preservation. Defer surgery until conservative trial completes.'
      }
    ],
    discrepancyPoints: [
      {
        dimension: 'Primary Intervention',
        summaryComparison: 'Immediate surgical microdiscectomy vs. 8-week conservative trial with epidural injection and physical therapy.',
        providerViews: {
          'prov-spine-1': 'Urgent outpatient surgical decompression within 14 days.',
          'prov-spine-2': 'Non-operative protocol: Targeted TFESI + McKenzie core stabilization.'
        },
        potentialClinicalReason: 'Surgical vs. Non-operative subspecialty standard of care perspectives. Both are clinically valid paths depending on the patient\'s tolerance for recovery time vs. surgical risk.',
        clarificationPrompt: 'What clinical criteria (e.g. motor weakness, pain scale failure) would indicate that conservative treatment has officially failed and surgery is required?'
      },
      {
        dimension: 'Risk of Permanent Nerve Damage',
        summaryComparison: 'Doctor A warned of chronic neural fibrosis; Doctor B cited evidence that without progressive motor weakness, 80% heal without deficit.',
        providerViews: {
          'prov-spine-1': 'Prolonged mechanical compression risks permanent radicular neuropathy.',
          'prov-spine-2': 'Motor exam is 5/5; sensory-only compression rarely causes permanent motor deficit while awaiting natural resorption.'
        },
        potentialClinicalReason: 'Different interpretations of the threshold where sensory radicular compression transitions to irreversible neuropathy.',
        clarificationPrompt: 'Has my motor strength shown any subtle drop on physical exam (e.g. heel-walking, toe-walking) that would force an immediate surgical deadline?'
      },
      {
        dimension: 'Long-term 1-Year Outcome Equivalence',
        summaryComparison: 'Doctor A emphasizes faster 6-week recovery; Doctor B emphasizes equivalent 1-year outcomes with zero surgical tissue violation.',
        providerViews: {
          'prov-spine-1': 'Surgery offers 90% rapid resolution in days rather than months of disability.',
          'prov-spine-2': 'SPORT Trial literature demonstrates identical pain and functional scores at 1 and 2 years between cohorts.'
        },
        potentialClinicalReason: 'Time-to-relief preference (urgency of returning to heavy physical work vs desire to avoid invasive spinal entry).',
        clarificationPrompt: 'If we attempt the epidural and PT for 4 weeks, does that delay decrease the success rate of surgery if I still need it later?'
      }
    ],
    redFlagAssessment: {
      completed: true,
      selectedFlagIds: [],
      urgencyLevel: 'Standard Nuance',
      rationale: 'Patient has intact 5/5 motor strength, no saddle anesthesia, and no bowel/bladder dysfunction. This is a classic therapeutic dilemma between two safe, guideline-supported paths.',
      recommendedNextStep: 'Discuss a structured 4-week trial period with Dr. Lin while keeping Dr. Vance on standby if motor drop occurs.',
      keySafetyNotes: [
        'Immediately seek emergency care if you notice numbness around your groin/saddle area or loss of bladder/bowel control (Cauda Equina Syndrome).',
        'Check your foot strength daily: if you cannot walk on your heels (foot drop), contact Dr. Vance immediately.'
      ]
    },
    clinicalQuestions: [
      {
        id: 'cq-1',
        category: 'Second Opinion Reconciliation',
        targetDoctorLabel: 'Doctor A (Surgeon)',
        question: 'Dr. Vance, Dr. Lin (Physiatry) believes that because my motor exam is 5/5, an epidural injection combined with 6 weeks of PT has an 80% chance of avoiding surgery without worsening long-term outcomes. If I trial conservative care for 4 weeks, does that increase surgical difficulty or compromise my long-term result if we operate later?',
        whyThisMatters: 'Clarifies whether waiting causes irreversible anatomical penalty.',
        physicianFriendlyScript: 'I deeply appreciate your surgical recommendation. Before proceeding to the operating room, I am trying to understand the safety window of a brief 4-week conservative trial.',
        isSelected: true
      },
      {
        id: 'cq-2',
        category: 'Treatment Trade-Offs',
        targetDoctorLabel: 'Doctor B (Physiatrist)',
        question: 'Dr. Lin, Dr. Vance expressed concern that the 7mm disc extrusion is large and could cause chronic neural scarring if left compressed for months. What specific milestone or timeline will we use to conclude that the epidural/PT is not working?',
        whyThisMatters: 'Establishes clear, objective "stop-loss" criteria for conservative therapy.',
        physicianFriendlyScript: 'What is our precise timeline to gauge success from the injection, and when should we pivot to Dr. Vance for surgery?',
        isSelected: true
      },
      {
        id: 'cq-3',
        category: 'Diagnostic Verification',
        targetDoctorLabel: 'Both Doctors',
        question: 'Is my current right calf weakness purely pain-inhibited or is there true neurological weakness (L5/S1 motor deficit)?',
        whyThisMatters: 'Differentiates pain-limited motion from nerve damage.',
        physicianFriendlyScript: 'Could you confirm during the physical exam whether my leg weakness is caused by nerve signal loss or simply pain guarding?',
        isSelected: true
      }
    ],
    sbarBrief: {
      situation: 'Elena R., 44F with 8 weeks of right L5-S1 radicular pain following an acute disc extrusion, seeking alignment between surgical microdiscectomy vs. interventional conservative care.',
      background: 'MRI confirms 7mm L5-S1 extrusion. Doctor A recommends urgent microdiscectomy within 2 weeks. Doctor B recommends TFESI epidural + 6 weeks of structured PT based on intact motor exam.',
      assessment: 'The conflict represents a standard therapeutic philosophy difference (Invasive Early Decompression vs. Evidence-Based Conservative Trial). No emergency red flags are currently present.',
      request: 'Define a 4-week conservative milestone protocol with explicit criteria for surgical escalation if pain or motor function fails to improve.'
    }
  },
  {
    id: 'archetype-cardiology-cad',
    title: 'Stable Coronary Artery Disease (65% Mid-LAD): Stenting (PCI) vs Optimal Medical Therapy',
    patientAlias: 'Marcus T.',
    patientAge: '58',
    patientGender: 'Male',
    specialtyArea: 'Cardiology / Interventional vs Preventive',
    primarySymptoms: 'Mild exertional chest tightness during uphill walking (relieved within 3 minutes of resting). No resting chest pain or shortness of breath.',
    symptomDuration: '3 months',
    emotionalDistressRating: 7,
    isPreloaded: true,
    divergenceCategory: 'Therapeutic Philosophy (Aggressive vs Conservative)',
    lastUpdated: '2026-09-24T11:15:00Z',
    personalNotes: 'Interventional cardiologist wanted to perform an angiogram and put a drug-eluting stent in immediately. Clinical preventive cardiologist cited the landmark ISCHEMIA trial and advised starting high-intensity statin + beta blocker first.',
    providers: [
      {
        id: 'prov-cardio-1',
        providerRole: 'Doctor A (Interventional Cardiologist)',
        doctorName: 'Dr. Robert Chen, MD, FACC, FSCAI',
        specialty: 'Interventional Cardiology & Catheterization',
        clinicOrHospital: 'Cardiac Care Specialists',
        visitDate: '2026-09-14',
        diagnosis: 'Coronary Artery Disease - 65-70% Mid-Left Anterior Descending (LAD) Stenosis on Coronary CTA',
        diagnosticConfidence: 'High',
        testsReviewed: ['64-Slice Coronary CT Angiography (CCTA)', 'Resting 12-Lead ECG'],
        testInterpretationNotes: 'Moderate-to-severe calcified and soft plaque in mid-LAD with estimated luminal narrowing of 65-70%. Normal LV ejection fraction (60%).',
        recommendedTreatment: 'Left Heart Catheterization with Fractional Flow Reserve (FFR) and likely Drug-Eluting Stent (DES) placement',
        treatmentType: 'Interventional',
        prescriptions: [
          {
            id: 'rx-card-1',
            drugName: 'Aspirin 81mg + Clopidogrel (Plavix) 75mg',
            dosage: 'Dual Antiplatelet Therapy (DAPT) daily',
            frequency: 'Daily',
            rationale: 'Pre-procedural antiplatelet loading'
          },
          {
            id: 'rx-card-2',
            drugName: 'Nitroglycerin Sublingual 0.4mg',
            dosage: '1 tab q5min up to 3 doses for acute angina',
            frequency: 'PRN',
            rationale: 'Acute vasodilation for exertional chest tightness'
          }
        ],
        statedPrognosis: 'Stenting will physically open the vessel, eliminating angina symptoms and restoring full blood flow.',
        expectedTimeline: 'Perform catheterization within 10 days.',
        riskTradeoffs: '1% risk of vascular complication/bleeding, requires 12 months mandatory dual antiplatelet therapy (DAPT) with bleeding risk.',
        coreReasoning: 'The LAD supplies the anterior wall of the heart ("widow-maker territory"). Relieving anatomical obstruction provides peace of mind and symptom relief.'
      },
      {
        id: 'prov-cardio-2',
        providerRole: 'Doctor B (Preventive Cardiologist)',
        doctorName: 'Dr. Alistair Ross, MD, PhD, FACC',
        specialty: 'Preventive Cardiology & Clinical Lipidology',
        clinicOrHospital: 'Cardiovascular Prevention & Research Center',
        visitDate: '2026-09-22',
        diagnosis: 'Stable Angina (CCS Class I-II) with Non-Obstructive / Intermediate LAD Plaque',
        diagnosticConfidence: 'High',
        testsReviewed: ['Coronary CTA', 'Nuclear Stress Myocardial Perfusion SPECT (Mild reversible ischemia only)'],
        testInterpretationNotes: 'Confirms 65% anatomical plaque, but functional nuclear stress test showed preserved perfusion at moderate workloads without high-risk ischemic markers.',
        recommendedTreatment: 'Optimal Medical Therapy (OMT): Aggressive LDL lowering to <55 mg/dL + Beta-blockade + Lifestyle Modification',
        treatmentType: 'Pharmacological',
        prescriptions: [
          {
            id: 'rx-card-3',
            drugName: 'Rosuvastatin 40mg + Ezetimibe 10mg',
            dosage: 'Combination lipid-lowering daily',
            frequency: 'Every evening',
            rationale: 'Plaque stabilization and necrotic core shrinkage'
          },
          {
            id: 'rx-card-4',
            drugName: 'Metoprolol Succinate ER 25mg',
            dosage: 'Once daily titrated to resting HR 55-60 bpm',
            frequency: 'Morning',
            rationale: 'Reduce myocardial oxygen demand during exercise'
          }
        ],
        statedPrognosis: 'The landmark ISCHEMIA trial (5,179 patients) showed that for stable CAD, routine initial stenting did NOT reduce death or heart attack compared to medical therapy alone. Plaque stabilization prevents rupture across the whole coronary tree.',
        expectedTimeline: 'Trial OMT for 3 months with symptom diary before reconsidering invasive catheterization.',
        riskTradeoffs: 'Requires daily adherence to multiple medications; invasive stenting remains an option if angina persists despite medications.',
        coreReasoning: 'Stents treat isolated anatomical narrowings but do not prevent future heart attacks (which usually occur at non-obstructive inflamed sites). Stabilizing systemic endothelium medically is safer as initial therapy.'
      }
    ],
    discrepancyPoints: [
      {
        dimension: 'Invasive Stent vs Medical Plaque Stabilization',
        summaryComparison: 'Immediate catheterization and stent vs. High-intensity medical therapy with statin/ezetimibe and beta-blocker.',
        providerViews: {
          'prov-cardio-1': 'Perform heart catheterization and stent the 65% stenosis right away.',
          'prov-cardio-2': 'Start Optimal Medical Therapy (OMT) to stabilize plaque; avoid invasive procedure unless symptoms fail to resolve.'
        },
        potentialClinicalReason: 'Application of the COURAGE and ISCHEMIA trial evidence for stable ischemic heart disease vs traditional interventional practice.',
        clarificationPrompt: 'Does my stress test show high-risk features (e.g., ST depression at low workload, drop in blood pressure) that would supersede the ISCHEMIA trial recommendation for medical therapy?'
      },
      {
        dimension: 'Heart Attack Prevention Claim',
        summaryComparison: 'Doctor A implies stent protects from heart attack; Doctor B states stents only treat symptoms and do not lower overall mortality in stable CAD.',
        providerViews: {
          'prov-cardio-1': 'Opens the LAD artery to prevent acute occlusion.',
          'prov-cardio-2': 'Stenting stable plaque does not decrease myocardial infarction risk over medical therapy (ISCHEMIA Trial).'
        },
        potentialClinicalReason: 'Distinction between treating acute coronary syndrome (unstable heart attack) vs stable chronic angina.',
        clarificationPrompt: 'Is this stent being recommended strictly to improve my exertional symptoms, or is there evidence it will prolong my life or prevent a heart attack in my specific case?'
      }
    ],
    redFlagAssessment: {
      completed: true,
      selectedFlagIds: [],
      urgencyLevel: 'Standard Nuance',
      rationale: 'Symptoms are strictly stable and exertional (relieved with rest). No angina at rest, no syncope, and normal left ventricular function.',
      recommendedNextStep: 'Schedule a clarifying consultation with Dr. Chen to discuss whether starting OMT for 8-12 weeks is a safe initial pathway.',
      keySafetyNotes: [
        'Call 911 immediately if chest pain occurs at rest, lasts longer than 10 minutes, radiates to the jaw/left arm, or is accompanied by diaphoresis or nausea.'
      ]
    },
    clinicalQuestions: [
      {
        id: 'cq-card-1',
        category: 'Treatment Trade-Offs',
        targetDoctorLabel: 'Doctor A (Interventional Cardiologist)',
        question: 'Dr. Chen, Dr. Ross noted that according to the ISCHEMIA trial, initial medical therapy (statin + beta-blocker) produces equivalent 5-year survival to stenting in stable angina. If we try medications for 8-12 weeks, what specific symptom threshold would signal that we should proceed with the catheterization?',
        whyThisMatters: 'Clarifies if surgery/stent is purely for symptom relief or life-saving.',
        physicianFriendlyScript: 'I want to make sure I understand the exact goal of the stent: is it primarily for my exertional comfort, and is it safe to trial medical therapy first?',
        isSelected: true
      },
      {
        id: 'cq-card-2',
        category: 'Diagnostic Verification',
        targetDoctorLabel: 'Doctor B (Preventive Cardiologist)',
        question: 'Dr. Ross, if we treat this medically, how will we monitor whether the plaque in my LAD is remaining stable or progressing over time?',
        whyThisMatters: 'Ensures long-term surveillance protocol is in place.',
        physicianFriendlyScript: 'What follow-up lipid targets (e.g. ApoB, LDL < 55) and non-invasive testing schedule will we use to verify disease stability?',
        isSelected: true
      }
    ],
    sbarBrief: {
      situation: 'Marcus T., 58M with 3-month history of mild exertional angina and 65% mid-LAD stenosis on coronary CTA, evaluating stent vs optimal medical therapy.',
      background: 'Doctor A recommends immediate cardiac catheterization and stent. Doctor B recommends intensive medical therapy based on ISCHEMIA trial findings of preserved LV function.',
      assessment: 'Classic cardiology dilemma between invasive anatomical revascularization and conservative physiological medical management.',
      request: 'Agree upon an 8-week medical therapy trial with defined criteria for cath lab referral if angina impairs quality of life.'
    }
  },
  {
    id: 'archetype-pathology-breast',
    title: 'Breast Core Biopsy: Atypical Ductal Hyperplasia (ADH) vs Low-Grade DCIS',
    patientAlias: 'Claire M.',
    patientAge: '51',
    patientGender: 'Female',
    specialtyArea: 'Breast Surgical Oncology & Pathology',
    primarySymptoms: 'Asymptomatic screening mammography showing a 6mm cluster of fine pleomorphic microcalcifications in the upper outer quadrant.',
    symptomDuration: 'Detected on routine annual mammogram 4 weeks ago',
    emotionalDistressRating: 9,
    isPreloaded: true,
    divergenceCategory: 'Imaging / Pathology Discrepancy',
    lastUpdated: '2026-09-26T09:00:00Z',
    personalNotes: 'Community hospital pathology read the core needle biopsy as Ductal Carcinoma In Situ (DCIS, Stage 0). Academic cancer center second opinion re-read the specimen as Atypical Ductal Hyperplasia (ADH). Doctor A recommended lumpectomy + radiation; Doctor B recommended excisional biopsy or active monitoring.',
    providers: [
      {
        id: 'prov-path-1',
        providerRole: 'Doctor A (Community Breast Surgeon)',
        doctorName: 'Dr. Kimberly Adams, MD, FACS',
        specialty: 'General & Oncologic Surgery',
        clinicOrHospital: 'Community Regional Medical Center',
        visitDate: '2026-09-10',
        diagnosis: 'Ductal Carcinoma In Situ (DCIS), Low-Grade (Cribriform Pattern, ER+/PR+)',
        diagnosticConfidence: 'Moderate',
        testsReviewed: ['Stereotactic Core Needle Biopsy (9-gauge, 6 cores)', 'Diagnostic Mammogram'],
        testInterpretationNotes: 'Initial pathology laboratory identified uniform population of atypical epithelial cells completely filling two contiguous duct spaces spanning >2mm.',
        recommendedTreatment: 'Segmental Mastectomy (Lumpectomy) with Clear Surgical Margins + Radiation Therapy Consultation + 5-Year Tamoxifen',
        treatmentType: 'Surgical / Invasive',
        prescriptions: [
          {
            id: 'rx-path-1',
            drugName: 'Tamoxifen 20mg',
            dosage: '1 tablet daily for 5 years',
            frequency: 'Daily post-lumpectomy',
            rationale: 'Hormonal chemoprevention to reduce local recurrence and contralateral breast risk'
          }
        ],
        statedPrognosis: '98-99% 10-year breast cancer-specific survival with standard surgical excision and radiation.',
        expectedTimeline: 'Schedule lumpectomy within 3-4 weeks.',
        riskTradeoffs: 'Breast tissue removal, radiation skin changes/fatigue, hot flashes/endometrial risk from tamoxifen.',
        coreReasoning: 'Standard of care for DCIS mandates surgical removal with negative margins to prevent progression to invasive ductal carcinoma.'
      },
      {
        id: 'prov-path-2',
        providerRole: 'Doctor B (Academic Breast Surgical Oncologist & Subspecialty Pathologist)',
        doctorName: 'Dr. Evelyn Ward, MD, MPH',
        specialty: 'Comprehensive Breast Oncology',
        clinicOrHospital: 'University Comprehensive Cancer Institute',
        visitDate: '2026-09-21',
        diagnosis: 'Atypical Ductal Hyperplasia (ADH) with Borderline Focus (Inter-observer Diagnostic Gray Zone)',
        diagnosticConfidence: 'Tentative',
        testsReviewed: ['Independent Pathology Review of 6 Biopsy Glass Slides & Recuts', 'Magnification Mammogram'],
        testInterpretationNotes: 'Expert breast pathologist review noted the lesion spans only 1.8mm (just below the standard 2.0mm WHO threshold for DCIS) with partial ductal involvement.',
        recommendedTreatment: 'Diagnostic Vacuum-Assisted Excisional Biopsy or Seed-Localized Wire Excision without automatic radiation, followed by high-risk surveillance',
        treatmentType: 'Interventional',
        prescriptions: [
          {
            id: 'rx-path-2',
            drugName: 'Raloxifene or Low-Dose Tamoxifen (BabyTAM 5mg)',
            dosage: '5mg daily for 3 years (TAM-01 trial protocol)',
            frequency: 'Daily',
            rationale: 'High-risk risk reduction with 70% fewer vasomotor side effects'
          }
        ],
        statedPrognosis: 'If excisional biopsy confirms pure ADH without upstaging, radiation is NOT needed, avoiding significant overtreatment.',
        expectedTimeline: 'Excisional biopsy in 4-6 weeks; submit entire tissue specimen for subspecialty breast pathology examination.',
        riskTradeoffs: '10-15% chance of pathology upgrade to DCIS or invasive cancer upon full excision of the calcification bed.',
        coreReasoning: 'The boundary between ADH and low-grade DCIS is a known histological gray zone. Rushing into radiation before definitive tissue removal risks overtreatment.'
      }
    ],
    discrepancyPoints: [
      {
        dimension: 'Pathology Classification (DCIS vs ADH)',
        summaryComparison: 'Community pathology classified as DCIS (Stage 0 pre-cancer); Academic tertiary pathology classified as ADH (benign high-risk proliferation).',
        providerViews: {
          'prov-path-1': 'Low-grade cribriform DCIS requiring oncology excision + radiation.',
          'prov-path-2': 'Borderline ADH (<2mm size criteria). Overtreatment risk if treated as invasive cancer.'
        },
        potentialClinicalReason: 'Histopathological inter-observer variability in borderline breast lesions (size criteria cutoff of 2mm vs cytologic atypia).',
        clarificationPrompt: 'Can a third blinded pathology review at another National Cancer Institute (NCI)-designated center review the slides, or can the pathologists confer directly?'
      },
      {
        dimension: 'Necessity of Radiation Therapy',
        summaryComparison: 'Doctor A recommended radiation therapy; Doctor B stated radiation is completely unnecessary if surgical excision confirms pure ADH.',
        providerViews: {
          'prov-path-1': 'Radiation reduces local recurrence in DCIS.',
          'prov-path-2': 'Radiation is contraindicated for pure ADH; wait for full surgical pathology before discussing radiation.'
        },
        potentialClinicalReason: 'Treatment depends entirely on whether the final lesion is upgraded after complete excision of all calcifications.',
        clarificationPrompt: 'Is it standard procedure to defer any decision about radiation until the final pathology report from the excisional biopsy is in hand?'
      }
    ],
    redFlagAssessment: {
      completed: true,
      selectedFlagIds: [],
      urgencyLevel: 'Diagnostic Ambiguity',
      rationale: 'Pathology disagreement between a benign high-risk lesion (ADH) and carcinoma in situ (DCIS) is a known clinical challenge. A 4-week delay for tertiary review does not increase metastatic risk for non-invasive lesions.',
      recommendedNextStep: 'Proceed with surgical excisional biopsy with Dr. Ward to remove the remaining calcifications and obtain a definitive microscopic read.',
      keySafetyNotes: [
        'Confirm that all mammographic microcalcifications are removed during the procedure with post-biopsy specimen radiography.'
      ]
    },
    clinicalQuestions: [
      {
        id: 'cq-path-1',
        category: 'Diagnostic Verification',
        targetDoctorLabel: 'Doctor A (Community Surgeon)',
        question: 'Dr. Adams, the academic second-opinion pathology review classified this lesion as ADH rather than DCIS because the atypical focus measured under 2mm. Did our initial pathology team use size-based criteria or cytologic criteria? Would you support submitting the tissue for an institutional consensus conference?',
        whyThisMatters: 'Prompts pathology inter-departmental dialogue.',
        physicianFriendlyScript: 'I received an independent review from the academic medical center suggesting ADH rather than DCIS. How can we harmonize these two interpretations before finalizing the surgical plan?',
        isSelected: true
      },
      {
        id: 'cq-path-2',
        category: 'Treatment Trade-Offs',
        targetDoctorLabel: 'Doctor B (Academic Oncologist)',
        question: 'Dr. Ward, what is the upgrade rate from ADH to invasive cancer or higher-grade DCIS at your institution when you perform complete wire-localized excision of the microcalcifications?',
        whyThisMatters: 'Quantifies true risk of finding hidden pathology.',
        physicianFriendlyScript: 'In what percentage of cases does the final excision reveal a higher stage than the core biopsy?',
        isSelected: true
      }
    ],
    sbarBrief: {
      situation: 'Claire M., 51F with conflicting core biopsy pathology (DCIS vs ADH) for a 6mm cluster of mammographic microcalcifications.',
      background: 'Doctor A (Community) diagnosed DCIS and planned lumpectomy with radiation. Doctor B (Academic Center) diagnosed ADH and advised excisional biopsy without initial radiation.',
      assessment: 'Diagnostic ambiguity driven by inter-observer histological variation across the 2mm size cutoff.',
      request: 'Perform localized excisional biopsy with comprehensive margin analysis; defer radiation planning until definitive post-op pathology report.'
    }
  },
  {
    id: 'archetype-rheum-fibro',
    title: 'Widespread Pain & Fatigue: Fibromyalgia vs Early Seronegative Sjogren\'s / SFN',
    patientAlias: 'Devon K.',
    patientAge: '37',
    patientGender: 'Non-binary',
    specialtyArea: 'Rheumatology & Neurology',
    primarySymptoms: 'Burning dysesthesia in feet, widespread muscular aching, unrefreshing sleep, dry eyes, cognitive brain fog, post-exertional malaise.',
    symptomDuration: '14 months, worsening after a viral illness',
    emotionalDistressRating: 9,
    isPreloaded: true,
    divergenceCategory: 'Diagnostic Ambiguity',
    lastUpdated: '2026-09-25T16:45:00Z',
    personalNotes: 'Doctor A diagnosed Fibromyalgia and recommended aerobic exercise and Cymbalta. Doctor B suspected an autoimmune small-fiber neuropathy / seronegative connective tissue disorder and ordered an Early Sjogren\'s salivary gland panel and skin punch biopsy.',
    providers: [
      {
        id: 'prov-rheum-1',
        providerRole: 'Doctor A (General Rheumatologist)',
        doctorName: 'Dr. Laura Bennett, MD',
        specialty: 'Clinical Rheumatology',
        clinicOrHospital: 'Suburban Arthritis Center',
        visitDate: '2026-08-15',
        diagnosis: 'Fibromyalgia / Central Sensitization Syndrome (WPI Score 14, SSS 9)',
        diagnosticConfidence: 'Moderate',
        testsReviewed: ['Standard ANA (Negative)', 'ESR / CRP (Normal)', 'Thyroid Panel (Normal)', 'Rheumatoid Factor (Negative)'],
        testInterpretationNotes: 'All standard inflammatory markers and autoantibody panels are completely normal. Multiple tender points on examination.',
        recommendedTreatment: 'Duloxetine (Cymbalta) + Low-Impact Graded Aerobic Exercise + Cognitive Behavioral Therapy (CBT)',
        treatmentType: 'Pharmacological',
        prescriptions: [
          {
            id: 'rx-rheum-1',
            drugName: 'Duloxetine (Cymbalta)',
            dosage: '30mg daily for 1 week, then 60mg daily',
            frequency: 'Morning',
            rationale: 'SNRI central pain inhibitory pathway modulation'
          },
          {
            id: 'rx-rheum-2',
            drugName: 'Cyclobenzaprine (Flexeril)',
            dosage: '5mg at bedtime',
            frequency: 'Nightly',
            rationale: 'Improve restorative slow-wave sleep'
          }
        ],
        statedPrognosis: 'Chronic condition manageable with lifestyle changes and neuromodulation; no structural tissue damage.',
        expectedTimeline: 'Follow-up in 3 months.',
        riskTradeoffs: 'Nausea, fatigue, withdrawal difficulty from SNRI; frustration if symptoms are driven by an underlying organic neuropathy.',
        coreReasoning: 'In the presence of widespread pain and negative autoimmune markers (ANA/ESR), standard criteria point to central sensitization rather than an inflammatory rheumatologic disease.'
      },
      {
        id: 'prov-rheum-2',
        providerRole: 'Doctor B (Neurologist & Autonomic Specialist)',
        doctorName: 'Dr. Gregory Hayes, MD, PhD',
        specialty: 'Neuromuscular Neurology & Autonomic Disorders',
        clinicOrHospital: 'Academic Center for Peripheral Nerve Disorders',
        visitDate: '2026-09-18',
        diagnosis: 'Suspected Small Fiber Neuropathy (SFN) secondary to Seronegative Autoimmune Etiology',
        diagnosticConfidence: 'Tentative',
        testsReviewed: ['Quantitative Sensory Testing (Abnormal cold threshold)', 'Schirmer Test (Decreased tear production: 4mm)'],
        testInterpretationNotes: 'Burning pain in a stocking distribution and severe dry mucosal membranes suggest small unmyelinated nerve fiber involvement, which standard EMGs and routine ANAs fail to detect.',
        recommendedTreatment: 'Epidermal Nerve Fiber Density (ENFD) Skin Punch Biopsy + Novel Autoantibody Panel (Early Sjogren\'s: SP-1, CA-6, PSP) + Trial of Low-Dose Naltrexone (LDN) or IVIG consideration if biopsy positive',
        treatmentType: 'Interventional',
        prescriptions: [
          {
            id: 'rx-rheum-3',
            drugName: 'Low-Dose Naltrexone (LDN)',
            dosage: '1.5mg titrated up to 4.5mg nightly',
            frequency: 'Nightly',
            rationale: 'Microglial anti-inflammatory and toll-like receptor-4 antagonism'
          },
          {
            id: 'rx-rheum-4',
            drugName: 'Restasis (Cyclosporine Ophthalmic)',
            dosage: '1 drop in both eyes BID',
            frequency: 'Twice daily',
            rationale: 'Topical ocular immunosuppression for dry eye syndrome'
          }
        ],
        statedPrognosis: 'If SFN is proven by skin biopsy, targeted autoimmune or neuro-protective treatments may arrest progression rather than just masking symptoms.',
        expectedTimeline: 'Skin biopsy results in 3 weeks; follow-up panel in 4 weeks.',
        riskTradeoffs: 'Out-of-pocket costs for specialized specialty tests; minor punch biopsy scar.',
        coreReasoning: 'Fibromyalgia is frequently an umbrella diagnosis applied before autonomic and small fiber testing is conducted. Objective biopsy verification is needed.'
      }
    ],
    discrepancyPoints: [
      {
        dimension: 'Underlying Pathophysiology',
        summaryComparison: 'Central nervous system pain amplification (Fibromyalgia) vs. Peripheral small-fiber axonal loss and autoimmune attack (SFN/Sjogren\'s).',
        providerViews: {
          'prov-rheum-1': 'Central sensitization with normal nerve histology.',
          'prov-rheum-2': 'Organic small fiber neuropathy requiring objective tissue quantification.'
        },
        potentialClinicalReason: 'Limitations of standard blood work (standard ANA misses 30-40% of early Sjogren\'s cases) and normal EMG (which only measures large myelinated fibers).',
        clarificationPrompt: 'Does my burning foot pain and dry eye presentation warrant an objective skin punch biopsy for small fiber density before settling on a pure fibromyalgia diagnosis?'
      },
      {
        dimension: 'Exercise vs Rest Strategy',
        summaryComparison: 'Doctor A advocated graded aerobic exercise; Doctor B cautioned that if post-exertional malaise (PEM) is present, excessive exertion could cause neuro-inflammatory crashes.',
        providerViews: {
          'prov-rheum-1': 'Graded aerobic conditioning is the gold standard for fibromyalgia.',
          'prov-rheum-2': 'Heart-rate paced energy envelope management until autonomic testing is complete.'
        },
        potentialClinicalReason: 'Contrasting management protocols for idiopathic fibromyalgia vs post-viral dysautonomia / small fiber neuropathy.',
        clarificationPrompt: 'How should I distinguish between standard muscle deconditioning and post-exertional symptom flares when exercising?'
      }
    ],
    redFlagAssessment: {
      completed: true,
      selectedFlagIds: [],
      urgencyLevel: 'Diagnostic Ambiguity',
      rationale: 'Discordant opinions between a functional umbrella diagnosis and an underlying autoimmune/neuropathic etiology. No acute paralysis, severe rapid weight loss, or major organ failure.',
      recommendedNextStep: 'Complete the non-invasive skin punch biopsy and novel autoantibody panel with Dr. Hayes to obtain objective histologic proof before choosing long-term medication.',
      keySafetyNotes: [
        'Report any sudden difficulty swallowing, severe postural fainting (syncope), or rapid weakness to neurology promptly.'
      ]
    },
    clinicalQuestions: [
      {
        id: 'cq-rheum-1',
        category: 'Test Clarification',
        targetDoctorLabel: 'Doctor A (Rheumatologist)',
        question: 'Dr. Bennett, given that my primary symptoms include burning distal sensations in my feet and dry eyes, could an objective skin biopsy for Small Fiber Neuropathy help rule in or rule out an organic peripheral cause before we treat this strictly as central fibromyalgia?',
        whyThisMatters: 'Bridges rheumatology and neurology diagnostic tools.',
        physicianFriendlyScript: 'I want to ask if a small fiber skin biopsy would be helpful to definitively rule out peripheral nerve fiber loss.',
        isSelected: true
      },
      {
        id: 'cq-rheum-2',
        category: 'Second Opinion Reconciliation',
        targetDoctorLabel: 'Doctor B (Neurologist)',
        question: 'Dr. Hayes, if the skin biopsy comes back negative for small fiber neuropathy, would you then agree with Dr. Bennett\'s treatment plan of central neuromodulation (Cymbalta and graded exercise)?',
        whyThisMatters: 'Establishes clear diagnostic closure.',
        physicianFriendlyScript: 'If the epidermal nerve density test is normal, does that confirm we should pivot to central sensitization protocols?',
        isSelected: true
      }
    ],
    sbarBrief: {
      situation: 'Devon K., 37, presenting with 14 months of widespread burning body pain, fatigue, and sicca symptoms with conflicting diagnoses of Fibromyalgia vs Small Fiber Neuropathy.',
      background: 'Doctor A diagnosed Fibromyalgia based on negative routine ANA/ESR. Doctor B suspected seronegative autoimmune SFN and ordered skin punch biopsy + autonomic testing.',
      assessment: 'Diagnostic ambiguity between central sensitization and microscopic peripheral nerve damage.',
      request: 'Perform skin punch biopsy (ENFD) to establish objective histology before locking in long-term pharmacological pathway.'
    }
  }
];
