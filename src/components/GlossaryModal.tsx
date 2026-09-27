import React, { useState } from 'react';
import { X, HelpCircle, Search, BookOpen } from 'lucide-react';
import { MEDICAL_GLOSSARY, GlossaryTerm } from '../data/medicalGlossary';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const filtered = MEDICAL_GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.patientTakeaway.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Diagnostic Concepts', 'Clinical Practice', 'Patient Advocacy', 'Biopsies & Imaging'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            <div>
              <h2 className="text-base font-semibold">Clinical Conflict & Advocacy Glossary</h2>
              <p className="text-xs text-slate-400">Demystifying medical jargon and second-opinion terminology</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search terminology (e.g. SBAR, Inter-observer, Bias)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors cursor-pointer font-medium ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary List */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{item.term}</h3>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {item.category}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed font-normal">
                  <strong className="text-slate-900">Clinical Definition:</strong> {item.definition}
                </p>

                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="text-teal-800 font-bold block text-[11px]">💡 What this means for you:</span>
                  <p className="text-slate-600 leading-relaxed">{item.patientTakeaway}</p>
                </div>

                <div className="text-[11px] text-slate-500 pt-1">
                  <strong className="text-slate-700">Real-World Example:</strong> <em>{item.clinicalExample}</em>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500">
              No matching terminology found for "{searchTerm}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
