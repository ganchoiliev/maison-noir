-- Add missing columns for full reservation flow
alter table reservations add column if not exists occasion text;
alter table reservations add column if not exists dietary text;
alter table reservations add column if not exists guest_email text;
alter table reservations add column if not exists guest_phone text;
