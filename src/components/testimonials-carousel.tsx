 "use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  name: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jefferson Frizarin",
    text: "Ótimos profissionais, dedicados no atendimento ao cliente, entregam um excelente trabalho!",
  },
  {
    name: "Lilia Aparecida Xavier",
    text: "A equipe da Conste superou nossas expectativas em marketing. As campanhas foram criativas e trouxeram ótimos resultados. Super indico 👏🏻👏🏻!!!",
  },
  {
    name: "Domus Residencial",
    text: "Muito bom o trabalho. Muitos clientes que não chegavam até mim estão me consultando agora!",
  },
  {
    name: "Gabriel Arcanjo",
    text: "Atendimento excelente desde o início, são extremamente atenciosos e trazem ideas alem do tradicional do mercado, muito feliz com a escolha feita e por mostrarem o potencial de desenvolvimento!",
  },
  {
    name: "Eduardo Machado",
    text: "Melhor atendimento, equipe profissional e que realmente entende do negócio. As estratégias foram bem pensadas e trouxeram resultado de verdade, não só promessa bonita. Dá pra ver que não fazem marketing no automático. Recomendo sem medo.",
  },
  {
    name: "Vanessa Garcia",
    text: "Finalmente encontrei uma equipe comprometida com a minha marca de forma plena e conceitual. O trabalho que eles entregam não busca apenas resultados pontuais mas, a construção de uma trajetória de sucesso em branding e respeito ao caminho já construído. Estou super satisfeita com a entrega.",
  },
  {
    name: "Lucas Silva",
    text: "Empresa de marketing muito bem conceituada, com equipe profissional, criativa e atenta às necessidades do cliente. Entregam resultados consistentes, com comunicação clara e estratégias bem alinhadas aos objetivos do negócio. Recomendo.",
  },
  {
    name: "Jefferson Santana",
    text: `Excelente atendimento, equipe preparada comprometida e competente. Cumprem todos os planejamentos e cronogramas. Estamos felizes e satisfeitos com esta parceria. Parabéns equipe Conste!`,
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section
      className="py-16 flex flex-col items-center justify-center text-center gap-10 max-w-[1200px] mx-auto w-full px-4"
      id="depoimentos"
    >
      <div className="gap-y-2 flex flex-col">
        <p className="text-[#FF8500] font-semibold">Nossos clientes</p>
        <h2 className="font-bold text-white text-3xl md:text-4xl">
          O que falam sobre nós?
        </h2>
      </div>

      <div className="relative w-full max-w-[700px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-start gap-5 p-6 md:p-10 bg-[rgba(49,2,118,0.4)] rounded-2xl border border-[#310276]/40 min-h-[200px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#310276] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {TESTIMONIALS[current].name.charAt(0)}
              </div>
              <p className="text-white font-bold text-base md:text-lg text-left">
                {TESTIMONIALS[current].name}
              </p>
            </div>
            <p className="text-[#BABABA] text-base md:text-lg text-left leading-relaxed">
              {TESTIMONIALS[current].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Depoimento anterior"
          className="w-12 h-12 rounded-full bg-[#310276] hover:bg-[#4a03b0] transition-colors flex items-center justify-center text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-[#FF8500]"
                  : "w-2 h-2 bg-[#310276] hover:bg-[#4a03b0]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Próximo depoimento"
          className="w-12 h-12 rounded-full bg-[#310276] hover:bg-[#4a03b0] transition-colors flex items-center justify-center text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <a href="https://www.google.com/search?q=conste+marketing&sca_esv=0693a25b4e112fe7&sxsrf=ANbL-n6iLEJH2EYXkVGNLzrq1ChOG7qbGw%3A1774543456286&source=hp&ei=YGLFabapD8Hb5OUPh6y2mQQ&iflsig=AFdpzrgAAAAAacVwcJ-A-OYU_vESmHZtgKaod7M52aeH&ved=0ahUKEwi22eTCgb6TAxXBLbkGHQeWLUMQ4dUDCB4&uact=5&oq=conste+marketing&gs_lp=Egdnd3Mtd2l6IhBjb25zdGUgbWFya2V0aW5nMgoQIxiABBgnGIoFMgIQJjIFEAAY7wUyCBAAGIAEGKIEMgUQABjvBTIIEAAYgAQYogQyBRAAGO8FSLsPUABYyw1wAHgAkAEAmAGJAaAB9w-qAQQwLjE2uAEDyAEA-AEBmAIQoAKqEMICEBAjGPAFGIAEGCcYyQIYigXCAggQABiABBixA8ICCBAuGIAEGLEDwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQABiABBixAxiDAcICBRAAGIAEwgIEECMYJ8ICDhAuGIAEGLEDGNEDGMcBwgIOEC4YgAQYsQMYgwEYigXCAgsQABiABBixAxjJA8ICBxAAGIAEGArCAggQABiABBjLAcICBhAAGBYYHsICCBAAGBYYChgewgIIEAAYogQYiQWYAwCSBwQwLjE2oAfXgwGyBwQwLjE2uAeqEMIHBjAuMTIuNMgHJYAIAA&sclient=gws-wiz#lrd=0x94cf4b9b373864b7:0xec8fb32d57dcef1b,1,,,," target="_blank" className="bg-[#6C63FF] text-[#2d016e] hover:bg-[#310276] duration-300 p-4 rounded-lg font-semibold hover:text-white">Ver todas as avaliações</a>
    </section>
  );
}
