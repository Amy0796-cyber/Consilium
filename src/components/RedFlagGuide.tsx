import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Stethoscope, 
  ArrowRight,
  Info,
  RefreshCw
} from 'lucide-react';
import { PatientCase, RedFlagAssessment } from '../types/medical';
import { RED_FLAG_QUESTIONS } from '../data/redFlagQuestions';

interface RedFlagGuideProps {
  activeCase: PatientCase;
  onUpdateCase: (updatedCase: PatientCase) => void;
  onNavigateToVisitPrep: () => void;
}

export const RedFlagGuide: React.FC<RedFlagGuideProps> = ({
  activeCase,
  onUpdateCase,
  onNavigateToVisitPrep
}) => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>(
    activeCase.redFlagAssessment?.selectedFlagIds || []
  );

  const handleToggleFlag = (flagId: string) => {
    const isPresent = selectedFlags.includes(flagId);
    const updated = isPresent
      ? selectedFlags.filter(id => id !== flagId)
      : [...selectedFlags, flagId];
    
    setSelectedFlags(updated);
    recalculateAssessment(updated);
  };

  const recalculateAssessment = (flagIds: string[]) => {
    let urgency: RedFlagAssessment['urgencyLevel'] = 'Standard Nuance';
    let rationale = '';
    let nextStep = '';
    const safetyNotes: string[] = [];

    const hasEmergency = flagIds.some(id => {
      const q = RED_FLAG_QUESTIONS.find(item => item.id === id);
      return q && q.severity === 'Urgent Emergency';
    });

    const hasHighPriority = flagIds.some(id => {
      const q = RED_FLAG_QUESTIONS.find(item => item.id === id);
      return q && q.severity === 'High-Priority Specialist';
    });

    if (hasEmergency) {
      urgency = 'Emergency Escalation';
      rationale = 'One or more acute red flag symptoms were flagged (e.g. progressive neurological deficit, unstable resting chest pain, or acute vision change).';
      nextStep = 'Do not wait for standard outpatient second opinions. Seek emergency department evaluation or urgent on-call specialist triage immediately.';
      safetyNotes.push('Contact emergency services (911) or proceed immediately to the nearest hospital emergency department.');
    } else if (hasHighPriority) {
      urgency = 'High-Priority Specialist Review';
      rationale = 'Significant clinical discordance identified (e.g., conflicting pathology, rapid constitutional weight loss, or high-risk drug clash) requiring expedited specialist consultation.';
      nextStep = 'Request an expedited referral to a tertiary academic medical center or comprehensive multidisciplinary tumor/specialty board.';
      safetyNotes.push('Submit original pathology slides or digital DICOM imaging for an independent third review at an NCI-designated or tertiary academic center.');
    } else {
      urgency = activeCase.divergenceCategory === 'Diagnostic Ambiguity' || activeCase.divergenceCategory === 'Imaging / Pathology Discrepancy'
        ? 'Diagnostic Ambiguity'
        : 'Standard Nuance';
      
      if (urgency === 'Diagnostic Ambiguity') {
        rationale = 'The disagreement is driven by inconclusive or borderline diagnostic findings (e.g. gray-zone lesion measurements or conflicting non-invasive tests) rather than immediate physiological failure.';
        nextStep = 'Discuss confirmatory testing or a structured trial period before proceeding with irreversible interventions.';
        safetyNotes.push('Establish a definitive follow-up schedule and agreed-upon milestone for symptom improvement.');
      } else {
        rationale = 'No emergency red flags detected. The discrepancy reflects standard clinical practice variation between guideline-supported treatment approaches (e.g. conservative vs surgical).';
        nextStep = 'Use the Doctor Visit Prep tool to formulate your preference regarding recovery speed vs invasive procedure risks.';
        safetyNotes.push('Continue monitoring symptoms daily and seek prompt care if any new neurological or severe systemic signs develop.');
      }
    }

    const updatedAssessment: RedFlagAssessment = {
      completed: true,
      selectedFlagIds: flagIds,
      urgencyLevel: urgency,
      rationale,
      recommendedNextStep: nextStep,
      keySafetyNotes: safetyNotes
    };

    const updatedCase: PatientCase = {
      ...activeCase,
      redFlagAssessment: updatedAssessment,
      lastUpdated: new Date().toISOString()
    };

    onUpdateCase(updatedCase);
  };

  const currentUrgency = activeCase.redFlagAssessment?.urgencyLevel || 'Standard Nuance';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-amber-800">Clinical Safety Triage</span>
              <span aria-hidden="true">·</span>
              <span>Case: {activeCase.patientAlias}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-amber-600" />
              <span>Complexity vs. Red Flag Clinical Guide</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When doctors disagree, it is essential to determine whether the contradiction is a <strong>normal practice variation</strong> (safe to deliberate) or a <strong>high-priority red flag</strong> requiring urgent escalation.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => recalculateAssessment(selectedFlags)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Re-Evaluate Risk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stratification Result Card */}
      <div
        className={`rounded-xl border p-6 transition-all duration-200 shadow-xs ${
          currentUrgency === 'Emergency Escalation'
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : currentUrgency === 'High-Priority Specialist Review'
            ? 'bg-amber-50 border-amber-300 text-amber-950'
            : currentUrgency === 'Diagnostic Ambiguity'
            ? 'bg-yellow-50/80 border-yellow-300 text-yellow-950'
            : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                Current Clinical Triage Classification:
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentUrgency === 'Emergency Escalation'
                    ? 'bg-rose-200 text-rose-900'
                    : currentUrgency === 'High-Priority Specialist Review'
                    ? 'bg-amber-200 text-amber-900'
                    : currentUrgency === 'Diagnostic Ambiguity'
                    ? 'bg-yellow-200 text-yellow-900'
                    : 'bg-emerald-200 text-emerald-900'
                }`}
              >
                {currentUrgency}
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {activeCase.redFlagAssessment?.rationale}
            </p>

            <div className="pt-2 text-xs">
              <strong className="block mb-1">Recommended Action Protocol:</strong>
              <p className="leading-relaxed bg-white/70 p-3 rounded-lg border border-black/5">
                {activeCase.redFlagAssessment?.recommendedNextStep}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            {currentUrgency === 'Emergency Escalation' ? (
              <div className="bg-rose-600 text-white p-4 rounded-xl text-center shadow-xs">
                <PhoneCall className="w-6 h-6 mx-auto mb-1 animate-pulse" />
                <span className="font-bold text-sm block">Seek Emergency Care</span>
                <span className="text-[11px] text-rose-100">Dial 911 or visit Nearest ER</span>
              </div>
            ) : (
              <button
                onClick={onNavigateToVisitPrep}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <span>Proceed to Visit Prep</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </button>
            )}
          </div>
        </div>

        {/* Safety Notes list */}
        {activeCase.redFlagAssessment?.keySafetyNotes && activeCase.redFlagAssessment.keySafetyNotes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-black/10 space-y-1 text-xs">
            <span className="font-semibold block">Safety Guardrails & Monitoring:</span>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700">
              {activeCase.redFlagAssessment.keySafetyNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Interactive Questionnaire Logic Tree */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Interactive Red Flag Screening Questionnaire</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select any symptoms or discordance flags that apply to your current situation. The triage status updates in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RED_FLAG_QUESTIONS.map((q) => {
            const isChecked = selectedFlags.includes(q.id);
            return (
              <div
                key={q.id}
                onClick={() => handleToggleFlag(q.id)}
                className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? q.severity === 'Urgent Emergency'
                      ? 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-400'
                      : 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-400'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Handled by container click
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {q.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.severity === 'Urgent Emergency'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {q.severity}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 leading-snug">
                    {q.prompt}
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {selectedFlags.length === 0 && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Zero acute red flags selected. Your dilemma currently qualifies as standard medical nuance or diagnostic ambiguity. You have time to systematically prepare for your upcoming doctor consultation.
            </span>
          </div>
        )}
      </div>

      {/* Triage Legend Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>1. Acceptable Nuance</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Both recommendations are guideline-supported. The decision rests on personal lifestyle goals, downtime preferences, and risk tolerance.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-yellow-700 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span>2. Diagnostic Ambiguity</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Tests are in the borderline or inconclusive zone. Additional targeted scans, blood panels, or watchful surveillance are indicated before permanent treatment.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>3. Critical Red Flag</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Opposing life-threatening diagnoses (e.g. malignant vs benign) or acute neurological/cardiac red flags requiring emergency or tertiary academic care.
          </p>
        </div>
      </div>
    </div>
  );
};
