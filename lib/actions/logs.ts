'use server';

import { createServerClient } from '@/lib/supabase/server';
import { TaskLogWithTask, DeductionLogWithDeduction } from '@/lib/supabase/types';
import { revalidatePath } from 'next/cache';

// Task Logs
export async function getTaskLogs(userId: string, startDate?: string, endDate?: string): Promise<TaskLogWithTask[]> {
  const supabase = createServerClient();
  
  let query = supabase
    .from('task_logs')
    .select('*, task:tasks(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });
  
  if (startDate) {
    query = query.gte('date', startDate);
  }
  
  if (endDate) {
    query = query.lte('date', endDate);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching task logs:', error);
    return [];
  }
  
  return (data || []) as TaskLogWithTask[];
}

export async function getTaskLogsForDate(userId: string, date: string): Promise<TaskLogWithTask[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('task_logs')
    .select('*, task:tasks(*)')
    .eq('user_id', userId)
    .eq('date', date);
  
  if (error) {
    console.error('Error fetching task logs for date:', error);
    return [];
  }
  
  return (data || []) as TaskLogWithTask[];
}

interface CreateTaskLogData {
  user_id: string;
  task_id: string;
  date: string;
  quantity: number;
  earned_amount: number;
  notes?: string;
}

export async function createTaskLog(data: CreateTaskLogData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  // Check if log already exists for per_completion tasks
  const { data: existingLog } = await supabase
    .from('task_logs')
    .select('id')
    .eq('user_id', data.user_id)
    .eq('task_id', data.task_id)
    .eq('date', data.date)
    .single();
  
  if (existingLog) {
    // Update existing log
    const { error } = await supabase
      .from('task_logs')
      .update({
        quantity: data.quantity,
        earned_amount: data.earned_amount,
        notes: data.notes || null,
      })
      .eq('id', existingLog.id);
    
    if (error) {
      console.error('Error updating task log:', error);
      return { success: false, error: 'Gagal memperbarui log tugas.' };
    }
  } else {
    // Create new log
    const { error } = await supabase.from('task_logs').insert({
      user_id: data.user_id,
      task_id: data.task_id,
      date: data.date,
      quantity: data.quantity,
      earned_amount: data.earned_amount,
      notes: data.notes || null,
    });
    
    if (error) {
      console.error('Error creating task log:', error);
      return { success: false, error: 'Gagal membuat log tugas.' };
    }
  }
  
  revalidatePath('/student/tracker');
  revalidatePath('/student');
  revalidatePath('/admin/logs');
  revalidatePath('/admin');
  
  return { success: true };
}

export async function deleteTaskLog(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('task_logs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting task log:', error);
    return { success: false, error: 'Gagal menghapus log tugas.' };
  }
  
  revalidatePath('/student/tracker');
  revalidatePath('/student');
  revalidatePath('/admin/logs');
  revalidatePath('/admin');
  
  return { success: true };
}

// Deduction Logs
export async function getDeductionLogs(userId: string, startDate?: string, endDate?: string): Promise<DeductionLogWithDeduction[]> {
  const supabase = createServerClient();
  
  let query = supabase
    .from('deduction_logs')
    .select('*, deduction:deductions(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });
  
  if (startDate) {
    query = query.gte('date', startDate);
  }
  
  if (endDate) {
    query = query.lte('date', endDate);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching deduction logs:', error);
    return [];
  }
  
  return (data || []) as DeductionLogWithDeduction[];
}

interface CreateDeductionLogData {
  user_id: string;
  deduction_id?: string;
  date: string;
  amount: number;
  reason: string;
  reported_by: string;
}

export async function createDeductionLog(data: CreateDeductionLogData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase.from('deduction_logs').insert({
    user_id: data.user_id,
    deduction_id: data.deduction_id || null,
    date: data.date,
    amount: data.amount,
    reason: data.reason,
    reported_by: data.reported_by,
  });
  
  if (error) {
    console.error('Error creating deduction log:', error);
    return { success: false, error: 'Gagal membuat log deduksi.' };
  }
  
  revalidatePath('/student/report');
  revalidatePath('/student');
  revalidatePath('/admin/logs');
  revalidatePath('/admin');
  
  return { success: true };
}

export async function deleteDeductionLog(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('deduction_logs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting deduction log:', error);
    return { success: false, error: 'Gagal menghapus log deduksi.' };
  }
  
  revalidatePath('/student');
  revalidatePath('/admin/logs');
  revalidatePath('/admin');
  
  return { success: true };
}
