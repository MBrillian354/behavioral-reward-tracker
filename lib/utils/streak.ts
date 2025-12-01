import { TaskLog } from '@/lib/supabase/types';
import { parseDate } from './dates';

/**
 * Calculate current streak for a task based on consecutive days
 */
export function calculateStreak(logs: TaskLog[], taskId: string): number {
  const taskLogs = logs
    .filter((log) => log.task_id === taskId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (taskLogs.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the most recent log is today or yesterday
  const mostRecentDate = parseDate(taskLogs[0].date);
  
  if (mostRecentDate.getTime() !== today.getTime() && 
      mostRecentDate.getTime() !== yesterday.getTime()) {
    return 0; // Streak broken if last log isn't today or yesterday
  }

  // Count consecutive days
  const currentDate = new Date(mostRecentDate);
  
  for (const log of taskLogs) {
    const logDate = parseDate(log.date);
    
    if (logDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (logDate.getTime() < currentDate.getTime()) {
      // Gap in dates, streak is broken
      break;
    }
  }

  return streak;
}

/**
 * Check if streak bonus should be awarded
 */
export function checkStreakBonus(streak: number, requiredDays: number): boolean {
  return streak >= requiredDays && streak % requiredDays === 0;
}

/**
 * Get streak status text in Indonesian
 */
export function getStreakStatusText(streak: number, requiredDays: number | null): string {
  if (!requiredDays) return `${streak} hari berturut-turut`;
  
  const progress = streak % requiredDays;
  const remaining = requiredDays - progress;
  
  if (progress === 0 && streak > 0) {
    return `🎉 Bonus streak tercapai! (${streak} hari)`;
  }
  
  return `${streak} hari (${remaining} hari lagi untuk bonus)`;
}
