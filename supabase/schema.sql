-- Supabase database schema for the premium auto marketplace

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  full_name text not null,
  avatar_url text,
  role text not null default 'customer',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table if not exists cars (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid not null references profiles(id) on delete cascade,
  brand text not null,
  model text not null,
  year integer not null,
  price numeric(12,2) not null,
  rental_price_per_day numeric(10,2) not null,
  mileage integer not null,
  fuel_type text not null,
  transmission text not null,
  location text not null,
  description text not null,
  status text not null default 'available',
  type text not null default 'both',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists idx_cars_provider_id on cars(provider_id);
create index if not exists idx_cars_status on cars(status);
create index if not exists idx_cars_type on cars(type);

create table if not exists car_images (
  id uuid primary key default uuid_generate_v4(),
  car_id uuid not null references cars(id) on delete cascade,
  image_url text not null,
  position integer not null default 0,
  created_at timestamp with time zone not null default now()
);

create index if not exists idx_car_images_car_id on car_images(car_id);

create table if not exists requests (
  id uuid primary key default uuid_generate_v4(),
  car_id uuid not null references cars(id) on delete cascade,
  user_id uuid references profiles(id),
  request_type text not null,
  message text,
  status text not null default 'pending',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create index if not exists idx_requests_car_id on requests(car_id);
create index if not exists idx_requests_user_id on requests(user_id);
