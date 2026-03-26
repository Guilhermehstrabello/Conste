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
import { Typewriter } from 'react-simple-typewriter';
import SuccessCases from "@/components/success-cases";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import FAQ from "@/components/faq";

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
      <section ref={heroRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-hero_bg bg-cover bg-center gap-y-3 px-4 text-center">
        {/* Background particles effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-20 w-2 h-2 bg-[#FF8500] rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-1 h-1 bg-[#310276] rounded-full animate-ping" />
          <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-[#FF8500] rounded-full animate-bounce" />
          <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#310276] rounded-full animate-pulse" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          className="text-[#e7e7e7] bg-[#791DFF] py-1 px-3 rounded-3xl"
        >
          Bem-vindo à Conste.
          <motion.picture
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <source
              srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f450/512.webp"
              type="image/webp"
            />
            <img
              src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f450/512.gif"
              alt="👐"
              width="30"
              height="30"
              style={{ display: "inline", marginLeft: "4px" }}
            />
          </motion.picture>
        </motion.p>

        {/* Ícones flutuantes animados */}
        <motion.div className="absolute inset-0 pointer-events-none z-10">
          {/* Google Ads */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute top-8 left-6 md:top-1/4 md:left-32"
          >
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/google-ads.svg" width={36} height={36} alt="Google Ads" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
            </motion.div>
          </motion.div>
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="absolute top-8 left-20 md:bottom-1/4 md:left-40"
          >
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/meta-ads.svg" width={36} height={36} alt="Meta" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
            </motion.div>
          </motion.div>
          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="absolute top-8 left-36 md:top-1/2 md:left-60"
          >
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/Linkedin.svg" width={36} height={36} alt="LinkedIn" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
            </motion.div>
          </motion.div>
          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="absolute top-8 right-32 md:top-1/2 md:right-60"
          >
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/icon-instagram.svg" width={36} height={36} alt="Instagram" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
            </motion.div>
          </motion.div>
          {/* Figma */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
            className="absolute top-8 right-20 md:top-1/3 md:right-40"
          >
            <motion.div
              animate={{ y: [0, -18, 0], x: [0, 18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/figma.svg" width={36} height={36} alt="Figma" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
            </motion.div>
          </motion.div>
          {/* WordPress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="absolute top-8 right-6 md:bottom-1/4 md:right-32"
          >
            <motion.div
              animate={{ y: [0, 22, 0], x: [0, -22, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image src="/wordpress.svg" width={36} height={36} alt="WordPress" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="z-10 text-white font-bold font-montserrat text-4xl md:text-6xl max-w-[960px] min-h-[130px]" // min-h evita pulos visuais durante digitação
        >
          <Typewriter
            words={['Transformamos estratégias em crescimento constante para o seu negócio.']}
            typeSpeed={40}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: .5 }}
          className="text-[#9A9A9A] max-w-[512px] text-sm md:text-lg min-h-[80px]"
        >
          <Typewriter
            words={['Estratégias de marketing e vendas inovadoras que unem dados, construção e escala.']}
            typeSpeed={40}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1.2, ease: 'easeOut' }}
        >
          <FormModal buttonText="Eleve seus resultados" />
        </motion.div>

        <motion.iframe
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="w-[80px] h-[80px]"
          src="https://lottie.host/embed/29c0b424-f966-42a9-8d57-a09a9f3b4fdf/gfVQpr5NXz.lottie"
        ></motion.iframe>
      </section>

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

            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
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