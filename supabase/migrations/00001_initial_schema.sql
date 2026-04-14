-- Seasons
create table seasons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  starts_on date not null,
  ends_on date not null,
  is_active boolean not null default false,
  hero_image text,
  created_at timestamptz not null default now()
);

-- Courses
create table courses (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  position integer not null,
  name text not null,
  description text,
  allergens text[] default '{}',
  wine_pairing text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (season_id, position)
);

create index idx_courses_season on courses(season_id);

-- Reservations
create table reservations (
  id uuid primary key default gen_random_uuid(),
  confirmation_code text not null unique,
  party_size integer not null check (party_size between 1 and 14),
  seating_at timestamptz not null,
  guest_name text not null,
  guest_email_hash text not null,
  guest_phone_hash text,
  guest_email_encrypted text,
  notes text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed', 'no_show')),
  created_at timestamptz not null default now()
);

create index idx_reservations_seating on reservations(seating_at);
create index idx_reservations_status on reservations(status);

-- Availability rules (weekly pattern)
create table availability_rules (
  id uuid primary key default gen_random_uuid(),
  weekday integer not null check (weekday between 0 and 6),
  seating_time time not null,
  seats integer not null default 14,
  is_closed boolean not null default false,
  unique (weekday, seating_time)
);

-- Availability overrides (specific dates)
create table availability_overrides (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  seating_time time not null,
  seats_delta integer not null default 0,
  note text,
  unique (date, seating_time)
);

-- Audit log
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor text not null,
  action text not null,
  entity text not null,
  diff jsonb,
  at timestamptz not null default now()
);

-- RLS: default deny
alter table seasons enable row level security;
alter table courses enable row level security;
alter table reservations enable row level security;
alter table availability_rules enable row level security;
alter table availability_overrides enable row level security;
alter table audit_log enable row level security;

-- Public: read published seasons and courses
create policy "Seasons viewable by all" on seasons
  for select using (true);

create policy "Published courses viewable by all" on courses
  for select using (is_published = true);

-- Availability readable by all (needed for reservation form)
create policy "Availability rules viewable by all" on availability_rules
  for select using (true);

create policy "Availability overrides viewable by all" on availability_overrides
  for select using (true);

-- Reservations: only service role (Edge Functions)
-- No public policy — all access via service role in Edge Functions

-- Audit log: only service role
-- No public policy

-- Seed default availability rules (Tue-Sun, two seatings)
-- Monday (1) is closed
insert into availability_rules (weekday, seating_time, seats, is_closed) values
  (0, '18:00', 14, false), (0, '20:45', 14, false),  -- Sunday
  (1, '18:00', 0, true),   (1, '20:45', 0, true),    -- Monday (closed)
  (2, '18:00', 14, false), (2, '20:45', 14, false),  -- Tuesday
  (3, '18:00', 14, false), (3, '20:45', 14, false),  -- Wednesday
  (4, '18:00', 14, false), (4, '20:45', 14, false),  -- Thursday
  (5, '18:00', 14, false), (5, '20:45', 14, false),  -- Friday
  (6, '18:00', 14, false), (6, '20:45', 14, false);  -- Saturday
