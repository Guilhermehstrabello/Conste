"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Quais plataformas de anúncios online vocês gerenciam?",
    answer:
      "Gerenciamos campanhas publicitárias em diversas plataformas, incluindo Google Ads, Facebook Ads, Instagram Ads, entre outras, para alcançar o público-alvo de forma eficaz.",
  },
  {
    question:
      "Como vocês determinam a estratégia de anúncios mais adequada para o meu negócio?",
    answer:
      "Iniciamos cada projeto com uma análise detalhada das suas necessidades, mercado-alvo e concorrência. Com base nessa análise, desenvolvemos uma estratégia personalizada e sob medida para maximizar o retorno sobre o investimento.",
  },
  {
    question:
      "Como é feito o monitoramento e a otimização das campanhas publicitárias?",
    answer:
      "Monitoramos o desempenho das campanhas em tempo real, utilizando ferramentas avançadas e análises de dados para identificar oportunidades de melhoria. Realizamos ajustes e otimizações contínuas para garantir que as campanhas estejam alcançando os melhores resultados.",
  },
  {
    question: "Vocês fornecem relatórios de desempenho e análises detalhadas?",
    answer:
      "Sim, fornecemos relatórios abrangentes e análises detalhadas do desempenho das campanhas, permitindo que você acompanhe o progresso, entenda o ROI (Retorno sobre o Investimento) e tome decisões informadas para futuras estratégias de marketing.",
  },
  {
    question:
      "Qual é o prazo para ver os resultados das campanhas de anúncios online?",
    answer:
      "O prazo para ver os resultados pode variar dependendo de diversos fatores, como o mercado-alvo, o orçamento e a competitividade do setor. No entanto, trabalhamos de forma ágil e eficiente para otimizar as campanhas e alcançar resultados significativos o mais rápido possível.",
  },
  {
    question:
      "Vocês oferecem suporte e consultoria após a execução das campanhas?",
    answer:
      "Sim, nosso compromisso não termina com a execução das campanhas. Oferecemos suporte contínuo e consultoria especializada para ajudar você a interpretar os dados, ajustar as estratégias conforme necessário e alcançar seus objetivos de marketing a longo prazo.",
  },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <path
        d="M4 6.5L9 11.5L14 6.5"
        stroke="#674CD4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
    >
      <motion.div
        className="mb-3 overflow-hidden rounded-2xl border border-[#674CD4]/45 cursor-pointer"
        animate={{
          borderColor: isOpen
            ? "rgba(103, 76, 212, 0.8)"
            : "rgba(103, 76, 212, 0.45)",
        }}
        whileHover={{ borderColor: "rgba(103, 76, 212, 0.8)" }}
        transition={{ duration: 0.25 }}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <span className="flex-1 text-[15px] leading-relaxed text-white">
            {item.question}
          </span>
          <span className="flex-shrink-0">
            <ChevronIcon isOpen={isOpen} />
          </span>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="border-t border-[#674CD4]/20 px-6 pb-5 pt-4">
                <p className="text-sm leading-relaxed text-white/65">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="w-full px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#FF8500]">
            Perguntas frequentes
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ficou com Alguma Dúvida?
          </h2>
        </motion.div>

        <div>
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}