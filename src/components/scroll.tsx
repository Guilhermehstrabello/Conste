import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScroll = () => {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      if (!scrollContainer.current) return;

      const height = scrollContainer.current.scrollHeight - window.innerHeight;

      gsap.to(scrollContainer.current, {
        y: () => -height,
        ease: "power2.inOut", // Deixa o movimento mais suave
        duration: 7, // Controla a velocidade geral do scroll
        scrollTrigger: {
          trigger: scrollContainer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 5, // Quanto maior, mais lento e suave
        },
      });
    });

    return () => ctx.revert(); // Limpa os efeitos ao desmontar
  }, []);

  return (
    <div ref={scrollContainer} className="relative w-full">
      {null} {/* Componente invisível */}
    </div>
  );
};

export default SmoothScroll;
