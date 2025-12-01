'use server';

import { createServerClient } from '@/lib/supabase/server';
import { Task, TaskCategory, RewardType } from '@/lib/supabase/types';
import { revalidatePath } from 'next/cache';

export async function getTasks(activeOnly: boolean = false): Promise<Task[]> {
  const supabase = createServerClient();
  
  let query = supabase.from('tasks').select('*').order('category').order('name');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
  
  return data || [];
}

export async function getTask(id: string): Promise<Task | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching task:', error);
    return null;
  }
  
  return data;
}

export async function getTasksByCategory(category: TaskCategory, activeOnly: boolean = true): Promise<Task[]> {
  const supabase = createServerClient();
  
  let query = supabase.from('tasks').select('*').eq('category', category).order('name');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching tasks by category:', error);
    return [];
  }
  
  return data || [];
}

interface CreateTaskData {
  name: string;
  description?: string;
  category: TaskCategory;
  reward_amount: number;
  reward_type: RewardType;
  unit_label?: string;
  units_required?: number;
  streak_days?: number;
  streak_bonus?: number;
  created_by: string;
}

export async function createTask(data: CreateTaskData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase.from('tasks').insert({
    name: data.name,
    description: data.description || null,
    category: data.category,
    reward_amount: data.reward_amount,
    reward_type: data.reward_type,
    unit_label: data.unit_label || null,
    units_required: data.units_required || 1,
    streak_days: data.streak_days || null,
    streak_bonus: data.streak_bonus || null,
    is_active: true,
    created_by: data.created_by,
  });
  
  if (error) {
    console.error('Error creating task:', error);
    return { success: false, error: 'Gagal membuat tugas. Silakan coba lagi.' };
  }
  
  revalidatePath('/admin/tasks');
  revalidatePath('/student/tracker');
  
  return { success: true };
}

interface UpdateTaskData {
  id: string;
  name: string;
  description?: string;
  category: TaskCategory;
  reward_amount: number;
  reward_type: RewardType;
  unit_label?: string;
  units_required?: number;
  streak_days?: number;
  streak_bonus?: number;
  is_active: boolean;
}

export async function updateTask(data: UpdateTaskData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('tasks')
    .update({
      name: data.name,
      description: data.description || null,
      category: data.category,
      reward_amount: data.reward_amount,
      reward_type: data.reward_type,
      unit_label: data.unit_label || null,
      units_required: data.units_required || 1,
      streak_days: data.streak_days || null,
      streak_bonus: data.streak_bonus || null,
      is_active: data.is_active,
    })
    .eq('id', data.id);
  
  if (error) {
    console.error('Error updating task:', error);
    return { success: false, error: 'Gagal memperbarui tugas. Silakan coba lagi.' };
  }
  
  revalidatePath('/admin/tasks');
  revalidatePath('/student/tracker');
  
  return { success: true };
}

export async function toggleTaskActive(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('tasks')
    .update({ is_active: isActive })
    .eq('id', id);
  
  if (error) {
    console.error('Error toggling task:', error);
    return { success: false, error: 'Gagal mengubah status tugas.' };
  }
  
  revalidatePath('/admin/tasks');
  revalidatePath('/student/tracker');
  
  return { success: true };
}

export async function deleteTask(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: 'Gagal menghapus tugas.' };
  }
  
  revalidatePath('/admin/tasks');
  
  return { success: true };
}
