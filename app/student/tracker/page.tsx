import { Card, CardContent } from '@/components/ui/card';
import { requireRole } from '@/lib/actions/auth';
import { getTasks } from '@/lib/actions/tasks';
import { getTaskLogsForDate, getTaskLogs } from '@/lib/actions/logs';
import { DailyChecklist } from '@/components/student/daily-checklist';
import { formatDateIndonesian, toDateString } from '@/lib/utils/dates';
import { calculateStreak } from '@/lib/utils/streak';

export default async function StudentTrackerPage() {
  const session = await requireRole('student');
  const today = new Date();
  const dateStr = toDateString(today);
  
  const tasks = await getTasks(true);
  const todayLogs = await getTaskLogsForDate(session.userId, dateStr);
  
  // Get all logs for streak calculation
  const allLogs = await getTaskLogs(session.userId);
  
  // Calculate streaks for each task
  const streaks: Record<string, number> = {};
  tasks.forEach((task) => {
    if (task.streak_days) {
      streaks[task.id] = calculateStreak(allLogs, task.id);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Pelacak Harian</h1>
      </div>

      {/* Today's Date */}
      <Card variant="filled">
        <CardContent className="py-4 text-center">
          <span className="text-3xl mb-2 block">📅</span>
          <p className="md-title-large text-[var(--md-on-surface)]">
            {formatDateIndonesian(today)}
          </p>
        </CardContent>
      </Card>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Belum ada tugas yang tersedia. Hubungi admin untuk menambahkan tugas.
            </p>
          </CardContent>
        </Card>
      ) : (
        <DailyChecklist
          tasks={tasks}
          existingLogs={todayLogs}
          userId={session.userId}
          date={dateStr}
          streaks={streaks}
        />
      )}
    </div>
  );
}
