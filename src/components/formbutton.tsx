"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../app/lib/supabase";
import { shootConfetti } from "./confetti";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface FormModalProps {
  buttonText: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

const steps = ["name", "company", "email", "phone"];

const FormModal: React.FC<FormModalProps> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const router = useRouter();
  const currentStep = steps[stepIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  const handleNext = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call server-side API route which uses the service role key to insert into Supabase.
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody?.error || `API error ${res.status}`);
      }

      // Email sending is handled server-side in /api/leads (best-effort). No additional client request needed.

      setFormData({ name: '', email: '', phone: '', company: '' });
      shootConfetti();
      router.push('/obrigado');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar formulário.');
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[99999] p-4"
          onClick={() => setIsOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white p-6 shadow-2xl w-full max-w-[500px] relative rounded-[8px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative' }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#310276] hover:text-[#40009E] text-xl font-bold transition-colors duration-200"
            >✖</button>

            <h2 className="text-lg font-bold mb-4">Preencha o formulário e fale com um especialista</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="text-sm font-medium">
                Passo {stepIndex + 1} de {steps.length}
              </div>

              {currentStep === "name" && (
                <input
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded w-full"
                />
              )}
              {currentStep === "company" && (
                <input
                  name="company"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={handleChange}
                  className="border p-3 rounded w-full"
                />
              )}
              {currentStep === "email" && (
                <input
                  name="email"
                  type="email"
                  placeholder="seuemail@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border p-3 rounded w-full"
                />
              )}
              {currentStep === "phone" && (
                <input
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  className="border p-3 rounded w-full"
                />
              )}

              <div className="flex justify-center gap-4 items-center mt-4">
                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-sm text-[#310276] hover:underline"
                  >Voltar</button>
                )}

                {stepIndex < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#310276] hover:bg-[#40009E] text-white font-bold py-2 px-4 rounded"
                  >Avançar</button>
                ) : (
                  <button
                    type="submit"
                    className="bg-[#310276] hover:bg-[#40009E] text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Solicitar Contato"}
                  </button>
                )}
              </div>

              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#310276] transition-all duration-300"
                  style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex items-center h-fit">
      <button
        onClick={() => setIsOpen(true)}
        className="z-10 p-4 my-2 lg:my-8 text-white bg-[#310276] hover:bg-[#40009E] duration-200 rounded-[6px] text-xs md:text-base lg:text-base whitespace-pre-wrap"
      >
        {buttonText}
      </button>
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </div>
  );
};

export default FormModal;
