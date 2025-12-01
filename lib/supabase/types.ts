// Database enums
export type UserRole = 'admin' | 'student';
export type TaskCategory = 'daily_routine' | 'self_improvement' | 'household' | 'social_emotional';
export type RewardType = 'per_completion' | 'per_unit' | 'streak_only';

// Database tables
export interface User {
  id: string;
  pin_code: string;
  role: UserRole;
  display_name: string;
  created_at: string;
}

export interface Task {
  id: string;
  name: string;
  description: string | null;
  category: TaskCategory;
  reward_amount: number;
  reward_type: RewardType;
  unit_label: string | null;
  units_required: number;
  streak_days: number | null;
  streak_bonus: number | null;
  is_active: boolean;
  created_by: string;
  created_at: string;
}

export interface TaskLog {
  id: string;
  user_id: string;
  task_id: string;
  date: string;
  quantity: number;
  earned_amount: number;
  notes: string | null;
  created_at: string;
  task?: Task;
}

export interface Deduction {
  id: string;
  name: string;
  description: string | null;
  amount: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
}

export interface DeductionLog {
  id: string;
  user_id: string;
  deduction_id: string | null;
  date: string;
  amount: number;
  reason: string;
  reported_by: string;
  created_at: string;
  deduction?: Deduction;
}

export interface DebtSettings {
  id: string;
  user_id: string;
  total_debt: number;
  created_at: string;
  updated_at: string;
}

// Extended types for queries
export interface TaskLogWithTask extends TaskLog {
  task: Task;
}

export type DeductionLogWithDeduction = Omit<DeductionLog, 'deduction'> & {
  deduction: Deduction | null;
};

// Auth session type
export interface AuthSession {
  userId: string;
  role: UserRole;
  displayName: string;
}

// Category labels in Indonesian
export const categoryLabels: Record<TaskCategory, string> = {
  daily_routine: 'Rutinitas Harian',
  self_improvement: 'Pengembangan Diri',
  household: 'Pekerjaan Rumah',
  social_emotional: 'Sosial Emosional',
};

export const rewardTypeLabels: Record<RewardType, string> = {
  per_completion: 'Per Penyelesaian',
  per_unit: 'Per Unit',
  streak_only: 'Hanya Streak',
};
