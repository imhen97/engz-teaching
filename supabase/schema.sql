-- ENGZ Learning Portal MVP schema (Supabase/Postgres)

create extension if not exists "pgcrypto";

create type public.user_role as enum ('student', 'admin');
create type public.resource_category as enum ('IELTS', 'OPIc', 'TOEIC', 'Speaking');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique,
  role public.user_role not null default 'student',
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  video_url text,
  pdf_url text,
  workbook_url text,
  content text,
  homework text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category public.resource_category not null,
  file_url text not null,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create table if not exists public.live_classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  zoom_url text not null,
  replay_url text,
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles(id)
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.announcements enable row level security;
alter table public.resources enable row level security;
alter table public.live_classes enable row level security;
alter table public.enrollments enable row level security;

-- Profiles
create policy "profiles_select_own_or_admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles_update_own_or_admin"
on public.profiles for update
using (auth.uid() = id or public.is_admin(auth.uid()))
with check (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles_insert_self"
on public.profiles for insert
with check (auth.uid() = id or public.is_admin(auth.uid()));

-- Read policies for students/admin
create policy "courses_read_all_authenticated"
on public.courses for select
using (auth.role() = 'authenticated');

create policy "modules_read_all_authenticated"
on public.modules for select
using (auth.role() = 'authenticated');

create policy "lessons_read_all_authenticated"
on public.lessons for select
using (auth.role() = 'authenticated');

create policy "announcements_read_all_authenticated"
on public.announcements for select
using (auth.role() = 'authenticated');

create policy "resources_read_all_authenticated"
on public.resources for select
using (auth.role() = 'authenticated');

create policy "live_classes_read_all_authenticated"
on public.live_classes for select
using (auth.role() = 'authenticated');

create policy "enrollments_read_own_or_admin"
on public.enrollments for select
using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- Admin write policies
create policy "courses_admin_write"
on public.courses for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "modules_admin_write"
on public.modules for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "lessons_admin_write"
on public.lessons for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "announcements_admin_write"
on public.announcements for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "resources_admin_write"
on public.resources for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "live_classes_admin_write"
on public.live_classes for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "enrollments_admin_write"
on public.enrollments for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
