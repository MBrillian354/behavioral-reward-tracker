'use server';

import { createServerClient } from '@/lib/supabase/server';
import { User, DebtSettings } from '@/lib/supabase/types';
import { revalidatePath } from 'next/cache';

export async function getStudentUser(): Promise<User | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'student')
    .single();
  
  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }
  
  return data;
}

export async function getDebtSettings(userId: string): Promise<DebtSettings | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('debt_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching debt settings:', error);
    return null;
  }
  
  return data;
}

export async function updateDebtSettings(userId: string, totalDebt: number): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  // Check if settings exist
  const { data: existing } = await supabase
    .from('debt_settings')
    .select('id')
    .eq('user_id', userId)
    .single();
  
  if (existing) {
    // Update existing
    const { error } = await supabase
      .from('debt_settings')
      .update({
        total_debt: totalDebt,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating debt settings:', error);
      return { success: false, error: 'Gagal memperbarui pengaturan utang.' };
    }
  } else {
    // Create new
    const { error } = await supabase.from('debt_settings').insert({
      user_id: userId,
      total_debt: totalDebt,
    });
    
    if (error) {
      console.error('Error creating debt settings:', error);
      return { success: false, error: 'Gagal membuat pengaturan utang.' };
    }
  }
  
  revalidatePath('/admin/student');
  revalidatePath('/student');
  
  return { success: true };
}

export async function getStudentStats(userId: string): Promise<{
  totalEarnings: number;
  totalDeductions: number;
  totalDebt: number;
  thisWeekEarnings: number;
  thisWeekDeductions: number;
  activeTasks: number;
}> {
  const supabase = createServerClient();
  
  // Get total earnings
  const { data: earnings } = await supabase
    .from('task_logs')
    .select('earned_amount')
    .eq('user_id', userId);
  
  const totalEarnings = (earnings || []).reduce((sum, log) => sum + log.earned_amount, 0);
  
  // Get total deductions
  const { data: deductions } = await supabase
    .from('deduction_logs')
    .select('amount')
    .eq('user_id', userId);
  
  const totalDeductions = (deductions || []).reduce((sum, log) => sum + log.amount, 0);
  
  // Get debt settings
  const debtSettings = await getDebtSettings(userId);
  const totalDebt = debtSettings?.total_debt || 0;
  
  // Get this week's earnings
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);
  const mondayStr = monday.toISOString().split('T')[0];
  
  const { data: weekEarnings } = await supabase
    .from('task_logs')
    .select('earned_amount')
    .eq('user_id', userId)
    .gte('date', mondayStr);
  
  const thisWeekEarnings = (weekEarnings || []).reduce((sum, log) => sum + log.earned_amount, 0);
  
  // Get this week's deductions
  const { data: weekDeductions } = await supabase
    .from('deduction_logs')
    .select('amount')
    .eq('user_id', userId)
    .gte('date', mondayStr);
  
  const thisWeekDeductions = (weekDeductions || []).reduce((sum, log) => sum + log.amount, 0);
  
  // Get active tasks count
  const { count } = await supabase
    .from('tasks')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true);
  
  return {
    totalEarnings,
    totalDeductions,
    totalDebt,
    thisWeekEarnings,
    thisWeekDeductions,
    activeTasks: count || 0,
  };
}
