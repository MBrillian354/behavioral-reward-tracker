export type Language = 'id' | 'en';

export const translations = {
  // Common
  common: {
    appName: {
      id: 'Reward Tracker',
      en: 'Reward Tracker',
    },
    loading: {
      id: 'Memproses...',
      en: 'Processing...',
    },
    saving: {
      id: 'Menyimpan...',
      en: 'Saving...',
    },
    save: {
      id: 'Simpan',
      en: 'Save',
    },
    cancel: {
      id: 'Batal',
      en: 'Cancel',
    },
    edit: {
      id: 'Edit',
      en: 'Edit',
    },
    delete: {
      id: 'Hapus',
      en: 'Delete',
    },
    active: {
      id: 'Aktif',
      en: 'Active',
    },
    inactive: {
      id: 'Nonaktif',
      en: 'Inactive',
    },
    saved: {
      id: 'Tersimpan',
      en: 'Saved',
    },
    error: {
      id: 'Terjadi kesalahan',
      en: 'An error occurred',
    },
    days: {
      id: 'hari',
      en: 'days',
    },
    day: {
      id: 'hari',
      en: 'day',
    },
    more: {
      id: 'lagi',
      en: 'more',
    },
  },

  // Navigation
  nav: {
    dashboard: {
      id: 'Dasbor',
      en: 'Dashboard',
    },
    tasks: {
      id: 'Tugas',
      en: 'Tasks',
    },
    deductions: {
      id: 'Deduksi',
      en: 'Deductions',
    },
    student: {
      id: 'Siswa',
      en: 'Student',
    },
    history: {
      id: 'Riwayat',
      en: 'History',
    },
    tracker: {
      id: 'Pelacak',
      en: 'Tracker',
    },
    report: {
      id: 'Lapor',
      en: 'Report',
    },
    logout: {
      id: 'Keluar',
      en: 'Logout',
    },
  },

  // Login page
  login: {
    title: {
      id: 'Reward Tracker',
      en: 'Reward Tracker',
    },
    subtitle: {
      id: 'Masukkan PIN untuk melanjutkan',
      en: 'Enter PIN to continue',
    },
    pinPlaceholder: {
      id: 'Masukkan PIN',
      en: 'Enter PIN',
    },
    loginButton: {
      id: 'Masuk',
      en: 'Login',
    },
    loginLoading: {
      id: 'Memproses...',
      en: 'Processing...',
    },
    testPinInfo: {
      id: 'PIN untuk testing:',
      en: 'Test PINs:',
    },
    testPinAdmin: {
      id: 'Admin: 123456',
      en: 'Admin: 123456',
    },
    testPinStudent: {
      id: 'Siswa: 111111',
      en: 'Student: 111111',
    },
  },

  // Admin Dashboard
  adminDashboard: {
    title: {
      id: 'Dasbor Admin',
      en: 'Admin Dashboard',
    },
    noStudent: {
      id: 'Belum ada siswa terdaftar. Silakan jalankan migration untuk menambahkan data awal.',
      en: 'No students registered. Please run migration to add initial data.',
    },
    totalEarnings: {
      id: 'Total Pendapatan',
      en: 'Total Earnings',
    },
    totalDeductions: {
      id: 'Total Potongan',
      en: 'Total Deductions',
    },
    remainingDebt: {
      id: 'Sisa Utang',
      en: 'Remaining Debt',
    },
    paidOff: {
      id: 'lunas',
      en: 'paid off',
    },
    activeTasks: {
      id: 'Tugas Aktif',
      en: 'Active Tasks',
    },
    thisWeekSummary: {
      id: 'Ringkasan Minggu Ini',
      en: 'This Week Summary',
    },
    earnings: {
      id: 'Pendapatan',
      en: 'Earnings',
    },
    deduction: {
      id: 'Potongan',
      en: 'Deduction',
    },
    net: {
      id: 'Bersih',
      en: 'Net',
    },
    quickActions: {
      id: 'Aksi Cepat',
      en: 'Quick Actions',
    },
    newTask: {
      id: '+ Tugas Baru',
      en: '+ New Task',
    },
    newDeduction: {
      id: '+ Deduksi Baru',
      en: '+ New Deduction',
    },
    manageStudent: {
      id: 'Kelola Siswa',
      en: 'Manage Student',
    },
    viewHistory: {
      id: 'Lihat Riwayat',
      en: 'View History',
    },
    debtProgress: {
      id: 'Progress Pelunasan Utang',
      en: 'Debt Repayment Progress',
    },
    paid: {
      id: 'Terbayar',
      en: 'Paid',
    },
    remaining: {
      id: 'Sisa',
      en: 'Remaining',
    },
    total: {
      id: 'Total',
      en: 'Total',
    },
  },

  // Student Dashboard
  studentDashboard: {
    greeting: {
      id: 'Hai',
      en: 'Hi',
    },
    quickActions: {
      id: 'Aksi Cepat',
      en: 'Quick Actions',
    },
    recordTask: {
      id: 'Catat Tugas',
      en: 'Record Task',
    },
    reportMistake: {
      id: 'Lapor Kesalahan',
      en: 'Report Mistake',
    },
    activeTasks: {
      id: 'Tugas Aktif',
      en: 'Active Tasks',
    },
    longestStreak: {
      id: 'Streak Terpanjang',
      en: 'Longest Streak',
    },
  },

  // Debt Progress Card
  debtProgress: {
    title: {
      id: 'Progress Pelunasan',
      en: 'Repayment Progress',
    },
    paid: {
      id: 'Terbayar',
      en: 'Paid',
    },
    remaining: {
      id: 'Sisa',
      en: 'Remaining',
    },
    total: {
      id: 'Total',
      en: 'Total',
    },
    congratulations: {
      id: 'Selamat! Utang sudah lunas!',
      en: 'Congratulations! Debt is fully paid!',
    },
    almostDone: {
      id: 'Hampir selesai! Terus semangat!',
      en: 'Almost done! Keep going!',
    },
    halfwayThere: {
      id: 'Sudah setengah jalan! Pertahankan!',
      en: 'Halfway there! Keep it up!',
    },
    goodProgress: {
      id: 'Progresnya bagus! Lanjutkan!',
      en: 'Great progress! Continue!',
    },
    startSmall: {
      id: 'Mulailah dengan langkah kecil!',
      en: 'Start with small steps!',
    },
  },

  // Earnings Summary
  earningsSummary: {
    title: {
      id: 'Ringkasan Pendapatan',
      en: 'Earnings Summary',
    },
    thisWeek: {
      id: 'Minggu Ini',
      en: 'This Week',
    },
    earnings: {
      id: 'Pendapatan',
      en: 'Earnings',
    },
    deductions: {
      id: 'Potongan',
      en: 'Deductions',
    },
    net: {
      id: 'Bersih',
      en: 'Net',
    },
    totalEarnings: {
      id: 'Total Pendapatan',
      en: 'Total Earnings',
    },
    totalDeductions: {
      id: 'Total Potongan',
      en: 'Total Deductions',
    },
  },

  // Tasks Management
  tasks: {
    title: {
      id: 'Kelola Tugas',
      en: 'Manage Tasks',
    },
    addTask: {
      id: '+ Tambah Tugas',
      en: '+ Add Task',
    },
    noTasks: {
      id: 'Belum ada tugas. Klik tombol di atas untuk menambah tugas baru.',
      en: 'No tasks yet. Click the button above to add a new task.',
    },
    name: {
      id: 'Nama',
      en: 'Name',
    },
    category: {
      id: 'Kategori',
      en: 'Category',
    },
    type: {
      id: 'Tipe',
      en: 'Type',
    },
    reward: {
      id: 'Reward',
      en: 'Reward',
    },
    status: {
      id: 'Status',
      en: 'Status',
    },
    streak: {
      id: 'Streak',
      en: 'Streak',
    },
    action: {
      id: 'Aksi',
      en: 'Action',
    },
    editTask: {
      id: 'Edit Tugas',
      en: 'Edit Task',
    },
    addNewTask: {
      id: 'Tambah Tugas Baru',
      en: 'Add New Task',
    },
    taskName: {
      id: 'Nama Tugas',
      en: 'Task Name',
    },
    taskNamePlaceholder: {
      id: 'Contoh: Membersihkan kamar',
      en: 'Example: Clean bedroom',
    },
    selectCategory: {
      id: 'Pilih kategori',
      en: 'Select category',
    },
    rewardType: {
      id: 'Tipe Reward',
      en: 'Reward Type',
    },
    selectType: {
      id: 'Pilih tipe',
      en: 'Select type',
    },
    rewardAmount: {
      id: 'Jumlah Reward (Rp)',
      en: 'Reward Amount (Rp)',
    },
    unitLabel: {
      id: 'Label Unit (opsional)',
      en: 'Unit Label (optional)',
    },
    unitLabelPlaceholder: {
      id: 'Contoh: halaman, menit',
      en: 'Example: pages, minutes',
    },
    unitsRequired: {
      id: 'Unit Dibutuhkan untuk 1 Reward',
      en: 'Units Required for 1 Reward',
    },
    unitsRequiredHelper: {
      id: 'Contoh: 10 halaman = 1 reward',
      en: 'Example: 10 pages = 1 reward',
    },
    description: {
      id: 'Deskripsi (opsional)',
      en: 'Description (optional)',
    },
    descriptionPlaceholder: {
      id: 'Deskripsi tugas...',
      en: 'Task description...',
    },
    streakDays: {
      id: 'Hari untuk Bonus Streak (opsional)',
      en: 'Days for Streak Bonus (optional)',
    },
    streakBonus: {
      id: 'Bonus Streak (Rp) (opsional)',
      en: 'Streak Bonus (Rp) (optional)',
    },
    saveChanges: {
      id: 'Simpan Perubahan',
      en: 'Save Changes',
    },
    daysArrow: {
      id: 'hari →',
      en: 'days →',
    },
  },

  // Deductions Management
  deductionsPage: {
    title: {
      id: 'Kelola Deduksi',
      en: 'Manage Deductions',
    },
    addDeduction: {
      id: '+ Tambah Deduksi',
      en: '+ Add Deduction',
    },
    noDeductions: {
      id: 'Belum ada deduksi. Klik tombol di atas untuk menambah deduksi baru.',
      en: 'No deductions yet. Click the button above to add a new deduction.',
    },
    name: {
      id: 'Nama',
      en: 'Name',
    },
    description: {
      id: 'Deskripsi',
      en: 'Description',
    },
    amount: {
      id: 'Potongan',
      en: 'Deduction',
    },
    status: {
      id: 'Status',
      en: 'Status',
    },
    action: {
      id: 'Aksi',
      en: 'Action',
    },
    editDeduction: {
      id: 'Edit Deduksi',
      en: 'Edit Deduction',
    },
    addNewDeduction: {
      id: 'Tambah Deduksi Baru',
      en: 'Add New Deduction',
    },
    deductionName: {
      id: 'Nama Deduksi',
      en: 'Deduction Name',
    },
    deductionNamePlaceholder: {
      id: 'Contoh: Berbohong',
      en: 'Example: Lying',
    },
    deductionAmount: {
      id: 'Jumlah Potongan (Rp)',
      en: 'Deduction Amount (Rp)',
    },
    descriptionOptional: {
      id: 'Deskripsi (opsional)',
      en: 'Description (optional)',
    },
    descriptionPlaceholder: {
      id: 'Deskripsi deduksi...',
      en: 'Deduction description...',
    },
    saveChanges: {
      id: 'Simpan Perubahan',
      en: 'Save Changes',
    },
  },

  // Logs/History
  logs: {
    title: {
      id: 'Riwayat Aktivitas',
      en: 'Activity History',
    },
    noStudent: {
      id: 'Belum ada siswa terdaftar.',
      en: 'No students registered.',
    },
    taskHistory: {
      id: 'Riwayat Tugas',
      en: 'Task History',
    },
    noTaskHistory: {
      id: 'Belum ada riwayat tugas.',
      en: 'No task history yet.',
    },
    deductionHistory: {
      id: 'Riwayat Potongan',
      en: 'Deduction History',
    },
    noDeductionHistory: {
      id: 'Belum ada riwayat potongan.',
      en: 'No deduction history yet.',
    },
    date: {
      id: 'Tanggal',
      en: 'Date',
    },
    task: {
      id: 'Tugas',
      en: 'Task',
    },
    taskDeleted: {
      id: 'Tugas dihapus',
      en: 'Task deleted',
    },
    quantity: {
      id: 'Jumlah',
      en: 'Quantity',
    },
    income: {
      id: 'Pendapatan',
      en: 'Income',
    },
    deduction: {
      id: 'Deduksi',
      en: 'Deduction',
    },
    reason: {
      id: 'Alasan',
      en: 'Reason',
    },
    custom: {
      id: 'Kustom',
      en: 'Custom',
    },
  },

  // Student Management
  studentManagement: {
    title: {
      id: 'Kelola Siswa',
      en: 'Manage Student',
    },
    noStudent: {
      id: 'Belum ada siswa terdaftar.',
      en: 'No students registered.',
    },
    studentProfile: {
      id: 'Profil Siswa',
      en: 'Student Profile',
    },
    studentLabel: {
      id: 'Siswa',
      en: 'Student',
    },
    financialSummary: {
      id: 'Ringkasan Keuangan',
      en: 'Financial Summary',
    },
    repaymentProgress: {
      id: 'Progress Pelunasan',
      en: 'Repayment Progress',
    },
    totalDebt: {
      id: 'Total Utang',
      en: 'Total Debt',
    },
    totalEarnings: {
      id: 'Total Pendapatan',
      en: 'Total Earnings',
    },
    totalDeductions: {
      id: 'Total Potongan',
      en: 'Total Deductions',
    },
    remainingDebt: {
      id: 'Sisa Utang',
      en: 'Remaining Debt',
    },
    debtSettings: {
      id: 'Pengaturan Utang',
      en: 'Debt Settings',
    },
    totalDebtAmount: {
      id: 'Total Utang (Rp)',
      en: 'Total Debt (Rp)',
    },
    currentAmount: {
      id: 'Saat ini',
      en: 'Current',
    },
    updateSuccess: {
      id: 'Berhasil memperbarui pengaturan utang!',
      en: 'Debt settings updated successfully!',
    },
    updateDebt: {
      id: 'Perbarui Utang',
      en: 'Update Debt',
    },
    applyDeduction: {
      id: 'Terapkan Deduksi',
      en: 'Apply Deduction',
    },
    selectDeduction: {
      id: 'Pilih Deduksi',
      en: 'Select Deduction',
    },
    selectDeductionPlaceholder: {
      id: 'Pilih deduksi...',
      en: 'Select deduction...',
    },
    customAmount: {
      id: 'Jumlah Kustom',
      en: 'Custom Amount',
    },
    customAmountLabel: {
      id: 'Jumlah Kustom (Rp)',
      en: 'Custom Amount (Rp)',
    },
    dateLabel: {
      id: 'Tanggal',
      en: 'Date',
    },
    reasonLabel: {
      id: 'Alasan',
      en: 'Reason',
    },
    reasonPlaceholder: {
      id: 'Alasan deduksi...',
      en: 'Deduction reason...',
    },
    deductionApplied: {
      id: 'Deduksi berhasil diterapkan!',
      en: 'Deduction applied successfully!',
    },
    selectDeductionFirst: {
      id: 'Pilih deduksi terlebih dahulu',
      en: 'Select a deduction first',
    },
    applying: {
      id: 'Menerapkan...',
      en: 'Applying...',
    },
    apply: {
      id: 'Terapkan Deduksi',
      en: 'Apply Deduction',
    },
  },

  // Daily Tracker
  tracker: {
    title: {
      id: 'Pelacak Harian',
      en: 'Daily Tracker',
    },
    noTasks: {
      id: 'Belum ada tugas yang tersedia. Hubungi admin untuk menambahkan tugas.',
      en: 'No tasks available. Contact admin to add tasks.',
    },
    todayEarnings: {
      id: 'Pendapatan Hari Ini',
      en: "Today's Earnings",
    },
  },

  // Self Report
  selfReport: {
    title: {
      id: 'Lapor Kesalahan',
      en: 'Report Mistake',
    },
    subtitle: {
      id: 'Kejujuran adalah kunci! Laporkan kesalahan sendiri untuk membangun karakter yang baik.',
      en: 'Honesty is key! Report your own mistakes to build good character.',
    },
    encouragement: {
      id: 'Mengakui kesalahan adalah tanda keberanian',
      en: 'Admitting mistakes is a sign of courage',
    },
    encouragementSubtitle: {
      id: 'Setiap kesalahan adalah kesempatan untuk belajar dan berkembang',
      en: 'Every mistake is an opportunity to learn and grow',
    },
    noDeductions: {
      id: 'Tidak ada jenis deduksi yang tersedia saat ini.',
      en: 'No deduction types available at this time.',
    },
    selectMistakeType: {
      id: 'Pilih Jenis Kesalahan',
      en: 'Select Mistake Type',
    },
    notesOptional: {
      id: 'Catatan (opsional)',
      en: 'Notes (optional)',
    },
    notesPlaceholder: {
      id: 'Tambahkan penjelasan jika perlu...',
      en: 'Add explanation if needed...',
    },
    willReport: {
      id: 'Anda akan melaporkan',
      en: 'You will report',
    },
    deductionAmount: {
      id: 'Potongan',
      en: 'Deduction',
    },
    reportSent: {
      id: 'Laporan berhasil dikirim',
      en: 'Report sent successfully',
    },
    thankYou: {
      id: 'Terima kasih atas kejujuranmu!',
      en: 'Thank you for your honesty!',
    },
    selectFirst: {
      id: 'Pilih jenis kesalahan terlebih dahulu',
      en: 'Select mistake type first',
    },
    sending: {
      id: 'Mengirim...',
      en: 'Sending...',
    },
    sendReport: {
      id: 'Kirim Laporan',
      en: 'Send Report',
    },
  },

  // Student History
  studentHistory: {
    title: {
      id: 'Riwayat',
      en: 'History',
    },
    subtitle: {
      id: 'Lihat aktivitas dan pendapatan sebelumnya',
      en: 'View previous activities and earnings',
    },
    thisWeek: {
      id: 'Minggu Ini',
      en: 'This Week',
    },
    noHistory: {
      id: 'Belum ada riwayat aktivitas.',
      en: 'No activity history yet.',
    },
  },

  // Categories
  categories: {
    daily_routine: {
      id: 'Rutinitas Harian',
      en: 'Daily Routine',
    },
    self_improvement: {
      id: 'Pengembangan Diri',
      en: 'Self Improvement',
    },
    household: {
      id: 'Pekerjaan Rumah',
      en: 'Household',
    },
    social_emotional: {
      id: 'Sosial Emosional',
      en: 'Social Emotional',
    },
  },

  // Reward Types
  rewardTypes: {
    per_completion: {
      id: 'Per Penyelesaian',
      en: 'Per Completion',
    },
    per_unit: {
      id: 'Per Unit',
      en: 'Per Unit',
    },
    streak_only: {
      id: 'Hanya Streak',
      en: 'Streak Only',
    },
  },

  // Language
  language: {
    label: {
      id: 'Bahasa',
      en: 'Language',
    },
    indonesian: {
      id: 'Indonesia',
      en: 'Indonesian',
    },
    english: {
      id: 'Inggris',
      en: 'English',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;
