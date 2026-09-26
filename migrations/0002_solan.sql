-- Solan farm operations schema
create table if not exists profiles (
  user_id text primary key,
  role text not null default 'CLIENT',
  full_name text not null default '',
  phone text,
  email text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists profiles_role_idx on profiles (role);

create table if not exists client_profiles (
  id text primary key,
  user_id text not null unique,
  address text default '',
  city text default '',
  state text default '',
  pincode text default '',
  kyc_status text not null default 'PENDING',
  pan_number text,
  pan_name text,
  aadhaar_masked text,
  onboarding_stage text not null default 'REGISTERED',
  show_generation boolean not null default true,
  show_payments boolean not null default true,
  show_project boolean not null default true,
  show_panels boolean not null default true,
  show_documents boolean not null default true,
  show_services boolean not null default true,
  show_support boolean not null default true,
  show_notifications boolean not null default true,
  admin_notes text default '',
  created_at timestamptz not null default now()
);
create index if not exists client_profiles_user_idx on client_profiles (user_id);

create table if not exists electricity_connections (
  id text primary key,
  client_id text not null unique,
  rr_number text,
  discom text default '',
  division text default '',
  service_address text default '',
  tariff text default '',
  sanctioned_load_kw numeric not null default 0,
  avg_monthly_units numeric not null default 0,
  avg_monthly_bill numeric not null default 0,
  phase text default 'Single phase',
  proposed_kw numeric not null default 0,
  system_cost numeric not null default 0,
  subsidy_estimate numeric not null default 0,
  payable_amount numeric not null default 0
);

create table if not exists projects (
  id text primary key,
  project_code text not null unique,
  project_name text not null,
  location text default '',
  capacity_kw numeric not null default 0,
  total_panels integer not null default 0,
  panel_capacity_kw numeric not null default 0.4,
  status text not null default 'PLANNING',
  is_public boolean not null default false,
  public_description text default '',
  commissioning_date text,
  created_at timestamptz not null default now()
);

create table if not exists panels (
  id text primary key,
  serial_number text not null unique,
  project_id text not null,
  manufacturer text default 'Waaree',
  model text default 'WSM-400',
  watt_rating integer not null default 400,
  status text not null default 'AVAILABLE',
  client_id text,
  installation_date text,
  purchase_date text,
  warranty_start_date text,
  warranty_end_date text,
  warranty_type text default 'MANUFACTURER',
  warranty_years integer not null default 25,
  added_sequence integer not null,
  created_at timestamptz not null default now()
);
create index if not exists panels_project_idx on panels (project_id);
create index if not exists panels_client_idx on panels (client_id);
create index if not exists panels_status_idx on panels (status);

create table if not exists client_projects (
  id text primary key,
  client_id text not null unique,
  project_id text not null,
  allocated_panel_count integer not null default 0,
  allocated_capacity_kw numeric not null default 0,
  contract_total numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists project_stages (
  id text primary key,
  client_id text not null,
  stage_number integer not null,
  stage_name text not null,
  percentage numeric not null default 0,
  status text not null default 'NOT_STARTED',
  notes text default '',
  payment_required boolean not null default true,
  payment_status text not null default 'NOT_DUE',
  completed_at timestamptz
);
create index if not exists project_stages_client_idx on project_stages (client_id);

create table if not exists payments (
  id text primary key,
  client_id text not null,
  stage_id text,
  amount numeric not null,
  currency text not null default 'INR',
  payment_method text default 'UPI',
  transaction_reference text,
  status text not null default 'PENDING',
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists payments_client_idx on payments (client_id);

create table if not exists documents (
  id text primary key,
  client_id text not null,
  document_type text not null,
  original_filename text default '',
  status text not null default 'UPLOADED',
  notes text default '',
  uploaded_at timestamptz not null default now()
);

create table if not exists services (
  id text primary key,
  name text not null,
  description text default '',
  base_price numeric not null default 0,
  is_active boolean not null default true
);

create table if not exists service_requests (
  id text primary key,
  client_id text not null,
  service_id text not null,
  status text not null default 'REQUESTED',
  quoted_price numeric,
  notes text default '',
  created_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id text primary key,
  client_id text not null,
  subject text not null,
  category text default 'GENERAL',
  description text default '',
  priority text default 'NORMAL',
  status text not null default 'OPEN',
  created_at timestamptz not null default now()
);

create table if not exists ticket_replies (
  id text primary key,
  ticket_id text not null,
  author_user_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists warranty_claims (
  id text primary key,
  panel_id text not null,
  client_id text not null,
  issue text not null,
  details text default '',
  status text not null default 'SUBMITTED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists generation_daily (
  id text primary key,
  client_id text not null,
  day date not null,
  kwh numeric not null default 0,
  unique (client_id, day)
);

create table if not exists notifications (
  id text primary key,
  user_id text not null,
  title text not null,
  message text not null,
  kind text default 'INFO',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on notifications (user_id);

create table if not exists audit_logs (
  id text primary key,
  actor_user_id text,
  action text not null,
  entity text default '',
  entity_id text default '',
  detail text default '',
  created_at timestamptz not null default now()
);

create table if not exists enquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text default '',
  message text not null,
  status text not null default 'NEW',
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true
);

create table if not exists announcements (
  id text primary key,
  title text not null,
  message text not null,
  cta_text text default '',
  cta_url text default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists website_content (
  key text primary key,
  value text not null default ''
);

create table if not exists system_settings (
  key text primary key,
  value text not null default ''
);

create table if not exists role_permissions (
  role text not null,
  code text not null,
  allowed boolean not null default true,
  primary key (role, code)
);
