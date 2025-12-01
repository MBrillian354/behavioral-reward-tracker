import { requireRole } from '@/lib/actions/auth';
import { getTasks } from '@/lib/actions/tasks';
import { getTaskLogsForDate, getTaskLogs } from '@/lib/actions/logs';
import { toDateString } from '@/lib/utils/dates';
import { calculateStreak } from '@/lib/utils/streak';
import { TrackerPageClient } from './tracker-page-client';

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
    <TrackerPageClient
      tasks={tasks}
      todayLogs={todayLogs}
      userId={session.userId}
      dateStr={dateStr}
      streaks={streaks}
      today={today}
    />
  );
}
