"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CaseItem = {
  id: string;
  logo: string;
  logoAlt: string;
  companyName: string;
  personName: string;
  testimonial: string;
  metrics: {
    primaryTitle: string;
    primarySubtitle: string;
    secondaryTitle: string;
    secondarySubtitle: string;
    secondaryHighlight?: string;
  };
};

const CASES: CaseItem[] = [
  {
    id: "case-11",
    logo: "/11.png",
    logoAlt: "Leluh Kids logo",
    companyName: "Leluh Kids",
    personName: "Lillia Aparecida",
    testimonial:
      "A equipe da Conste superou nossas expectativas em marketing. As campanhas foram criativas e trouxeram ótimos resultados. Recomendo a todos que buscam profissionalismo e resultados efetivos! Super indico!",
    metrics: {
      primaryTitle: "1º nas buscas",
      primarySubtitle: "no Google",
      secondaryTitle: "ROI 13",
      secondarySubtitle: "retorno sobre o investimento em",
      secondaryHighlight: "6 meses",
    },
  },
  {
    id: "case-15",
    logo: "/15.png",
    logoAlt: "J.E. Polimetal logo",
    companyName: "J.E. Polimetal",
    personName: "Jefferson Frizarin",
    testimonial:
      "Ótimos profissionais ,dedicados no atendimento ao cliente , entregam um excelente trabalho!",
    metrics: {
      primaryTitle: "+140",
      primarySubtitle: "leads qualificados",
      secondaryTitle: "ROI 9X",
      secondarySubtitle: "retorno sobre o investimento em 9 meses",
    },
  },
  {
    id: "case-19",
    logo: "/19.png",
    logoAlt: "Agrotuba logo",
    companyName: "Agrotuba",
    personName: "Lenice Silva",
    testimonial:
      "A estratégia trouxe previsibilidade comercial e melhorou a qualidade dos contatos. Hoje temos um funil muito mais eficiente.",
    metrics: {
      primaryTitle: "+38%",
      primarySubtitle: "de faturamento em menos de 2 anos",
      secondaryTitle: "200%",
      secondarySubtitle: "de crescimento nas mídias sociais",
    },
  },
  {
    id: "case-34",
    logo: "/24.png",
    logoAlt: "3A Fest logo",
    companyName: "3A Fest",
    personName: "Laís",
    testimonial:
      "Aconteceu algo inédito esse evento, a gente praticamente vendeu quase todos os ingressos com meses de antecedência. Que Show! Só gratidão",
    metrics: {
      primaryTitle: "Sold Out",
      primarySubtitle: "nas vendas do evento",
      secondaryTitle: "+R$50 mil",
      secondarySubtitle: "visualizações nas mídias sociais",
    },
  },
  {
    id: "case-24",
    logo: "/34.png",
    logoAlt: "Arita Ventaroli logo",
    companyName: "Arita Ventaroli",
    personName: "Alessander Ventaroli",
    testimonial:
      "Super profissionais, atendimento personalizado, super transparentes com as acções feitas, com relatórios e reuniões assim que solicitados.",
    metrics: {
      primaryTitle: "+100",
      primarySubtitle: "leads qualificados",
      secondaryTitle: "ROI 11x",
      secondarySubtitle: "sobre o investimento",
    },
  },
  
];

export default function SuccessCases() {
  const [activeCaseId, setActiveCaseId] = useState(CASES[0].id);

  const activeCase = CASES.find((item) => item.id === activeCaseId) ?? CASES[0];

  return (
    <section className="py-20 px-4 md:px-10 flex flex-col gap-12" id="cases">
      <div className="gap-y-3 flex flex-col justify-center items-center text-center">
        <p className="text-[#FF8500] font-semibold">Parcerias que evoluem:</p>
        <h2 className="font-bold text-white text-xl md:text-4xl md:leading-tight md:max-w-[900px]">
          Confira os <span className="text-[#FF8500]">cases</span> que mostram nosso
          compromisso com o seu crescimento.
        </h2>
      </div>

      <div className="w-full max-w-[1000px] mx-auto flex flex-wrap items-center justify-center gap-4">
        {CASES.map((item) => {
          const isActive = item.id === activeCaseId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveCaseId(item.id)}
              className={`w-[160px] h-[80px] md:w-[180px] md:h-[86px] rounded-xl border flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#6257FF] to-[#5b6cff] border-[#7a74ff] scale-[1.02]"
                  : "bg-[#1b0a3f] border-[#3a1f79] hover:border-[#6f55d8] hover:-translate-y-0.5"
              }`}
              aria-pressed={isActive}
              aria-label={`Ver resultados do ${item.logoAlt}`}
            >
              <Image
                src={item.logo}
                width={90}
                height={80}
                alt={item.logoAlt}
                className="object-contain"
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-[1020px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 md:gap-6"
        >
          <div className="rounded-2xl p-5 min-h-[260px] bg-gradient-to-r from-[#655dff] to-[#5f66ff] border border-[#7b75ff]">
            <div className="flex items-center gap-3 mb-4">
            </div>
            <h3 className="text-white font-bold text-2xl md:text-3xl leading-none mb-4">
              {activeCase.personName}
            </h3>
            <p className="text-white/80 text-sm md:text-base mb-3">
              Empresa: <span className="font-semibold">{activeCase.companyName}</span>
            </p>
            <p className="text-white/95 text-lg md:text-lg md:leading-[1.2] font-medium max-w-[95%]">
              {activeCase.testimonial}
            </p>
          </div>

          <div className="grid grid-rows-2 gap-4 md:gap-6">
            <div className="rounded-2xl border border-[#5b46a8] p-6 md:p-8 flex items-center justify-center text-center bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_18%,rgba(33,16,63,0.9)_55%,rgba(25,9,49,1)_100%)]">
              <div>
                <p className="text-white text-lg md:text-4xl font-bold leading-none">
                  {activeCase.metrics.primaryTitle}
                </p>
                <p className="text-white/90 text-base md:text-lg mt-2">
                  {activeCase.metrics.primarySubtitle}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#5b46a8] p-6 md:p-8 flex items-center justify-center text-center bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_18%,rgba(33,16,63,0.9)_55%,rgba(25,9,49,1)_100%)]">
              <div>
                <p className="text-white text-lg md:text-4xl font-bold leading-none">
                  {activeCase.metrics.secondaryTitle}
                </p>
                <p className="text-white/90 text-base md:text-lg mt-2">
                  {activeCase.metrics.secondarySubtitle}{" "}
                  {activeCase.metrics.secondaryHighlight ? (
                    <span className="font-bold">{activeCase.metrics.secondaryHighlight}</span>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}