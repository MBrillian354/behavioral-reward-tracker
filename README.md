# 🏆 Behavioral Reward Tracker

Sistem pelacak reward dan punishment untuk membangun kebiasaan baik - Next.js 15 + Supabase

## 📋 Deskripsi

Aplikasi "carrot and stick" yang membantu siswa membangun kebiasaan baik dengan sistem reward berbasis uang. Siswa dapat melacak tugas harian, mengumpulkan reward, dan melunasi utang melalui perilaku positif.

### Fitur Utama

- ✅ **Pelacak Tugas Harian** - Catat tugas yang diselesaikan dan dapatkan reward
- 🔥 **Sistem Streak** - Bonus tambahan untuk konsistensi
- 📊 **Dashboard Interaktif** - Lihat progress pelunasan utang
- 👨‍👩‍👧 **Dual Role** - Mode Admin (orang tua) dan Siswa (anak)
- 📝 **Self-Report** - Siswa bisa melaporkan kesalahan sendiri
- 💰 **Tracking Keuangan** - Semua dalam format Rupiah (Rp)

## 🛠 Tech Stack

- **Framework**: Next.js 15 dengan App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS dengan Material Design 3
- **Auth**: Simple PIN code authentication

## 🚀 Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/behavioral-reward-tracker.git
cd behavioral-reward-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat project baru di [Supabase](https://supabase.com)
2. Buka SQL Editor di Supabase Dashboard
3. Copy dan jalankan isi file `supabase/migrations/001_initial_schema.sql`
4. Catat URL dan Anon Key dari Settings > API

### 4. Konfigurasi Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Jalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🔑 PIN untuk Testing

| Role | PIN | Nama |
|------|-----|------|
| Admin (Orang Tua) | 123456 | Orang Tua |
| Siswa (Anak) | 111111 | Anak |

## 📁 Struktur Project

```
behavioral-reward-tracker/
├── app/
│   ├── admin/          # Halaman admin
│   │   ├── tasks/      # Manajemen tugas
│   │   ├── deductions/ # Manajemen deduksi
│   │   ├── student/    # Kelola siswa
│   │   └── logs/       # Riwayat aktivitas
│   ├── student/        # Halaman siswa
│   │   ├── tracker/    # Pelacak harian
│   │   ├── report/     # Lapor kesalahan
│   │   └── history/    # Riwayat
│   └── login/          # Halaman login
├── components/
│   ├── ui/             # Komponen UI dasar
│   ├── shared/         # Komponen bersama
│   ├── admin/          # Komponen admin
│   └── student/        # Komponen siswa
├── lib/
│   ├── supabase/       # Client & types
│   ├── actions/        # Server actions
│   └── utils/          # Utility functions
└── supabase/
    └── migrations/     # SQL migrations
```

## 📖 Fitur Admin

- **Dashboard**: Ringkasan pendapatan dan progress
- **Kelola Tugas**: Tambah, edit, aktif/nonaktifkan tugas
- **Kelola Deduksi**: Atur aturan potongan
- **Kelola Siswa**: Set utang, terapkan deduksi
- **Riwayat**: Lihat semua log aktivitas

## 📖 Fitur Siswa

- **Dashboard**: Progress pelunasan utang
- **Pelacak**: Catat tugas harian dengan streak
- **Lapor**: Self-report kesalahan
- **Riwayat**: Lihat riwayat pendapatan/potongan

## 🎨 Design System

Aplikasi menggunakan **Material Design 3** dengan:
- Warna utama: Teal (bukan indigo)
- Tidak ada gradient
- Elevated cards dan proper shadows
- Rounded corners (large radius)
- Responsive untuk mobile dan desktop

## 📝 Kategori Tugas

1. **Rutinitas Harian** 🌅 - Bangun pagi, merapikan tempat tidur, dll
2. **Pengembangan Diri** 📚 - Membaca, olahraga, belajar skill
3. **Pekerjaan Rumah** 🏠 - Memasak, mencuci, membersihkan
4. **Sosial Emosional** 💝 - Meminta maaf, membantu orang lain

## 🤝 Kontribusi

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
