"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type AccessType = 'nps' | 'form';

const accessOptions: Record<AccessType, { label: string; title: string; description: string; redirectTo: string }> = {
  nps: {
    label: 'NPS',
    title: 'NPS',
    description: 'Acesse o painel com os dados do NPS.',
    redirectTo: '/dashboard',
  },
  form: {
    label: 'Formulário',
    title: 'Formulário',
    description: 'Acesse o painel com os dados do formulário.',
    redirectTo: '/dashboard/leads',
  },
};

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [devMessage, setDevMessage] = useState('');
  const [devLoading, setDevLoading] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<AccessType>('nps');
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/dashboard';
  const { signIn, loading } = useAuth();
  const router = useRouter();
  const localDevMode = process.env.NODE_ENV === 'development';
  const devModeEnabled = localDevMode || process.env.NEXT_PUBLIC_DEV_MODE === 'true';

  useEffect(() => {
    setSelectedAccess(redirectTo === '/dashboard/leads' ? 'form' : 'nps');
  }, [redirectTo]);

  const activeAccess = accessOptions[selectedAccess];

  const handleAccessChange = (access: AccessType) => {
    setSelectedAccess(access);
    setMessage('');
    setIsSuccess(false);
    setDevMessage('');

    const targetRedirectTo = accessOptions[access].redirectTo;
    router.replace(`/login?redirectTo=${encodeURIComponent(targetRedirectTo)}`);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setMessage('');

    try {
      const { error } = await signIn(email, activeAccess.redirectTo);

      if (error) {
        console.error('Erro detalhado:', error);
        setMessage(`Erro: ${error.message}`);
        setIsSuccess(false);
      } else {
        setMessage('Link de login enviado! Verifique seu email.');
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Erro capturado:', error);
      setMessage('Erro ao enviar link de login. Tente novamente.');
      setIsSuccess(false);
    }
  };

  const handleDevLogin = async () => {
    if (!email) return;
    setDevMessage('');
    setDevLoading(true);

    try {
      const res = await fetch('/api/dev-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const payload = await res.json();
      if (!res.ok) {
        setDevMessage(payload.error || 'Não foi possível entrar no modo dev.');
        return;
      }

      router.push(activeAccess.redirectTo);
    } catch (err) {
      console.error('Erro dev login:', err);
      setDevMessage('Erro ao entrar em modo dev. Tente novamente.');
    } finally {
      setDevLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex flex-col justify-center md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:flex-1 flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#310276] border border-[#7047BD] rounded-2xl p-6 md:p-8 shadow-2xl">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Image
                src="/Logo Conste.png"
                alt="Conste Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-[#220b4d] border border-[#7047BD] mb-6">
              {(Object.keys(accessOptions) as AccessType[]).map((access) => {
                const option = accessOptions[access];
                const isActive = selectedAccess === access;

                return (
                  <button
                    key={access}
                    type="button"
                    onClick={() => handleAccessChange(access)}
                    className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${isActive
                      ? 'bg-[#FFE0C0] text-[#0E0E0E] shadow-lg'
                      : 'text-[#FFE0C0] hover:bg-[#310276]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl md:text-2xl font-bold text-white text-center mb-2"
            >
              Acessar dados do {activeAccess.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[#BABABA] text-center mb-6 text-sm"
            >
              {activeAccess.description}
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onSubmit={handleMagicLink}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-[#FFE0C0] text-sm font-medium mb-2">
                  Digite seu email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@email.com"
                  required
                  className="w-full px-4 py-3 bg-[#310276] border border-[#7047BD] rounded-[100px] text-[#FFE0C0] placeholder-[#FFE0C0]/40 focus:outline-none focus:border-[#FFE0C0] focus:ring-1 focus:ring-[#FFE0C0] transition-all"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || !email}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full p-px font-semibold leading-6 text-white bg-[#310276] shadow-2xl cursor-pointer rounded-[100px] shadow-[#310276] transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-1 focus:border-[#7047BD] focus:ring-[#7047BD] active:scale-95 hover:shadow-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-[#310276] via-[#FFE0C0] to-[#ff8500] p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-6 py-3 rounded-[100px] bg-neutral-950">
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="transition-all duration-500 group-hover:text-[#FFE0C0]">
                          Enviar Link
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#FFE0C0]"
                        >
                          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                        </svg>
                      </>
                    )}
                  </div>
                </span>
              </motion.button>
            </motion.form>

            {devModeEnabled && (
              <div className="mt-6 p-4">
                <div className="text-sm text-[#FFE0C0] font-semibold mb-3">
                  Acesso local ao dashboard
                </div>
                <div className="text-[#B9A3E3] text-sm mb-4">
                  Digite seu email e clique no botão abaixo para entrar rapidamente no dashboard enquanto estiver em desenvolvimento.
                </div>
                <button
                  type="button"
                  onClick={handleDevLogin}
                  disabled={devLoading || !email}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[100px] bg-gradient-to-r from-[#ff8500] to-[#f2d16b] text-[#0E0E0E] font-semibold hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {devLoading ? 'Entrando...' : 'Entrar localmente'}
                </button>
                {devMessage && (
                  <div className="text-center text-sm text-[#FFE0C0] mt-3">
                    {devMessage}
                  </div>
                )}
              </div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-[100px] text-center ${isSuccess
                  ? 'bg-green-900/60 border border-green-500 text-green-300'
                  : 'bg-red-900/30 border border-red-500 text-red-400'
                }`}
              >
                {message}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden md:flex md:flex-1 items-center justify-center bg-gradient-to-r from-[#0E0E0E] to-[#310276]"
      >
        <div className="w-full h-full flex items-center justify-center p-8">
          <Image
            src="/login_image.png"
            alt="Login Illustration"
            width={600}
            height={600}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
