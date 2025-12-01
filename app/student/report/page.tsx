import { Card, CardContent } from '@/components/ui/card';
import { requireRole } from '@/lib/actions/auth';
import { getDeductions } from '@/lib/actions/deductions';
import { SelfReportForm } from './self-report-form';

export default async function StudentReportPage() {
  const session = await requireRole('student');
  const deductions = await getDeductions(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Lapor Kesalahan</h1>
        <p className="md-body-medium text-[var(--md-on-surface-variant)] mt-2">
          Kejujuran adalah kunci! Laporkan kesalahan sendiri untuk membangun karakter yang baik.
        </p>
      </div>

      {/* Encouragement Card */}
      <Card variant="filled">
        <CardContent className="py-4 text-center">
          <span className="text-4xl mb-2 block">🌟</span>
          <p className="md-title-medium text-[var(--md-on-surface)]">
            Mengakui kesalahan adalah tanda keberanian
          </p>
          <p className="md-body-small text-[var(--md-on-surface-variant)] mt-1">
            Setiap kesalahan adalah kesempatan untuk belajar dan berkembang
          </p>
        </CardContent>
      </Card>

      {deductions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Tidak ada jenis deduksi yang tersedia saat ini.
            </p>
          </CardContent>
        </Card>
      ) : (
        <SelfReportForm deductions={deductions} userId={session.userId} />
      )}
    </div>
  );
}
