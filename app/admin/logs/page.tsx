import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { getStudentUser } from '@/lib/actions/student';
import { getTaskLogs, getDeductionLogs } from '@/lib/actions/logs';
import { formatRupiah } from '@/lib/utils/currency';
import { formatDateIndonesian } from '@/lib/utils/dates';

export default async function AdminLogsPage() {
  const student = await getStudentUser();

  if (!student) {
    return (
      <div className="space-y-6">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Riwayat Aktivitas</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Belum ada siswa terdaftar.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const taskLogs = await getTaskLogs(student.id);
  const deductionLogs = await getDeductionLogs(student.id);

  return (
    <div className="space-y-6">
      <h1 className="md-headline-large text-[var(--md-on-surface)]">Riwayat Aktivitas</h1>

      {/* Task Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Tugas 💰</CardTitle>
        </CardHeader>
        <CardContent>
          {taskLogs.length === 0 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center py-4">
              Belum ada riwayat tugas.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Tugas</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead align="right">Pendapatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taskLogs.slice(0, 20).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {formatDateIndonesian(new Date(log.date), { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </TableCell>
                    <TableCell>
                      {log.task?.name || 'Tugas dihapus'}
                    </TableCell>
                    <TableCell>
                      {log.quantity > 1 ? `${log.quantity}x` : '1x'}
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-[var(--md-primary)] font-medium">
                        +{formatRupiah(log.earned_amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Deduction Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Potongan 📉</CardTitle>
        </CardHeader>
        <CardContent>
          {deductionLogs.length === 0 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center py-4">
              Belum ada riwayat potongan.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Deduksi</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead align="right">Potongan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deductionLogs.slice(0, 20).map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {formatDateIndonesian(new Date(log.date), { 
                        weekday: 'short', 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </TableCell>
                    <TableCell>
                      {log.deduction?.name || 'Kustom'}
                    </TableCell>
                    <TableCell>
                      <span className="md-body-small text-[var(--md-on-surface-variant)]">
                        {log.reason}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span className="text-[var(--md-error)] font-medium">
                        -{formatRupiah(log.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
