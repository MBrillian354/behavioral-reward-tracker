import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { formatRupiah } from '@/lib/utils/currency';

interface StatsCardProps {
  title: string;
  value: number | string;
  isCurrency?: boolean;
  icon: string;
  subtitle?: string;
}

export function StatsCard({ title, value, isCurrency = false, icon, subtitle }: StatsCardProps) {
  const displayValue = isCurrency ? formatRupiah(value as number) : value;
  
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="md-label-medium text-[var(--md-on-surface-variant)]">{title}</p>
            <p className="md-headline-small text-[var(--md-on-surface)] mt-1">{displayValue}</p>
            {subtitle && (
              <p className="md-body-small text-[var(--md-on-surface-variant)] mt-1">{subtitle}</p>
            )}
          </div>
          <div className="w-12 h-12 rounded-full bg-[var(--md-primary-container)] flex items-center justify-center">
            <Icon name={icon} className="text-[var(--md-on-primary-container)]" size="large" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
