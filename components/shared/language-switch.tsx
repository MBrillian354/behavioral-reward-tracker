'use client';

import { useLanguage } from '@/lib/i18n';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--md-outline-variant)] hover:bg-[var(--md-surface-container-high)] transition-colors md-label-medium"
      title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <span className="text-base">{language === 'id' ? '🇮🇩' : '🇬🇧'}</span>
      <span className="text-[var(--md-on-surface)]">
        {language === 'id' ? 'ID' : 'EN'}
      </span>
    </button>
  );
}
