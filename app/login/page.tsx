'use client';

import { useState } from 'react';
import { login } from '@/lib/actions/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--md-surface)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">🏆</div>
          <CardTitle className="md-headline-medium">Reward Tracker</CardTitle>
          <p className="md-body-medium text-[var(--md-on-surface-variant)] mt-2">
            Masukkan PIN untuk melanjutkan
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <Input
              type="password"
              name="pin"
              placeholder="Masukkan PIN"
              maxLength={6}
              minLength={4}
              required
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              className="text-center text-2xl tracking-widest"
            />
            
            {error && (
              <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium text-center">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              size="large"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-[var(--md-outline-variant)]">
            <p className="md-body-small text-[var(--md-on-surface-variant)] text-center">
              PIN untuk testing:<br />
              Admin: 123456 | Siswa: 111111
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
