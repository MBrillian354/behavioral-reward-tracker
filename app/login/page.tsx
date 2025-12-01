'use client';

import { useState } from 'react';
import { login } from '@/lib/actions/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitch } from '@/components/shared/language-switch';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('login');

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
          <div className="flex justify-end mb-2">
            <LanguageSwitch />
          </div>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--md-primary-container)] flex items-center justify-center">
            <Icon name="emoji_events" size="xlarge" className="text-[var(--md-primary)]" />
          </div>
          <CardTitle className="md-headline-medium">{t('title')}</CardTitle>
          <p className="md-body-medium text-[var(--md-on-surface-variant)] mt-2">
            {t('subtitle')}
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <Input
              type="password"
              name="pin"
              placeholder={t('pinPlaceholder')}
              maxLength={6}
              minLength={4}
              required
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              className="text-center text-2xl tracking-widest"
            />
            
            {error && (
              <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium text-center flex items-center justify-center gap-2">
                <Icon name="error" size="small" />
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              size="large"
              disabled={loading}
            >
              {loading ? t('loginLoading') : t('loginButton')}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-[var(--md-outline-variant)]">
            <p className="md-body-small text-[var(--md-on-surface-variant)] text-center">
              {t('testPinInfo')}<br />
              {t('testPinAdmin')} | {t('testPinStudent')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
