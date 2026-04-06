"use client";
import Navbar from "@/components/navbar";
import ClientLogos from "@/components/clientslogo";
import SmoothScroll from "@/components/scroll";
import FormModal from "@/components/formbutton";
import Image from "next/image";
import GlassCard from "@/components/glasscard";
import Footer from "@/components/footer";
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import SuccessCases from "@/components/success-cases";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import FAQ from "@/components/faq";
import Setores from "@/components/entrega";

// Para seções que aparecem no scroll
interface SectionAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

const SectionAnimation = ({ children, delay = 0 }: SectionAnimationProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Para cards com stagger effect
const StaggerContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

interface StatCardProps {
  icon: string;
  number: number | string;
  text: string;
  delay: number;
}

const StatCard = ({ icon, number, text, delay }: StatCardProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(49, 2, 118, 0.3)",
        transition: { duration: 0.3 }
      }}
      className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7 border border-[#310276]"
    >
      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={isInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        <Image className="mb-3" src={icon} width={40} height={40} alt="icone" />
      </motion.div>

      <motion.h3
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.4, type: "spring", stiffness: 200 }}
        className="text-4xl font-bold"
      >
        {number}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: delay + 0.6 }}
        className="text-[#BABABA]"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

interface CaseCardProps {
  logo: string;
  stats: { value: string; label: string }[];
  index: number;
}

const CaseCard = ({ logo, stats, index }: CaseCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="flex flex-col justify-center items-center max-w-[1200px] p-4 gap-6 w-[370px] h-full border border-[#310276] rounded-[10px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: "spring" }}
      >
        <Image src={logo} width={200} height={88} alt="Logo" />
      </motion.div>

      <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-[400px]">
        {stats.map((stat, statIndex) => (
          <motion.div
            key={statIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 + statIndex * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col justify-center items-center p-4 w-[230px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]"
          >
            <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">
              {stat.value}
            </p>
            <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface TestimonialCardProps {
  name: string;
  text: string;
  index: number;
}

const TestimonialCard = ({ name, text, index }: TestimonialCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(49, 2, 118, 0.3)",
        transition: { duration: 0.3 }
      }}
      className="flex flex-col items-start p-4 md:p-8 gap-5 md:w-[390px] w-full h-[200px] bg-[rgba(49,2,118,0.4)] rounded-[8px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        className="flex items-center gap-5 w-[320px] h-fit"
      >
        <p className="text-white text-[16px] font-bold">{name}</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        className="w-[320px] h-fit text-[16px] text-left font-medium text-[#BABABA]"
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStep = ({ number, title, description, index }: ProcessStepProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150, y: 50 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? -150 : 150, y: 50 }}
      transition={{
        duration: 1.2,
        delay: index * 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 50,
        damping: 15
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-10 relative"
    >
      {/* Linha conectora animada */}
      {index < 3 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{
            duration: 1.5,
            delay: index * 0.4 + 0.8,
            ease: "easeOut"
          }}
          className="absolute left-1/2 md:left-auto md:right-[calc(50%+82px)] top-[100px] md:top-[164px] w-0.5 h-16 md:h-32 bg-gradient-to-b from-[#310276] to-[#FF8500] transform -translate-x-1/2 md:translate-x-0"
        />
      )}

      {/* Círculo com número */}
      <motion.div
        whileHover={{
          scale: 1.15,
          boxShadow: "0 0 40px rgba(49, 2, 118, 0.6)",
          transition: { duration: 0.4 }
        }}
        className="relative w-[80px] h-[80px] md:w-[164px] md:h-[164px] bg-gradient-to-br from-[rgba(49,2,118,0.4)] to-[rgba(255,133,0,0.2)] flex justify-center items-center rounded-full border border-[#310276]/30 backdrop-blur-sm"
      >
        {/* Efeito de brilho */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.4 + 0.5 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{
            background: `linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`
          }}
        />

        <motion.span
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -180, opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.4 + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="text-white font-montserrat font-bold text-3xl md:text-[120px] drop-shadow-lg"
        >
          {number}
        </motion.span>
      </motion.div>

      {/* Conteúdo textual */}
      <div className="text-center md:text-left w-full md:w-[433px] relative px-2 md:px-0">
        <motion.h3
          initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
          animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
          transition={{
            duration: 0.8,
            delay: index * 0.4 + 0.5,
            ease: "easeOut"
          }}
          className="text-white font-montserrat font-bold text-lg md:text-2xl lg:text-3xl mb-3"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.8,
            delay: index * 0.4 + 0.7,
            ease: "easeOut"
          }}
          className="text-[#BABABA] font-montserrat font-medium text-sm md:text-lg leading-relaxed"
        >
          {description}
        </motion.p>


      </div>
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
}

const ParallaxSection = ({ children, speed = 0.5 }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y: offset }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const setores = [
  {
    key: "performance",
    label: "Campanhas de performance",
    image: "/performance.png",
    title: "Campanhas de Performance",
    description: [
      "Anúncios com foco em resultados reais",
      "Estratégias orientadas por dados, não achismos",
      "Gestão de tráfego que converte cliques em clientes"
    ]
  },
  {
    key: "social",
    label: "Gestão de mídias sociais",
    image: "/midias.png",
    title: "Gestão de Mídias Sociais",
    description: [
      "Planejamento e produção de conteúdo estratégico",
      "Acompanhamento de métricas e engajamento",
      "Fortalecimento da presença digital da sua marca"
    ]
  },
  {
    key: "branding",
    label: "Identidade Visual e Branding",
    image: "/id-visual.png",
    title: "Identidade Visual e Branding",
    description: [
      "Criação de logotipo e identidade visual",
      "Manual de marca e aplicações",
      "Posicionamento estratégico para diferenciação"
    ]
  },
  {
    key: "dev",
    label: "Desenvolvimento de Sites",
    image: "/dev.png",
    title: "Desenvolvimento de Sites",
    description: [
      "Sites institucionais, landing pages e e-commerce",
      "Design responsivo e otimizado para conversão",
      "Integração com ferramentas de marketing"
    ]
  },
  {
    key: "video",
    label: "Criação e edição de vídeos",
    image: "/visual.png",
    title: "Criação e Edição de Vídeos",
    description: [
      "Captação e edição profissional de vídeos",
      "Conteúdo audiovisual para redes sociais",
      "Vídeos institucionais e promocionais"
    ]
  }
];

const methodologySteps = [
  {
    title: "Onboarding:",
    subtitle: "Captação da essência",
    desktopClass: "left-[6%] top-[16%]",
    dotClass: "left-[6%] top-[58%]",
    lineClass: "left-[6%] top-[26%] h-[100px]",
  },
  {
    title: "Análise",
    subtitle: "comercial",
    desktopClass: "left-[27%] top-[66%]",
    dotClass: "left-[27%] top-[48%]",
    lineClass: "left-[27%] top-[54%] h-[80px]",
  },
  {
    title: "Criação da",
    subtitle: "estratégia",
    desktopClass: "left-[48%] top-[16%]",
    dotClass: "left-[48%] top-[52%]",
    lineClass: "left-[48%] top-[26%] h-[100px]",
  },
  {
    title: "Implementação:",
    subtitle: "Ação estratégica",
    desktopClass: "left-[69%] top-[66%]",
    dotClass: "left-[69%] top-[54%]",
    lineClass: "left-[69%] top-[54%] h-[60px]",
  },
  {
    title: "ESCALA",
    subtitle: "",
    desktopClass: "left-[90%] top-[16%]",
    dotClass: "left-[90%] top-[47%]",
    lineClass: "left-[90%] top-[26%] h-[90px]",
  },
];

