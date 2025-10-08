"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Erro ao fazer logout:', error);
    } else {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-10 h-10 border-4 border-[#310276] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null; // O useEffect vai redirecionar
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <div className="absolute inset-0 bg-hero_bg bg-cover bg-center opacity-10"></div>
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-[#1A1A1A]/90 backdrop-blur-sm border-b border-[#310276]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/Logo Conste.png"
                alt="Conste Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <p className="text-sm text-[#BABABA]">Bem-vindo,</p>
                <p className="font-medium">{user.email}</p>
              </div>
              
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-block p-px font-semibold leading-6 text-white bg-red-600 shadow-2xl cursor-pointer rounded-lg shadow-red-600 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-400 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-4 py-2 rounded-lg bg-neutral-950">
                  <div className="relative z-10 flex items-center space-x-2">
                    <span className="transition-all duration-500 group-hover:text-red-300 text-sm">
                      Sair
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 transition-all duration-500 group-hover:translate-x-1 group-hover:text-red-300"
                    >
                      <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
                    </svg>
                  </div>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dashboard <span className="text-[#FF8500]">Conste</span>
          </h1>
          <p className="text-[#BABABA] text-lg max-w-2xl mx-auto">
            Bem-vindo ao seu painel de controle. Em breve, você terá acesso a todas as suas métricas e dados importantes.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1A1A] border border-[#310276] rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#310276] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Projetos Ativos</h3>
            </div>
            <p className="text-2xl font-bold text-white mb-2">0</p>
            <p className="text-[#BABABA] text-sm">Em desenvolvimento</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1A1A] border border-[#310276] rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#FF8500] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Leads Gerados</h3>
            </div>
            <p className="text-2xl font-bold text-white mb-2">0</p>
            <p className="text-[#BABABA] text-sm">Este mês</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1A1A1A] border border-[#310276] rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">ROI</h3>
            </div>
            <p className="text-2xl font-bold text-white mb-2">0%</p>
            <p className="text-[#BABABA] text-sm">Retorno sobre investimento</p>
          </motion.div>
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-[#1A1A1A] border border-[#310276] rounded-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-[#310276] to-[#FF8500] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Mais Funcionalidades em Breve!
          </h2>
          <p className="text-[#BABABA] max-w-2xl mx-auto mb-6">
            Estamos trabalhando em recursos incríveis para o seu dashboard. Em breve você terá acesso a relatórios detalhados, análises de performance e muito mais.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="group relative inline-block p-px font-semibold leading-6 text-white bg-[#310276] shadow-2xl cursor-pointer rounded-lg shadow-[#310276] transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-orange-500"
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#310276] via-orange-500 to-orange-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block px-6 py-3 rounded-lg bg-neutral-950">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1 group-hover:text-orange-300">
                  Voltar ao Site
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1 group-hover:text-orange-300"
                >
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                </svg>
              </div>
            </span>
          </motion.button>
        </motion.div>
      </main>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-2 h-2 bg-[#FF8500] rounded-full opacity-60"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-20 w-1 h-1 bg-[#310276] rounded-full opacity-80"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
            rotate: [0, -3, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[#FF8500] rounded-full opacity-70"
        />
      </div>
    </div>
  );
};

export default DashboardPage;