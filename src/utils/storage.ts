import { PatientCase } from '../types/medical';
import { CASE_ARCHETYPES } from '../data/caseArchetypes';

const STORAGE_KEY_ACTIVE_CASE = 'consilium_active_case_v1';
const STORAGE_KEY_CUSTOM_CASES = 'consilium_user_saved_cases_v1';

export function loadInitialActiveCase(): PatientCase {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_CASE);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.id && parsed.providers) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading saved case from localStorage:', err);
  }
  // Default to the first preloaded archetype (Spine/L5-S1)
  return CASE_ARCHETYPES[0];
}

export function saveActiveCaseToStorage(activeCase: PatientCase): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_CASE, JSON.stringify(activeCase));
  } catch (err) {
    console.error('Error saving active case to localStorage:', err);
  }
}

export function loadAllSavedCases(): PatientCase[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_CASES);
    const customList: PatientCase[] = saved ? JSON.parse(saved) : [];
    
    // Combine custom cases with preloaded archetypes
    const all = [...CASE_ARCHETYPES];
    customList.forEach(c => {
      if (!all.some(a => a.id === c.id)) {
        all.push(c);
      }
    });
    return all;
  } catch (err) {
    console.error('Error loading custom cases:', err);
    return CASE_ARCHETYPES;
  }
}

export function saveCustomCase(newCase: PatientCase): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_CASES);
    let customList: PatientCase[] = saved ? JSON.parse(saved) : [];
    const index = customList.findIndex(c => c.id === newCase.id);
    if (index >= 0) {
      customList[index] = newCase;
    } else {
      customList.push(newCase);
    }
    localStorage.setItem(STORAGE_KEY_CUSTOM_CASES, JSON.stringify(customList));
    saveActiveCaseToStorage(newCase);
  } catch (err) {
    console.error('Error saving custom case:', err);
  }
}

export function exportCaseToJson(patientCase: PatientCase): void {
  const jsonStr = JSON.stringify(patientCase, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const sanitizedTitle = (patientCase.title || 'medical_case').toLowerCase().replace(/[^a-z0-9]/g, '_');
  link.href = url;
  link.download = `consilium_case_${sanitizedTitle}_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseImportedJson(jsonString: string): PatientCase {
  const parsed = JSON.parse(jsonString);
  if (!parsed.id || !parsed.title || !parsed.providers) {
    throw new Error('Invalid Consilium case file format: missing required case fields.');
  }
  return parsed as PatientCase;
}

export function resetAllLocalData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_ACTIVE_CASE);
    localStorage.removeItem(STORAGE_KEY_CUSTOM_CASES);
  } catch (err) {
    console.error('Error resetting local storage:', err);
  }
}
