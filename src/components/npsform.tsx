"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NpsResponse {
  // Passo 1: Dados básicos
  name: string;
  company: string;

  // Passo 2: Nota NPS e o que poderia melhorar
  score: number | null;
  improvement: string;

  // Passo 3: Pontos positivos
  positivePoints: string;

  // Passo 4: Avaliações específicas
  marketingEffectiveness: string | null;
  recommend: string | null;

  // Passo 5: Comentário extra
  extraComment: string;
}

const steps = [
  "name",
  "company",
  "score",
  "improvement",
  "positivePoints",
  "marketingEffectiveness",
  "recommend",
  "extraComment"
] as const;
type StepKey = typeof steps[number];

export default function NpsForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<NpsResponse>({
    name: "",
    company: "",
    score: null,
    improvement: "",
    positivePoints: "",
    marketingEffectiveness: null,
    recommend: null,
    extraComment: "",
  });

  const currentStep: StepKey = steps[stepIndex];

  function next() {
    console.log("NPS: next() — stepIndex:", stepIndex, "currentStep:", currentStep);
    setStepIndex((p) => Math.min(p + 1, steps.length - 1));
  }

  function back() {
    console.log("NPS: back() — stepIndex:", stepIndex, "currentStep:", currentStep);
    setStepIndex((p) => Math.max(p - 1, 0));
  }

  function canProceed(): boolean {
    if (currentStep === "name") return data.name.trim().length >= 2;
    if (currentStep === "company") return data.company.trim().length >= 2;
    if (currentStep === "score") return data.score !== null;
    if (currentStep === "improvement") return data.improvement.trim().length >= 3;
    if (currentStep === "positivePoints") return data.positivePoints.trim().length >= 3;
    if (currentStep === "marketingEffectiveness") return data.marketingEffectiveness !== null;
    if (currentStep === "recommend") return data.recommend !== null;
    if (currentStep === "extraComment") return true; // Permite avançar sempre
    return false;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("NPS: handleSubmit called", { stepIndex, currentStep, data });

    // Se não estivermos na última etapa, apenas avançar (evita envio acidental via Enter)
    if (currentStep !== "extraComment") {
      console.log("NPS: não é último passo — avançando em vez de enviar");
      next();
      return;
    }

    if (!canProceed()) {
      setErrorMessage("Preencha todos os passos antes de enviar.");
      console.warn("NPS: tentativa de envio sem campos obrigatórios", { data });
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      // Sanitiza e garante tipos válidos
      const normalizedScore = typeof data.score === "number" ? Math.max(0, Math.min(10, data.score)) : null;

      if (
        normalizedScore === null ||
        !data.name.trim() ||
        !data.company.trim() ||
        !data.improvement.trim() ||
        !data.positivePoints.trim() ||
        !data.marketingEffectiveness ||
        !data.recommend
      ) {
        throw new Error("Dados obrigatórios ausentes");
      }

      const payload = {
        name: data.name.trim(),
        company: data.company.trim(),
        score: normalizedScore,
        improvement: data.improvement.trim(),
        positivePoints: data.positivePoints.trim(),
        marketingEffectiveness: data.marketingEffectiveness,
        recommend: data.recommend,
        extraComment: data.extraComment.trim(),
      };

      console.log("NPS: enviando payload", payload);
      const res = await fetch('/api/respostas-nps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Erro API ${res.status}`);
      }

      console.log('NPS: enviado com sucesso');
      setSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      console.error("NPS submit error:", err);
      setErrorMessage(`Erro ao enviar sua resposta: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2 }
  };

  return (
    <>
  {/* Left fixed logo - doesn't affect form layout */}
  <div className="hidden md:flex fixed left-6 top-40 transform -translate-y-1/2 z-40 pointer-events-none">
    <img src="/Logo Conste.png" alt="Conste" className="w-64 h-full object-contain" />
  </div>

  <div className="w-full max-w-[600px] mx-auto bg-[#310276] shadow-[#310276] rounded-[40px] overflow-visible md:py-20 md:px-16 py-16 px-8 shadow-2xl">
      <h1 className="text-white text-2xl font-bold mb-2">Pesquisa NPS</h1>
      <p className="text-white mb-6">Sua opinião nos ajuda a melhorar.</p>
      {success ? (
        <div className="text-center py-10">
          <p className="text-[#ff8500] font-semibold text-xl">Obrigado por responder!</p>
          <p className="text-white mt-2">Sua resposta foi registrada com sucesso.</p>
        </div>
      ) : (
        <form
          // Não usar onSubmit para evitar submissões automáticas do browser.
          // Previne Enter de submeter o form e, em vez disso, avança para próxima etapa (exceto quando textarea está focado)
          onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e.key === "Enter") {
              const target = e.target as HTMLElement;
              const isTextArea = target.tagName === "TEXTAREA";
              if (!isTextArea) {
                e.preventDefault();
                console.log("NPS: Enter capturado no form — avançando", { stepIndex, currentStep });
                if (currentStep !== "extraComment") next();
              }
            }
          }}
          className="flex flex-col gap-6"
          noValidate
        >
          <div className="text-sm bg-[#7047BD] text-white px-4 py-2 rounded-[100px] w-fit">
            Passo {stepIndex + 1} de {steps.length}
          </div>

          <div className="flex items-center">
            <AnimatePresence mode="wait">
            {currentStep === "name" && (
              <motion.div key="name" {...motionProps} className="flex flex-col gap-7 h-full w-full justify-center">
                <label className="text-white font-bold md:text-xl text-lg mb-2">Insira o seu nome:</label>
                <input
                  type="text"
                    className="max-w-full outline-none border rounded-[100px] p-3 bg-transparent text-white border-[#7047BD] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FEAC56] focus-visible:ring-offset-transparent caret-[#FEAC56]"
                  placeholder="Digite seu nome"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  required
                />
              </motion.div>
            )}

            {currentStep === "company" && (
              <motion.div key="company" {...motionProps} className="flex flex-col gap-7 h-full w-full justify-center">
                <label className="text-white font-bold md:text-xl text-lg mb-2">Insira o nome da sua empresa:</label>
                <input
                  type="text"
                    className="w-full max-w-full border rounded-[100px] p-3 bg-transparent text-white border-[#7047BD] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FEAC56] focus-visible:ring-offset-transparent caret-[#FEAC56]"
                  placeholder="Digite o nome da empresa"
                  value={data.company}
                  onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
                  required
                />
              </motion.div>
            )}

            {currentStep === "score" && (
              <motion.div key="score" {...motionProps} className="flex flex-col gap-4 h-full w-full justify-center">
                <label className="block font-semibold font-montserrat md:text-xl text-base text-white">
                  Em uma escala de 1 a 10, qual a probabilidade de você recomendar a Conste?
                </label>
                <div className="grid grid-cols-5 gap-3 md:gap-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <button
                      type="button"
                      key={i + 1}
                      onClick={() => setData((d) => ({ ...d, score: i + 1 }))}
                      aria-pressed={data.score === i + 1}
                      aria-label={`Nota ${i + 1}`}
                      className={`flex items-center justify-center rounded-full border border-[#7047BD] text-white transition-colors
                        w-14 h-14 md:w-[76px] md:h-[76px] text-sm md:text-xl select-none
                        ${data.score === i + 1 ? "bg-[#7047BD]" : " hover:bg-[#7047BD]"}`}
                    >
                      <span>{i + 1}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === "improvement" && (
              <motion.div key="improvement" {...motionProps} className="flex flex-col gap-4 h-full w-full justify-center">
                <label className="block font-semibold font-montserrat text-lg text-white">
                  O que poderia ter sido melhor?
                </label>
                <input
                  className="w-full max-w-full border rounded-[100px] p-3 bg-transparent text-white border-[#7047BD] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FEAC56] focus-visible:ring-offset-transparent caret-[#FEAC56]"
                  placeholder="Descreva o que poderia ser melhorado"
                  value={data.improvement}
                  onChange={(e) => setData((d) => ({ ...d, improvement: e.target.value }))}
                  required
                />
              </motion.div>
            )}

            {currentStep === "positivePoints" && (
              <motion.div key="positivePoints" {...motionProps} className="flex flex-col gap-10 h-full w-full justify-center">
                <label className="block font-semibold font-montserrat text-lg text-white">
                  Qual o maior ponto positivo identificado na entrega do serviço?
                </label>
                <input
                  className="w-full max-w-full border rounded-[100px] p-3 bg-transparent text-white border-[#7047BD] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FEAC56] focus-visible:ring-offset-transparent caret-[#FEAC56]"
                  placeholder="Descreva o que mais te impressionou positivamente"
                  value={data.positivePoints}
                  onChange={(e) => setData((d) => ({ ...d, positivePoints: e.target.value }))}
                  required
                />
              </motion.div>
            )}

            {currentStep === "marketingEffectiveness" && (
              <motion.div key="marketingEffectiveness" {...motionProps} className="flex flex-col gap-6 h-full w-full justify-center">
                <label className="block font-semibold font-montserrat text-lg text-white mb-4">
                  Como você avalia a eficácia das estratégias de marketing digital aplicadas pela Conste?
                </label>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {[
                        { label: "Muito eficaz", style: "basis-[200px] grow" },
                        { label: "Eficaz", style: "basis-[200px] grow" },
                        { label: "Neutro", style: "basis-[200px] grow" },
                        { label: "Pouco eficaz", style: "basis-[160px] grow" },
                      ].map(option => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setData(d => ({ ...d, marketingEffectiveness: option.label }))}
                          className={`px-6 py-4 outline-none rounded-full border-[1px] border-[#7047BD] text-white font-semibold transition-colors text-sm
                            ${option.style} 
                            ${data.marketingEffectiveness === option.label ? "bg-[#7047BD]" : "bg-transparent hover:bg-[#7047BD]"}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
              </motion.div>
            )}

            {currentStep === "recommend" && (
              <motion.div key="recommend" {...motionProps} className="flex flex-col gap-6 h-full w-full justify-center">
                <label className="block font-semibold font-montserrat text-lg text-white mb-4">
                  Você recomendaria os serviços da Conste para outras empresas?
                </label>
                <div className="flex flex-wrap gap-4 justify-center">
                  {[
                    { label: "Com certeza", style: "basis-[200px] grow" },
                    { label: "Quase certeza", style: "basis-[200px] grow" },
                    { label: "Não sei", style: "basis-[200px] grow" },
                    { label: "Provavelmente não", style: "basis-[160px] grow" },
                  ].map(option => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setData(d => ({ ...d, recommend: option.label }))}
                      className={`px-6 py-4 rounded-full border-[1px] border-[#7047BD] text-white font-semibold transition-colors text-sm ${option.style} ${data.recommend === option.label ? 'bg-[#7047BD]' : 'bg-transparent hover:bg-[#7047BD]'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === "extraComment" && (
              <motion.div key="extraComment" {...motionProps} className="flex flex-col gap-4 h-full justify-center">
                <label className="block font-semibold font-montserrat text-lg text-white">
                  Comentário extra (opcional)
                </label>
                <textarea
                  className="w-full border rounded-[100px] p-3 bg-transparent text-white border-[#7047BD] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FEAC56] focus-visible:ring-offset-transparent caret-[#FEAC56]"
                  placeholder="Deixe aqui qualquer comentário adicional que gostaria de compartilhar"
                  value={data.extraComment}
                  onChange={(e) => setData((d) => ({ ...d, extraComment: e.target.value }))}
                />
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}

          <div className="flex justify-between items-center gap-4 mt-10">
            <button
              type="button"
              onClick={back}
              disabled={stepIndex === 0 || loading}
              className="w-full text-xl text-white disabled:text-gray-400 bg-transparent border border-[#7047BD] hover:bg-[#7047BD] duration-200 rounded-[100px] py-2 px-4"
            >
              Voltar
            </button>

            {currentStep !== "extraComment" ? (
              <button
                type="button"
                onClick={next}
                disabled={!canProceed() || loading}
                className="w-full text-xl text-white bg-[#FE7300] hover:bg-[#FEAC56] py-2 px-4 rounded-[100px] duration-200"
              >
                Avançar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full text-xl text-white bg-[#FE7300] hover:bg-[#FEAC56] py-2 px-4 rounded-[100px] duration-200"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
    </>
  );
}