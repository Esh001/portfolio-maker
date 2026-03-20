import { useState, useEffect, useCallback } from 'react';
import { defaultResume, type ResumeData } from '../types/resume';

const STORAGE_KEY = 'resume-builder-data';

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ResumeData;
      // Ensure visibility exists (backwards compat)
      if (!parsed.visibility) {
        parsed.visibility = defaultResume.visibility;
      }
      return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return defaultResume;
}

export function useResume() {
  const [resume, setResume] = useState<ResumeData>(loadFromStorage);

  // Persist on every change
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
    }, 300);
    return () => clearTimeout(timeout);
  }, [resume]);

  const updateProfile = useCallback(
    (field: keyof ResumeData['profile'], value: string) => {
      setResume((prev) => ({
        ...prev,
        profile: { ...prev.profile, [field]: value },
      }));
    },
    []
  );

  const toggleVisibility = useCallback(
    (section: keyof ResumeData['visibility']) => {
      setResume((prev) => ({
        ...prev,
        visibility: {
          ...prev.visibility,
          [section]: !prev.visibility[section],
        },
      }));
    },
    []
  );

  const resetResume = useCallback(() => {
    setResume(defaultResume);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    resume,
    setResume,
    updateProfile,
    toggleVisibility,
    resetResume,
  };
}
