-- Tabela para recebimento dos formulários de fornecedores/compradores.
create table if not exists public.fornecedores_forms (
  id bigserial primary key,
  form_type text not null check (form_type in ('fornecedor', 'comprador')),
  full_name text not null,
  email text not null,
  company text not null,
  phone text not null,
  city text not null,
  segment text not null,
  service_offered text null,
  site_url text null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.fornecedores_forms enable row level security;

-- Mantem acesso de leitura/escrita restrito a service_role.
drop policy if exists "fornecedores_forms_anon_insert" on public.fornecedores_forms;
