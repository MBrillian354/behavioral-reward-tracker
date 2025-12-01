'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils/currency';
import { formatDateIndonesian } from '@/lib/utils/dates';
import { TaskLogWithTask, DeductionLogWithDeduction } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';

interface LogsPageClientProps {
  taskLogs: TaskLogWithTask[];
  deductionLogs: DeductionLogWithDeduction[];
}

export function LogsPageClient({ taskLogs, deductionLogs }: LogsPageClientProps) {
  const { t } = useTranslation('logs');

  return (
    <div className="space-y-6">
      <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>

      {/* Task Logs */}
      <Card>
        <CardHeader>
          <CardTitle>{t('taskHistory')} 💰</CardTitle>
        </CardHeader>
        <CardContent>
          {taskLogs.length === 0 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center py-4">
              {t('noTaskHistory')}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('task')}</TableHead>
                  <TableHead>{t('quantity')}</TableHead>
                  <TableHead align="right">{t('income')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskLogs.slice(0, 20).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {formatDateIndonesian(new Date(log.date), { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </TableCell>
                    <TableCell>
                      {log.task?.name || t('taskDeleted')}
                    </TableCell>
                    <TableCell>
                      {log.quantity > 1 ? `${log.quantity}x` : '1x'}
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-[var(--md-primary)] font-medium">
                        +{formatRupiah(log.earned_amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Deduction Logs */}
      <Card>
        <CardHeader>
          <CardTitle>{t('deductionHistory')} 📉</CardTitle>
        </CardHeader>
        <CardContent>
          {deductionLogs.length === 0 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center py-4">
              {t('noDeductionHistory')}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('deduction')}</TableHead>
                  <TableHead>{t('reason')}</TableHead>
                  <TableHead align="right">{t('deduction')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deductionLogs.slice(0, 20).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {formatDateIndonesian(new Date(log.date), { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </TableCell>
                    <TableCell>
                      {log.deduction?.name || t('custom')}
                    </TableCell>
                    <TableCell>
                      <span className="md-body-small text-[var(--md-on-surface-variant)]">
                        {log.reason}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-[var(--md-error)] font-medium">
                        -{formatRupiah(log.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function NoStudentLogsClient() {
  const { t } = useTranslation('logs');

  return (
    <div className="space-y-6">
      <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
      <Card>
        <CardContent className="py-8 text-center">
          <p className="md-body-large text-[var(--md-on-surface-variant)]">
            {t('noStudent')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
