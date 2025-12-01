'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T extends keyof typeof translations>(
    section: T,
    key: keyof typeof translations[T]
  ) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = 'preferred_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load saved language preference from localStorage
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'en' || saved === 'id') {
      setLanguageState(saved);
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_KEY, lang);
  };

  const t = <T extends keyof typeof translations>(
    section: T,
    key: keyof typeof translations[T]
  ): string => {
    const sectionData = translations[section];
    if (!sectionData) return String(key);
    
    const entry = sectionData[key] as { id: string; en: string } | undefined;
    if (!entry) return String(key);
    
    return entry[language];
  };

  // Prevent hydration mismatch by rendering children only after initialization
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook for getting translations in a specific section
export function useTranslation<T extends keyof typeof translations>(section: T) {
  const { language, t } = useLanguage();
  
  return {
    language,
    t: (key: keyof typeof translations[T]): string => t(section, key),
  };
}
