import { requireRole } from '@/lib/actions/auth';
import { getTaskLogs, getDeductionLogs } from '@/lib/actions/logs';
import { getWeekDates } from '@/lib/utils/dates';
import { TaskLogWithTask, DeductionLogWithDeduction } from '@/lib/supabase/types';
import { HistoryPageClient } from './history-page-client';

export default async function StudentHistoryPage() {
  const session = await requireRole('student');
  const taskLogs = await getTaskLogs(session.userId);
  const deductionLogs = await getDeductionLogs(session.userId);

  // Get current week dates
  const today = new Date();
  const weekDates = getWeekDates(today);

  // Group logs by date
  const logsByDate: Record<string, { tasks: TaskLogWithTask[]; deductions: DeductionLogWithDeduction[] }> = {};
  
  taskLogs.forEach((log) => {
    if (!logsByDate[log.date]) {
      logsByDate[log.date] = { tasks: [], deductions: [] };
    }
    logsByDate[log.date].tasks.push(log);
  });

  deductionLogs.forEach((log) => {
    if (!logsByDate[log.date]) {
      logsByDate[log.date] = { tasks: [], deductions: [] };
    }
    logsByDate[log.date].deductions.push(log);
  });

  // Sort dates descending
  const sortedDates = Object.keys(logsByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <HistoryPageClient
      weekDates={weekDates}
      today={today}
      logsByDate={logsByDate}
      sortedDates={sortedDates}
    />
  );
}
