"use client";

import React, { useState, use } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useNPSData, formatDate, NPSResponse } from '../../../../hooks/useNPSData';

interface ClientDetailPageProps {
    params: Promise<{
        clientId: string;
    }>;
}

const ClientDetailPage = ({ params }: ClientDetailPageProps) => {
    const resolvedParams = use(params);
    const { user, loading } = useAuth();
    const router = useRouter();
    const { data: npsData, loading: npsLoading, error: npsError } = useNPSData({ limit: 100 });

    // Encontrar cliente específico
    const clientResponse = npsData?.data.find((response: NPSResponse) => response.id.toString() === resolvedParams.clientId);

    const handleLogout = async () => {
        router.push('/');
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
        return null;
    }

    if (npsLoading) {
        return (
            <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center space-y-4"
                >
                    <div className="w-8 h-8 border-4 border-[#310276] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#BABABA]">Carregando dados do cliente...</p>
                </motion.div>
            </div>
        );
    }

    if (!clientResponse) {
        return (
            <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-white text-xl mb-4">Cliente não encontrado</h2>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-[#310276] hover:bg-[#40009E] text-white px-6 py-3 rounded-lg"
                    >
                        Voltar ao Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const formatAnswer = (answer: string) => {
        const answers: Record<string, string> = {
            'muito-eficaz': 'Muito eficaz',
            'eficaz': 'Eficaz',
            'pouco-eficaz': 'Pouco eficaz',
            'sim': 'Sim',
            'nao': 'Não',
            'talvez': 'Talvez'
        };
        return answers[answer] || answer;
    };

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
                                            <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-10 h-10 bg-[#310276] hover:bg-[#40009E] rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Conste Dashboard</h1>
                        <p className="text-[#BABABA] text-sm">
                            {clientResponse.name} • {clientResponse.company}
                        </p>
                    </div>
                    <div className="ml-auto">
                        <div
                            className="lg:w-20 lg:h-20 w-10 h-10 rounded-full flex items-center lg:text-4xl text-2xl justify-center text-white font-bold"
                            style={{ backgroundColor: '#FF8500' }}
                        >
                            {clientResponse.score}
                        </div>
                    </div>
                </motion.div>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Question 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                De 0 a 10 qual a sua satisfação com os serviços entregues?
                            </h3>
                            <div
                                className="inline-flex items-center justify-center w-2/4 h-12 rounded-full text-white font-bold text-2xl"
                                style={{ backgroundColor: '#FF8500' }}
                            >
                                {clientResponse.score}
                            </div>
                        </div>
                    </motion.div>

                    {/* Question 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                O que poderia ter sido melhor?
                            </h3>
                            <p className="text-[#FF8500] text-lg">
                                {clientResponse.improvement}
                            </p>
                        </div>
                    </motion.div>

                    {/* Question 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                Qual o maior ponto positivo identificado na entrega do serviço?
                            </h3>
                            <p className="text-[#FF8500] text-lg">
                                {clientResponse.positive_points}
                            </p>
                        </div>
                    </motion.div>

                    {/* Question 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">4</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                Como você está avaliando a eficácia das estratégias de marketing digital aplicadas pela Conste na captação de clientes para sua empresa?
                            </h3>
                            <div className="mt-4">
                                <span
                                    className="inline-block px-4 py-2 rounded-full text-white text-lg font-medium"
                                    style={{ backgroundColor: '#FF8500' }}
                                >
                                    {formatAnswer(clientResponse.marketing_effectiveness)}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Question 5 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">5</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                Você considera que a gestão de desempenho e vendas realizada pela Conste foi inteligente, inovadora e criativa?
                            </h3>
                            <div className="mt-4">
                                <span
                                    className="inline-block px-4 py-2 rounded-full text-white text-lg font-medium"
                                    style={{ backgroundColor: '#FF8500' }}
                                >
                                    Em partes
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Question 6 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">6</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                Em relação ao atendimento e suporte da Conste, como avalia?
                            </h3>
                            <div className="mt-4">
                                <span
                                    className="inline-block px-4 py-2 rounded-full text-white text-lg font-medium"
                                    style={{ backgroundColor: '#FF8500' }}
                                >
                                    Bom
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Question 7 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="bg-[#310276] rounded-3xl p-6 relative"
                    >
                        <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">7</span>
                        </div>
                        <div className="pt-8">
                            <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                                Você recomendaria os serviços da Conste para outras empresas?
                            </h3>
                            <div className="mt-4">
                                <span
                                    className="inline-block px-4 py-2 rounded-full text-white text-lg font-medium"
                                    style={{ backgroundColor: '#FF8500' }}
                                >
                                    {formatAnswer(clientResponse.recommend)}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                    {/* Question 8 - Full width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="bg-[#310276] rounded-3xl p-6 relative"
                >
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">8</span>
                    </div>
                    <div className="pt-8">
                        <h3 className="text-white font-medium lg:text-xl text-lg mb-4">
                            Por favor, deixe sugestões ou comentários adicionais para que possamos aprimorar nossos serviços.
                        </h3>
                        <p className="text-[#FF8500] text-lg">
                            {clientResponse.extra_comment || "Nenhum comentário adicional fornecido."}
                        </p>
                    </div>
                </motion.div>
                </div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="mt-8 text-center"
                >
                    <p className="text-white text-sm bg-[#310276]/40 w-full lg:w-auto rounded-full inline-block px-4 py-2">
                        Resposta enviada em {formatDate(clientResponse.created_at)}
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default ClientDetailPage;