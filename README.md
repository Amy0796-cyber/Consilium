# Consilium — Medical Discrepancy & Second-Opinion Navigator

> **A sensitive, high-trust digital health platform designed to help patients and caregivers navigate conflicting medical opinions, contradictory diagnoses, and divergent treatment plans.**

---

## 📋 Overview

When two licensed physicians provide contradictory clinical recommendations—such as an orthopedic surgeon urging immediate spinal surgery while a physiatrist recommends conservative physical therapy and epidural injections—patients experience severe cognitive distress, panic, and paralysis.

**Consilium** bridges this communication divide. Acting as a structured, clinically neutral patient advocacy workspace, Consilium systematically deconstructs opposing medical views, isolates the root clinical causes of divergence (such as subspecialty bias or pathology gray zones), screens for critical emergency red flags, and translates discrepancies into concise, professional **SBAR (Situation, Background, Assessment, Request)** agendas formatted for tight 15-minute physician consultations.

---

## 🚀 Key Interactive Features

### 1. 🔍 Discrepancy Comparison Matrix
- **Side-by-Side Provider Breakdown**: Compares Doctor A vs. Doctor B (and optional Doctor C / Tertiary Specialists) across standardized clinical dimensions:
  - Stated Diagnosis & Diagnostic Confidence Level
  - Test Evidence & Imaging Modality Reviewed (e.g., 3T MRI vs. X-Ray)
  - Recommended Interventions & Procedure Classifications (Surgical vs. Interventional vs. Conservative)
  - Prescriptions & Pharmacotherapy Comparison (Drug names, dosages, mechanisms)
  - Stated Prognosis, Recovery Expectations & Risk Trade-offs
- **Divergence Vector Root Cause Deconstructor**: Identifies whether the contradiction stems from differing standard of care philosophies, borderline pathology measurements, subspecialty anchoring, or test timing.

### 2. 🛡️ Complexity vs. Red Flag Guide
- **Interactive Clinical Safety Logic Tree**: A screening engine that guides patients through evidence-based triage questions (e.g., Cauda Equina symptoms, unstable resting chest pain, discordant malignancy pathology, rapid constitutional weight loss, or toxic medication clashes).
- **Dynamic Risk Stratification**:
  - 🟢 **Acceptable Clinical Nuance**: Both paths are guideline-supported; decision rests on patient lifestyle preference and risk tolerance.
  - 🟡 **Diagnostic Ambiguity**: Inconclusive or borderline tests require confirmatory diagnostics or watchful surveillance before irreversible procedures.
  - 🔴 **High-Priority Specialist Review / Emergency Escalation**: Requires immediate tertiary academic center escalation or emergency department care.

### 3. 📝 Doctor Visit Prep Generator (SBAR Framework)
- **Clinical SBAR Synthesis**: Automatically translates the patient's dilemma into the hospital-standard **SBAR** communication format:
  - **[S] Situation**: 60-second dilemma opener.
  - **[B] Background**: Scans reviewed, timeline, and current medications.
  - **[A] Assessment**: Objective description of conflicting provider viewpoints.
  - **[R] Request**: Target decision milestone for today's appointment.
- **Physician-Friendly Script Generator**: Provides word-for-word collaborative scripts designed to prevent clinician defensiveness during consultations.
- **15-Minute Consultation Strategy**: Interactive time-budget guide (Frame dilemma $\rightarrow$ Targeted Questions $\rightarrow$ Risk Trade-Offs $\rightarrow$ Stop-Loss Milestone).
- **Printable Clinical Brief**: One-click printable sheet (`window.print()` formatted) to take directly into the exam room.

### 4. 📚 Real-World Preloaded Clinical Archetypes
Includes 4 deeply researched, realistic clinical scenarios ready to explore:
1. **Spine & Orthopedics**: *Lumbar L5-S1 Radiculopathy (Microdiscectomy Surgery vs. Conservative PT & Epidural)*
2. **Cardiology**: *Stable CAD 65% Mid-LAD Plaque (Immediate Stent vs. High-Intensity Statin & Optimal Medical Therapy)*
3. **Pathology & Oncology**: *Breast Core Biopsy (Atypical Ductal Hyperplasia [ADH] vs. Low-Grade DCIS)*
4. **Neurology & Rheumatology**: *Chronic Multi-Focal Pain (Fibromyalgia vs. Early Seronegative Sjogren's / Small Fiber Neuropathy)*

### 5. 📖 Executive PRD & Product Blueprint Viewer
- Interactive viewer rendering the full **Product Requirements Document (PRD)** authored by a Senior Health-Tech Product Strategist, Medical UX Architect, and Compliance Expert.
- Contains 6 detailed chapters: Executive Summary, User Journey Map, Core Feature Specifications, Trust & Compliance Framework, Technical Architecture, and Clinical Governance.
- Includes a 1-click **"Copy PRD to Markdown"** feature.

### 6. 🔒 Trust, Safety & Zero-Knowledge Privacy Vault
- **100% Client-Side Local Storage**: All patient notes, provider names, and diagnoses are stored exclusively within the browser (`localStorage`). No Protected Health Information (PHI) is ever transmitted to cloud servers.
- **Zero Third-Party Telemetry**: No trackers, ads, or analytics scripts.
- **Sovereign Data Controls**: Export case data to JSON, import backups, or permanently purge local storage with one click.

---

## 🛠️ Technical Architecture

Consilium is built with a clean, modern, zero-dependency frontend stack optimized for offline reliability and rapid execution:

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Bundler** | Vite 8 |
| **Styling** | Tailwind CSS v4 (Clinical Palette: Slate, Deep Navy, Clinical Teal, Emerald, Amber, Crimson) |
| **Icons** | Lucide React |
| **State & Storage** | Reactive Browser LocalStorage with JSON Export/Import |
| **External APIs** | **Zero** paid external API keys required; deterministic client-side synthesis |

---

## 💻 Local Development Setup

To run Consilium locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`.

To create a production build:
```bash
npm run build
```

---

## ⚖️ Clinical Neutrality & Legal Disclaimer

Consilium is a patient advocacy and clinical communication tool designed to organize evidence and facilitate productive dialogue between patients and licensed healthcare providers. **Consilium does not provide medical diagnoses, treatment prescriptions, or formal medical advice.** Always consult a qualified physician or seek emergency medical care for acute health conditions.
