'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { AuthSession } from '@/lib/supabase/types';

const SESSION_COOKIE_NAME = 'auth_session';

export async function login(formData: FormData): Promise<{ error?: string }> {
  const pin = formData.get('pin') as string;
  
  if (!pin || pin.length < 4 || pin.length > 6) {
    return { error: 'PIN harus 4-6 digit' };
  }
  
  const supabase = createServerClient();
  
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('pin_code', pin)
    .single();
  
  if (error || !user) {
    return { error: 'PIN tidak valid' };
  }
  
  const session: AuthSession = {
    userId: user.id,
    role: user.role,
    displayName: user.display_name,
  };
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
  
  redirect(user.role === 'admin' ? '/admin' : '/student');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('/login');
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    return JSON.parse(sessionCookie.value) as AuthSession;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AuthSession> {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

export async function requireRole(role: 'admin' | 'student'): Promise<AuthSession> {
  const session = await requireAuth();
  
  if (session.role !== role) {
    redirect(session.role === 'admin' ? '/admin' : '/student');
  }
  
  return session;
}
