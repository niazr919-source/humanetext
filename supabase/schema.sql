-- Humanwords: usage tracking + waitlist schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists usage_log (
  id uuid primary key default gen_random_uuid(),
  client_key text not null,
  ip text not null,
  action text not null check (action in ('text', 'photo')),
  created_at timestamptz not null default now()
);

create index if not exists usage_log_client_key_idx on usage_log (client_key, action, created_at);
create index if not exists usage_log_ip_idx on usage_log (ip, action, created_at);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  client_key text,
  created_at timestamptz not null default now()
);

-- Row Level Security: these tables are only ever accessed from server-side API
-- routes using the Supabase service role key, which bypasses RLS. Enabling RLS
-- with no policies blocks all access from the public anon key.
alter table usage_log enable row level security;
alter table subscribers enable row level security;
