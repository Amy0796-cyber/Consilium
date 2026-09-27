import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  CheckSquare, 
  Square, 
  Plus, 
  Copy, 
  Printer, 
  Check, 
  Sparkles, 
  Trash2, 
  HelpCircle,
  Stethoscope,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PatientCase, ClinicalQuestion } from '../types/medical';

interface DoctorVisitPrepProps {
  activeCase: PatientCase;
  onUpdateCase: (updatedCase: PatientCase) => void;
  onPrintAgenda: () => void;
}

export const DoctorVisitPrep: React.FC<DoctorVisitPrepProps> = ({
  activeCase,
  onUpdateCase,
  onPrintAgenda
}) => {
  const [copied, setCopied] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<ClinicalQuestion['category']>('Second Opinion Reconciliation');
  const [newQuestionTarget, setNewQuestionTarget] = useState('Doctor A');
  const [newQuestionRationale, setNewQuestionRationale] = useState('');
  const [newQuestionScript, setNewQuestionScript] = useState('');

  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const questions = activeCase.clinicalQuestions || [];
  const sbar = activeCase.sbarBrief;

  const handleToggleQuestion = (id: string) => {
    const updatedQuestions = questions.map(q => 
      q.id === id ? { ...q, isSelected: !q.isSelected } : q
    );
    onUpdateCase({
      ...activeCase,
      clinicalQuestions: updatedQuestions,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    onUpdateCase({
      ...activeCase,
      clinicalQuestions: updatedQuestions,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleAddCustomQuestion = () => {
    if (!newQuestionText.trim()) return;

    const newQ: ClinicalQuestion = {
      id: `custom-q-${Date.now()}`,
      category: newQuestionCategory,
      targetDoctorLabel: newQuestionTarget,
      question: newQuestionText,
      whyThisMatters: newQuestionRationale || 'Personal patient priority for treatment clarity.',
      physicianFriendlyScript: newQuestionScript || newQuestionText,
      isSelected: true,
      isCustom: true
    };

    const updatedQuestions = [...questions, newQ];
    onUpdateCase({
      ...activeCase,
      clinicalQuestions: updatedQuestions,
      lastUpdated: new Date().toISOString()
    });

    setNewQuestionText('');
    setNewQuestionRationale('');
    setNewQuestionScript('');
    setShowAddQuestionModal(false);
  };

  const handleCopySbar = () => {
    const selectedQList = questions
      .filter(q => q.isSelected)
      .map((q, idx) => `${idx + 1}. [${q.targetDoctorLabel}] ${q.question}`)
      .join('\n');

    const textToCopy = `=== CONSILIUM CLINICAL VISIT PREPARATION BRIEF (SBAR) ===
Patient: ${activeCase.patientAlias} (${activeCase.patientAge || 'Age N/A'})
Dilemma: ${activeCase.title}
Specialty: ${activeCase.specialtyArea}

[SITUATION]
${sbar?.situation || 'Navigating conflicting clinical recommendations.'}

[BACKGROUND]
${sbar?.background || 'Opposing medical opinions logged.'}

[ASSESSMENT]
${sbar?.assessment || 'Clinical discrepancy between provider paradigms.'}

[REQUEST]
${sbar?.request || 'Define treatment path and stop-loss criteria.'}

[PRIORITY CLINICAL QUESTIONS FOR CONSULTATION]
${selectedQList || 'No questions selected.'}

Generated via Consilium - Zero-Knowledge Medical Advocacy Platform
`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-indigo-800">15-Minute Consultation Strategy</span>
              <span aria-hidden="true">·</span>
              <span>Case: {activeCase.patientAlias}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span>Doctor Visit Prep & Clinical Question Generator</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Medical appointments are brief (often 15 minutes). This generator structures your conflicting opinions into the <strong>SBAR hospital communication framework</strong>, providing non-defensive questions that physicians welcome.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleCopySbar}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied SBAR!' : 'Copy to Clipboard'}</span>
            </button>

            <button
              onClick={onPrintAgenda}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Visit Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* 15-Minute Appointment Time Strategy Breakdown */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>Optimal 15-Minute Consultation Time Management Strategy</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">15:00 Total Budget</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-indigo-400 font-bold">
              <span>01. Frame (SBAR)</span>
              <span className="font-mono">Min 0–3</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Open with your 60-second SBAR situation statement so the doctor knows exactly what decision needs to be made today.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-teal-400 font-bold">
              <span>02. Targeted Qs</span>
              <span className="font-mono">Min 3–8</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Ask your 2-3 prioritized clinical discrepancy questions using the physician-friendly scripts.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>03. Risk Trade-Offs</span>
              <span className="font-mono">Min 8–12</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Evaluate conservative trial duration vs invasive risk with the doctor.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>04. Action Milestones</span>
              <span className="font-mono">Min 12–15</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Agree on specific stop-loss criteria: what symptoms signal moving from conservative to surgery?
            </p>
          </div>
        </div>
      </div>

      {/* SBAR Clinical Brief Framework Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-indigo-700" />
              <span>SBAR Clinical Brief (Physician Communication Framework)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Read or hand this summary directly to your clinician to frame the dilemma professionally.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* S: Situation */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px]">
                S — Situation (What is the immediate dilemma?)
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              {sbar?.situation}
            </p>
          </div>

          {/* B: Background */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px]">
                B — Background (What scans and opinions exist?)
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {sbar?.background}
            </p>
          </div>

          {/* A: Assessment */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px]">
                A — Assessment (Where is the contradiction?)
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {sbar?.assessment}
            </p>
          </div>

          {/* R: Request */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px]">
                R — Request (What decision or milestone do we need today?)
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed font-semibold text-slate-900">
              {sbar?.request}
            </p>
          </div>
        </div>
      </div>

      {/* Selected Priority Clinical Questions */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-teal-700" />
              <span>Prioritized Clinical Clarification Questions</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select questions to include on your printable visit sheet. Expand any question to view the non-defensive doctor script.
            </p>
          </div>

          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-lg border border-teal-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Custom Question</span>
          </button>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className={`border rounded-xl transition-all duration-150 overflow-hidden ${
                  q.isSelected
                    ? 'bg-white border-teal-300 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-75'
                }`}
              >
                <div className="p-4 flex items-start gap-3">
                  <button
                    onClick={() => handleToggleQuestion(q.id)}
                    className="mt-0.5 text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    {q.isSelected ? (
                      <CheckSquare className="w-5 h-5 text-teal-700" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-800">Q0{idx + 1}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded text-[11px] border border-teal-100">
                          {q.targetDoctorLabel}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-[11px] text-slate-500">{q.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                          className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <span className="hidden sm:inline text-[11px]">
                            {isExpanded ? 'Hide Script' : 'View Doctor Script'}
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {q.isCustom && (
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                            title="Delete question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      <strong className="text-slate-700">Why this matters:</strong> {q.whyThisMatters}
                    </p>
                  </div>
                </div>

                {/* Expandable Script Box */}
                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-indigo-900 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Suggested Physician-Friendly Word-for-Word Script:</span>
                    </div>
                    <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed italic">
                      "{q.physicianFriendlyScript}"
                    </p>
                    <p className="text-[11px] text-slate-500">
                      💡 <em>Tip: Phrasing the question collaboratively prevents the physician from feeling defensive about the second opinion.</em>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Add Custom Question */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-400" />
                <span>Add Custom Consultation Question</span>
              </h3>
              <button onClick={() => setShowAddQuestionModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Clinician</label>
                <input
                  type="text"
                  placeholder="e.g. Doctor A (Surgeon) or Both Clinicians"
                  value={newQuestionTarget}
                  onChange={(e) => setNewQuestionTarget(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Question Category</label>
                <select
                  value={newQuestionCategory}
                  onChange={(e) => setNewQuestionCategory(e.target.value as ClinicalQuestion['category'])}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                >
                  <option value="Second Opinion Reconciliation">Second Opinion Reconciliation</option>
                  <option value="Treatment Trade-Offs">Treatment Trade-Offs</option>
                  <option value="Diagnostic Verification">Diagnostic Verification</option>
                  <option value="Test Clarification">Test Clarification</option>
                  <option value="Prognosis & Watchful Waiting">Prognosis & Watchful Waiting</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Question Prompt</label>
                <textarea
                  rows={2}
                  placeholder="What specific discrepancy do you want to ask your doctor about?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Why this matters (Clinical Rationale)</label>
                <input
                  type="text"
                  placeholder="e.g. To decide whether waiting 4 weeks is safe."
                  value={newQuestionRationale}
                  onChange={(e) => setNewQuestionRationale(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Physician-Friendly Script (How you will say it in the room)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Doctor, I want to make sure I understand the trade-offs before choosing..."
                  value={newQuestionScript}
                  onChange={(e) => setNewQuestionScript(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomQuestion}
                  className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded font-semibold cursor-pointer"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
