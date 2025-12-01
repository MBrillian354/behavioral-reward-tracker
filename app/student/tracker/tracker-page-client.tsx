'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { DailyChecklist } from '@/components/student/daily-checklist';
import { formatDateIndonesian } from '@/lib/utils/dates';
import { Task, TaskLog } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';

interface TrackerPageClientProps {
  tasks: Task[];
  todayLogs: TaskLog[];
  userId: string;
  dateStr: string;
  streaks: Record<string, number>;
  today: Date;
}

export function TrackerPageClient({ tasks, todayLogs, userId, dateStr, streaks, today }: TrackerPageClientProps) {
  const { t } = useTranslation('tracker');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
      </div>

      {/* Today's Date */}
      <Card variant="filled">
        <CardContent className="py-4 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--md-primary-container)] flex items-center justify-center mb-2">
            <Icon name="calendar_today" className="text-[var(--md-on-primary-container)]" />
          </div>
          <p className="md-title-large text-[var(--md-on-surface)]">
            {formatDateIndonesian(today)}
          </p>
        </CardContent>
      </Card>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              {t('noTasks')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <DailyChecklist
          tasks={tasks}
          existingLogs={todayLogs}
          userId={userId}
          date={dateStr}
          streaks={streaks}
        />
      )}
    </div>
  );
}
