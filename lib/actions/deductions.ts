'use server';

import { createServerClient } from '@/lib/supabase/server';
import { Deduction } from '@/lib/supabase/types';
import { revalidatePath } from 'next/cache';

export async function getDeductions(activeOnly: boolean = false): Promise<Deduction[]> {
  const supabase = createServerClient();
  
  let query = supabase.from('deductions').select('*').order('name');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching deductions:', error);
    return [];
  }
  
  return data || [];
}

export async function getDeduction(id: string): Promise<Deduction | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('deductions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching deduction:', error);
    return null;
  }
  
  return data;
}

interface CreateDeductionData {
  name: string;
  description?: string;
  amount: number;
  created_by: string;
}

export async function createDeduction(data: CreateDeductionData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase.from('deductions').insert({
    name: data.name,
    description: data.description || null,
    amount: data.amount,
    is_active: true,
    created_by: data.created_by,
  });
  
  if (error) {
    console.error('Error creating deduction:', error);
    return { success: false, error: 'Gagal membuat deduksi. Silakan coba lagi.' };
  }
  
  revalidatePath('/admin/deductions');
  revalidatePath('/student/report');
  
  return { success: true };
}

interface UpdateDeductionData {
  id: string;
  name: string;
  description?: string;
  amount: number;
  is_active: boolean;
}

export async function updateDeduction(data: UpdateDeductionData): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('deductions')
    .update({
      name: data.name,
      description: data.description || null,
      amount: data.amount,
      is_active: data.is_active,
    })
    .eq('id', data.id);
  
  if (error) {
    console.error('Error updating deduction:', error);
    return { success: false, error: 'Gagal memperbarui deduksi. Silakan coba lagi.' };
  }
  
  revalidatePath('/admin/deductions');
  revalidatePath('/student/report');
  
  return { success: true };
}

export async function toggleDeductionActive(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('deductions')
    .update({ is_active: isActive })
    .eq('id', id);
  
  if (error) {
    console.error('Error toggling deduction:', error);
    return { success: false, error: 'Gagal mengubah status deduksi.' };
  }
  
  revalidatePath('/admin/deductions');
  revalidatePath('/student/report');
  
  return { success: true };
}

export async function deleteDeduction(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('deductions')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting deduction:', error);
    return { success: false, error: 'Gagal menghapus deduksi.' };
  }
  
  revalidatePath('/admin/deductions');
  
  return { success: true };
}