export default function Home() {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const stickyCtaRef = useRef<HTMLDivElement>(null);
  const [activeSetor, setActiveSetor] = useState(setores[0]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const offset = 100; // Offset para melhor timing
        const footerOffset = 200; // Distância do footer para ativar modo estático

        // Mostra o CTA sticky quando passa da seção hero
        if (scrollPosition > heroBottom + offset) {
          setIsStickyVisible(true);
        } else {
          setIsStickyVisible(false);
        }

        // Verifica se está perto do footer para ativar modo estático
        if (window.scrollY + window.innerHeight >= documentHeight - footerOffset) {
          setIsNearFooter(true);
        } else {
          setIsNearFooter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa uma vez para definir o estado inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <section ref={heroRef} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg gap-y-4 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, x: -80, y: 90, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-[-140px] left-[-20px] z-0"
        >
          <motion.div
            animate={{ x: [0, 10, 0], y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
            className="origin-bottom-left rotate-[30deg]"
          >
            <Image
              src="/Blur.svg"
              alt="Feixe de luz"
              width={1300}
              height={980}
              priority
              className="h-auto w-[760px] md:w-[1080px] max-w-none"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.62, 0.5], scale: [0.8, 1, 1.03] }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
          className="pointer-events-none absolute top-[30%] z-20 h-[230px] w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(179,140,255,0.52) 0%, rgba(179,140,255,0.18) 55%, rgba(179,140,255,0) 100%)",
            filter: "blur(16px)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="z-30 text-[#1b1330] bg-gradient-to-r from-[#8f5bff] to-[#ffffff] py-2 px-4 md:px-6 rounded-full text-base"
        >
          Bem-vindo a conste performance 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="z-30 text-white font-bold font-montserrat text-4xl md:text-5xl max-w-[960px] leading-[1.08]"
        >
          <span className="block">Escale com clareza.</span>
          <span className="block text-[#B79BFF]">Não com promessas.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="z-30 text-[#C7C7C7] max-w-[500px] text-base md:text-base"
        >
          Dados reais, testes constantes e otimização contínua para seu negócio crescer de forma previsível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.8, ease: "easeOut" }}
          className="z-30"
        >
          <FormModal buttonText="Fale com um de nossos especialistas" />
        </motion.div>

      </section>

      <section className="w-full bg-[#0E0E0E] px-4 py-14 md:px-12 md:py-16 lg:px-[180px] lg:py-[72px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12">
          <div className="flex w-full max-w-[944px] flex-col items-center justify-center gap-6 text-center">
            <div className="flex w-full flex-col items-center gap-3">
              <h2 className="w-full font-montserrat text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[40px] lg:leading-[49px]">
                Gestão de Performance
              </h2>
              <p className="w-full max-w-[944px] font-montserrat text-base font-medium text-[#BABABA] md:text-base lg:leading-6">
                Gestão de Performance Nossa obsessão é criar estratégias que aumentem suas vendas de verdade. Somos parceiros estratégicos, não apenas operadores de plataforma.
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-[1080px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="flex min-h-[416px] w-full flex-col items-center justify-center gap-10 rounded-[20px] border border-[#7047BD] p-5 text-center">
              <div className="relative h-[208px] w-[222px]">
                <svg width="220" height="208" viewBox="0 0 220 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.3703 138.537C35.1725 122.918 33.7172 105.268 38.2598 88.6846L108.969 107.974L42.3703 138.537Z" fill="#DDC7FF" />
                  <path d="M72.0778 44.7587C63.7591 49.5929 56.476 56.0149 50.6443 63.6579C44.8126 71.3009 40.5465 80.0154 38.0897 89.3037L108.966 107.974L72.0778 44.7587Z" fill="#C8A3FF" />
                  <path d="M86.7692 38.2582C81.5149 39.924 76.4657 42.1761 71.7174 44.9716L108.964 107.976L86.7692 38.2582Z" fill="#AF78FF" />
                  <path d="M86.3112 38.3976C98.6031 34.4117 111.733 33.7399 124.369 36.4502L108.965 107.969L86.3112 38.3976Z" fill="#6700FF" />
                  <path d="M124.129 36.3991C142.549 40.284 158.764 51.0919 169.415 66.5831C180.066 82.0744 184.337 101.061 181.341 119.609L108.971 107.97L124.129 36.3991Z" fill="#4B00A7" />
                  <path d="M181.467 118.743C179.141 134.33 171.834 148.752 160.633 159.86C149.431 170.969 134.934 178.17 119.3 180.393C103.666 182.615 87.7305 179.74 73.8661 172.195C60.0017 164.65 48.9496 152.839 42.3552 138.519L108.962 107.972L181.467 118.743Z" fill="#6801FF" />
                  <path d="M114.878 200.257C114.131 200.257 113.44 200.135 112.806 199.893C112.18 199.641 111.634 199.291 111.168 198.843C110.71 198.385 110.351 197.853 110.09 197.247C109.828 196.64 109.698 195.973 109.698 195.245C109.698 194.517 109.828 193.849 110.09 193.243C110.351 192.636 110.715 192.109 111.182 191.661C111.648 191.203 112.194 190.853 112.82 190.611C113.454 190.359 114.145 190.233 114.892 190.233C115.648 190.233 116.343 190.363 116.978 190.625C117.622 190.877 118.168 191.255 118.616 191.759L117.706 192.641C117.332 192.249 116.912 191.959 116.446 191.773C115.979 191.577 115.48 191.479 114.948 191.479C114.397 191.479 113.884 191.572 113.408 191.759C112.941 191.945 112.535 192.207 112.19 192.543C111.844 192.879 111.574 193.28 111.378 193.747C111.191 194.204 111.098 194.703 111.098 195.245C111.098 195.786 111.191 196.29 111.378 196.757C111.574 197.214 111.844 197.611 112.19 197.947C112.535 198.283 112.941 198.544 113.408 198.731C113.884 198.917 114.397 199.011 114.948 199.011C115.48 199.011 115.979 198.917 116.446 198.731C116.912 198.535 117.332 198.236 117.706 197.835L118.616 198.717C118.168 199.221 117.622 199.603 116.978 199.865C116.343 200.126 115.643 200.257 114.878 200.257ZM120.613 200.145V190.345H124.435C125.293 190.345 126.026 190.48 126.633 190.751C127.239 191.021 127.706 191.413 128.033 191.927C128.359 192.44 128.523 193.051 128.523 193.761C128.523 194.47 128.359 195.081 128.033 195.595C127.706 196.099 127.239 196.491 126.633 196.771C126.026 197.041 125.293 197.177 124.435 197.177H121.383L122.013 196.519V200.145H120.613ZM122.013 196.659L121.383 195.959H124.393C125.289 195.959 125.965 195.767 126.423 195.385C126.889 195.002 127.123 194.461 127.123 193.761C127.123 193.061 126.889 192.519 126.423 192.137C125.965 191.754 125.289 191.563 124.393 191.563H121.383L122.013 190.863V196.659ZM135.098 200.257C134.352 200.257 133.661 200.135 133.026 199.893C132.401 199.641 131.855 199.291 131.388 198.843C130.931 198.385 130.572 197.853 130.31 197.247C130.049 196.64 129.918 195.973 129.918 195.245C129.918 194.517 130.049 193.849 130.31 193.243C130.572 192.636 130.936 192.109 131.402 191.661C131.869 191.203 132.415 190.853 133.04 190.611C133.675 190.359 134.366 190.233 135.112 190.233C135.868 190.233 136.564 190.363 137.198 190.625C137.842 190.877 138.388 191.255 138.836 191.759L137.926 192.641C137.553 192.249 137.133 191.959 136.666 191.773C136.2 191.577 135.7 191.479 135.168 191.479C134.618 191.479 134.104 191.572 133.628 191.759C133.162 191.945 132.756 192.207 132.41 192.543C132.065 192.879 131.794 193.28 131.598 193.747C131.412 194.204 131.318 194.703 131.318 195.245C131.318 195.786 131.412 196.29 131.598 196.757C131.794 197.214 132.065 197.611 132.41 197.947C132.756 198.283 133.162 198.544 133.628 198.731C134.104 198.917 134.618 199.011 135.168 199.011C135.7 199.011 136.2 198.917 136.666 198.731C137.133 198.535 137.553 198.236 137.926 197.835L138.836 198.717C138.388 199.221 137.842 199.603 137.198 199.865C136.564 200.126 135.864 200.257 135.098 200.257Z" fill="#7047BD" />
                  <path d="M92.6972 10.5098L100.124 4.11535L102.617 7.01221C103.177 7.66303 103.552 8.30666 103.743 8.94308C103.934 9.57951 103.941 10.189 103.765 10.7715C103.589 11.3541 103.232 11.8768 102.695 12.3396C102.157 12.8024 101.587 13.0775 100.985 13.1649C100.39 13.2461 99.7924 13.1452 99.1916 12.862C98.5907 12.5788 98.0103 12.1117 97.4501 11.4609L95.4592 9.14768L96.3582 9.20497L93.6105 11.5709L92.6972 10.5098ZM96.9712 15.4758L98.0404 11.2668L99.0175 12.4022L97.9667 16.6325L96.9712 15.4758ZM96.2521 9.29632L96.361 8.37121L98.3245 10.6526C98.909 11.3317 99.4954 11.7198 100.084 11.8167C100.685 11.9146 101.251 11.7352 101.782 11.2785C102.312 10.8217 102.57 10.2917 102.556 9.68827C102.547 9.09195 102.251 8.45423 101.666 7.77512L99.7029 5.49371L100.644 5.51447L96.2521 9.29632ZM102.134 21.6457C101.646 21.0798 101.288 20.4706 101.059 19.818C100.836 19.1725 100.742 18.5268 100.777 17.8808C100.819 17.2287 100.985 16.6056 101.274 16.0117C101.564 15.4178 101.981 14.8864 102.525 14.4174C103.07 13.9485 103.657 13.6152 104.287 13.4174C104.918 13.2196 105.555 13.1514 106.199 13.2128C106.85 13.2681 107.478 13.4541 108.082 13.7707C108.687 14.0873 109.237 14.5321 109.73 15.1051C110.217 15.671 110.569 16.2732 110.786 16.9116C111.016 17.551 111.11 18.1967 111.068 18.8488C111.039 19.5019 110.876 20.1219 110.581 20.7088C110.292 21.3027 109.871 21.8372 109.32 22.3122C108.768 22.7872 108.177 23.1236 107.547 23.3214C106.923 23.5262 106.282 23.5974 105.625 23.5351C104.981 23.4737 104.357 23.2847 103.752 22.9681C103.16 22.6524 102.621 22.2117 102.134 21.6457ZM103.078 20.8327C103.431 21.243 103.827 21.5606 104.267 21.7854C104.713 22.0173 105.173 22.151 105.647 22.1864C106.134 22.2228 106.611 22.1626 107.08 22.0057C107.554 21.8558 107.996 21.6043 108.407 21.2511C108.817 20.8978 109.131 20.4977 109.35 20.0508C109.575 19.6109 109.702 19.1505 109.731 18.6695C109.774 18.1895 109.713 17.7117 109.55 17.2362C109.394 16.7678 109.139 16.3284 108.785 15.9181C108.426 15.5008 108.024 15.1761 107.578 14.9442C107.138 14.7194 106.675 14.5887 106.188 14.5523C105.708 14.5098 105.231 14.5635 104.756 14.7133C104.288 14.8703 103.849 15.1253 103.438 15.4786C103.028 15.8318 102.711 16.2283 102.486 16.6682C102.267 17.1152 102.14 17.5822 102.103 18.0693C102.074 18.5503 102.138 19.025 102.294 19.4934C102.457 19.9689 102.719 20.4153 103.078 20.8327ZM107.002 27.1313L114.429 20.7368L115.342 21.7979L107.916 28.1924L107.002 27.1313Z" fill="#7047BD" />
                  <path d="M5.96425 122.115C5.21758 122.115 4.52692 121.994 3.89225 121.751C3.26692 121.499 2.72092 121.149 2.25425 120.701C1.79692 120.244 1.43758 119.712 1.17625 119.105C0.914916 118.498 0.784249 117.831 0.784249 117.103C0.784249 116.375 0.914916 115.708 1.17625 115.101C1.43758 114.494 1.80158 113.967 2.26825 113.519C2.73492 113.062 3.28092 112.712 3.90625 112.469C4.54092 112.217 5.23158 112.091 5.97825 112.091C6.73425 112.091 7.42958 112.222 8.06425 112.483C8.70825 112.735 9.25425 113.113 9.70225 113.617L8.79225 114.499C8.41892 114.107 7.99892 113.818 7.53225 113.631C7.06558 113.435 6.56625 113.337 6.03425 113.337C5.48358 113.337 4.97025 113.43 4.49425 113.617C4.02758 113.804 3.62158 114.065 3.27625 114.401C2.93092 114.737 2.66025 115.138 2.46425 115.605C2.27758 116.062 2.18425 116.562 2.18425 117.103C2.18425 117.644 2.27758 118.148 2.46425 118.615C2.66025 119.072 2.93092 119.469 3.27625 119.805C3.62158 120.141 4.02758 120.402 4.49425 120.589C4.97025 120.776 5.48358 120.869 6.03425 120.869C6.56625 120.869 7.06558 120.776 7.53225 120.589C7.99892 120.393 8.41892 120.094 8.79225 119.693L9.70225 120.575C9.25425 121.079 8.70825 121.462 8.06425 121.723C7.42958 121.984 6.72958 122.115 5.96425 122.115ZM11.6994 122.003V112.203H15.5214C16.3801 112.203 17.1128 112.338 17.7194 112.609C18.3261 112.88 18.7928 113.272 19.1194 113.785C19.4461 114.298 19.6094 114.91 19.6094 115.619C19.6094 116.328 19.4461 116.94 19.1194 117.453C18.7928 117.957 18.3261 118.349 17.7194 118.629C17.1128 118.9 16.3801 119.035 15.5214 119.035H12.4694L13.0994 118.377V122.003H11.6994ZM13.0994 118.517L12.4694 117.817H15.4794C16.3754 117.817 17.0521 117.626 17.5094 117.243C17.9761 116.86 18.2094 116.319 18.2094 115.619C18.2094 114.919 17.9761 114.378 17.5094 113.995C17.0521 113.612 16.3754 113.421 15.4794 113.421H12.4694L13.0994 112.721V118.517ZM19.69 122.003L24.128 112.203H25.514L29.966 122.003H28.496L24.534 112.987H25.094L21.132 122.003H19.69ZM21.58 119.553L21.958 118.433H27.474L27.88 119.553H21.58Z" fill="#7047BD" />
                  <path d="M10.6043 46.9786L15.5994 38.5472L16.8052 39.2586L12.4309 46.6421L17.0008 49.3383L16.38 50.3862L10.6043 46.9786ZM20.1584 52.713C19.6118 52.3905 19.189 52.0056 18.8899 51.5582C18.5989 51.1156 18.4581 50.6208 18.4676 50.0737C18.4899 49.5233 18.6866 48.935 19.0577 48.3087L21.2341 44.635L22.3917 45.3179L20.2937 48.8591C19.9226 49.4855 19.793 50.043 19.9049 50.5316C20.0249 51.025 20.3581 51.4329 20.9048 51.7554C21.3067 51.9926 21.7039 52.1186 22.0965 52.1335C22.4938 52.1403 22.8657 52.0346 23.212 51.8163C23.563 51.5899 23.8718 51.2519 24.1382 50.8022L26.0934 47.502L27.251 48.1849L23.4689 54.5687L22.3717 53.9213L23.3921 52.1989L23.3018 52.7633C22.8407 53.0656 22.3321 53.2098 21.7761 53.1961C21.2202 53.1823 20.6809 53.0213 20.1584 52.713ZM28.4151 57.5844C27.764 57.2003 27.2644 56.7159 26.9165 56.1313C26.5766 55.5515 26.407 54.9313 26.4078 54.2707C26.4086 53.6102 26.5969 52.9627 26.9728 52.3283C27.3486 51.694 27.8263 51.2173 28.4059 50.8982C28.9855 50.5791 29.6093 50.4324 30.2775 50.4582C30.9585 50.4807 31.6245 50.684 32.2756 51.0682C32.8544 51.4096 33.2999 51.8296 33.6121 52.3281C33.9371 52.8232 34.091 53.3692 34.0738 53.9659L32.8582 54.0127C32.8347 53.5762 32.713 53.1956 32.4932 52.8708C32.2862 52.5428 32.0098 52.2768 31.6642 52.0728C31.2462 51.8262 30.8177 51.698 30.3787 51.6882C29.9397 51.6785 29.5238 51.7853 29.1311 52.0088C28.7431 52.2242 28.4135 52.5607 28.1424 53.0184C27.8712 53.4761 27.7322 53.9305 27.7253 54.3816C27.7184 54.8327 27.8251 55.2478 28.0452 55.6269C28.2654 56.0061 28.5845 56.3189 29.0025 56.5656C29.3481 56.7695 29.7125 56.8869 30.0955 56.9179C30.4914 56.9455 30.8866 56.8644 31.2811 56.6746L31.8331 57.748C31.3222 58.0426 30.7664 58.1752 30.1654 58.1457C29.5773 58.113 28.9939 57.9259 28.4151 57.5844ZM32.5611 59.933L36.3431 53.5492L37.4524 54.2037L36.4248 55.9382L36.5732 55.4405C37.0117 55.1032 37.5089 54.9415 38.0649 54.9552C38.6209 54.969 39.2043 55.1561 39.8152 55.5165L39.1516 56.6367C39.1081 56.6002 39.0623 56.5677 39.0141 56.5393C38.9739 56.5155 38.9337 56.4918 38.8935 56.4681C38.2745 56.1029 37.6747 55.9983 37.0942 56.1543C36.5136 56.3102 36.0164 56.7375 35.6025 57.4361L33.7186 60.6159L32.5611 59.933ZM40.0596 64.4547C39.4166 64.0752 38.9291 63.598 38.5972 63.0229C38.2653 62.4478 38.0998 61.83 38.1006 61.1694C38.1061 60.5008 38.2945 59.8534 38.6655 59.227C39.0413 58.5927 39.5191 58.1159 40.0986 57.7968C40.6782 57.4778 41.2981 57.3287 41.9582 57.3498C42.6231 57.3628 43.2771 57.559 43.9202 57.9384C44.5552 58.3131 45.0387 58.7879 45.3706 59.363C45.7152 59.9348 45.8832 60.5487 45.8743 61.2045C45.8783 61.857 45.69 62.5045 45.3094 63.1469C44.9335 63.7812 44.4558 64.2579 43.8763 64.577C43.3047 64.9009 42.6825 65.0539 42.0095 65.0362C41.3446 65.0232 40.6947 64.8293 40.0596 64.4547ZM40.6591 63.4429C41.069 63.6848 41.4895 63.8082 41.9204 63.8132C42.3594 63.823 42.7713 63.7138 43.156 63.4856C43.5454 63.2494 43.8734 62.9065 44.1398 62.4568C44.4109 61.9991 44.5516 61.5511 44.5618 61.1128C44.5767 60.6664 44.4741 60.2537 44.2539 59.8746C44.0418 59.5002 43.7307 59.192 43.3208 58.9502C42.9108 58.7083 42.4903 58.5848 42.0594 58.5798C41.6284 58.5748 41.2166 58.684 40.8238 58.9074C40.4359 59.1228 40.1063 59.4594 39.8351 59.9171C39.5687 60.3668 39.4297 60.8212 39.4181 61.2803C39.4112 61.7313 39.5138 62.1441 39.7259 62.5185C39.938 62.8929 40.2491 63.201 40.6591 63.4429Z" fill="#7047BD" />
                  <path d="M164.019 35.7137C163.678 35.0493 163.473 34.3734 163.404 33.686C163.339 33.0068 163.399 32.3579 163.585 31.7393C163.78 31.1164 164.088 30.5509 164.509 30.0429C164.93 29.5349 165.461 29.1177 166.101 28.7914C166.742 28.465 167.392 28.2804 168.051 28.2374C168.711 28.1945 169.347 28.2789 169.959 28.4907C170.58 28.6983 171.147 29.0272 171.661 29.4775C172.175 29.9278 172.605 30.4893 172.95 31.1619C173.291 31.8263 173.492 32.4939 173.552 33.1648C173.626 33.8397 173.565 34.4886 173.371 35.1115C173.189 35.7385 172.885 36.3018 172.46 36.8015C172.038 37.3095 171.504 37.7288 170.855 38.0594C170.206 38.3899 169.552 38.5767 168.892 38.6197C168.237 38.6709 167.597 38.5886 166.972 38.3727C166.36 38.1609 165.797 37.8299 165.283 37.3796C164.781 36.9334 164.36 36.3781 164.019 35.7137ZM165.129 35.1479C165.376 35.6296 165.687 36.0315 166.062 36.3537C166.442 36.6841 166.858 36.9226 167.31 37.069C167.776 37.2194 168.255 37.2739 168.747 37.2323C169.244 37.199 169.734 37.0595 170.216 36.8137C170.698 36.5679 171.098 36.2539 171.416 35.8719C171.739 35.4981 171.971 35.0813 172.113 34.6214C172.267 34.1657 172.321 33.6878 172.274 33.1878C172.232 32.6961 172.087 32.2094 171.84 31.7277C171.589 31.2378 171.273 30.8275 170.894 30.4971C170.519 30.1749 170.099 29.9386 169.633 29.7881C169.177 29.6334 168.7 29.5727 168.203 29.606C167.71 29.6476 167.223 29.7913 166.74 30.0371C166.258 30.2829 165.856 30.5927 165.533 30.9664C165.215 31.3485 164.981 31.7716 164.831 32.2357C164.689 32.6955 164.64 33.1713 164.682 33.663C164.729 34.163 164.878 34.6579 165.129 35.1479ZM169.097 45.5525C168.816 45.0044 168.683 44.4384 168.698 43.8545C168.726 43.2747 168.919 42.7206 169.277 42.1922C169.64 41.6722 170.195 41.2215 170.944 40.84C171.692 40.4586 172.382 40.2695 173.013 40.2726C173.648 40.2841 174.205 40.4505 174.685 40.7718C175.169 41.1014 175.555 41.5486 175.845 42.1133C176.177 42.761 176.33 43.4061 176.303 44.0485C176.276 44.6909 176.083 45.2866 175.725 45.8358C175.375 46.3808 174.863 46.8249 174.19 47.1682C173.516 47.5115 172.851 47.6671 172.195 47.6349C171.538 47.6028 170.941 47.4096 170.403 47.0554C169.864 46.7013 169.429 46.2003 169.097 45.5525ZM164.957 43.2473L173.987 38.6446L174.575 39.7907L172.791 40.6998L171.219 41.407L169.748 42.3135L165.57 44.4431L164.957 43.2473ZM170.094 44.9189C170.311 45.3424 170.6 45.6715 170.962 45.9062C171.328 46.1492 171.734 46.2773 172.182 46.2903C172.641 46.3073 173.104 46.1972 173.57 45.9599C174.044 45.7183 174.4 45.411 174.639 45.0379C174.89 44.6689 175.024 44.2654 175.041 43.8274C175.062 43.3978 174.963 42.9712 174.746 42.5476C174.533 42.1324 174.244 41.8033 173.878 41.5603C173.516 41.3255 173.11 41.1975 172.658 41.1762C172.219 41.159 171.763 41.2711 171.289 41.5127C170.823 41.7501 170.46 42.0553 170.201 42.4286C169.954 42.8059 169.82 43.2094 169.799 43.6391C169.782 44.077 169.881 44.5036 170.094 44.9189ZM173.107 53.371C172.766 52.7067 172.609 52.0429 172.636 51.3796C172.663 50.7164 172.854 50.1061 173.208 49.5486C173.57 48.9868 174.075 48.5407 174.724 48.2101C175.381 47.8753 176.04 47.7281 176.7 47.7685C177.361 47.809 177.965 48.0146 178.511 48.3854C179.067 48.7519 179.514 49.2674 179.855 49.9318C180.192 50.5879 180.347 51.2475 180.32 51.9107C180.305 52.578 180.119 53.1863 179.761 53.7354C179.415 54.2887 178.91 54.7349 178.244 55.0739C177.588 55.4087 176.929 55.5559 176.268 55.5155C175.612 55.4833 175.004 55.2798 174.445 54.905C173.889 54.5384 173.444 54.0271 173.107 53.371ZM174.155 52.837C174.372 53.2606 174.662 53.5897 175.023 53.8244C175.389 54.0674 175.796 54.1954 176.243 54.2084C176.698 54.2172 177.159 54.1029 177.625 53.8656C178.099 53.624 178.457 53.3208 178.7 52.9561C178.951 52.587 179.085 52.1836 179.102 51.7456C179.123 51.3159 179.025 50.8893 178.807 50.4658C178.59 50.0423 178.301 49.7131 177.939 49.4784C177.578 49.2437 177.171 49.1157 176.719 49.0944C176.276 49.0688 175.818 49.1769 175.344 49.4184C174.878 49.6558 174.518 49.9652 174.262 50.3468C174.015 50.7241 173.881 51.1276 173.86 51.5572C173.839 51.9869 173.938 52.4135 174.155 52.837ZM175.787 58.4124L182.398 55.0431L182.986 56.1891L181.19 57.1046L181.581 56.7636C182.132 56.7132 182.639 56.8425 183.102 57.1514C183.565 57.4604 183.958 57.9304 184.282 58.5616L183.122 59.1528C183.104 59.0987 183.083 59.0468 183.057 58.9969C183.036 58.9554 183.015 58.9139 182.993 58.8724C182.665 58.2329 182.214 57.8238 181.64 57.645C181.066 57.4663 180.417 57.5613 179.694 57.93L176.401 59.6083L175.787 58.4124ZM179.59 66.0095C179.249 65.3451 179.163 64.7391 179.334 64.1915C179.504 63.6439 179.921 63.2005 180.587 62.8615L186.649 59.7718L187.262 60.9677L181.25 64.0319C180.892 64.2141 180.663 64.4412 180.561 64.7131C180.463 64.9932 180.5 65.2994 180.67 65.6316C180.862 66.0053 181.126 66.2638 181.461 66.407L180.792 67.2193C180.541 67.1171 180.311 66.9564 180.104 66.7371C179.902 66.5261 179.73 66.2836 179.59 66.0095ZM183.641 59.8904L184.627 59.3882L186.786 63.5986L185.801 64.1008L183.641 59.8904ZM182.497 71.6782C182.207 71.1135 182.056 70.5623 182.042 70.0245C182.033 69.495 182.178 69.0017 182.479 68.5448C182.792 68.0918 183.273 67.7001 183.922 67.3695L187.726 65.4306L188.339 66.6264L184.672 68.4955C184.024 68.826 183.616 69.2276 183.449 69.7002C183.287 70.181 183.35 70.7038 183.64 71.2685C183.853 71.6838 184.122 72.0026 184.445 72.2252C184.778 72.4434 185.149 72.553 185.558 72.5538C185.976 72.5503 186.418 72.4299 186.883 72.1926L190.301 70.4507L190.914 71.6466L184.303 75.0159L183.722 73.8823L185.506 72.9733L185.128 73.4017C184.576 73.4104 184.069 73.2603 183.606 72.9513C183.144 72.6424 182.774 72.218 182.497 71.6782ZM193.953 77.4168C194.229 77.9566 194.368 78.4829 194.369 78.9958C194.374 79.517 194.224 80.0019 193.92 80.4506C193.615 80.8993 193.138 81.2889 192.489 81.6195L188.685 83.5584L188.072 82.3625L191.739 80.4935C192.379 80.1672 192.78 79.7636 192.943 79.2827C193.11 78.8102 193.048 78.2915 192.758 77.7268C192.541 77.3033 192.269 76.9761 191.94 76.7453C191.612 76.5145 191.241 76.3945 190.827 76.3854C190.418 76.3846 189.972 76.5071 189.49 76.7529L186.085 78.4884L185.471 77.2925L192.082 73.9232L192.67 75.0693L190.886 75.9783L191.264 75.5499C191.807 75.5455 192.315 75.706 192.786 76.0315C193.257 76.3571 193.646 76.8188 193.953 77.4168ZM189.82 85.7716L196.431 82.4022L197.044 83.5981L190.433 86.9674L189.82 85.7716ZM198.01 82.3517C197.891 82.1192 197.865 81.8859 197.934 81.6518C198.007 81.4261 198.152 81.2581 198.368 81.1479C198.593 81.0335 198.818 81.0128 199.044 81.086C199.275 81.1675 199.45 81.3246 199.569 81.5571C199.688 81.7896 199.712 82.0188 199.639 82.2445C199.578 82.4744 199.44 82.6444 199.224 82.7546C198.999 82.869 198.769 82.8918 198.535 82.8228C198.308 82.7496 198.134 82.5926 198.01 82.3517ZM192.929 92.017C192.601 91.3775 192.449 90.7325 192.471 90.0818C192.499 89.4394 192.691 88.8436 193.049 88.2944C193.408 87.7452 193.923 87.299 194.597 86.9557C195.271 86.6124 195.931 86.459 196.579 86.4953C197.236 86.5275 197.833 86.7206 198.371 87.0748C198.914 87.4373 199.349 87.9383 199.677 88.5777C199.963 89.1342 200.096 89.7002 200.076 90.2758C200.057 90.8513 199.866 91.3992 199.503 91.9192C199.145 92.4475 198.591 92.9024 197.843 93.2839C197.094 93.6653 196.403 93.8503 195.767 93.8388C195.136 93.8357 194.577 93.6756 194.089 93.3585C193.61 93.0372 193.223 92.59 192.929 92.017ZM194.028 91.5826C194.241 91.9979 194.528 92.3228 194.89 92.5576C195.256 92.8006 195.662 92.9286 196.11 92.9416C196.569 92.9587 197.032 92.8485 197.498 92.6112C197.972 92.3696 198.328 92.0623 198.567 91.6892C198.818 91.3202 198.952 90.9167 198.969 90.4787C198.99 90.0491 198.893 89.6266 198.681 89.2114C198.463 88.7879 198.174 88.4587 197.812 88.224C197.451 87.9893 197.044 87.8613 196.593 87.84C196.149 87.8145 195.691 87.9225 195.217 88.164C194.751 88.4014 194.391 88.7108 194.135 89.0924C193.888 89.4697 193.754 89.8732 193.733 90.3028C193.713 90.7325 193.811 91.1591 194.028 91.5826ZM194.211 94.3332L195.995 93.4241L197.568 92.7169L199.038 91.8104L203.441 89.5663L204.055 90.7622L194.799 95.4793L194.211 94.3332ZM198.062 101.84L199.459 101.128L199.689 100.933L202.071 99.7183C202.579 99.4598 202.893 99.1111 203.014 98.6723C203.148 98.2375 203.063 97.7253 202.761 97.1357C202.56 96.7453 202.298 96.3972 201.973 96.0913C201.657 95.7812 201.325 95.5525 200.976 95.4053L201.619 94.4493C202.068 94.6499 202.484 94.9509 202.869 95.3522C203.265 95.7576 203.598 96.2219 203.866 96.745C204.331 97.6503 204.468 98.4602 204.279 99.1748C204.089 99.8893 203.541 100.478 202.635 100.94L198.643 102.974L198.062 101.84ZM196.875 99.7109C196.624 99.221 196.486 98.7467 196.46 98.2883C196.439 97.8381 196.523 97.4392 196.712 97.0915C196.909 96.7397 197.195 96.4684 197.569 96.2776C197.926 96.0954 198.293 96.0132 198.67 96.0309C199.05 96.057 199.426 96.2165 199.796 96.5095C200.171 96.8108 200.527 97.2895 200.863 97.9456L201.937 100.038L201.076 100.477L200.028 98.4341C199.721 97.8361 199.415 97.4842 199.109 97.3783C198.803 97.2724 198.509 97.2915 198.226 97.4356C197.901 97.6009 197.706 97.8631 197.638 98.2223C197.579 98.5772 197.666 98.9831 197.901 99.4398C198.131 99.8883 198.431 100.228 198.801 100.458C199.175 100.697 199.591 100.794 200.051 100.748L199.349 101.404C198.877 101.446 198.423 101.327 197.985 101.047C197.556 100.762 197.186 100.317 196.875 99.7109ZM201.103 107.953C200.775 107.314 200.622 106.669 200.645 106.018C200.672 105.376 200.865 104.78 201.223 104.231C201.581 103.681 202.097 103.235 202.771 102.892C203.444 102.549 204.105 102.395 204.753 102.432C205.41 102.464 206.007 102.657 206.545 103.011C207.088 103.373 207.523 103.874 207.851 104.514C208.136 105.07 208.269 105.636 208.25 106.212C208.23 106.788 208.039 107.335 207.677 107.855C207.318 108.384 206.765 108.839 206.017 109.22C205.268 109.601 204.576 109.786 203.941 109.775C203.31 109.772 202.751 109.612 202.263 109.295C201.783 108.973 201.397 108.526 201.103 107.953ZM202.202 107.519C202.415 107.934 202.702 108.259 203.064 108.494C203.43 108.737 203.836 108.865 204.283 108.878C204.743 108.895 205.206 108.785 205.672 108.547C206.146 108.306 206.502 107.998 206.741 107.625C206.992 107.256 207.126 106.853 207.142 106.415C207.163 105.985 207.067 105.563 206.854 105.148C206.637 104.724 206.348 104.395 205.986 104.16C205.624 103.926 205.218 103.797 204.766 103.776C204.323 103.751 203.865 103.859 203.391 104.1C202.925 104.338 202.564 104.647 202.309 105.029C202.062 105.406 201.928 105.809 201.907 106.239C201.886 106.669 201.985 107.095 202.202 107.519ZM202.385 110.269L204.169 109.36L205.742 108.653L207.212 107.747L211.615 105.503L212.228 106.698L202.973 111.415L202.385 110.269ZM205.567 116.656C205.205 115.95 205.031 115.253 205.045 114.565C205.063 113.885 205.25 113.267 205.603 112.709C205.962 112.16 206.469 111.718 207.126 111.383C207.783 111.048 208.437 110.893 209.09 110.917C209.746 110.949 210.343 111.142 210.882 111.496C211.432 111.854 211.87 112.349 212.193 112.98C212.521 113.62 212.67 114.256 212.638 114.89C212.607 115.525 212.404 116.11 212.029 116.647C211.666 117.188 211.144 117.632 210.462 117.979C210.412 118.005 210.352 118.03 210.281 118.056C210.215 118.09 210.15 118.118 210.088 118.139L207.206 112.521L208.067 112.082L210.629 117.077L210.08 116.744C210.509 116.536 210.842 116.256 211.081 115.904C211.32 115.552 211.448 115.167 211.465 114.75C211.494 114.337 211.4 113.919 211.183 113.495C210.97 113.08 210.685 112.759 210.328 112.533C209.978 112.302 209.587 112.182 209.152 112.173C208.726 112.16 208.296 112.264 207.864 112.484L207.664 112.586C207.224 112.81 206.88 113.111 206.633 113.489C206.398 113.87 206.279 114.292 206.275 114.755C206.271 115.218 206.391 115.686 206.634 116.159C206.834 116.55 207.081 116.869 207.376 117.117C207.675 117.373 208.02 117.553 208.41 117.659L207.975 118.713C207.472 118.592 207.014 118.354 206.601 117.999C206.193 117.652 205.848 117.204 205.567 116.656Z" fill="#7047BD" />
                  <path d="M49.6647 17.6447C49.0333 17.2462 48.5143 16.7752 48.1078 16.2316C47.7141 15.6851 47.4401 15.0983 47.2857 14.4711C47.1442 13.841 47.1256 13.2002 47.23 12.5487C47.3343 11.8971 47.5817 11.2641 47.9721 10.6497C48.3625 10.0352 48.8309 9.54172 49.3773 9.16915C49.9236 8.79659 50.5142 8.54578 51.1491 8.41672C51.789 8.27979 52.4385 8.27579 53.0974 8.40473C53.7693 8.53078 54.4209 8.79306 55.0523 9.19158C55.6917 9.59507 56.2096 10.0765 56.6061 10.6358C57.0156 11.1922 57.2746 11.8027 57.3832 12.4672L56.1406 12.7259C56.0351 12.1958 55.8351 11.7274 55.5406 11.3208C55.2511 10.9063 54.8814 10.5571 54.4315 10.2731C53.9658 9.97922 53.4816 9.78402 52.979 9.68752C52.4843 9.596 52.0008 9.59988 51.5286 9.69916C51.0563 9.79844 50.6122 9.99272 50.1962 10.282C49.7931 10.5684 49.4464 10.94 49.156 11.3969C48.8657 11.8538 48.6744 12.329 48.582 12.8225C48.5024 13.3132 48.5186 13.7924 48.6304 14.2603C48.7423 14.7282 48.9455 15.1655 49.24 15.5721C49.5424 15.9837 49.9265 16.3365 50.3922 16.6304C50.842 16.9143 51.3144 17.1021 51.8091 17.1936C52.3089 17.2772 52.8242 17.2493 53.3551 17.1098L53.6517 18.34C53.0025 18.5263 52.3356 18.5578 51.6508 18.4347C50.974 18.3165 50.312 18.0532 49.6647 17.6447ZM56.8076 22.1198C56.2709 21.781 55.8599 21.3837 55.5746 20.9277C55.2972 20.4767 55.1717 19.9781 55.1981 19.4318C55.2373 18.8827 55.4522 18.3009 55.8426 17.6865L58.1326 14.0825L59.2691 14.7998L57.0618 18.2738C56.6713 18.8883 56.5246 19.4413 56.6214 19.9328C56.7261 20.4294 57.0468 20.847 57.5835 21.1857C57.9782 21.4348 58.3715 21.5727 58.7637 21.5995C59.1608 21.6184 59.5359 21.524 59.889 21.3164C60.2471 21.1009 60.5663 20.7726 60.8466 20.3315L62.9038 17.0938L64.0403 17.8111L60.0611 24.0738L58.9837 23.3939L60.0573 21.7041L59.9496 22.2652C59.4791 22.5532 58.9661 22.6819 58.4105 22.6513C57.8549 22.6207 57.3206 22.4435 56.8076 22.1198ZM63.9793 26.6461C63.4583 26.3173 63.0061 25.9326 62.6227 25.4919C62.2471 25.0562 61.9902 24.6513 61.852 24.2771L62.8962 23.6779C63.0494 24.0285 63.2833 24.3913 63.5978 24.7664C63.9124 25.1415 64.2749 25.4586 64.6853 25.7176C65.2141 26.0514 65.6405 26.2157 65.9645 26.2105C66.2964 26.2102 66.5474 26.0762 66.7176 25.8084C66.8428 25.6114 66.8693 25.413 66.7973 25.213C66.7253 25.0131 66.5885 24.8108 66.3867 24.6062C66.1929 24.4066 65.9664 24.1974 65.7073 23.9787C65.4532 23.7521 65.2041 23.5176 64.96 23.2753C64.7209 23.025 64.5205 22.7661 64.3588 22.4985C64.2021 22.223 64.1203 21.9341 64.1133 21.6317C64.1114 21.3215 64.2256 20.9852 64.4558 20.6228C64.6961 20.2447 65.0129 19.9811 65.4062 19.832C65.7995 19.6829 66.237 19.6555 66.7189 19.75C67.2136 19.8415 67.7293 20.0566 68.2661 20.3954C68.6765 20.6544 69.0583 20.9671 69.4116 21.3335C69.7777 21.6971 70.0374 22.0541 70.1906 22.4047L69.1346 22.9964C68.9706 22.628 68.7572 22.3112 68.4944 22.046C68.2317 21.7808 67.9464 21.5511 67.6386 21.3568C67.1413 21.043 66.7178 20.8916 66.368 20.9026C66.0232 20.9057 65.7707 21.0333 65.6106 21.2854C65.4754 21.4981 65.4414 21.7084 65.5083 21.9162C65.5882 22.1211 65.7226 22.3273 65.9114 22.5348C66.1082 22.7473 66.3336 22.9668 66.5877 23.1934C66.8468 23.4122 67.0959 23.6466 67.335 23.8969C67.5791 24.1392 67.7781 24.3917 67.9319 24.6543C68.0936 24.9219 68.1779 25.2069 68.1848 25.5093C68.1997 25.8166 68.0944 26.1476 67.8692 26.502C67.6289 26.8802 67.3107 27.1374 66.9145 27.2736C66.5184 27.4098 66.0689 27.4297 65.5663 27.3332C65.0687 27.2288 64.5397 26.9998 63.9793 26.6461ZM70.2656 30.6137C69.6342 30.2152 69.2524 29.7369 69.1204 29.179C68.9883 28.6211 69.1225 28.027 69.5229 27.3968L73.1718 21.654L74.3084 22.3713L70.6895 28.0669C70.4743 28.4056 70.392 28.7179 70.4426 29.0037C70.5011 29.2945 70.6883 29.5395 71.004 29.7387C71.3591 29.9629 71.7177 30.0512 72.0796 30.0037L71.9167 31.0432C71.648 31.0833 71.3688 31.0616 71.079 30.9781C70.7972 30.8995 70.5261 30.7781 70.2656 30.6137ZM70.6423 23.2857L71.2354 22.3522L75.237 24.8778L74.6439 25.8113L70.6423 23.2857ZM75.4924 33.9125C74.861 33.514 74.3882 33.0225 74.074 32.4379C73.7599 31.8533 73.6134 31.2311 73.6346 30.5712C73.6607 29.9035 73.8691 29.2624 74.2595 28.6479C74.6549 28.0256 75.1473 27.5638 75.7368 27.2626C76.3263 26.9614 76.9508 26.8313 77.6103 26.8723C78.2748 26.9055 78.9228 27.1213 79.5543 27.5198C80.1778 27.9133 80.6466 28.4024 80.9608 28.987C81.2879 29.5686 81.4368 30.1869 81.4078 30.8418C81.3916 31.4938 81.1833 32.1349 80.7829 32.7651C80.3874 33.3875 79.895 33.8492 79.3055 34.1504C78.7239 34.4566 78.0969 34.5907 77.4245 34.5525C76.76 34.5194 76.1159 34.3061 75.4924 33.9125ZM76.1231 32.9199C76.5256 33.174 76.9423 33.3101 77.3731 33.3281C77.8119 33.3512 78.2271 33.2546 78.6189 33.0383C79.0156 32.8141 79.3542 32.4815 79.6345 32.0403C79.9198 31.5913 80.0743 31.148 80.0979 30.7104C80.1266 30.265 80.0367 29.8496 79.8283 29.4641C79.6277 29.0837 79.3261 28.7665 78.9236 28.5124C78.521 28.2583 78.1044 28.1223 77.6735 28.1042C77.2427 28.0861 76.8274 28.1827 76.4278 28.3941C76.0332 28.5975 75.6932 28.9237 75.4079 29.3727C75.1276 29.8139 74.9745 30.2636 74.9487 30.7219C74.9279 31.1723 75.0178 31.5878 75.2184 31.9682C75.419 32.3486 75.7205 32.6659 76.1231 32.9199Z" fill="#7047BD" />
                </svg>

              </div>

              <div className="flex w-full max-w-[480px] flex-col items-center gap-4">
                <h3 className="font-montserrat text-2xl font-bold text-white">Decisões baseadas em dados, não em achismos.</h3>
                <p className="font-montserrat text-sm font-medium text-[#BABABA]">
                  Analisamos histórico, tendências e oportunidades para você tomar decisões mais inteligentes sobre seus investimentos em mídia.
                </p>
              </div>
            </div>

            <div className="flex min-h-[416px] w-full flex-col items-center justify-center gap-10 rounded-[20px] border border-[#7047BD] p-5 text-center">
              <div className="relative flex h-[196px] w-[300px] items-center justify-center">
                <svg width="316" height="203" viewBox="0 0 316 203" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M105.76 91.5401L114.87 92.3371C115.305 92.3752 115.743 92.3272 116.16 92.1959C116.576 92.0646 116.963 91.8525 117.297 91.5717C117.632 91.291 117.908 90.947 118.11 90.5596C118.311 90.1722 118.435 89.7488 118.473 89.3136L119.631 76.0617C119.707 75.1834 119.432 74.3107 118.865 73.6353C118.299 72.96 117.487 72.5373 116.609 72.4601L107.498 71.6615C107.389 71.6519 107.279 71.6639 107.175 71.6967C107.071 71.7296 106.974 71.7826 106.89 71.8528C106.806 71.9231 106.737 72.0091 106.687 72.106C106.637 72.203 106.606 72.3089 106.596 72.4177L105.004 90.6389C104.994 90.7477 105.006 90.8574 105.039 90.9616C105.072 91.0658 105.125 91.1625 105.195 91.2462C105.265 91.3299 105.351 91.399 105.448 91.4494C105.545 91.4998 105.651 91.5306 105.76 91.5401ZM102.28 131.295L111.392 132.091C112.27 132.168 113.143 131.892 113.818 131.326C114.493 130.759 114.916 129.947 114.993 129.069L116.154 115.817C116.192 115.382 116.144 114.944 116.013 114.527C115.882 114.111 115.669 113.724 115.389 113.389C115.108 113.055 114.764 112.779 114.377 112.577C113.989 112.375 113.566 112.252 113.131 112.214L104.021 111.417C103.912 111.407 103.802 111.419 103.698 111.452C103.594 111.485 103.497 111.538 103.413 111.608C103.33 111.679 103.261 111.765 103.21 111.862C103.16 111.958 103.129 112.064 103.12 112.173L101.524 130.394C101.514 130.503 101.526 130.613 101.559 130.717C101.592 130.821 101.645 130.918 101.715 131.001C101.786 131.085 101.872 131.154 101.969 131.205C102.065 131.255 102.171 131.286 102.28 131.295ZM47.7428 96.4596C47.3977 100.377 47.8278 104.323 49.0085 108.074C50.1892 111.824 52.0974 115.305 54.624 118.318C57.1506 121.331 60.2461 123.817 63.7337 125.633C67.2212 127.449 71.0324 128.56 74.9495 128.903L93.9991 130.571C94.108 130.58 94.2176 130.568 94.3218 130.536C94.426 130.503 94.5228 130.45 94.6065 130.38C94.6902 130.309 94.7592 130.223 94.8096 130.126C94.86 130.029 94.8909 129.923 94.9003 129.815L96.493 111.593C96.5026 111.485 96.4906 111.375 96.4578 111.271C96.425 111.167 96.3719 111.07 96.3017 110.986C96.2315 110.902 96.1454 110.833 96.0485 110.783C95.9516 110.733 95.8457 110.702 95.7368 110.692L76.6952 109.034C75.3757 108.918 74.0923 108.541 72.9201 107.924C71.7478 107.308 70.7101 106.464 69.8674 105.442C69.0248 104.42 68.3941 103.24 68.0121 101.972C67.6301 100.704 67.5046 99.3719 67.6427 98.0546C68.2102 92.613 73.1487 88.6944 78.5982 89.1711L97.471 90.8193C97.5799 90.8289 97.6895 90.817 97.7937 90.7841C97.898 90.7513 97.9947 90.6983 98.0784 90.628C98.1621 90.5578 98.2311 90.4718 98.2815 90.3748C98.3319 90.2779 98.3628 90.172 98.3722 90.0631L99.9678 71.8422C99.9774 71.7334 99.9655 71.6237 99.9326 71.5195C99.8998 71.4153 99.8468 71.3186 99.7765 71.2349C99.7063 71.1512 99.6203 71.0822 99.5233 71.0317C99.4264 70.9813 99.3205 70.9505 99.2116 70.941L80.4474 69.2994C63.9456 67.8512 49.1971 79.9554 47.7428 96.4596Z" fill="#7047BD" />
                  <g filter="url(#filter0_f_97_279)">
                    <ellipse cx="194.484" cy="105.795" rx="97.2415" ry="27.9311" fill="#7047BD" fill-opacity="0.5" />
                  </g>
                  <path d="M226.55 86.1396C228.745 86.1396 230.85 87.0116 232.402 88.5636C233.954 90.1156 234.826 92.2206 234.826 94.4155C234.826 96.6104 233.954 98.7154 232.402 100.267C230.85 101.819 228.745 102.691 226.55 102.691C224.355 102.691 222.25 101.819 220.698 100.267C219.146 98.7154 218.274 96.6104 218.274 94.4155C218.274 92.2206 219.146 90.1156 220.698 88.5636C222.25 87.0116 224.355 86.1396 226.55 86.1396ZM226.55 106.829C235.695 106.829 243.102 110.533 243.102 115.105V119.243H209.998V115.105C209.998 110.533 217.405 106.829 226.55 106.829Z" fill="#7047BD" />
                  <path d="M217.955 33.8398C219.043 33.8398 220.086 34.272 220.855 35.0414C221.625 35.8107 222.057 36.8541 222.057 37.9421C222.057 39.0301 221.625 40.0735 220.855 40.8429C220.086 41.6122 219.043 42.0444 217.955 42.0444C216.867 42.0444 215.823 41.6122 215.054 40.8429C214.284 40.0735 213.852 39.0301 213.852 37.9421C213.852 36.8541 214.284 35.8107 215.054 35.0414C215.823 34.272 216.867 33.8398 217.955 33.8398ZM217.955 44.0955C222.488 44.0955 226.159 45.9313 226.159 48.1978V50.249H209.75V48.1978C209.75 45.9313 213.422 44.0955 217.955 44.0955Z" fill="#7047BD" />
                  <path d="M250.771 52.2998C251.859 52.2998 252.902 52.732 253.672 53.5013C254.441 54.2707 254.873 55.3141 254.873 56.4021C254.873 57.4901 254.441 58.5335 253.672 59.3028C252.902 60.0722 251.859 60.5044 250.771 60.5044C249.683 60.5044 248.64 60.0722 247.87 59.3028C247.101 58.5335 246.669 57.4901 246.669 56.4021C246.669 55.3141 247.101 54.2707 247.87 53.5013C248.64 52.732 249.683 52.2998 250.771 52.2998ZM250.771 62.5555C255.304 62.5555 258.976 64.3913 258.976 66.6578V68.7089H242.566V66.6578C242.566 64.3913 246.238 62.5555 250.771 62.5555Z" fill="#7047BD" />
                  <path d="M202.57 135.37C203.658 135.37 204.701 135.802 205.471 136.572C206.24 137.341 206.672 138.384 206.672 139.472C206.672 140.56 206.24 141.604 205.471 142.373C204.701 143.142 203.658 143.575 202.57 143.575C201.482 143.575 200.438 143.142 199.669 142.373C198.9 141.604 198.468 140.56 198.468 139.472C198.468 138.384 198.9 137.341 199.669 136.572C200.438 135.802 201.482 135.37 202.57 135.37ZM202.57 145.626C207.103 145.626 210.774 147.462 210.774 149.728V151.779H194.365V149.728C194.365 147.462 198.037 145.626 202.57 145.626Z" fill="#7047BD" />
                  <path d="M242.568 171.266C243.656 171.266 244.699 171.698 245.469 172.467C246.238 173.236 246.67 174.28 246.67 175.368C246.67 176.456 246.238 177.499 245.469 178.269C244.699 179.038 243.656 179.47 242.568 179.47C241.48 179.47 240.436 179.038 239.667 178.269C238.898 177.499 238.466 176.456 238.466 175.368C238.466 174.28 238.898 173.236 239.667 172.467C240.436 171.698 241.48 171.266 242.568 171.266ZM242.568 181.521C247.101 181.521 250.772 183.357 250.772 185.624V187.675H234.363V185.624C234.363 183.357 238.035 181.521 242.568 181.521Z" fill="#7047BD" />
                  <path d="M287.695 94.3467C288.783 94.3467 289.826 94.7789 290.596 95.5482C291.365 96.3175 291.797 97.361 291.797 98.449C291.797 99.537 291.365 100.58 290.596 101.35C289.826 102.119 288.783 102.551 287.695 102.551C286.607 102.551 285.563 102.119 284.794 101.35C284.025 100.58 283.593 99.537 283.593 98.449C283.593 97.361 284.025 96.3175 284.794 95.5482C285.563 94.7789 286.607 94.3467 287.695 94.3467ZM287.695 104.602C292.228 104.602 295.899 106.438 295.899 108.705V110.756H279.49V108.705C279.49 106.438 283.162 104.602 287.695 104.602Z" fill="#7047BD" />
                  <path d="M283.589 52.2998C284.677 52.2998 285.721 52.732 286.49 53.5013C287.259 54.2707 287.692 55.3141 287.692 56.4021C287.692 57.4901 287.259 58.5335 286.49 59.3028C285.721 60.0722 284.677 60.5044 283.589 60.5044C282.501 60.5044 281.458 60.0722 280.689 59.3028C279.919 58.5335 279.487 57.4901 279.487 56.4021C279.487 55.3141 279.919 54.2707 280.689 53.5013C281.458 52.732 282.501 52.2998 283.589 52.2998ZM283.589 62.5555C288.122 62.5555 291.794 64.3913 291.794 66.6578V68.7089H275.385V66.6578C275.385 64.3913 279.056 62.5555 283.589 62.5555Z" fill="#7047BD" />
                  <path d="M283.589 146.653C284.677 146.653 285.721 147.086 286.49 147.855C287.259 148.624 287.692 149.668 287.692 150.756C287.692 151.844 287.259 152.887 286.49 153.656C285.721 154.426 284.677 154.858 283.589 154.858C282.501 154.858 281.458 154.426 280.689 153.656C279.919 152.887 279.487 151.844 279.487 150.756C279.487 149.668 279.919 148.624 280.689 147.855C281.458 147.086 282.501 146.653 283.589 146.653ZM283.589 156.909C288.122 156.909 291.794 158.745 291.794 161.011V163.062H275.385V161.011C275.385 158.745 279.056 156.909 283.589 156.909Z" fill="#7047BD" />
                  <defs>
                    <filter id="filter0_f_97_279" x="73.2422" y="53.8643" width="242.482" height="103.862" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_97_279" />
                    </filter>
                  </defs>
                </svg>

              </div>

              <div className="flex w-full max-w-[480px] flex-col items-center gap-4">
                <h3 className="font-montserrat text-2xl font-bold text-white">Atraia pessoas realmente interessadas no que você vende.</h3>
                <p className="font-montserrat text-sm font-medium text-[#BABABA]">
                  Trabalhamos para qualificar ao máximo cada lead antes de chegar até você. Menos volume, mais qualidade, melhores conversões.
                </p>
              </div>
            </div>

            <div className="flex min-h-[416px] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[20px] border border-[#7047BD] pt-5 pb-0 text-center">
              <div className="flex w-full max-w-[480px] flex-col items-center gap-4">
                <h3 className="font-montserrat text-2xl font-bold text-white">Profissionais que vivem e respiram tráfego pago.</h3>
                <p className="font-montserrat text-sm font-medium text-[#BABABA]">
                  Time certificado e constantemente atualizado nas principais plataformas. Experiência que faz diferença na hora de otimizar cada campanha.
                </p>
              </div>

              <div className="relative h-[290px] w-full max-w-[464px]">
                <svg width="465" height="290" viewBox="0 0 465 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full overflow-visible">
                  <path id="orbit-1" d="M-8 254 A240 220 0 0 1 473 254" stroke="#7047BD" strokeOpacity="0.95" strokeWidth="1.5" />
                  <path id="orbit-2" d="M24 254 A208 186 0 0 1 441 254" stroke="#7047BD" strokeOpacity="0.9" strokeWidth="1.5" />
                  <path id="orbit-3" d="M58 254 A174 152 0 0 1 407 254" stroke="#7047BD" strokeOpacity="0.85" strokeWidth="1.5" />

                  <path id="orbit-1-r" d="M473 254 A240 220 0 0 0 -8 254" fill="none" stroke="transparent" />
                  <path id="orbit-2-r" d="M441 254 A208 186 0 0 0 24 254" fill="none" stroke="transparent" />
                  <path id="orbit-3-r" d="M407 254 A174 152 0 0 0 58 254" fill="none" stroke="transparent" />

                  <g>
                    <circle cx="0" cy="0" r="24" fill="rgba(49,2,118,0.62)" />
                    <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(108,99,255,0.4)" />
                    <image href="/google-ads.svg" x="-16" y="-16" width="32" height="32" />
                    <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#orbit-1" />
                    </animateMotion>
                  </g>
                  <g>
                    <circle cx="0" cy="0" r="24" fill="rgba(49,2,118,0.62)" />
                    <circle cx="0" cy="0" r="24" fill="none" stroke="rgba(108,99,255,0.4)" />
                    <image href="/meta-ads.svg" x="-16" y="-16" width="32" height="32" />
                    <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#orbit-1-r" />
                    </animateMotion>
                  </g>

                  <g>
                    <circle cx="0" cy="0" r="22" fill="rgba(49,2,118,0.62)" />
                    <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(108,99,255,0.4)" />
                    <image href="/Linkedin.svg" x="-15" y="-15" width="30" height="30" />
                    <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#orbit-2" />
                    </animateMotion>
                  </g>
                  <g>
                    <circle cx="0" cy="0" r="22" fill="rgba(49,2,118,0.62)" />
                    <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(108,99,255,0.4)" />
                    <image href="/icon-instagram.svg" x="-15" y="-15" width="30" height="30" />
                    <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#orbit-2-r" />
                    </animateMotion>
                  </g>

                  <g>
                    <circle cx="0" cy="0" r="20" fill="rgba(49,2,118,0.62)" />
                    <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(108,99,255,0.4)" />
                    <image href="/figma.svg" x="-13" y="-13" width="26" height="26" />
                    <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#orbit-3" />
                    </animateMotion>
                  </g>
                  <g>
                    <circle cx="0" cy="0" r="20" fill="rgba(49,2,118,0.62)" />
                    <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(108,99,255,0.4)" />
                    <image href="/wordpress.svg" x="-13" y="-13" width="26" height="26" />
                    <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#orbit-3-r" />
                    </animateMotion>
                  </g>
                </svg>
              </div>
            </div>

            <div className="flex min-h-[416px] w-full flex-col items-center justify-center gap-10 rounded-[20px] border border-[#7047BD] pt-5 pb-0 text-center">
              <div className="flex w-full max-w-[480px] flex-col items-center gap-4">
                <h3 className="font-montserrat text-2xl font-bold text-white">Acompanhe os resultados e entenda cada decisão tomada.</h3>
                <p className="font-montserrat text-sm font-medium text-[#BABABA]">
                  Relatórios claros que mostram o que funcionou, o que não funcionou e por quê. Você sempre sabe onde seu investimento está indo.
                </p>
              </div>
              <svg width="464" height="214" viewBox="0 0 464 214" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_101_328)">
                  <rect width="464" height="214" rx="24" fill="#7047BD" fill-opacity="0.2" />
                  <rect x="20" y="20" width="200" height="117" rx="4" fill="#310276" fill-opacity="0.2" />
                  <rect x="20.5" y="20.5" width="199" height="116" rx="3.5" stroke="#6C63FF" stroke-opacity="0.2" />
                  <rect x="40" y="40" width="20" height="20" rx="10" fill="#7047BD" fill-opacity="0.2" />
                  <path d="M45.5 49.5C45.5 48.1179 46.6179 47 48 47L47.5 48.25" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M54.5 50.5C54.5 51.8822 53.3822 53 52 53L52.5 51.75" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M53.1666 49H51.3334C50.4691 49 50.0369 49 49.7685 48.7437C49.5 48.4874 49.5 48.075 49.5 47.25C49.5 46.425 49.5 46.0126 49.7685 45.7563C50.0369 45.5 50.4691 45.5 51.3334 45.5H53.1666C54.0309 45.5 54.463 45.5 54.7315 45.7563C55 46.0126 55 46.425 55 47.25C55 48.075 55 48.4874 54.7315 48.7437C54.463 49 54.0309 49 53.1666 49Z" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M48.6667 54.5H46.8333C45.9691 54.5 45.537 54.5 45.2685 54.2437C45 53.9875 45 53.5749 45 52.75C45 51.9251 45 51.5125 45.2685 51.2563C45.537 51 45.9691 51 46.8333 51H48.6667C49.5309 51 49.9631 51 50.2315 51.2563C50.5 51.5125 50.5 51.9251 50.5 52.75C50.5 53.5749 50.5 53.9875 50.2315 54.2437C49.9631 54.5 49.5309 54.5 48.6667 54.5Z" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M47.875 52.75H47.75M48 52.75C48 52.8881 47.8881 53 47.75 53C47.6119 53 47.5 52.8881 47.5 52.75C47.5 52.6119 47.6119 52.5 47.75 52.5C47.8881 52.5 48 52.6119 48 52.75Z" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M52.375 47.25H52.25M52.5 47.25C52.5 47.3881 52.3881 47.5 52.25 47.5C52.1119 47.5 52 47.3881 52 47.25C52 47.1119 52.1119 47 52.25 47C52.3881 47 52.5 47.1119 52.5 47.25Z" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M47.7776 87L54.5216 70.2H57.0416L50.1536 87H47.7776ZM47.5376 87L40.6496 70.2H43.1696L49.8896 87H47.5376ZM63.1888 87.288C62.0208 87.288 60.9888 87.024 60.0928 86.496C59.1968 85.952 58.4928 85.208 57.9808 84.264C57.4688 83.32 57.2128 82.232 57.2128 81C57.2128 79.768 57.4688 78.68 57.9808 77.736C58.4928 76.792 59.1968 76.056 60.0928 75.528C61.0048 74.984 62.0448 74.712 63.2128 74.712C64.3168 74.712 65.2848 74.992 66.1168 75.552C66.9488 76.096 67.5968 76.88 68.0608 77.904C68.5408 78.912 68.7808 80.104 68.7808 81.48H59.0848L59.5168 81.12C59.5168 81.968 59.6848 82.704 60.0208 83.328C60.3568 83.952 60.8128 84.432 61.3888 84.768C61.9648 85.088 62.6208 85.248 63.3568 85.248C64.1568 85.248 64.8208 85.064 65.3488 84.696C65.8928 84.312 66.3168 83.832 66.6208 83.256L68.5888 84.168C68.2688 84.792 67.8528 85.344 67.3408 85.824C66.8288 86.288 66.2208 86.648 65.5168 86.904C64.8288 87.16 64.0528 87.288 63.1888 87.288ZM59.6608 80.04L59.2048 79.68H66.7888L66.3568 80.04C66.3568 79.336 66.2128 78.736 65.9248 78.24C65.6368 77.728 65.2528 77.344 64.7728 77.088C64.2928 76.816 63.7568 76.68 63.1648 76.68C62.5888 76.68 62.0288 76.816 61.4848 77.088C60.9568 77.344 60.5168 77.72 60.1648 78.216C59.8288 78.712 59.6608 79.32 59.6608 80.04ZM71.0332 87V75H73.1692L73.3132 77.208V87H71.0332ZM79.3372 87V80.856H81.6172V87H79.3372ZM79.3372 80.856C79.3372 79.768 79.2092 78.944 78.9532 78.384C78.7132 77.808 78.3692 77.408 77.9212 77.184C77.4892 76.96 76.9852 76.84 76.4092 76.824C75.4332 76.824 74.6732 77.168 74.1292 77.856C73.5852 78.544 73.3132 79.512 73.3132 80.76H72.3292C72.3292 79.496 72.5132 78.416 72.8812 77.52C73.2652 76.608 73.8012 75.912 74.4892 75.432C75.1932 74.952 76.0252 74.712 76.9852 74.712C77.9292 74.712 78.7452 74.904 79.4332 75.288C80.1372 75.672 80.6732 76.272 81.0412 77.088C81.4252 77.888 81.6172 78.944 81.6172 80.256V80.856H79.3372ZM93.2703 87L93.1743 84.768V70.2H95.4303V87H93.2703ZM89.2383 87.288C88.1503 87.288 87.1983 87.024 86.3823 86.496C85.5823 85.968 84.9503 85.232 84.4863 84.288C84.0383 83.344 83.8143 82.248 83.8143 81C83.8143 79.736 84.0383 78.64 84.4863 77.712C84.9503 76.768 85.5823 76.032 86.3823 75.504C87.1983 74.976 88.1503 74.712 89.2383 74.712C90.2463 74.712 91.1183 74.976 91.8543 75.504C92.6063 76.032 93.1823 76.768 93.5823 77.712C93.9823 78.64 94.1823 79.736 94.1823 81C94.1823 82.248 93.9823 83.344 93.5823 84.288C93.1823 85.232 92.6063 85.968 91.8543 86.496C91.1183 87.024 90.2463 87.288 89.2383 87.288ZM89.7663 85.224C90.4383 85.224 91.0303 85.048 91.5423 84.696C92.0543 84.328 92.4543 83.832 92.7423 83.208C93.0303 82.568 93.1743 81.832 93.1743 81C93.1743 80.168 93.0303 79.44 92.7423 78.816C92.4543 78.176 92.0543 77.68 91.5423 77.328C91.0303 76.96 90.4303 76.776 89.7423 76.776C89.0383 76.776 88.4143 76.96 87.8703 77.328C87.3263 77.68 86.9023 78.176 86.5983 78.816C86.2943 79.44 86.1423 80.168 86.1423 81C86.1423 81.832 86.2943 82.568 86.5983 83.208C86.9183 83.832 87.3503 84.328 87.8943 84.696C88.4383 85.048 89.0623 85.224 89.7663 85.224ZM105.964 87L105.868 84.912V80.736C105.868 79.856 105.764 79.12 105.556 78.528C105.364 77.936 105.06 77.488 104.644 77.184C104.244 76.88 103.708 76.728 103.036 76.728C102.412 76.728 101.868 76.856 101.404 77.112C100.956 77.368 100.58 77.768 100.276 78.312L98.2597 77.544C98.5477 77 98.9077 76.52 99.3397 76.104C99.7717 75.672 100.292 75.336 100.9 75.096C101.508 74.84 102.22 74.712 103.036 74.712C104.172 74.712 105.116 74.936 105.868 75.384C106.62 75.832 107.18 76.48 107.548 77.328C107.932 78.176 108.116 79.224 108.1 80.472L108.076 87H105.964ZM102.436 87.288C101.012 87.288 99.8997 86.968 99.0997 86.328C98.3157 85.672 97.9237 84.768 97.9237 83.616C97.9237 82.384 98.3317 81.448 99.1477 80.808C99.9797 80.152 101.132 79.824 102.604 79.824H105.94V81.624H103.228C102.124 81.624 101.348 81.8 100.9 82.152C100.452 82.488 100.228 82.96 100.228 83.568C100.228 84.128 100.436 84.568 100.852 84.888C101.284 85.192 101.876 85.344 102.628 85.344C103.284 85.344 103.852 85.208 104.332 84.936C104.812 84.648 105.188 84.248 105.46 83.736C105.732 83.224 105.868 82.64 105.868 81.984H106.66C106.66 83.616 106.308 84.912 105.604 85.872C104.916 86.816 103.86 87.288 102.436 87.288ZM115.267 87.288C114.419 87.288 113.659 87.16 112.987 86.904C112.331 86.648 111.771 86.304 111.307 85.872C110.859 85.44 110.523 84.952 110.299 84.408L112.267 83.544C112.523 84.04 112.907 84.448 113.419 84.768C113.931 85.088 114.499 85.248 115.123 85.248C115.811 85.248 116.379 85.12 116.827 84.864C117.275 84.608 117.499 84.248 117.499 83.784C117.499 83.336 117.331 82.984 116.995 82.728C116.659 82.472 116.171 82.264 115.531 82.104L114.403 81.816C113.283 81.512 112.411 81.056 111.787 80.448C111.179 79.84 110.875 79.152 110.875 78.384C110.875 77.216 111.251 76.312 112.003 75.672C112.755 75.032 113.867 74.712 115.339 74.712C116.059 74.712 116.715 74.816 117.307 75.024C117.915 75.232 118.427 75.528 118.843 75.912C119.275 76.296 119.579 76.752 119.755 77.28L117.835 78.144C117.643 77.664 117.315 77.312 116.851 77.088C116.387 76.848 115.843 76.728 115.219 76.728C114.579 76.728 114.075 76.872 113.707 77.16C113.339 77.432 113.155 77.816 113.155 78.312C113.155 78.584 113.307 78.848 113.611 79.104C113.931 79.344 114.395 79.544 115.003 79.704L116.299 80.016C117.083 80.208 117.731 80.504 118.243 80.904C118.755 81.288 119.139 81.728 119.395 82.224C119.651 82.704 119.779 83.208 119.779 83.736C119.779 84.456 119.579 85.088 119.179 85.632C118.795 86.16 118.259 86.568 117.571 86.856C116.899 87.144 116.131 87.288 115.267 87.288Z" fill="white" fill-opacity="0.5" />
                  <path d="M41.0054 113V111.736C41.0054 111.405 41.08 111.064 41.2294 110.712C41.3894 110.349 41.6134 109.992 41.9014 109.64C42.2 109.288 42.552 108.963 42.9574 108.664L45.1174 107.064C45.3734 106.883 45.6027 106.675 45.8054 106.44C46.0187 106.195 46.184 105.944 46.3014 105.688C46.4294 105.421 46.4934 105.16 46.4934 104.904C46.4934 104.563 46.408 104.253 46.2374 103.976C46.0667 103.688 45.8267 103.464 45.5174 103.304C45.208 103.133 44.84 103.048 44.4134 103.048C44.008 103.048 43.6507 103.128 43.3414 103.288C43.0427 103.437 42.792 103.64 42.5894 103.896C42.3867 104.152 42.2427 104.424 42.1574 104.712L40.5414 104.408C40.6587 103.917 40.888 103.459 41.2294 103.032C41.5707 102.605 42.008 102.264 42.5414 102.008C43.0747 101.741 43.6774 101.608 44.3494 101.608C45.1174 101.608 45.7787 101.752 46.3334 102.04C46.8987 102.317 47.336 102.707 47.6454 103.208C47.9547 103.699 48.1094 104.264 48.1094 104.904C48.1094 105.523 47.9387 106.093 47.5974 106.616C47.2667 107.139 46.7867 107.645 46.1574 108.136L44.1574 109.64C43.7627 109.939 43.448 110.248 43.2134 110.568C42.9894 110.888 42.8507 111.229 42.7974 111.592H48.2534V113H41.0054ZM53.4926 113.192C52.9166 113.192 52.394 113.107 51.9246 112.936C51.4553 112.765 51.0606 112.531 50.7406 112.232C50.4206 111.933 50.1753 111.608 50.0046 111.256L51.3646 110.632C51.4713 110.781 51.6046 110.952 51.7646 111.144C51.9246 111.325 52.138 111.48 52.4046 111.608C52.6713 111.736 53.002 111.8 53.3966 111.8C54.0686 111.8 54.602 111.608 54.9966 111.224C55.402 110.84 55.6046 110.355 55.6046 109.768C55.6046 109.331 55.4873 108.963 55.2526 108.664C55.018 108.355 54.6713 108.12 54.2126 107.96C53.7646 107.8 53.2153 107.72 52.5646 107.72H52.1646V106.536H52.5326C53.194 106.536 53.802 106.611 54.3566 106.76C54.922 106.909 55.418 107.133 55.8446 107.432C56.2713 107.72 56.602 108.072 56.8366 108.488C57.0713 108.904 57.1886 109.379 57.1886 109.912C57.1886 110.573 57.018 111.155 56.6766 111.656C56.346 112.147 55.898 112.525 55.3326 112.792C54.778 113.059 54.1646 113.192 53.4926 113.192ZM52.1646 107.528V106.392H52.5646C53.4393 106.392 54.122 106.243 54.6126 105.944C55.1033 105.645 55.3486 105.224 55.3486 104.68C55.3486 104.371 55.2633 104.093 55.0926 103.848C54.9326 103.592 54.7033 103.389 54.4046 103.24C54.1166 103.08 53.77 103 53.3646 103C53.1086 103 52.858 103.043 52.6126 103.128C52.378 103.203 52.1593 103.32 51.9566 103.48C51.754 103.629 51.578 103.827 51.4286 104.072L50.1166 103.48C50.298 103.085 50.554 102.749 50.8846 102.472C51.2153 102.195 51.5993 101.981 52.0366 101.832C52.474 101.683 52.938 101.608 53.4286 101.608C54.1006 101.608 54.698 101.736 55.2206 101.992C55.7433 102.248 56.154 102.6 56.4526 103.048C56.762 103.496 56.9166 104.003 56.9166 104.568C56.9166 105.048 56.7993 105.475 56.5646 105.848C56.3406 106.211 56.026 106.52 55.6206 106.776C55.2153 107.021 54.746 107.208 54.2126 107.336C53.69 107.464 53.1246 107.528 52.5166 107.528H52.1646Z" fill="white" />
                  <path d="M180.413 71.464V67.768H181.269V71.464H180.413ZM178.989 70.048V69.192H182.685V70.048H178.989ZM183.771 72V71.192C183.771 71.0373 183.819 70.8667 183.915 70.68C184.011 70.4933 184.145 70.3067 184.315 70.12C184.486 69.9333 184.686 69.76 184.915 69.6L185.763 68.992C185.881 68.912 185.99 68.8213 186.091 68.72C186.198 68.6187 186.283 68.5093 186.347 68.392C186.417 68.2693 186.451 68.152 186.451 68.04C186.451 67.9013 186.417 67.776 186.347 67.664C186.283 67.552 186.187 67.464 186.059 67.4C185.931 67.336 185.774 67.304 185.587 67.304C185.427 67.304 185.283 67.336 185.155 67.4C185.033 67.464 184.931 67.5493 184.851 67.656C184.771 67.7627 184.715 67.8773 184.683 68L183.555 67.808C183.609 67.5413 183.723 67.2933 183.899 67.064C184.075 66.8347 184.305 66.6507 184.587 66.512C184.875 66.368 185.201 66.296 185.563 66.296C185.979 66.296 186.337 66.3707 186.635 66.52C186.934 66.6693 187.163 66.8747 187.323 67.136C187.489 67.392 187.571 67.6907 187.571 68.032C187.571 68.3787 187.475 68.688 187.283 68.96C187.097 69.2267 186.838 69.4773 186.507 69.712L185.747 70.264C185.593 70.3707 185.459 70.488 185.347 70.616C185.235 70.744 185.15 70.8853 185.091 71.04H187.643V72H183.771ZM190.588 72.096C190.135 72.096 189.735 71.9733 189.388 71.728C189.041 71.4773 188.769 71.136 188.572 70.704C188.375 70.2667 188.276 69.7653 188.276 69.2C188.276 68.6347 188.375 68.136 188.572 67.704C188.769 67.2667 189.039 66.9253 189.38 66.68C189.727 66.4293 190.127 66.304 190.58 66.304C191.033 66.304 191.433 66.4293 191.78 66.68C192.132 66.9253 192.407 67.2667 192.604 67.704C192.801 68.136 192.9 68.6347 192.9 69.2C192.9 69.7653 192.801 70.2667 192.604 70.704C192.407 71.136 192.135 71.4773 191.788 71.728C191.441 71.9733 191.041 72.096 190.588 72.096ZM190.588 71.104C190.828 71.104 191.041 71.024 191.228 70.864C191.42 70.6987 191.569 70.4747 191.676 70.192C191.783 69.904 191.836 69.5733 191.836 69.2C191.836 68.8267 191.783 68.496 191.676 68.208C191.569 67.92 191.42 67.696 191.228 67.536C191.041 67.3707 190.825 67.288 190.58 67.288C190.34 67.288 190.127 67.3707 189.94 67.536C189.753 67.696 189.607 67.92 189.5 68.208C189.399 68.496 189.348 68.8267 189.348 69.2C189.348 69.5733 189.399 69.904 189.5 70.192C189.607 70.4747 189.753 70.6987 189.94 70.864C190.132 71.024 190.348 71.104 190.588 71.104ZM193.904 72L197.88 66.4H198.936L194.936 72H193.904ZM198.056 72.12C197.805 72.12 197.581 72.0613 197.384 71.944C197.186 71.8267 197.032 71.664 196.92 71.456C196.813 71.2427 196.76 71.0027 196.76 70.736C196.76 70.464 196.813 70.224 196.92 70.016C197.032 69.808 197.186 69.6453 197.384 69.528C197.581 69.4107 197.805 69.352 198.056 69.352C198.312 69.352 198.536 69.4133 198.728 69.536C198.925 69.6533 199.08 69.816 199.192 70.024C199.304 70.2267 199.36 70.464 199.36 70.736C199.36 71.0027 199.304 71.2427 199.192 71.456C199.08 71.664 198.925 71.8267 198.728 71.944C198.536 72.0613 198.312 72.12 198.056 72.12ZM198.056 71.416C198.221 71.416 198.354 71.352 198.456 71.224C198.557 71.0907 198.608 70.928 198.608 70.736C198.608 70.544 198.557 70.384 198.456 70.256C198.354 70.1227 198.221 70.056 198.056 70.056C197.896 70.056 197.762 70.1227 197.656 70.256C197.554 70.384 197.504 70.544 197.504 70.736C197.504 70.928 197.554 71.0907 197.656 71.224C197.762 71.352 197.896 71.416 198.056 71.416ZM194.816 69.04C194.56 69.04 194.333 68.9813 194.136 68.864C193.944 68.7467 193.792 68.584 193.68 68.376C193.568 68.1627 193.512 67.9227 193.512 67.656C193.512 67.384 193.565 67.144 193.672 66.936C193.784 66.728 193.938 66.5653 194.136 66.448C194.333 66.3307 194.56 66.272 194.816 66.272C195.072 66.272 195.296 66.3333 195.488 66.456C195.685 66.5733 195.837 66.736 195.944 66.944C196.056 67.1467 196.112 67.384 196.112 67.656C196.112 67.9227 196.056 68.1627 195.944 68.376C195.837 68.584 195.685 68.7467 195.488 68.864C195.29 68.9813 195.066 69.04 194.816 69.04ZM194.808 68.336C194.973 68.336 195.106 68.272 195.208 68.144C195.314 68.0107 195.368 67.848 195.368 67.656C195.368 67.464 195.314 67.304 195.208 67.176C195.106 67.048 194.973 66.984 194.808 66.984C194.648 66.984 194.517 67.048 194.416 67.176C194.314 67.304 194.264 67.464 194.264 67.656C194.264 67.848 194.314 68.0107 194.416 68.144C194.517 68.272 194.648 68.336 194.808 68.336Z" fill="#25D366" />
                  <rect x="244" y="20" width="200" height="117" rx="4" fill="#310276" fill-opacity="0.2" />
                  <rect x="244.5" y="20.5" width="199" height="116" rx="3.5" stroke="#6C63FF" stroke-opacity="0.2" />
                  <rect x="264" y="40" width="20" height="20" rx="10" fill="#7047BD" fill-opacity="0.2" />
                  <path d="M269.801 46.0992C269.801 45.8605 269.896 45.6316 270.064 45.4628C270.233 45.294 270.462 45.1992 270.701 45.1992H274.901C275.139 45.1992 275.368 45.294 275.537 45.4628C275.706 45.6316 275.801 45.8605 275.801 46.0992V47.175L277.762 49.1358C278.043 49.417 278.201 49.7984 278.201 50.196V54.4992C278.201 54.5788 278.169 54.6551 278.113 54.7114C278.057 54.7676 277.98 54.7992 277.901 54.7992C277.821 54.7992 277.745 54.7676 277.689 54.7114C277.632 54.6551 277.601 54.5788 277.601 54.4992V50.196C277.601 49.9574 277.506 49.7286 277.337 49.56L275.801 48.024V49.875L276.313 50.3868C276.369 50.4432 276.401 50.5195 276.401 50.5991C276.401 50.6787 276.369 50.7551 276.313 50.8113C276.285 50.8392 276.252 50.8613 276.215 50.8763C276.179 50.8914 276.14 50.8991 276.101 50.8991C276.021 50.899 275.945 50.8674 275.888 50.811L274.088 49.011C273.835 48.7578 273.694 48.7686 273.632 48.7842C273.529 48.8094 273.437 48.8922 273.308 49.0158C273.248 49.0734 273.223 49.1298 273.235 49.2138C273.251 49.3188 273.333 49.5066 273.613 49.7868L274.341 50.5146L274.513 50.6868C274.541 50.7147 274.563 50.7478 274.578 50.7842C274.593 50.8207 274.601 50.8598 274.601 50.8992C274.601 51.3636 274.604 51.831 274.733 52.1838C274.793 52.3518 274.878 52.4764 274.987 52.5576C275.095 52.638 275.253 52.6992 275.501 52.6992C275.58 52.6992 275.657 52.7308 275.713 52.7871C275.769 52.8433 275.801 52.9197 275.801 52.9992V53.8992C275.801 54.1379 275.706 54.3668 275.537 54.5356C275.368 54.7044 275.139 54.7992 274.901 54.7992H270.701C270.462 54.7992 270.233 54.7044 270.064 54.5356C269.896 54.3668 269.801 54.1379 269.801 53.8992V46.0992ZM272.801 48.4992C272.549 48.4992 272.301 48.5626 272.08 48.6837C271.859 48.8047 271.672 48.9795 271.536 49.1918C271.401 49.4042 271.321 49.6472 271.304 49.8986C271.287 50.15 271.334 50.4016 271.44 50.6302C271.546 50.8588 271.708 51.057 271.91 51.2065C272.113 51.356 272.35 51.4521 272.6 51.4858C272.85 51.5194 273.104 51.4897 273.339 51.3992C273.574 51.3088 273.783 51.1605 273.946 50.9682L273.916 50.9382L273.188 50.211C272.869 49.8912 272.684 49.5906 272.642 49.3014C272.621 49.17 272.633 49.0355 272.677 48.91C272.721 48.7844 272.796 48.6717 272.894 48.582L272.914 48.5622L272.971 48.5082C272.914 48.5025 272.857 48.4995 272.801 48.4992ZM274.001 53.8992V54.1992H274.601V53.8992C274.601 53.8197 274.632 53.7433 274.689 53.6871C274.745 53.6308 274.821 53.5992 274.901 53.5992H275.201V53.2752C274.995 53.244 274.799 53.1635 274.631 53.0406C274.448 53.0981 274.288 53.2123 274.175 53.3667C274.062 53.5212 274.001 53.7077 274.001 53.8992ZM270.401 46.9992H270.701C270.939 46.9992 271.168 46.9044 271.337 46.7356C271.506 46.5668 271.601 46.3379 271.601 46.0992V45.7992H271.001V46.0992C271.001 46.1788 270.969 46.2551 270.913 46.3114C270.857 46.3676 270.78 46.3992 270.701 46.3992H270.401V46.9992ZM274.001 46.0992C274.001 46.3379 274.096 46.5668 274.264 46.7356C274.433 46.9044 274.662 46.9992 274.901 46.9992H275.201V46.3992H274.901C274.821 46.3992 274.745 46.3676 274.689 46.3114C274.632 46.2551 274.601 46.1788 274.601 46.0992V45.7992H274.001V46.0992ZM271.601 53.8992C271.601 53.6605 271.506 53.4316 271.337 53.2628C271.168 53.094 270.939 52.9992 270.701 52.9992H270.401V53.5992H270.701C270.78 53.5992 270.857 53.6308 270.913 53.6871C270.969 53.7433 271.001 53.8197 271.001 53.8992V54.1992H271.601V53.8992Z" fill="#6C63FF" />
                  <path d="M273.358 87.288C271.758 87.288 270.334 86.92 269.086 86.184C267.838 85.432 266.862 84.408 266.158 83.112C265.454 81.8 265.102 80.296 265.102 78.6C265.102 76.904 265.454 75.408 266.158 74.112C266.862 72.8 267.83 71.776 269.062 71.04C270.294 70.288 271.71 69.912 273.31 69.912C274.35 69.912 275.342 70.104 276.286 70.488C277.23 70.856 278.07 71.376 278.806 72.048C279.558 72.704 280.134 73.472 280.534 74.352L278.422 75.312C278.118 74.656 277.702 74.088 277.174 73.608C276.646 73.128 276.046 72.752 275.374 72.48C274.718 72.208 274.03 72.072 273.31 72.072C272.19 72.072 271.19 72.352 270.31 72.912C269.43 73.472 268.742 74.24 268.246 75.216C267.75 76.192 267.502 77.32 267.502 78.6C267.502 79.88 267.75 81.016 268.246 82.008C268.758 83 269.454 83.776 270.334 84.336C271.23 84.88 272.246 85.152 273.382 85.152C274.118 85.152 274.814 85.008 275.47 84.72C276.126 84.416 276.71 84.008 277.222 83.496C277.75 82.968 278.174 82.368 278.494 81.696L280.606 82.632C280.206 83.544 279.638 84.352 278.902 85.056C278.166 85.76 277.318 86.312 276.358 86.712C275.414 87.096 274.414 87.288 273.358 87.288ZM283.527 87V70.2H289.191C290.311 70.2 291.295 70.432 292.143 70.896C293.007 71.344 293.679 71.976 294.159 72.792C294.655 73.592 294.903 74.528 294.903 75.6C294.903 76.64 294.679 77.568 294.231 78.384C293.783 79.2 293.159 79.84 292.359 80.304C291.575 80.768 290.671 81 289.647 81H285.879V87H283.527ZM285.879 78.816H289.623C290.471 78.816 291.167 78.52 291.711 77.928C292.255 77.32 292.527 76.544 292.527 75.6C292.527 74.624 292.207 73.84 291.567 73.248C290.943 72.656 290.143 72.36 289.167 72.36H285.879V78.816ZM309.205 87L302.557 70.2H304.957L311.725 87H309.205ZM295.669 87L302.437 70.2H304.837L298.189 87H295.669ZM298.861 82.512V80.4H308.533V82.512H298.861Z" fill="white" fill-opacity="0.5" />
                  <path d="M265.69 113V101.8H269.466C270.212 101.8 270.868 101.949 271.434 102.248C272.01 102.536 272.458 102.941 272.778 103.464C273.108 103.976 273.274 104.573 273.274 105.256C273.274 105.928 273.098 106.525 272.746 107.048C272.404 107.571 271.935 107.981 271.338 108.28C270.74 108.568 270.068 108.712 269.322 108.712H267.258V113H265.69ZM271.946 113L269.29 108.424L270.538 107.592L273.722 113H271.946ZM267.258 107.272H269.61C269.994 107.272 270.335 107.187 270.634 107.016C270.943 106.835 271.188 106.595 271.37 106.296C271.562 105.987 271.658 105.64 271.658 105.256C271.658 104.659 271.45 104.173 271.034 103.8C270.618 103.427 270.079 103.24 269.418 103.24H267.258V107.272ZM278.983 112.632C278.269 112.632 277.639 112.525 277.095 112.312C276.562 112.099 276.13 111.816 275.799 111.464C275.469 111.112 275.245 110.739 275.127 110.344L276.519 109.896C276.669 110.269 276.941 110.6 277.335 110.888C277.73 111.165 278.221 111.304 278.807 111.304C279.49 111.315 280.029 111.181 280.423 110.904C280.829 110.616 281.031 110.248 281.031 109.8C281.031 109.384 280.855 109.043 280.503 108.776C280.151 108.499 279.693 108.291 279.127 108.152L277.975 107.864C277.506 107.736 277.079 107.555 276.695 107.32C276.322 107.075 276.029 106.771 275.815 106.408C275.602 106.045 275.495 105.613 275.495 105.112C275.495 104.195 275.794 103.475 276.391 102.952C276.999 102.429 277.869 102.168 278.999 102.168C279.65 102.168 280.215 102.275 280.695 102.488C281.175 102.691 281.57 102.963 281.879 103.304C282.189 103.645 282.407 104.013 282.535 104.408L281.127 104.888C280.978 104.483 280.706 104.152 280.311 103.896C279.917 103.629 279.442 103.496 278.887 103.496C278.301 103.496 277.837 103.635 277.495 103.912C277.165 104.189 276.999 104.563 276.999 105.032C276.999 105.459 277.133 105.784 277.399 106.008C277.666 106.232 278.013 106.397 278.439 106.504L279.623 106.792C280.562 107.016 281.287 107.4 281.799 107.944C282.311 108.488 282.567 109.08 282.567 109.72C282.567 110.275 282.429 110.771 282.151 111.208C281.874 111.645 281.469 111.992 280.935 112.248C280.413 112.504 279.762 112.632 278.983 112.632ZM278.343 114.648V100.52H279.671V114.648H278.343ZM287.68 113.192C287.104 113.192 286.581 113.107 286.112 112.936C285.643 112.765 285.248 112.531 284.928 112.232C284.608 111.933 284.363 111.608 284.192 111.256L285.552 110.632C285.659 110.781 285.792 110.952 285.952 111.144C286.112 111.325 286.325 111.48 286.592 111.608C286.859 111.736 287.189 111.8 287.584 111.8C288.256 111.8 288.789 111.608 289.184 111.224C289.589 110.84 289.792 110.355 289.792 109.768C289.792 109.331 289.675 108.963 289.44 108.664C289.205 108.355 288.859 108.12 288.4 107.96C287.952 107.8 287.403 107.72 286.752 107.72H286.352V106.536H286.72C287.381 106.536 287.989 106.611 288.544 106.76C289.109 106.909 289.605 107.133 290.032 107.432C290.459 107.72 290.789 108.072 291.024 108.488C291.259 108.904 291.376 109.379 291.376 109.912C291.376 110.573 291.205 111.155 290.864 111.656C290.533 112.147 290.085 112.525 289.52 112.792C288.965 113.059 288.352 113.192 287.68 113.192ZM286.352 107.528V106.392H286.752C287.627 106.392 288.309 106.243 288.8 105.944C289.291 105.645 289.536 105.224 289.536 104.68C289.536 104.371 289.451 104.093 289.28 103.848C289.12 103.592 288.891 103.389 288.592 103.24C288.304 103.08 287.957 103 287.552 103C287.296 103 287.045 103.043 286.8 103.128C286.565 103.203 286.347 103.32 286.144 103.48C285.941 103.629 285.765 103.827 285.616 104.072L284.304 103.48C284.485 103.085 284.741 102.749 285.072 102.472C285.403 102.195 285.787 101.981 286.224 101.832C286.661 101.683 287.125 101.608 287.616 101.608C288.288 101.608 288.885 101.736 289.408 101.992C289.931 102.248 290.341 102.6 290.64 103.048C290.949 103.496 291.104 104.003 291.104 104.568C291.104 105.048 290.987 105.475 290.752 105.848C290.528 106.211 290.213 106.52 289.808 106.776C289.403 107.021 288.933 107.208 288.4 107.336C287.877 107.464 287.312 107.528 286.704 107.528H286.352ZM296.43 113.192C295.854 113.192 295.331 113.107 294.862 112.936C294.393 112.765 293.998 112.531 293.678 112.232C293.358 111.933 293.113 111.608 292.942 111.256L294.302 110.632C294.409 110.781 294.542 110.952 294.702 111.144C294.862 111.325 295.075 111.48 295.342 111.608C295.609 111.736 295.939 111.8 296.334 111.8C297.006 111.8 297.539 111.608 297.934 111.224C298.339 110.84 298.542 110.355 298.542 109.768C298.542 109.331 298.425 108.963 298.19 108.664C297.955 108.355 297.609 108.12 297.15 107.96C296.702 107.8 296.153 107.72 295.502 107.72H295.102V106.536H295.47C296.131 106.536 296.739 106.611 297.294 106.76C297.859 106.909 298.355 107.133 298.782 107.432C299.209 107.72 299.539 108.072 299.774 108.488C300.009 108.904 300.126 109.379 300.126 109.912C300.126 110.573 299.955 111.155 299.614 111.656C299.283 112.147 298.835 112.525 298.27 112.792C297.715 113.059 297.102 113.192 296.43 113.192ZM295.102 107.528V106.392H295.502C296.377 106.392 297.059 106.243 297.55 105.944C298.041 105.645 298.286 105.224 298.286 104.68C298.286 104.371 298.201 104.093 298.03 103.848C297.87 103.592 297.641 103.389 297.342 103.24C297.054 103.08 296.707 103 296.302 103C296.046 103 295.795 103.043 295.55 103.128C295.315 103.203 295.097 103.32 294.894 103.48C294.691 103.629 294.515 103.827 294.366 104.072L293.054 103.48C293.235 103.085 293.491 102.749 293.822 102.472C294.153 102.195 294.537 101.981 294.974 101.832C295.411 101.683 295.875 101.608 296.366 101.608C297.038 101.608 297.635 101.736 298.158 101.992C298.681 102.248 299.091 102.6 299.39 103.048C299.699 103.496 299.854 104.003 299.854 104.568C299.854 105.048 299.737 105.475 299.502 105.848C299.278 106.211 298.963 106.52 298.558 106.776C298.153 107.021 297.683 107.208 297.15 107.336C296.627 107.464 296.062 107.528 295.454 107.528H295.102ZM301.42 114.84L302.348 111.352H303.996L302.652 114.84H301.42ZM305.49 113V111.736C305.49 111.405 305.564 111.064 305.714 110.712C305.874 110.349 306.098 109.992 306.386 109.64C306.684 109.288 307.036 108.963 307.442 108.664L309.602 107.064C309.858 106.883 310.087 106.675 310.29 106.44C310.503 106.195 310.668 105.944 310.786 105.688C310.914 105.421 310.978 105.16 310.978 104.904C310.978 104.563 310.892 104.253 310.722 103.976C310.551 103.688 310.311 103.464 310.002 103.304C309.692 103.133 309.324 103.048 308.898 103.048C308.492 103.048 308.135 103.128 307.826 103.288C307.527 103.437 307.276 103.64 307.074 103.896C306.871 104.152 306.727 104.424 306.642 104.712L305.026 104.408C305.143 103.917 305.372 103.459 305.714 103.032C306.055 102.605 306.492 102.264 307.026 102.008C307.559 101.741 308.162 101.608 308.834 101.608C309.602 101.608 310.263 101.752 310.818 102.04C311.383 102.317 311.82 102.707 312.13 103.208C312.439 103.699 312.594 104.264 312.594 104.904C312.594 105.523 312.423 106.093 312.082 106.616C311.751 107.139 311.271 107.645 310.642 108.136L308.642 109.64C308.247 109.939 307.932 110.248 307.698 110.568C307.474 110.888 307.335 111.229 307.282 111.592H312.738V113H305.49ZM317.961 101.608C318.74 101.608 319.385 101.752 319.897 102.04C320.42 102.328 320.841 102.723 321.161 103.224C321.481 103.715 321.71 104.285 321.849 104.936C321.988 105.587 322.057 106.28 322.057 107.016C322.057 107.944 321.956 108.792 321.753 109.56C321.561 110.317 321.278 110.968 320.905 111.512C320.542 112.045 320.089 112.461 319.545 112.76C319.001 113.048 318.372 113.192 317.657 113.192C317.092 113.192 316.532 113.107 315.977 112.936C315.433 112.765 314.942 112.52 314.505 112.2L315.353 111.064C315.684 111.299 316.046 111.48 316.441 111.608C316.836 111.736 317.209 111.8 317.561 111.8C318.574 111.8 319.353 111.368 319.897 110.504C320.441 109.64 320.681 108.317 320.617 106.536L320.953 106.808C320.697 107.437 320.292 107.944 319.737 108.328C319.193 108.701 318.542 108.888 317.785 108.888C317.07 108.888 316.436 108.728 315.881 108.408C315.326 108.088 314.889 107.656 314.569 107.112C314.26 106.557 314.105 105.928 314.105 105.224C314.105 104.509 314.265 103.885 314.585 103.352C314.905 102.808 315.353 102.381 315.929 102.072C316.516 101.763 317.193 101.608 317.961 101.608ZM317.961 102.984C317.524 102.984 317.129 103.08 316.777 103.272C316.436 103.464 316.164 103.731 315.961 104.072C315.769 104.413 315.673 104.808 315.673 105.256C315.673 105.704 315.769 106.104 315.961 106.456C316.164 106.797 316.436 107.069 316.777 107.272C317.129 107.464 317.524 107.56 317.961 107.56C318.409 107.56 318.804 107.464 319.145 107.272C319.497 107.069 319.769 106.797 319.961 106.456C320.164 106.104 320.265 105.704 320.265 105.256C320.265 104.808 320.164 104.413 319.961 104.072C319.769 103.731 319.497 103.464 319.145 103.272C318.804 103.08 318.409 102.984 317.961 102.984Z" fill="white" />
                  <path d="M404.635 70.072V69.168H407.035V70.072H404.635ZM407.877 72V71.192C407.877 71.0373 407.925 70.8667 408.021 70.68C408.117 70.4933 408.25 70.3067 408.421 70.12C408.591 69.9333 408.791 69.76 409.021 69.6L409.869 68.992C409.986 68.912 410.095 68.8213 410.197 68.72C410.303 68.6187 410.389 68.5093 410.453 68.392C410.522 68.2693 410.557 68.152 410.557 68.04C410.557 67.9013 410.522 67.776 410.453 67.664C410.389 67.552 410.293 67.464 410.165 67.4C410.037 67.336 409.879 67.304 409.693 67.304C409.533 67.304 409.389 67.336 409.261 67.4C409.138 67.464 409.037 67.5493 408.957 67.656C408.877 67.7627 408.821 67.8773 408.789 68L407.661 67.808C407.714 67.5413 407.829 67.2933 408.005 67.064C408.181 66.8347 408.41 66.6507 408.693 66.512C408.981 66.368 409.306 66.296 409.669 66.296C410.085 66.296 410.442 66.3707 410.741 66.52C411.039 66.6693 411.269 66.8747 411.429 67.136C411.594 67.392 411.677 67.6907 411.677 68.032C411.677 68.3787 411.581 68.688 411.389 68.96C411.202 69.2267 410.943 69.4773 410.613 69.712L409.853 70.264C409.698 70.3707 409.565 70.488 409.453 70.616C409.341 70.744 409.255 70.8853 409.197 71.04H411.749V72H407.877ZM414.694 72.096C414.24 72.096 413.84 71.9733 413.494 71.728C413.147 71.4773 412.875 71.136 412.678 70.704C412.48 70.2667 412.382 69.7653 412.382 69.2C412.382 68.6347 412.48 68.136 412.678 67.704C412.875 67.2667 413.144 66.9253 413.486 66.68C413.832 66.4293 414.232 66.304 414.686 66.304C415.139 66.304 415.539 66.4293 415.886 66.68C416.238 66.9253 416.512 67.2667 416.71 67.704C416.907 68.136 417.006 68.6347 417.006 69.2C417.006 69.7653 416.907 70.2667 416.71 70.704C416.512 71.136 416.24 71.4773 415.894 71.728C415.547 71.9733 415.147 72.096 414.694 72.096ZM414.694 71.104C414.934 71.104 415.147 71.024 415.334 70.864C415.526 70.6987 415.675 70.4747 415.782 70.192C415.888 69.904 415.942 69.5733 415.942 69.2C415.942 68.8267 415.888 68.496 415.782 68.208C415.675 67.92 415.526 67.696 415.334 67.536C415.147 67.3707 414.931 67.288 414.686 67.288C414.446 67.288 414.232 67.3707 414.046 67.536C413.859 67.696 413.712 67.92 413.606 68.208C413.504 68.496 413.454 68.8267 413.454 69.2C413.454 69.5733 413.504 69.904 413.606 70.192C413.712 70.4747 413.859 70.6987 414.046 70.864C414.238 71.024 414.454 71.104 414.694 71.104ZM418.009 72L421.985 66.4H423.041L419.041 72H418.009ZM422.161 72.12C421.91 72.12 421.686 72.0613 421.489 71.944C421.292 71.8267 421.137 71.664 421.025 71.456C420.918 71.2427 420.865 71.0027 420.865 70.736C420.865 70.464 420.918 70.224 421.025 70.016C421.137 69.808 421.292 69.6453 421.489 69.528C421.686 69.4107 421.91 69.352 422.161 69.352C422.417 69.352 422.641 69.4133 422.833 69.536C423.03 69.6533 423.185 69.816 423.297 70.024C423.409 70.2267 423.465 70.464 423.465 70.736C423.465 71.0027 423.409 71.2427 423.297 71.456C423.185 71.664 423.03 71.8267 422.833 71.944C422.641 72.0613 422.417 72.12 422.161 72.12ZM422.161 71.416C422.326 71.416 422.46 71.352 422.561 71.224C422.662 71.0907 422.713 70.928 422.713 70.736C422.713 70.544 422.662 70.384 422.561 70.256C422.46 70.1227 422.326 70.056 422.161 70.056C422.001 70.056 421.868 70.1227 421.761 70.256C421.66 70.384 421.609 70.544 421.609 70.736C421.609 70.928 421.66 71.0907 421.761 71.224C421.868 71.352 422.001 71.416 422.161 71.416ZM418.921 69.04C418.665 69.04 418.438 68.9813 418.241 68.864C418.049 68.7467 417.897 68.584 417.785 68.376C417.673 68.1627 417.617 67.9227 417.617 67.656C417.617 67.384 417.67 67.144 417.777 66.936C417.889 66.728 418.044 66.5653 418.241 66.448C418.438 66.3307 418.665 66.272 418.921 66.272C419.177 66.272 419.401 66.3333 419.593 66.456C419.79 66.5733 419.942 66.736 420.049 66.944C420.161 67.1467 420.217 67.384 420.217 67.656C420.217 67.9227 420.161 68.1627 420.049 68.376C419.942 68.584 419.79 68.7467 419.593 68.864C419.396 68.9813 419.172 69.04 418.921 69.04ZM418.913 68.336C419.078 68.336 419.212 68.272 419.313 68.144C419.42 68.0107 419.473 67.848 419.473 67.656C419.473 67.464 419.42 67.304 419.313 67.176C419.212 67.048 419.078 66.984 418.913 66.984C418.753 66.984 418.622 67.048 418.521 67.176C418.42 67.304 418.369 67.464 418.369 67.656C418.369 67.848 418.42 68.0107 418.521 68.144C418.622 68.272 418.753 68.336 418.913 68.336Z" fill="#25D366" />
                  <rect x="20" y="145" width="200" height="117" rx="4" fill="#310276" fill-opacity="0.2" />
                  <rect x="20.5" y="145.5" width="199" height="116" rx="3.5" stroke="#6C63FF" stroke-opacity="0.2" />
                  <rect x="40" y="165" width="20" height="20" rx="10" fill="#7047BD" fill-opacity="0.2" />
                  <path d="M51 170.112C50.6769 170.046 50.3424 170.012 50 170.012C47.2386 170.012 45 172.248 45 175.006C45 177.765 47.2386 180.001 50 180.001C52.7614 180.001 55 177.765 55 175.006C55 174.664 54.9655 174.33 54.9 174.007" stroke="#6C63FF" stroke-linecap="round" />
                  <path d="M50 173.507C49.4477 173.507 49 173.843 49 174.256C49 174.67 49.4477 175.006 50 175.006C50.5523 175.006 51 175.341 51 175.755C51 176.169 50.5523 176.504 50 176.504M50 173.507C50.4354 173.507 50.8058 173.716 50.9431 174.007M50 173.507V173.008M50 176.504C49.5646 176.504 49.1942 176.296 49.0569 176.005M50 176.504V177.003" stroke="#6C63FF" stroke-linecap="round" />
                  <path d="M54.9961 170L52.9082 172.087M52.4961 170.261L52.5552 171.805C52.5552 172.169 52.7727 172.395 53.169 172.424L54.731 172.497" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M42.3977 212V195.2H48.0617C49.1817 195.2 50.1657 195.424 51.0137 195.872C51.8777 196.304 52.5497 196.912 53.0297 197.696C53.5257 198.464 53.7737 199.36 53.7737 200.384C53.7737 201.392 53.5097 202.288 52.9817 203.072C52.4697 203.856 51.7657 204.472 50.8697 204.92C49.9737 205.352 48.9657 205.568 47.8457 205.568H44.7497V212H42.3977ZM51.7817 212L47.7977 205.136L49.6697 203.888L54.4457 212H51.7817ZM44.7497 203.408H48.2777C48.8537 203.408 49.3657 203.28 49.8137 203.024C50.2777 202.752 50.6457 202.392 50.9177 201.944C51.2057 201.48 51.3497 200.96 51.3497 200.384C51.3497 199.488 51.0377 198.76 50.4137 198.2C49.7897 197.64 48.9817 197.36 47.9897 197.36H44.7497V203.408ZM64.8103 212.288C63.1783 212.288 61.7303 211.92 60.4663 211.184C59.2023 210.448 58.2103 209.424 57.4903 208.112C56.7863 206.8 56.4343 205.296 56.4343 203.6C56.4343 201.904 56.7863 200.408 57.4903 199.112C58.2103 197.8 59.1943 196.776 60.4423 196.04C61.6903 195.288 63.1303 194.912 64.7623 194.912C66.3943 194.912 67.8343 195.288 69.0823 196.04C70.3303 196.776 71.3063 197.8 72.0103 199.112C72.7143 200.408 73.0663 201.904 73.0663 203.6C73.0663 205.296 72.7143 206.8 72.0103 208.112C71.3063 209.424 70.3303 210.448 69.0823 211.184C67.8503 211.92 66.4263 212.288 64.8103 212.288ZM64.8103 210.128C65.9623 210.128 66.9783 209.848 67.8583 209.288C68.7383 208.728 69.4263 207.96 69.9223 206.984C70.4183 206.008 70.6663 204.88 70.6663 203.6C70.6663 202.336 70.4103 201.216 69.8983 200.24C69.4023 199.248 68.7063 198.472 67.8103 197.912C66.9303 197.352 65.9143 197.072 64.7623 197.072C63.6103 197.072 62.5863 197.352 61.6903 197.912C60.7943 198.472 60.0903 199.248 59.5783 200.24C59.0823 201.216 58.8343 202.336 58.8343 203.6C58.8343 204.88 59.0903 206.008 59.6023 206.984C60.1143 207.96 60.8183 208.728 61.7143 209.288C62.6263 209.848 63.6583 210.128 64.8103 210.128ZM76.2415 212V195.2H78.5935V212H76.2415Z" fill="white" fill-opacity="0.5" />
                  <path d="M88.4126 217.964V214.268H89.2686V217.964H88.4126ZM86.9886 216.548V215.692H90.6846V216.548H86.9886ZM91.7713 218.5V217.692C91.7713 217.537 91.8193 217.367 91.9153 217.18C92.0113 216.993 92.1446 216.807 92.3153 216.62C92.4859 216.433 92.6859 216.26 92.9153 216.1L93.7633 215.492C93.8806 215.412 93.9899 215.321 94.0913 215.22C94.1979 215.119 94.2833 215.009 94.3473 214.892C94.4166 214.769 94.4513 214.652 94.4513 214.54C94.4513 214.401 94.4166 214.276 94.3473 214.164C94.2833 214.052 94.1873 213.964 94.0593 213.9C93.9313 213.836 93.7739 213.804 93.5873 213.804C93.4273 213.804 93.2833 213.836 93.1553 213.9C93.0326 213.964 92.9313 214.049 92.8513 214.156C92.7713 214.263 92.7153 214.377 92.6833 214.5L91.5553 214.308C91.6086 214.041 91.7233 213.793 91.8993 213.564C92.0753 213.335 92.3046 213.151 92.5873 213.012C92.8753 212.868 93.2006 212.796 93.5633 212.796C93.9793 212.796 94.3366 212.871 94.6353 213.02C94.9339 213.169 95.1633 213.375 95.3233 213.636C95.4886 213.892 95.5713 214.191 95.5713 214.532C95.5713 214.879 95.4753 215.188 95.2833 215.46C95.0966 215.727 94.8379 215.977 94.5073 216.212L93.7473 216.764C93.5926 216.871 93.4593 216.988 93.3473 217.116C93.2353 217.244 93.1499 217.385 93.0913 217.54H95.6433V218.5H91.7713ZM98.5881 218.596C98.1348 218.596 97.7348 218.473 97.3881 218.228C97.0414 217.977 96.7694 217.636 96.5721 217.204C96.3748 216.767 96.2761 216.265 96.2761 215.7C96.2761 215.135 96.3748 214.636 96.5721 214.204C96.7694 213.767 97.0388 213.425 97.3801 213.18C97.7268 212.929 98.1268 212.804 98.5801 212.804C99.0334 212.804 99.4334 212.929 99.7801 213.18C100.132 213.425 100.407 213.767 100.604 214.204C100.801 214.636 100.9 215.135 100.9 215.7C100.9 216.265 100.801 216.767 100.604 217.204C100.407 217.636 100.135 217.977 99.7881 218.228C99.4414 218.473 99.0414 218.596 98.5881 218.596ZM98.5881 217.604C98.8281 217.604 99.0414 217.524 99.2281 217.364C99.4201 217.199 99.5694 216.975 99.6761 216.692C99.7828 216.404 99.8361 216.073 99.8361 215.7C99.8361 215.327 99.7828 214.996 99.6761 214.708C99.5694 214.42 99.4201 214.196 99.2281 214.036C99.0414 213.871 98.8254 213.788 98.5801 213.788C98.3401 213.788 98.1268 213.871 97.9401 214.036C97.7534 214.196 97.6068 214.42 97.5001 214.708C97.3988 214.996 97.3481 215.327 97.3481 215.7C97.3481 216.073 97.3988 216.404 97.5001 216.692C97.6068 216.975 97.7534 217.199 97.9401 217.364C98.1321 217.524 98.3481 217.604 98.5881 217.604ZM101.904 218.5L105.88 212.9H106.936L102.936 218.5H101.904ZM106.056 218.62C105.805 218.62 105.581 218.561 105.384 218.444C105.186 218.327 105.032 218.164 104.92 217.956C104.813 217.743 104.76 217.503 104.76 217.236C104.76 216.964 104.813 216.724 104.92 216.516C105.032 216.308 105.186 216.145 105.384 216.028C105.581 215.911 105.805 215.852 106.056 215.852C106.312 215.852 106.536 215.913 106.728 216.036C106.925 216.153 107.08 216.316 107.192 216.524C107.304 216.727 107.36 216.964 107.36 217.236C107.36 217.503 107.304 217.743 107.192 217.956C107.08 218.164 106.925 218.327 106.728 218.444C106.536 218.561 106.312 218.62 106.056 218.62ZM106.056 217.916C106.221 217.916 106.354 217.852 106.456 217.724C106.557 217.591 106.608 217.428 106.608 217.236C106.608 217.044 106.557 216.884 106.456 216.756C106.354 216.623 106.221 216.556 106.056 216.556C105.896 216.556 105.762 216.623 105.656 216.756C105.554 216.884 105.504 217.044 105.504 217.236C105.504 217.428 105.554 217.591 105.656 217.724C105.762 217.852 105.896 217.916 106.056 217.916ZM102.816 215.54C102.56 215.54 102.333 215.481 102.136 215.364C101.944 215.247 101.792 215.084 101.68 214.876C101.568 214.663 101.512 214.423 101.512 214.156C101.512 213.884 101.565 213.644 101.672 213.436C101.784 213.228 101.938 213.065 102.136 212.948C102.333 212.831 102.56 212.772 102.816 212.772C103.072 212.772 103.296 212.833 103.488 212.956C103.685 213.073 103.837 213.236 103.944 213.444C104.056 213.647 104.112 213.884 104.112 214.156C104.112 214.423 104.056 214.663 103.944 214.876C103.837 215.084 103.685 215.247 103.488 215.364C103.29 215.481 103.066 215.54 102.816 215.54ZM102.808 214.836C102.973 214.836 103.106 214.772 103.208 214.644C103.314 214.511 103.368 214.348 103.368 214.156C103.368 213.964 103.314 213.804 103.208 213.676C103.106 213.548 102.973 213.484 102.808 213.484C102.648 213.484 102.517 213.548 102.416 213.676C102.314 213.804 102.264 213.964 102.264 214.156C102.264 214.348 102.314 214.511 102.416 214.644C102.517 214.772 102.648 214.836 102.808 214.836Z" fill="#25D366" />
                  <rect x="244" y="145" width="200" height="112" rx="4" fill="#310276" fill-opacity="0.2" />
                  <rect x="244.5" y="145.5" width="199" height="111" rx="3.5" stroke="#6C63FF" stroke-opacity="0.2" />
                  <rect x="264" y="165" width="20" height="20" rx="10" fill="#7047BD" fill-opacity="0.2" />
                  <path d="M269 175C269 177.761 271.239 180 274 180C276.761 180 279 177.761 279 175C279 172.239 276.761 170 274 170C271.95 170 270.188 171.234 269.416 173M269 171.25L269.25 173.25L271.25 172.75" stroke="#6C63FF" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M275.363 174.031C275.314 173.649 274.877 173.033 274.091 173.033C273.178 173.033 272.794 173.54 272.716 173.793C272.594 174.132 272.619 174.829 273.689 174.904C275.027 174.999 275.562 175.158 275.494 175.978C275.426 176.798 274.68 176.975 274.091 176.956C273.502 176.937 272.537 176.666 272.5 175.937M273.997 172.25V173.035M273.997 176.952V177.75" stroke="#6C63FF" stroke-linecap="round" />
                  <path d="M266.188 208V194H268.148V208H266.188ZM271.256 208V198H273.036L273.156 199.84V208H271.256ZM278.176 208V202.88H280.076V208H278.176ZM278.176 202.88C278.176 201.973 278.069 201.287 277.856 200.82C277.656 200.34 277.369 200.007 276.996 199.82C276.636 199.633 276.216 199.533 275.736 199.52C274.922 199.52 274.289 199.807 273.836 200.38C273.382 200.953 273.156 201.76 273.156 202.8H272.336C272.336 201.747 272.489 200.847 272.796 200.1C273.116 199.34 273.562 198.76 274.136 198.36C274.722 197.96 275.416 197.76 276.216 197.76C277.002 197.76 277.682 197.92 278.256 198.24C278.842 198.56 279.289 199.06 279.596 199.74C279.916 200.407 280.076 201.287 280.076 202.38V202.88H278.176ZM285.431 208L289.431 198H291.411L287.231 208H285.431ZM285.311 208L281.151 198H283.091L287.091 208H285.311ZM297.062 208.24C296.089 208.24 295.229 208.02 294.482 207.58C293.736 207.127 293.149 206.507 292.722 205.72C292.296 204.933 292.082 204.027 292.082 203C292.082 201.973 292.296 201.067 292.722 200.28C293.149 199.493 293.736 198.88 294.482 198.44C295.242 197.987 296.109 197.76 297.082 197.76C298.002 197.76 298.809 197.993 299.502 198.46C300.196 198.913 300.736 199.567 301.122 200.42C301.522 201.26 301.722 202.253 301.722 203.4H293.642L294.002 203.1C294.002 203.807 294.142 204.42 294.422 204.94C294.702 205.46 295.082 205.86 295.562 206.14C296.042 206.407 296.589 206.54 297.202 206.54C297.869 206.54 298.422 206.387 298.862 206.08C299.316 205.76 299.669 205.36 299.922 204.88L301.562 205.64C301.296 206.16 300.949 206.62 300.522 207.02C300.096 207.407 299.589 207.707 299.002 207.92C298.429 208.133 297.782 208.24 297.062 208.24ZM294.122 202.2L293.742 201.9H300.062L299.702 202.2C299.702 201.613 299.582 201.113 299.342 200.7C299.102 200.273 298.782 199.953 298.382 199.74C297.982 199.513 297.536 199.4 297.042 199.4C296.562 199.4 296.096 199.513 295.642 199.74C295.202 199.953 294.836 200.267 294.542 200.68C294.262 201.093 294.122 201.6 294.122 202.2ZM307.179 208.24C306.473 208.24 305.839 208.133 305.279 207.92C304.733 207.707 304.266 207.42 303.879 207.06C303.506 206.7 303.226 206.293 303.039 205.84L304.679 205.12C304.893 205.533 305.213 205.873 305.639 206.14C306.066 206.407 306.539 206.54 307.059 206.54C307.633 206.54 308.106 206.433 308.479 206.22C308.853 206.007 309.039 205.707 309.039 205.32C309.039 204.947 308.899 204.653 308.619 204.44C308.339 204.227 307.933 204.053 307.399 203.92L306.459 203.68C305.526 203.427 304.799 203.047 304.279 202.54C303.773 202.033 303.519 201.46 303.519 200.82C303.519 199.847 303.833 199.093 304.459 198.56C305.086 198.027 306.013 197.76 307.239 197.76C307.839 197.76 308.386 197.847 308.879 198.02C309.386 198.193 309.813 198.44 310.159 198.76C310.519 199.08 310.773 199.46 310.919 199.9L309.319 200.62C309.159 200.22 308.886 199.927 308.499 199.74C308.113 199.54 307.659 199.44 307.139 199.44C306.606 199.44 306.186 199.56 305.879 199.8C305.573 200.027 305.419 200.347 305.419 200.76C305.419 200.987 305.546 201.207 305.799 201.42C306.066 201.62 306.453 201.787 306.959 201.92L308.039 202.18C308.693 202.34 309.233 202.587 309.659 202.92C310.086 203.24 310.406 203.607 310.619 204.02C310.833 204.42 310.939 204.84 310.939 205.28C310.939 205.88 310.773 206.407 310.439 206.86C310.119 207.3 309.673 207.64 309.099 207.88C308.539 208.12 307.899 208.24 307.179 208.24ZM316.776 208.24C315.776 208.24 315.002 207.987 314.456 207.48C313.909 206.96 313.636 206.22 313.636 205.26V194.88H315.536V204.98C315.536 205.473 315.656 205.853 315.896 206.12C316.149 206.373 316.509 206.5 316.976 206.5C317.109 206.5 317.256 206.473 317.416 206.42C317.576 206.367 317.769 206.26 317.996 206.1L318.716 207.58C318.369 207.807 318.036 207.973 317.716 208.08C317.409 208.187 317.096 208.24 316.776 208.24ZM311.936 199.64V198H318.376V199.64H311.936ZM320.711 208V198H322.611V208H320.711ZM321.671 195.88C321.365 195.88 321.098 195.767 320.871 195.54C320.645 195.3 320.531 195.027 320.531 194.72C320.531 194.4 320.645 194.133 320.871 193.92C321.098 193.693 321.365 193.58 321.671 193.58C321.991 193.58 322.258 193.693 322.471 193.92C322.698 194.133 322.811 194.4 322.811 194.72C322.811 195.027 322.698 195.3 322.471 195.54C322.258 195.767 321.991 195.88 321.671 195.88ZM325.396 208V198H327.176L327.256 199.38C327.576 198.847 327.976 198.447 328.456 198.18C328.936 197.9 329.49 197.76 330.116 197.76C330.916 197.76 331.596 197.947 332.156 198.32C332.716 198.68 333.123 199.233 333.376 199.98C333.67 199.26 334.083 198.713 334.616 198.34C335.15 197.953 335.783 197.76 336.516 197.76C337.65 197.76 338.536 198.133 339.176 198.88C339.816 199.613 340.13 200.747 340.116 202.28V208H338.236V202.88C338.236 201.973 338.136 201.287 337.936 200.82C337.75 200.34 337.496 200.007 337.176 199.82C336.856 199.633 336.483 199.533 336.056 199.52C335.31 199.52 334.73 199.807 334.316 200.38C333.916 200.953 333.716 201.76 333.716 202.8V208H331.816V202.88C331.816 201.973 331.723 201.287 331.536 200.82C331.35 200.34 331.09 200.007 330.756 199.82C330.436 199.633 330.063 199.533 329.636 199.52C328.89 199.52 328.31 199.807 327.896 200.38C327.496 200.953 327.296 201.76 327.296 202.8V208H325.396ZM346.965 208.24C345.991 208.24 345.131 208.02 344.385 207.58C343.638 207.127 343.051 206.507 342.625 205.72C342.198 204.933 341.985 204.027 341.985 203C341.985 201.973 342.198 201.067 342.625 200.28C343.051 199.493 343.638 198.88 344.385 198.44C345.145 197.987 346.011 197.76 346.985 197.76C347.905 197.76 348.711 197.993 349.405 198.46C350.098 198.913 350.638 199.567 351.025 200.42C351.425 201.26 351.625 202.253 351.625 203.4H343.545L343.905 203.1C343.905 203.807 344.045 204.42 344.325 204.94C344.605 205.46 344.985 205.86 345.465 206.14C345.945 206.407 346.491 206.54 347.105 206.54C347.771 206.54 348.325 206.387 348.765 206.08C349.218 205.76 349.571 205.36 349.825 204.88L351.465 205.64C351.198 206.16 350.851 206.62 350.425 207.02C349.998 207.407 349.491 207.707 348.905 207.92C348.331 208.133 347.685 208.24 346.965 208.24ZM344.025 202.2L343.645 201.9H349.965L349.605 202.2C349.605 201.613 349.485 201.113 349.245 200.7C349.005 200.273 348.685 199.953 348.285 199.74C347.885 199.513 347.438 199.4 346.945 199.4C346.465 199.4 345.998 199.513 345.545 199.74C345.105 199.953 344.738 200.267 344.445 200.68C344.165 201.093 344.025 201.6 344.025 202.2ZM353.502 208V198H355.282L355.402 199.84V208H353.502ZM360.422 208V202.88H362.322V208H360.422ZM360.422 202.88C360.422 201.973 360.315 201.287 360.102 200.82C359.902 200.34 359.615 200.007 359.242 199.82C358.882 199.633 358.462 199.533 357.982 199.52C357.168 199.52 356.535 199.807 356.082 200.38C355.628 200.953 355.402 201.76 355.402 202.8H354.582C354.582 201.747 354.735 200.847 355.042 200.1C355.362 199.34 355.808 198.76 356.382 198.36C356.968 197.96 357.662 197.76 358.462 197.76C359.248 197.76 359.928 197.92 360.502 198.24C361.088 198.56 361.535 199.06 361.842 199.74C362.162 200.407 362.322 201.287 362.322 202.38V202.88H360.422ZM368.573 208.24C367.573 208.24 366.799 207.987 366.253 207.48C365.706 206.96 365.433 206.22 365.433 205.26V194.88H367.333V204.98C367.333 205.473 367.453 205.853 367.693 206.12C367.946 206.373 368.306 206.5 368.773 206.5C368.906 206.5 369.053 206.473 369.213 206.42C369.373 206.367 369.566 206.26 369.793 206.1L370.513 207.58C370.166 207.807 369.833 207.973 369.513 208.08C369.206 208.187 368.893 208.24 368.573 208.24ZM363.733 199.64V198H370.173V199.64H363.733ZM376.83 208.24C375.83 208.24 374.95 208.02 374.19 207.58C373.43 207.127 372.83 206.507 372.39 205.72C371.964 204.933 371.75 204.027 371.75 203C371.75 201.973 371.964 201.067 372.39 200.28C372.817 199.493 373.41 198.88 374.17 198.44C374.93 197.987 375.804 197.76 376.79 197.76C377.777 197.76 378.65 197.987 379.41 198.44C380.17 198.88 380.764 199.493 381.19 200.28C381.617 201.067 381.83 201.973 381.83 203C381.83 204.027 381.617 204.933 381.19 205.72C380.764 206.507 380.17 207.127 379.41 207.58C378.664 208.02 377.804 208.24 376.83 208.24ZM376.83 206.5C377.43 206.5 377.964 206.353 378.43 206.06C378.897 205.753 379.257 205.34 379.51 204.82C379.777 204.3 379.91 203.693 379.91 203C379.91 202.307 379.777 201.7 379.51 201.18C379.257 200.66 378.89 200.253 378.41 199.96C377.93 199.653 377.39 199.5 376.79 199.5C376.177 199.5 375.637 199.653 375.17 199.96C374.704 200.253 374.337 200.66 374.07 201.18C373.804 201.7 373.67 202.307 373.67 203C373.67 203.693 373.804 204.3 374.07 204.82C374.337 205.34 374.71 205.753 375.19 206.06C375.67 206.353 376.217 206.5 376.83 206.5Z" fill="white" fill-opacity="0.5" />
                  <path d="M404.413 196.464V192.768H405.269V196.464H404.413ZM402.989 195.048V194.192H406.685V195.048H402.989ZM407.771 197V196.192C407.771 196.037 407.819 195.867 407.915 195.68C408.011 195.493 408.145 195.307 408.315 195.12C408.486 194.933 408.686 194.76 408.915 194.6L409.763 193.992C409.881 193.912 409.99 193.821 410.091 193.72C410.198 193.619 410.283 193.509 410.347 193.392C410.417 193.269 410.451 193.152 410.451 193.04C410.451 192.901 410.417 192.776 410.347 192.664C410.283 192.552 410.187 192.464 410.059 192.4C409.931 192.336 409.774 192.304 409.587 192.304C409.427 192.304 409.283 192.336 409.155 192.4C409.033 192.464 408.931 192.549 408.851 192.656C408.771 192.763 408.715 192.877 408.683 193L407.555 192.808C407.609 192.541 407.723 192.293 407.899 192.064C408.075 191.835 408.305 191.651 408.587 191.512C408.875 191.368 409.201 191.296 409.563 191.296C409.979 191.296 410.337 191.371 410.635 191.52C410.934 191.669 411.163 191.875 411.323 192.136C411.489 192.392 411.571 192.691 411.571 193.032C411.571 193.379 411.475 193.688 411.283 193.96C411.097 194.227 410.838 194.477 410.507 194.712L409.747 195.264C409.593 195.371 409.459 195.488 409.347 195.616C409.235 195.744 409.15 195.885 409.091 196.04H411.643V197H407.771ZM414.588 197.096C414.135 197.096 413.735 196.973 413.388 196.728C413.041 196.477 412.769 196.136 412.572 195.704C412.375 195.267 412.276 194.765 412.276 194.2C412.276 193.635 412.375 193.136 412.572 192.704C412.769 192.267 413.039 191.925 413.38 191.68C413.727 191.429 414.127 191.304 414.58 191.304C415.033 191.304 415.433 191.429 415.78 191.68C416.132 191.925 416.407 192.267 416.604 192.704C416.801 193.136 416.9 193.635 416.9 194.2C416.9 194.765 416.801 195.267 416.604 195.704C416.407 196.136 416.135 196.477 415.788 196.728C415.441 196.973 415.041 197.096 414.588 197.096ZM414.588 196.104C414.828 196.104 415.041 196.024 415.228 195.864C415.42 195.699 415.569 195.475 415.676 195.192C415.783 194.904 415.836 194.573 415.836 194.2C415.836 193.827 415.783 193.496 415.676 193.208C415.569 192.92 415.42 192.696 415.228 192.536C415.041 192.371 414.825 192.288 414.58 192.288C414.34 192.288 414.127 192.371 413.94 192.536C413.753 192.696 413.607 192.92 413.5 193.208C413.399 193.496 413.348 193.827 413.348 194.2C413.348 194.573 413.399 194.904 413.5 195.192C413.607 195.475 413.753 195.699 413.94 195.864C414.132 196.024 414.348 196.104 414.588 196.104ZM417.904 197L421.88 191.4H422.936L418.936 197H417.904ZM422.056 197.12C421.805 197.12 421.581 197.061 421.384 196.944C421.186 196.827 421.032 196.664 420.92 196.456C420.813 196.243 420.76 196.003 420.76 195.736C420.76 195.464 420.813 195.224 420.92 195.016C421.032 194.808 421.186 194.645 421.384 194.528C421.581 194.411 421.805 194.352 422.056 194.352C422.312 194.352 422.536 194.413 422.728 194.536C422.925 194.653 423.08 194.816 423.192 195.024C423.304 195.227 423.36 195.464 423.36 195.736C423.36 196.003 423.304 196.243 423.192 196.456C423.08 196.664 422.925 196.827 422.728 196.944C422.536 197.061 422.312 197.12 422.056 197.12ZM422.056 196.416C422.221 196.416 422.354 196.352 422.456 196.224C422.557 196.091 422.608 195.928 422.608 195.736C422.608 195.544 422.557 195.384 422.456 195.256C422.354 195.123 422.221 195.056 422.056 195.056C421.896 195.056 421.762 195.123 421.656 195.256C421.554 195.384 421.504 195.544 421.504 195.736C421.504 195.928 421.554 196.091 421.656 196.224C421.762 196.352 421.896 196.416 422.056 196.416ZM418.816 194.04C418.56 194.04 418.333 193.981 418.136 193.864C417.944 193.747 417.792 193.584 417.68 193.376C417.568 193.163 417.512 192.923 417.512 192.656C417.512 192.384 417.565 192.144 417.672 191.936C417.784 191.728 417.938 191.565 418.136 191.448C418.333 191.331 418.56 191.272 418.816 191.272C419.072 191.272 419.296 191.333 419.488 191.456C419.685 191.573 419.837 191.736 419.944 191.944C420.056 192.147 420.112 192.384 420.112 192.656C420.112 192.923 420.056 193.163 419.944 193.376C419.837 193.584 419.685 193.747 419.488 193.864C419.29 193.981 419.066 194.04 418.816 194.04ZM418.808 193.336C418.973 193.336 419.106 193.272 419.208 193.144C419.314 193.011 419.368 192.848 419.368 192.656C419.368 192.464 419.314 192.304 419.208 192.176C419.106 192.048 418.973 191.984 418.808 191.984C418.648 191.984 418.517 192.048 418.416 192.176C418.314 192.304 418.264 192.464 418.264 192.656C418.264 192.848 418.314 193.011 418.416 193.144C418.517 193.272 418.648 193.336 418.808 193.336Z" fill="#25D366" />
                </g>
                <defs>
                  <clipPath id="clip0_101_328">
                    <rect width="464" height="214" rx="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <FormModal buttonText="Quero crescer minha empresa"/>
        </div>
      </section>

      <Setores/>

      <section className="flex flex-col lg:w-full items-center justify-center py-20 mx-auto" id="setores">
        <h2 className="md:text-4xl text-3xl text-white font-bold mb-6 text-center md:w-full max-w-[780px] w-[320px]">
          Serviços que farão sua empresa se <span className="text-[#FF8500]">destacar</span> no digital
        </h2>
        <p className="text-[#BABABA] text-lg mb-10 text-center max-w-[600px] md:w-full w-[320px]">
          Conheça como a Conste vai te ajudar a se posicionar no digital e se diferenciar dos concorrentes.
        </p>
        <div className="flex overflow-x-auto gap-4 justify-start mb-10 w-full px-2 md:justify-center md:flex-wrap md:overflow-visible">
          {setores.map((setor) => (
            <button
              key={setor.key}
              onClick={() => setActiveSetor(setor)}
              className={`flex-shrink-0 p-5 rounded-xl border-2 transition duration-200 font-bold text-white md:w-[204px] w-[180px] text-sm
                ${activeSetor.key === setor.key
                  ? "border-none bg-gradient-to-l from-[#310276] to-[#6C63FF]"
                  : "border-[#310276] hover:bg-gradient-to-l from-[#310276] to-[#6C63FF] hover:border-none"}`}
              style={{ minWidth: 150 }}
            >
              {setor.label}
            </button>
          ))}
        </div>
        <motion.div
          key={activeSetor.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-10 border border-[#310276] rounded-xl p-8 w-[320px] md:w-full md:max-w-[1080px] md:h-[400px] h-[600px] bg-[#0e0e0e]"
        >
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <Image
              src={activeSetor.image}
              alt={activeSetor.title}
              width={540}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="text-left">
            <h3 className="text-white font-bold md:text-2xl text-xl mb-4">{activeSetor.title}</h3>
            <ul className="text-[#BABABA] md:text-lg textg-base space-y-2">
              {activeSetor.description.map((desc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Image
                    src="/infinite-icon.svg"
                    width={24}
                    height={24}
                    alt="Conste Infinite Icone"
                  />
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center">
          <FormModal buttonText="Quero Elevar meus resultados" />
        </div>
      </section>

      <div className="flex flex-col py-20 items-center justify-center">
        <h2 className="text-4xl text-white text-center font-bold">Empresas que confiam no nosso trabalho</h2>
        <ClientLogos />
      </div>

      <SuccessCases />

      <TestimonialsCarousel />

      <section id="nossos-processos" className="flex flex-col items-center justify-center w-full py-10 md:py-20 px-3 md:px-6 gap-10 md:gap-20 relative overflow-hidden">
        {/* Partículas flutuantes de fundo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
        >
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
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, -12, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 right-1/3 w-1 h-1 bg-[#310276] rounded-full opacity-60"
          />
        </motion.div>

        <section id="quem-somos" className="flex flex-col items-center justify-center p-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white font-bold text-4xl"
          >
            Quem Somos
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 50,
              damping: 15
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative overflow-hidden rounded-lg"
          >
            {/* Partículas flutuantes */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute inset-0 pointer-events-none z-10"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 left-4 w-2 h-2 bg-[#FF8500] rounded-full opacity-60"
              />
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -8, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-6 right-6 w-1 h-1 bg-[#310276] rounded-full opacity-80"
              />
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  x: [0, 12, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-[#FF8500] rounded-full opacity-70"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative mb-8"
            >
              <Image
                src="/Equipe.png"
                alt="Imagem da Equipe"
                width={674}
                height={370}
                className="rounded-lg"
              />
              {/* Overlay sutil para dar mais profundidade */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 rounded-lg"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="space-y-3 flex flex-col items-center justify-center text-base"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="text-[#9A9A9A] md:w-[600px] w-[280px] text-center"
            >
              A Conste atua em soluções digitais, dedicada a impulsionar a captação de clientes para empresas por meio de estratégias de marketing digital.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              className="text-[#9A9A9A] md:w-[480px] w-[280px] text-center"
            >
              Somos especialistas em gestão de performance e vendas por meio de estratégias inteligentes, inovadoras e criativas.
            </motion.p>
          </motion.div>
        </section>

        <section className="w-full py-16 md:py-24 px-4">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center gap-10 md:gap-16">
            <h2 className="text-white font-bold text-3xl md:text-4xl text-center">
              Números da nossa agência
            </h2>

            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
              <div className="rounded-[30px] gap-y-2 border border-[#FF8500] w-[80%] md:w-[260px] h-[260px] bg-[linear-gradient(180deg,#FF8500_0%,#0A0A0A_56%)] flex flex-col items-center justify-center text-center px-6">
                <Image src="/icon1.svg" width={40} height={40} alt="Anos de experiencia" />
                <h3 className="text-white font-bold text-2xl md:text-4xl leading-none">+6 Anos</h3>
                <p className="text-[#CCCCCC] text-lg md:text-xl mt-3">de Experiência</p>
              </div>

              <div className="rounded-[30px] gap-y-2 border border-[#FF8500] w-[80%] md:w-[260px] h-[260px] bg-[linear-gradient(180deg,#FF8500_0%,#0A0A0A_56%)] flex flex-col items-center justify-center text-center px-6">
                <Image src="/icon2.svg" width={40} height={40} alt="Clientes atendidos" />
                <h3 className="text-white font-bold text-2xl md:text-4xl leading-none">+150</h3>
                <p className="text-[#CCCCCC] text-lg md:text-xl mt-3">Clientes Atendidos</p>
              </div>

              <div className="rounded-[30px] gap-y-2 border border-[#FF8500] w-[80%] md:w-[260px] h-[260px] bg-[linear-gradient(180deg,#FF8500_0%,#0A0A0A_56%)] flex flex-col items-center justify-center text-center px-6">
                <Image src="/icon3.svg" width={40} height={40} alt="Vendas geradas" />
                <h3 className="text-white font-bold text-2xl md:text-4xl leading-none">+R$13M</h3>
                <p className="text-[#CCCCCC] text-lg md:text-xl mt-3">em Vendas</p>
              </div>
            </div>

            <FormModal buttonText="Quero elevar meus resultados" />
          </div>
        </section>

        <div className="relative max-w-[1440px] w-full min-h-[400px] overflow-hidden px-4 py-14 md:px-10 md:py-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 mb-12 md:mb-16 text-center"
          >
            <h2 className="text-[#FF8500] font-montserrat text-2xl md:text-4xl font-medium uppercase tracking-[0.02em]">
              Seu crescimento dentro da nossa <span className="font-bold">metodologia</span>
            </h2>
          </motion.div>

          <div className="relative z-10 hidden md:block h-[520px]">
            <svg viewBox="0 0 1200 320" className="absolute left-0 top-[150px] z-0 w-full overflow-visible">
              <motion.path
                d="M70 136 C104 140, 146 120, 168 115 C240 90, 304 78, 360 94 C430 112, 505 126, 564 110 C625 94, 683 88, 732 102 C860 138, 980 114, 1092 79"
                fill="none"
                stroke="#310276"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.5 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </svg>

            {methodologySteps.map((step, index) => (
              <div key={`${step.title}-${step.subtitle}`}>
                <motion.div
                  className={`absolute w-px bg-white/40 origin-top ${step.lineClass}`}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, delay: 0.2 + index * 0.12, ease: "easeOut" }}
                />
                <div className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 ${step.dotClass}`}>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#FF7A00]/35"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.8, delay: index * 0.15 }}
                  />
                  <motion.div
                    className="relative h-5 w-5 rounded-full border-[3px] border-[#171717] bg-[#FF7A00]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.35, delay: 0.35 + index * 0.12, type: "spring", stiffness: 180 }}
                    whileHover={{ scale: 1.2, boxShadow: "0 0 24px rgba(255,122,0,0.55)" }}
                  />
                </div>
                <motion.div
                  className={`absolute max-w-[180px] -translate-x-1/2 text-center text-white ${step.desktopClass}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.45, delay: 0.45 + index * 0.12, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                >
                  <p className="text-[14px] font-semibold leading-tight">{step.title}</p>
                  {step.subtitle ? (
                    <p className="text-[14px] leading-tight text-white/90">{step.subtitle}</p>
                  ) : null}
                </motion.div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-5 md:hidden">
            {methodologySteps.map((step, index) => (
              <motion.div
                key={`${step.title}-${index}`}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -2, borderColor: "rgba(255,122,0,0.35)" }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`mt-1 h-4 w-4 rounded-full ${index === 0 ? "bg-white" : "bg-[#FF7A00]"}`}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6, delay: index * 0.1 }}
                  />
                  {index < methodologySteps.length - 1 ? <div className="mt-2 h-full w-px bg-white/20" /> : null}
                </div>
                <div>
                  <p className="text-white font-semibold leading-tight">{step.title}</p>
                  {step.subtitle ? <p className="text-white/75 leading-tight">{step.subtitle}</p> : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* CTA Sticky Container */}
      <div className="relative" ref={stickyCtaRef}>
        {/* Spacer para manter o layout - só quando não está perto do footer */}
        {!isNearFooter && <div className="lg:h-[104px] h-[70px] w-full"></div>}

        {/* CTA Sticky */}
        <motion.div
          id="sticky-cta"
          className={`${isNearFooter ? 'relative' : 'fixed bottom-10'} left-0 right-0 z-50`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: isStickyVisible ? "0%" : "100%",
            opacity: isStickyVisible ? 1 : 0
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          <div className="lg:h-[104px] h-[64px] lg:w-[800px] w-[90%] flex flex-row items-center justify-between mx-auto bg-[#2900677c] gap-x-2 lg:gap-x-3 p-3 lg:p-5 rounded-[4px] shadow-2xl backdrop-blur-sm border border-[#310276]/20">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isStickyVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-xs lg:text-xl text-left flex-shrink-0 leading-tight max-w-[160px] lg:max-w-none"
            >
              Faça sua empresa crescer com{" "}
              <motion.span
                className="font-bold"
                animate={isStickyVisible ? {
                  scale: [1, 1.05, 1],
                  color: ["#ffffff", "#FF8500", "#ffffff"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              >
                constância.
              </motion.span>
            </motion.h3>
            <FormModal buttonText="Quero crescer minha empresa" />
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}