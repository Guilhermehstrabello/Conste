import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

// Singleton instance - global para evitar múltiplas instâncias
declare global {
  var __supabaseInstance: SupabaseClient | undefined;
}

// Função para criar/obter a instância única do Supabase
export function createSupabaseClient(): SupabaseClient {
  // Verifica se já existe uma instância global
  if (globalThis.__supabaseInstance) {
    return globalThis.__supabaseInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  // Cria a instância única e armazena globalmente
  const supabaseClient = createClient(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Usa uma chave única para evitar conflitos
      storageKey: 'conste-auth-token',
      // Desabilita debug para evitar logs duplicados
      debug: false,
    },
  });

  // Armazena a instância globalmente
  globalThis.__supabaseInstance = supabaseClient;

  return supabaseClient;
}

// Função de compatibilidade (deprecated - use createSupabaseClient)
export function getSupabase(): SupabaseClient | null {
  try {
    return createSupabaseClient();
  } catch (error) {
    console.warn('Supabase client creation failed:', error);
    return null;
  }
}

// Função para resetar a instância (útil para testes ou debugging)
export function resetSupabaseInstance(): void {
  globalThis.__supabaseInstance = undefined;
}

// Função de compatibilidade com código legado
export const getSupabaseInstance = () => createSupabaseClient();

// Export padrão que sempre retorna a mesma instância
export const supabase = createSupabaseClient();
