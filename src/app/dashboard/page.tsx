"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useNPSData, getNPSCategory, formatNPSScore, formatDate, formatMonth } from '../../hooks/useNPSData';

const DashboardPage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [filters, setFilters] = useState<{
    limit: number;
    offset: number;
    score?: number | 'all';
    dateFrom?: string;
      dateTo?: string;
  }>({ limit: 50, offset: 0 });
  const { data: npsData, loading: npsLoading, error: npsError, refetch } = useNPSData(filters);

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
        className="relative z-10 backdrop-blur-sm border-b border-[#310276]"
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
                className="group relative inline-block p-px font-semibold leading-6 text-white bg-red-600 shadow-2xl cursor-pointer rounded-[100px] shadow-red-600 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-red-600 via-red-500 to-red-400 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10 block px-4 py-2 rounded-[100px] bg-neutral-950">
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
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Conste NPS Dashboard</h1>
        </motion.div>

        {npsLoading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-8 h-8 border-4 border-[#310276] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#BABABA]">Carregando dados...</p>
            </motion.div>
          </div>
        ) : npsError ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-8"
          >
            <h3 className="text-red-400 font-semibold mb-2">Erro ao carregar dados</h3>
            <p className="text-red-300 mb-4">{npsError}</p>
            <button
              onClick={refetch}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Tentar novamente
            </button>
          </motion.div>
        ) : npsData ? (
          <>
            {/* Principais métricas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-white text-xl font-semibold mb-6">Principais métricas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[200px] h-auto">
                {/* Média geral */}
                <div className="bg-[#FF8500] border-[#FEAC56] border-2 rounded-3xl justify-between flex flex-col p-6">
                  <p className="text-white text-base">Média geral</p>
                  <div className="flex items-baseline gap-2 font-semibold">
                    <span className="text-[#310276] text-3xl lg:text-4xl font-bold">
                      {npsData.summary.averageScore.toFixed(1)}
                    </span>
                    <span className="text-[#310276] text-3xl lg:text-4xl">NPS</span>
                    <span className="text-[#310276] text-sm">+0.5</span>
                  </div>
                </div>

                {/* Respostas totais */}
                <div className="bg-[#310276] border-2 border-[#7047BD] rounded-3xl p-6 flex flex-col justify-between">
                  <p className="text-white text-base">Respostas totais</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-3xl lg:text-4xl font-bold">
                      {npsData.summary.totalResponses}
                    </span>
                    <span className="text-purple-300 text-sm">+5%</span>
                  </div>
                </div>

                {/* Respostas no mês */}
                <div className="bg-[#310276] border-2 border-[#7047BD] rounded-3xl p-6 flex flex-col justify-between">
                  <p className="text-white text-base">Respostas no mês</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-3xl lg:text-4xl font-bold">
                      {npsData.summary.monthlyTrend.length > 0 
                        ? npsData.summary.monthlyTrend[npsData.summary.monthlyTrend.length - 1]?.responseCount || 0 
                        : 0}
                    </span>
                    <span className="text-purple-300 text-sm">+40%</span>
                  </div>
                </div>

                {/* Respostas pendentes */}
                <div className="bg-[#310276] border-2 border-[#7047BD] rounded-3xl p-6 flex flex-col justify-between">
                  <p className="text-white text-sm">Respostas pendentes</p>
                  <span className="text-white text-3xl lg:text-4xl font-bold">
                    {Math.max(0, 8 - npsData.summary.totalResponses)}
                  </span>
                </div>
              </div>
            </motion.div>

            <div className='border-[#310276]/60 border-[1px] w-full mt-2 mb-2'></div>

            {/* Tabela de respostas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="overflow-hidden"
            >
              {npsData.data.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#310276] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                  </div>
                  <h4 className="text-white text-lg font-medium mb-2">Nenhuma resposta encontrada</h4>
                  <p className="text-[#BABABA]">Ainda não há respostas NPS para exibir.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-white text-xl font-semibold mb-6">Respostas clientes</h2>
                  {/* Header da tabela */}
                  <div className="grid grid-cols-4 gap-4 p-4 border-none">
                    <div className="text-[#BABABA] text-sm font-medium flex items-center gap-1">
                      Nome da empresa
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                    </div>
                    <div className="text-[#BABABA] text-sm font-medium flex items-center gap-1">
                      Nome do cliente
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                    </div>
                    <div className="text-[#BABABA] text-sm font-medium flex items-center gap-1">
                      Pontuação média
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                    </div>
                    <div className="text-[#BABABA] text-sm font-medium flex items-center gap-1">
                      Data de envio
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Linhas da tabela */}
                  <div className="divide-y divide-[#310276] space-y-4">
                    {npsData.data.slice(0, 10).map((response, index) => {
                      const category = getNPSCategory(response.score);
                      
                      return (
                        <motion.div
                          key={response.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="grid grid-cols-4 gap-4 p-4 rounded-[40px] bg-[#310276]/40 hover:bg-[#7047BD]/60 duration-300 transition-colors group cursor-pointer"
                          onClick={() => router.push(`/dashboard/client/${response.id}`)}
                        >
                          <div className="text-white font-medium">
                            {response.company}
                          </div>
                          <div className="text-white">
                            {response.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <span 
                              className="text-white font-bold text-lg"
                              style={{ color: category.color }}
                            >
                              {response.score.toFixed(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#BABABA] text-sm">
                              {formatDate(response.created_at)}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-4 h-4 text-[#BABABA] hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </motion.div>
          </>
        ) : null}
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