"use client";

import { useEffect } from 'react';
import { createSupabaseClient } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erro na autenticação:', error);
        router.push('/login?error=authentication_failed');
        return;
      }

      if (data.session) {
        // Sucesso na autenticação
        router.push('/dashboard');
      } else {
        // Sem sessão
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#310276] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white">Autenticando...</p>
      </div>
    </div>
  );
}