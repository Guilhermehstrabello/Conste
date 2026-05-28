"use client";

import React, { useState, useEffect } from "react";
import { shootConfetti } from "./confetti";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

const steps = ["name", "company", "email", "phone"];
const stepsLabels: Record<string, string> = {
  name: "Qual é seu nome?",
  company: "Nome da sua empresa",
  email: "Seu melhor email",
  phone: "Número para contato",
};

const FormPageClient: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const router = useRouter();
  const currentStep = steps[stepIndex];
  const currentLabel = stepsLabels[currentStep];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length <= 10) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Previne submit ao pressionar Enter
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {

      // ✅ Registra o step que acabou de ser preenchido
    window.fbq('trackCustom', 'FormStepCompleted', {
      step: currentStep,
      step_number: stepIndex + 1,
    })

    
      setStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.error || `API error ${res.status}`);
      }

      window.fbq('track', 'Lead', {
      content_name: 'Form de Contato',
      currency: 'BRL',
      value: 0,
    });

      setFormData({ name: "", email: "", phone: "", company: "" });
      shootConfetti();
      router.push("/obrigado");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar formulário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0E0E0E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header com logo/branding */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Vamos crescer juntos
          </h1>
          <p className="text-lg text-[#B9A3E3]">
            Fale com um especialista e descubra como potencializar sua empresa
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-[#1A0B2E] border border-[#40009E] rounded-2xl p-8 lg:p-12 shadow-2xl">
          {/* Indicador de progresso */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-base font-medium text-[#E8E2F5]">
                Passo {stepIndex + 1} de {steps.length}
              </span>
              <span className="text-sm text-[#B9A3E3]">
                {Math.round(((stepIndex + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full bg-[#382108] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ff8500] to-orange-600"
                initial={{ width: 0 }}
                animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Pergunta/Label */}
            <motion.div
              key={`label-${stepIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <label className="text-2xl font-semibold text-white block mb-6">
                {currentLabel}
              </label>
            </motion.div>

            {/* Inputs por step */}
            <motion.div
              key={`input-${stepIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === "name" && (
                <input
                  name="name"
                  placeholder="Ex: João Silva"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  required
                  className="w-full rounded-lg border border-[#310276]/60 bg-[#0E0E0E]/40 px-5 py-4 text-white placeholder-[#B9A3E3]/50 outline-none transition focus:border-[#40009E] focus:bg-[#0E0E0E]/60 text-lg"
                />
              )}
              {currentStep === "company" && (
                <input
                  name="company"
                  placeholder="Ex: Minha Empresa LTDA"
                  value={formData.company}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  className="w-full rounded-lg border border-[#310276]/60 bg-[#0E0E0E]/40 px-5 py-4 text-white placeholder-[#B9A3E3]/50 outline-none transition focus:border-[#40009E] focus:bg-[#0E0E0E]/60 text-lg"
                />
              )}
              {currentStep === "email" && (
                <input
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  required
                  className="w-full rounded-lg border border-[#310276]/60 bg-[#0E0E0E]/40 px-5 py-4 text-white placeholder-[#B9A3E3]/50 outline-none transition focus:border-[#40009E] focus:bg-[#0E0E0E]/60 text-lg"
                />
              )}
              {currentStep === "phone" && (
                <input
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  required
                  className="w-full rounded-lg border border-[#310276]/60 bg-[#0E0E0E]/40 px-5 py-4 text-white placeholder-[#B9A3E3]/50 outline-none transition focus:border-[#40009E] focus:bg-[#0E0E0E]/60 text-lg"
                />
              )}
            </motion.div>

            {/* Botões de navegação */}
            <div className="flex justify-between items-center gap-4 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={stepIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#310276]/40 bg-[#0E0E0E]/40 text-[#f2f2f2] hover:border-[#310276] hover:bg-[#0E0E0E] disabled:opacity-50 disabled:cursor-not-allowed duration-200 transition font-semibold"
              >
                <ArrowLeft size={20} />
                <span className="">Voltar</span>
              </button>

              {stepIndex !== steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (currentStep === "name" && !formData.name) ||
                    (currentStep === "email" && !formData.email) ||
                    (currentStep === "phone" && !formData.phone)
                  }
                  className="ml-auto flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#310276] to-[#40009E] hover:from-[#40009E] hover:to-[#5A14C6] text-white disabled:opacity-50 disabled:cursor-not-allowed duration-200 transition font-semibold"
                >
                  <span>Avançar</span>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[#ff8500] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed duration-200 transition font-semibold text-lg"
                >
                  {loading ? "Enviando..." : "Solicitar Contato"}
                </button>
              )}
            </div>

            {/* Indicador de campos obrigatórios */}
            <div className="text-center text-sm text-[#B9A3E3] mt-4">
              * Todos os campos marcados são obrigatórios
            </div>
          </form>
        </div>

        {/* Footer com confiança */}
        <div className="text-center mt-12 text-[#B9A3E3] text-sm">
          <p className="flex items-center justify-center gap-2">
          Responderemos em até 24 horas
          </p>
          <p className="mt-2">Seus dados são 100% seguros conosco</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FormPageClient;
