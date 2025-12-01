import { TaskLog, DeductionLog } from '@/lib/supabase/types';

/**
 * Calculate daily earnings from task logs
 */
export function calculateDailyEarnings(logs: TaskLog[]): number {
  return logs.reduce((sum, log) => sum + log.earned_amount, 0);
}

/**
 * Calculate total earnings from all task logs
 */
export function calculateTotalEarnings(logs: TaskLog[]): number {
  return logs.reduce((sum, log) => sum + log.earned_amount, 0);
}

/**
 * Calculate total deductions from all deduction logs
 */
export function calculateTotalDeductions(logs: DeductionLog[]): number {
  return logs.reduce((sum, log) => sum + log.amount, 0);
}

/**
 * Calculate net earnings (earnings minus deductions)
 */
export function calculateNetEarnings(earnings: number, deductions: number): number {
  return earnings - deductions;
}

/**
 * Calculate remaining debt
 */
export function calculateRemainingDebt(totalDebt: number, earnings: number, deductions: number): number {
  const netEarnings = calculateNetEarnings(earnings, deductions);
  const remaining = totalDebt - netEarnings;
  return remaining > 0 ? remaining : 0;
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(totalDebt: number, earnings: number, deductions: number): number {
  if (totalDebt === 0) return 100;
  const netEarnings = calculateNetEarnings(earnings, deductions);
  const progress = (netEarnings / totalDebt) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

/**
 * Group task logs by date
 */
export function groupLogsByDate(logs: TaskLog[]): Record<string, TaskLog[]> {
  return logs.reduce((acc, log) => {
    const date = log.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {} as Record<string, TaskLog[]>);
}

/**
 * Calculate earnings for a specific date
 */
export function calculateEarningsForDate(logs: TaskLog[], date: string): number {
  return logs
    .filter((log) => log.date === date)
    .reduce((sum, log) => sum + log.earned_amount, 0);
}
