"use client";
import Navbar from "@/components/navbar";
import ClientLogos from "@/components/clientslogo";
import SmoothScroll from "@/components/scroll";
import Image from "next/image";
import GlassCard from "@/components/glasscard";
import Footer from "@/components/footer";
import WhatsApp from "@/components/wpp";
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

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


export default function Home() {

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-hero_bg bg-cover bg-center gap-y-3 px-4 text-center">
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
          className="text-[#e7e7e7] bg-[#200843d0] p-2 rounded-[8px]"
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
          {/* Framer */}
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
              <Image src="/framer.svg" width={36} height={36} alt="Framer" className="md:w-[56px] md:h-[56px] w-[36px] h-[36px]" />
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

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1.2, ease: 'easeInOut' }}
          href="https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#310276] hover:bg-[#40009E] duration-200 text-white px-5 py-4 my-12 rounded-[6px] transition"
        >
          Eleve seus resultados
        </motion.a>

        <motion.iframe
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: .5 }}
          className="w-[80px] h-[80px]"
          src="https://lottie.host/embed/29c0b424-f966-42a9-8d57-a09a9f3b4fdf/gfVQpr5NXz.lottie"
        ></motion.iframe>
      </section>

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
            className="relative"
          >
            <Image
              src="/Equipe.png"
              alt="Imagem da Equipe"
              width={674}
              height={370}
              className="rounded-lg shadow-2xl"
            />
            {/* Overlay sutil para dar mais profundidade */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"
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

      <section className="flex flex-col items-center justify-center my-8 gap-y-20 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-11 gap-y-10">
          <StatCard icon="/icon1.svg" number="+5 Anos" text="de Experiência" delay={0.1} />
          <StatCard icon="/icon2.svg" number="+130" text="Clientes Atendidos" delay={0.2} />
          <StatCard icon="/icon3.svg" number="+8M" text="em Vendas" delay={0.3} />
        </div>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          href="https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#310276] hover:bg-[#40009E] duration-200 text-white px-6 py-5 rounded-[6px] transition"
        >
          Quero elevar meus resultados
        </motion.a>
      </section>

      <section className="flex flex-col items-center justify-center gap-y-3" id="setores">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl text-white font-bold py-16">Nossos Setores</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-11">
          <GlassCard
            title="Performance"
            description="Tudo que envolve criação e gerenciamento de anúncios nas mídias sociais, performance do seu time de vendas, sites e etc."
            image="/Logo Conste.png"
          />
          <GlassCard
            title="Social Media"
            description="Criação de estratégias personalizadas para as suas redes sociais, com base na sua área de atuação."
            image="/Logo Conste.png"
          />
          <GlassCard
            title="Design"
            description="Criação dos designs dos posts, capas de vídeos, sites, landing pages e etc. "
            image="/Logo Conste.png"
          />
          <GlassCard
            title="Desenvolvimento"
            description="Realizamos Desenvolvimento de sites, páginas de captura, páginas de vendas, ecommerce. E claro, tudo otimizado para os celulares.."
            image="/Logo Conste.png"
          />
          <GlassCard
            title="Audiovisual"
            description="Captamos e editamos os vídeos para suas redes sociais. Capturamos tanto com câmera profissional, quanto com drone."
            image="/Logo Conste.png"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <a
            href="https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#310276] hover:bg-[#40009E] duration-200 text-white px-6 py-5 mt-6 rounded-[6px] transition"
          >
            Quero elevar meus resultados
          </a>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl text-white text-center font-bold py-16">Empresas que confiam no nosso trabalho</h2>
        <ClientLogos />
      </div>

      <section className="bg-white py-16 flex flex-col justify-center items-center gap-10">
        <div className="gap-y-3 flex flex-col items-center justify-center text-center">
          <p className="text-[#FF8500]">Desafios Comuns</p>
          <h2 className="font-bold text-black text-4xl md:w-[650px] w-fit text-center">
            Você passa ou já passou por algum desses <span className="text-[#FF8500]">desafios?</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 gap-y-10">
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] hover:bg-[#6b63ff18] duration-200 rounded-[4px]">
            <Image className="mb-3" src="/icon4.svg" width={40} height={40} alt="icone de parceria" />
            <p className="text-center text-lg">Atração de novos clientes somente através de indicações.</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] hover:bg-[#6b63ff18] duration-200 rounded-[4px]">
            <Image className="mb-3" src="/icon5.svg" width={40} height={40} alt="icone de clientes" />
            <p className="text-center text-lg">Dificuldade na hora de atrair novos clientes e fechar negócios.</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] hover:bg-[#6b63ff18] duration-200 rounded-[4px]">
            <Image className="mb-3" src="/icon6.svg" width={40} height={40} alt="icone globo digital" />
            <p className="text-center text-lg">Ausência de presença digital, gerando menos oportunidades.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 gap-y-10">
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] hover:bg-[#6b63ff18] duration-200 rounded-[4px]">
            <Image className="mb-3" src="/icon7.svg" width={40} height={40} alt="icone de megafone" />
            <p className="text-center text-lg">Falta de um plano de marketing e percas de oportunidades.</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] hover:bg-[#6b63ff18] duration-20033333333333333333333333333333333333333 rounded-[4px]">
            <Image className="mb-3" src="/icon8.svg" width={40} height={40} alt="icone de gráfico" />
            <p className="text-center text-lg">Concorrência com práticas de preços baixos, gerando menos valor para os clientes</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <a
            href="https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#310276] hover:bg-[#40009E] duration-200 text-white px-6 py-5 mt-6 rounded-[6px] transition"
          >
            Quero elevar meus resultados
          </a>
        </div>
      </section>

      <section className="py-12 px-10 flex flex-col gap-12" id="cases">
        <div className="gap-y-3 flex flex-col justify-center items-center text-center">
          <p className="text-[#FF8500]">Parcerias que evoluem:</p>
          <h2 className="font-bold text-white text-4xl md:w-[800px] w-fit">
            Confira os  <span className="text-[#FF8500]"> cases</span> que mostram nosso compromisso com o seu crescimento.
          </h2>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-center gap-x-10 gap-y-10">
          <CaseCard logo="/JE-Polimetal.png" stats={[{ value: "+12.000", label: "Visualizações" }, { value: "+140 Leads", label: "qualificados" }, { value: "+R$ 750.000", label: "Em oportunidade de vendas" }]} index={0} />
          <CaseCard logo="/Agrotuba.png" stats={[{ value: "+20%", label: "De faturamento" }, { value: "+200%", label: "Crescimento nas midias" }, { value: "Retorno 12x", label: "Sobre o investimento" }]} index={1} />
          <CaseCard logo="/LeluhKids.png" stats={[{ value: "+R$50.000", label: "De vendas em 3 meses" }, { value: "1° nas buscas", label: "No Google" }, { value: "Retorno 13x", label: "Sobre o investimento" }]} index={2} />
        </div>
      </section>

      <section className="py-8 flex flex-col items-center justify-center text-center gap-12 max-w-[1200px] mx-auto w-full" id="depoimentos">
        <div className="gap-y-3 flex flex-col">
          <p className="text-[#FF8500]">Depoimentos</p>
          <h2 className="font-bold text-white text-4xl w-full">
            O que falam sobre nós?
          </h2>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-center gap-4">
          <TestimonialCard name="Jefferson Frizarin" text="Ótimos profissionais ,dedicados no atendimento ao cliente , entregam um excelente trabalho!" index={0} />
          <TestimonialCard name="Lilia Aparecida Xavier de Lili" text="A equipe da conste superou nossas expectativas em marketing. As campanhas foram criativas e trouxeram ótimos resultados. Super indico 👏🏻👏🏻!!!" index={1} />
          <TestimonialCard name="Domus Residencial" text="Muito bom o trabalho. Muitos clientes que não chegavam até mim estão me consultando agora!" index={2} />
        </div>
      </section>

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

        <div className="relative max-w-[1440px] w-full h-auto min-h-[400px]">
          {/* Background Blur com animação */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute rounded-full w-[70%] md:w-[80%] max-w-[1200px] h-[40%] md:h-[70%] max-h-[800px] md:max-h-[1200px] left-1/2 top-1/3 md:top-1/4 -translate-x-1/2 -translate-y-1/2 
           bg-gradient-to-b from-[rgba(49,2,118,0.3)] to-[rgba(255,133,0,0.3)] md:from-[rgba(49,2,118,0.5)] md:to-[rgba(255,133,0,0.5)] blur-[30px] md:blur-[80px] -z-10"
          >
          </motion.div>

          {/* Título com animação melhorada */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex flex-col items-center text-center gap-4 mb-20 md:mb-40"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              className="text-[#FF8500] font-neue-montreal text-lg md:text-xl"
            >
              Nossos processos
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-white font-montserrat font-bold text-2xl md:text-4xl lg:text-5xl"
            >
              Como nós alavancamos o seu negócio!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-[#BABABA] font-montserrat font-medium text-base md:text-xl max-w-[800px] mt-4 px-4 md:px-0"
            >
              Aqui na Conste, cada projeto é uma história que queremos contar junto com você!
            </motion.p>
          </motion.div>

          {/* Etapas com animação progressiva */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-10 md:gap-20 w-full max-w-[1200px] mx-auto mb-20 md:mb-28 px-2 md:px-0"
          >
            <ProcessStep number="1" title="Alinhamento de expectativas" description="Entendemos seu negócio, público e objetivos. É aqui que começa a mágica." index={0} />
            <ProcessStep number="2" title="Pesquisa e planejamento" description="Analisamos o mercado, seus concorrentes e as melhores estratégias para você." index={1} />
            <ProcessStep number="3" title="Implementação e lançamento" description="Colocamos tudo em prática e garantimos que cada detalhe esteja perfeito." index={2} />
            <ProcessStep number="4" title="Análise e evolução contínua" description="Monitoramos os resultados e ajustamos o que for necessário para crescer juntos." index={3} />
          </motion.div>
        </div>
      </section>


      <Footer />
      <WhatsApp />
    </>
  );
}