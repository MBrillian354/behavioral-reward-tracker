'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { formatRupiah } from '@/lib/utils/currency';
import { formatDateIndonesian, toDateString } from '@/lib/utils/dates';
import { TaskLogWithTask, DeductionLogWithDeduction } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';

interface HistoryPageClientProps {
  weekDates: Date[];
  today: Date;
  logsByDate: Record<string, { tasks: TaskLogWithTask[]; deductions: DeductionLogWithDeduction[] }>;
  sortedDates: string[];
}

export function HistoryPageClient({ weekDates, today, logsByDate, sortedDates }: HistoryPageClientProps) {
  const { t } = useTranslation('studentHistory');
  const { t: tLogs } = useTranslation('logs');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
        <p className="md-body-medium text-[var(--md-on-surface-variant)] mt-2">
          {t('subtitle')}
        </p>
      </div>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('thisWeek')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {weekDates.map((date) => {
              const dateStr = toDateString(date);
              const dayData = logsByDate[dateStr];
              const isToday = toDateString(today) === dateStr;
              const earnings = dayData ? dayData.tasks.reduce((sum, l) => sum + l.earned_amount, 0) : 0;
              const deductions = dayData ? dayData.deductions.reduce((sum, l) => sum + l.amount, 0) : 0;
              const hasActivity = earnings > 0 || deductions > 0;

              return (
                <div 
                  key={dateStr}
                  className={`p-1 sm:p-2 rounded-lg text-center ${
                    isToday 
                      ? 'bg-[var(--md-primary-container)] border-2 border-[var(--md-primary)]' 
                      : hasActivity
                        ? 'bg-[var(--md-surface-container-high)]'
                        : 'bg-[var(--md-surface-container)]'
                  }`}
                >
                  <p className="md-label-small text-[var(--md-on-surface-variant)]">
                    {date.toLocaleDateString('id-ID', { weekday: 'short' }).slice(0, 2)}
                  </p>
                  <p className={`md-title-small ${isToday ? 'text-[var(--md-on-primary-container)]' : ''}`}>
                    {date.getDate()}
                  </p>
                  {hasActivity && (
                    <p className={`md-label-small mt-1 ${earnings - deductions >= 0 ? 'text-[var(--md-primary)]' : 'text-[var(--md-error)]'}`}>
                      {formatRupiah(earnings - deductions).replace('Rp ', '')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Daily History */}
      {sortedDates.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              {t('noHistory')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedDates.slice(0, 14).map((dateStr) => {
            const dayData = logsByDate[dateStr];
            const totalEarnings = dayData.tasks.reduce((sum, l) => sum + l.earned_amount, 0);
            const totalDeductions = dayData.deductions.reduce((sum, l) => sum + l.amount, 0);
            const net = totalEarnings - totalDeductions;

            return (
              <Card key={dateStr}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base sm:text-lg">
                      {formatDateIndonesian(new Date(dateStr), {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </CardTitle>
                    <Badge variant={net >= 0 ? 'success' : 'error'}>
                      {net >= 0 ? '+' : ''}{formatRupiah(net)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {/* Task logs */}
                    {dayData.tasks.map((log) => (
                      <div 
                        key={log.id}
                        className="flex justify-between items-center py-2 border-b border-[var(--md-outline-variant)] last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="check_circle" size="small" className="text-[var(--md-primary)]" />
                          <span className="md-body-medium">{log.task?.name || tLogs('taskDeleted')}</span>
                          {log.quantity > 1 && (
                            <Badge variant="default" size="small">x{log.quantity}</Badge>
                          )}
                        </div>
                        <span className="md-label-medium text-[var(--md-primary)]">
                          +{formatRupiah(log.earned_amount)}
                        </span>
                      </div>
                    ))}
                    
                    {/* Deduction logs */}
                    {dayData.deductions.map((log) => (
                      <div 
                        key={log.id}
                        className="flex justify-between items-center py-2 border-b border-[var(--md-outline-variant)] last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="cancel" size="small" className="text-[var(--md-error)]" />
                          <span className="md-body-medium">{log.deduction?.name || log.reason}</span>
                        </div>
                        <span className="md-label-medium text-[var(--md-error)]">
                          -{formatRupiah(log.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
