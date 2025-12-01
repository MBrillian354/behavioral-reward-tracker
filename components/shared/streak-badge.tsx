'use client';

import { useTranslation } from '@/lib/i18n';
import { Icon } from '@/components/ui/icon';

interface StreakBadgeProps {
  streak: number;
  requiredDays?: number | null;
  showProgress?: boolean;
}

export function StreakBadge({ streak, requiredDays, showProgress = true }: StreakBadgeProps) {
  const { t } = useTranslation('common');

  if (streak === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)]">
        <Icon name="local_fire_department" size="small" /> 0 {t('days')}
      </span>
    );
  }

  const isStreakComplete = requiredDays ? streak >= requiredDays : false;
  const progress = requiredDays ? streak % requiredDays : 0;
  const remaining = requiredDays ? requiredDays - progress : 0;

  return (
    <span 
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        ${isStreakComplete 
          ? 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]' 
          : 'bg-amber-100 text-amber-900'
        }
      `}
    >
      <Icon name="local_fire_department" size="small" className="text-amber-600" /> {streak} {t('days')}
      {showProgress && requiredDays && !isStreakComplete && (
        <span className="opacity-70">({remaining} {t('more')})</span>
      )}
      {isStreakComplete && progress === 0 && (
        <Icon name="auto_awesome" size="small" />
      )}
    </span>
  );
}
