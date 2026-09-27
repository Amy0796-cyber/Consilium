import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Download, 
  Upload, 
  Trash2, 
  FileCode, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { PatientCase } from '../types/medical';
import { exportCaseToJson, parseImportedJson, resetAllLocalData } from '../utils/storage';

interface PrivacyComplianceCenterProps {
  activeCase: PatientCase;
  onImportCase: (importedCase: PatientCase) => void;
  onResetToDefault: () => void;
}

export const PrivacyComplianceCenter: React.FC<PrivacyComplianceCenterProps> = ({
  activeCase,
  onImportCase,
  onResetToDefault
}) => {
  const [showJsonRaw, setShowJsonRaw] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseImportedJson(text);
        onImportCase(parsed);
        setImportSuccess(true);
        setImportError(null);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch (err: any) {
        setImportError(err.message || 'Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to erase all locally stored cases and reset to the default scenario?')) {
      resetAllLocalData();
      onResetToDefault();
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Data Sovereignty & Security</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Cloud Local-First Architecture</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
              <Lock className="w-6 h-6 text-slate-700" />
              <span>Trust, Safety & Privacy Vault</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consilium operates under a <strong>Zero-Knowledge client-side architecture</strong>. Your clinical diagnoses, provider names, medications, and dilemmas are never transmitted to cloud servers, databases, or third-party trackers.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillar Security Guarantee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>1. Local-Only Storage</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            All data persists strictly within your device's browser sandbox (<code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">localStorage</code>). No remote database credentials exist in this application.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Lock className="w-5 h-5" />
            <span>2. Zero Third-Party Telemetry</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero advertising pixels, marketing trackers, or telemetry SDKs. Your health records cannot be cross-matched or monetized.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <FileCode className="w-5 h-5" />
            <span>3. Complete Portability</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download your cases as portable JSON files at any time, or permanently wipe your browser cache with one click.
          </p>
        </div>
      </div>

      {/* Data Management Actions Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Sovereign Data Controls
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Export, import, or permanently delete your local dilemma files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Export JSON */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">Backup Case (JSON)</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Download a clean, structured JSON file of the currently active case.
              </p>
            </div>
            <button
              onClick={() => exportCaseToJson(activeCase)}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Active Case</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">Restore / Import Case</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Load a previously exported Consilium JSON file into this browser.
              </p>
            </div>
            <label className="w-full flex items-center justify-center gap-1.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-colors cursor-pointer text-center">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload JSON File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset All */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="font-bold text-rose-900 block">Purge Local Data</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Erase all custom cases and stored sessions from this browser cache.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-1.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Wipe Local Storage</span>
            </button>
          </div>

        </div>

        {importSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Case imported successfully and loaded into active workspace!</span>
          </div>
        )}

        {importError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
            <span>Import failed: {importError}</span>
          </div>
        )}
      </div>

      {/* Raw JSON Inspector */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-slate-700" />
              <span>Raw Case Data Model Schema</span>
            </h2>
            <p className="text-xs text-slate-500">
              Inspect the exact JSON object schema currently stored in your browser's local sandbox.
            </p>
          </div>

          <button
            onClick={() => setShowJsonRaw(!showJsonRaw)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            {showJsonRaw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showJsonRaw ? 'Hide JSON' : 'Inspect JSON'}</span>
          </button>
        </div>

        {showJsonRaw && (
          <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl overflow-x-auto text-xs font-mono max-h-96">
            <pre>{JSON.stringify(activeCase, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
