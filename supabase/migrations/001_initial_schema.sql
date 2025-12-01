-- Behavioral Reward Tracker - Initial Schema
-- Database Migration for Supabase

-- Create enums
CREATE TYPE user_role AS ENUM ('admin', 'student');
CREATE TYPE task_category AS ENUM ('daily_routine', 'self_improvement', 'household', 'social_emotional');
CREATE TYPE reward_type AS ENUM ('per_completion', 'per_unit', 'streak_only');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pin_code TEXT NOT NULL,
  role user_role NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category task_category NOT NULL,
  reward_amount INTEGER NOT NULL DEFAULT 0,
  reward_type reward_type NOT NULL DEFAULT 'per_completion',
  unit_label TEXT,
  units_required INTEGER DEFAULT 1,
  streak_days INTEGER,
  streak_bonus INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task logs table
CREATE TABLE task_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  quantity INTEGER DEFAULT 1,
  earned_amount INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint for per_completion tasks (one log per task per day)
CREATE UNIQUE INDEX task_logs_unique_per_day ON task_logs(user_id, task_id, date);

-- Deductions table
CREATE TABLE deductions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  amount INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deduction logs table
CREATE TABLE deduction_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  deduction_id UUID REFERENCES deductions(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  reason TEXT NOT NULL,
  reported_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Debt settings table
CREATE TABLE debt_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_debt INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint for debt_settings (one per user)
CREATE UNIQUE INDEX debt_settings_user_unique ON debt_settings(user_id);

-- Create indexes for better query performance
CREATE INDEX task_logs_user_date_idx ON task_logs(user_id, date);
CREATE INDEX task_logs_task_idx ON task_logs(task_id);
CREATE INDEX deduction_logs_user_date_idx ON deduction_logs(user_id, date);
CREATE INDEX tasks_category_idx ON tasks(category);
CREATE INDEX tasks_active_idx ON tasks(is_active);

-- =====================
-- SAMPLE DATA (SEED)
-- =====================

-- Insert sample users (Admin: 123456, Student: 111111)
INSERT INTO users (id, pin_code, role, display_name) VALUES
  ('11111111-1111-1111-1111-111111111111', '123456', 'admin', 'Orang Tua'),
  ('22222222-2222-2222-2222-222222222222', '111111', 'student', 'Anak');

-- Insert sample debt settings for student
INSERT INTO debt_settings (user_id, total_debt) VALUES
  ('22222222-2222-2222-2222-222222222222', 2000000);

-- Insert sample tasks (Indonesian)
-- Daily Routine (Rutinitas Harian)
INSERT INTO tasks (name, description, category, reward_amount, reward_type, unit_label, units_required, streak_days, streak_bonus, created_by) VALUES
  ('Bangun pagi jam 6:30', 'Bangun tepat waktu dan tidak terlambat', 'daily_routine', 5000, 'per_completion', NULL, 1, 7, 50000, '11111111-1111-1111-1111-111111111111'),
  ('Merapikan tempat tidur', 'Merapikan tempat tidur setelah bangun', 'daily_routine', 2500, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Mencuci piring setelah makan', 'Mencuci piring sendiri setelah selesai makan', 'daily_routine', 5000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Membersihkan kamar', 'Menyapu dan membereskan kamar', 'daily_routine', 10000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111');

-- Self Improvement (Pengembangan Diri)
INSERT INTO tasks (name, description, category, reward_amount, reward_type, unit_label, units_required, streak_days, streak_bonus, created_by) VALUES
  ('Membaca buku', 'Membaca buku edukatif atau pengembangan diri', 'self_improvement', 1000, 'per_unit', 'halaman', 10, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Olahraga 30 menit', 'Berolahraga minimal 30 menit', 'self_improvement', 20000, 'per_completion', NULL, 1, 5, 30000, '11111111-1111-1111-1111-111111111111'),
  ('Menulis jurnal', 'Menulis refleksi atau jurnal harian', 'self_improvement', 10000, 'per_completion', NULL, 1, 7, 20000, '11111111-1111-1111-1111-111111111111'),
  ('Belajar skill baru', 'Belajar keterampilan baru (musik, bahasa, dll)', 'self_improvement', 30000, 'per_unit', 'jam', 1, NULL, NULL, '11111111-1111-1111-1111-111111111111');

-- Household (Pekerjaan Rumah)
INSERT INTO tasks (name, description, category, reward_amount, reward_type, unit_label, units_required, streak_days, streak_bonus, created_by) VALUES
  ('Memasak untuk keluarga', 'Memasak makanan untuk keluarga', 'household', 40000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Belanja groceries', 'Membantu belanja keperluan dapur', 'household', 30000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Mencuci baju', 'Mencuci dan menjemur pakaian', 'household', 30000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Membersihkan kamar mandi', 'Membersihkan dan menyikat kamar mandi', 'household', 50000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111');

-- Social Emotional (Sosial Emosional)
INSERT INTO tasks (name, description, category, reward_amount, reward_type, unit_label, units_required, streak_days, streak_bonus, created_by) VALUES
  ('Meminta maaf dengan tulus', 'Meminta maaf ketika melakukan kesalahan', 'social_emotional', 20000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Membantu tanpa diminta', 'Membantu orang lain tanpa diminta', 'social_emotional', 20000, 'per_completion', NULL, 1, NULL, NULL, '11111111-1111-1111-1111-111111111111'),
  ('Seminggu tanpa bertengkar', 'Tidak bertengkar dengan saudara selama seminggu', 'social_emotional', 100000, 'streak_only', NULL, 1, 7, 100000, '11111111-1111-1111-1111-111111111111');

-- Insert sample deductions (Indonesian)
INSERT INTO deductions (name, description, amount, created_by) VALUES
  ('Berbohong', 'Ketahuan berbohong', 50000, '11111111-1111-1111-1111-111111111111'),
  ('Merusak barang', 'Merusak barang rumah tangga', 100000, '11111111-1111-1111-1111-111111111111'),
  ('Berkata kasar', 'Berbicara kasar kepada orang lain', 30000, '11111111-1111-1111-1111-111111111111'),
  ('Melanggar jam malam', 'Pulang melebihi jam yang ditentukan', 50000, '11111111-1111-1111-1111-111111111111'),
  ('Tidak mengerjakan tugas', 'Tidak menyelesaikan tugas sekolah', 20000, '11111111-1111-1111-1111-111111111111'),
  ('Main HP berlebihan', 'Bermain handphone melebihi batas waktu', 25000, '11111111-1111-1111-1111-111111111111'),
  ('Tidak jujur', 'Tidak jujur tentang sesuatu', 40000, '11111111-1111-1111-1111-111111111111');

-- Enable Row Level Security (RLS) - Optional but recommended
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE task_logs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE deductions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE deduction_logs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE debt_settings ENABLE ROW LEVEL SECURITY;
