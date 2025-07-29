"use client";
import Navbar from "@/components/navbar";
import ClientLogos from "@/components/clientslogo";
import SmoothScroll from "@/components/scroll";
import FormModal from "@/components/formbutton";
import Image from "next/image";
import GlassCard from "@/components/glasscard";
import Footer from "@/components/footer";
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-hero_bg bg-cover bg-center gap-y-3 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className="text-[#e7e7e7] bg-[#200843d0] p-2 rounded-[8px]"
        >
          Bem-vindo à Conste.
          <picture>
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
          </picture>
        </motion.p>

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


      <section id="quem-somos" className="flex flex-col items-center justify-center p-0">
        <h2 className="text-white font-bold text-4xl">Quem Somos</h2>
        <Image src="/Equipe.png" alt="Imagem da Equipe" width={674} height={370} />
        <div className="space-y-3 flex flex-col items-center justify-center text-base">
          <p className="text-[#9A9A9A] md:w-[600px] w-[280px] text-center">
            A Conste atua em soluções digitais, dedicada a impulsionar a captação de clientes para empresas por meio de estratégias de marketing digital.
          </p>
          <p className="text-[#9A9A9A] md:w-[480px] w-[280px] text-center">
            Somos especialistas em gestão de performance e vendas por meio de estratégias inteligentes, inovadoras e criativas.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center my-8 gap-y-20 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-11 gap-y-10">
          <div className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7 border border-[#310276]">
            <Image className="mb-3" src="/icon1.svg" width={40} height={40} alt="icone de experiência" />
            <h3 className="text-4xl font-bold">+5 Anos</h3>
            <p className="text-[#BABABA]">de Experiência</p>
          </div>
          <div className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7 border border-[#310276]">
            <Image className="mb-3" src="/icon2.svg" width={40} height={40} alt="icone de experiência" />
            <h3 className="text-4xl font-bold">+130</h3>
            <p className="text-[#BABABA]">Clientes Atendidos</p>
          </div>
          <div className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7 border border-[#310276]">
            <Image className="mb-3" src="/icon3.svg" width={40} height={40} alt="icone de experiência" />
            <h3 className="text-4xl font-bold">+8M</h3>
            <p className="text-[#BABABA]">em Vendas</p>
          </div>
        </div>
        <FormModal buttonText="Quero Elevar meus resultados" />
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
          <FormModal buttonText="Quero Elevar meus resultados" />
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
          <FormModal buttonText="Quero Elevar meus resultados" />
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
          <div className="flex flex-col justify-center items-center max-w-[1200px] p-4 gap-6 w-[370px] h-full border border-[#310276] rounded-[10px]">
            {/* Imagem */}
            <Image src="/JE-Polimetal.png" width={200} height={88} alt="JE Polimetal Logo" />

            {/* Case Stats Container */}
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-[400px]">

              {/* Stat Container 1 */}
              <div className="flex flex-col justify-center items-center p-4 w-[230px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+12.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">Visualizações</p>
              </div>

              {/* Stat Container 2 */}
              <div className="flex flex-col justify-center items-center p-4 w-[230px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+140 Leads</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">qualificados</p>
              </div>

              {/* Stat Container 3 */}
              <div className="flex flex-col justify-center items-center p-4 w-[230px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+R$ 750.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">Em oportunidade de vendas</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-4 gap-6 w-[370px] h-full border border-[#310276] rounded-[10px]">
            <Image src="/Agrotuba.png" width={200} height={88} alt="Agrotuba Logo" />

            {/* Case Stats Container */}
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-[400px]">

              {/* Stat Container 1 */}
              <div className="flex flex-col justify-center items-center p-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+20%</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">De faturamento</p>
              </div>

              {/* Stat Container 2 */}
              <div className="flex flex-col justify-center items-center p-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+200%</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">Crescimento nas midias</p>
              </div>

              {/* Stat Container 3 */}
              <div className="flex flex-col justify-center items-center p-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">Retorno 12x</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">Sobre o investimento</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-4 gap-6 w-[370px] h-full border border-[#310276] rounded-[10px]">
            <Image src="/LeluhKids.png" width={200} height={88} alt="Leluh Kids Logo" />

            {/* Case Stats Container */}
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-[400px]">

              {/* Stat Container 1 */}
              <div className="flex flex-col justify-center items-center p-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+R$50.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">De vendas em 3 meses</p>
              </div>

              {/* Stat Container 2 */}
              <div className="flex flex-col justify-center items-center p-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">1° nas buscas</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">No Google</p>
              </div>

              {/* Stat Container 3 */}
              <div className="flex flex-col justify-center items-center p-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-[4px]">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">Retorno 13x</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-base">Sobre o investimento</p>
              </div>
            </div>
          </div>
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
          <div className="flex flex-col items-start p-4 md:p-8 gap-5 md:w-[390px] w-full h-[200px] bg-[rgba(49,2,118,0.4)] rounded-[8px]">
            <div className="flex items-center gap-5 w-[320px] h-fit">
              <p className="text-white text-[16px] font-bold">
                Jefferson Frizarin
              </p>
            </div>
            <p className="w-[320px] h-fit text-[16px] text-left font-medium text-[#BABABA]">
              Ótimos profissionais ,dedicados no atendimento ao cliente , entregam um excelente trabalho!
            </p>
          </div>

          <div className="flex flex-col items-start p-4 md:p-8 gap-5 md:w-[390px] w-full h-[200px] bg-[rgba(49,2,118,0.4)] rounded-[8px]">
            <div className="flex items-center gap-5 w-[320px] h-fit">
              <p className="text-white text-[16px] font-bold">
                Lilia Aparecida Xavier de Lili
              </p>
            </div>
            <p className="w-[320px] h-fit text-[16px] text-left font-medium text-[#BABABA]">
              A equipe da conste superou nossas expectativas em marketing. As campanhas foram criativas e trouxeram ótimos resultados. Super indico 👏🏻👏🏻!!!
            </p>
          </div>

          <div className="flex flex-col items-start p-4 md:p-8 gap-5 md:w-[390px] w-full h-[200px] bg-[rgba(49,2,118,0.4)] rounded-[8px]">
            <div className="flex items-center gap-5 w-[320px] h-fit">
              <p className="text-white text-[16px] font-bold">
                Domus Residencial
              </p>
            </div>
            <p className="w-[320px] h-fit text-[16px] text-left font-medium text-[#BABABA]">
              Muito bom o trabalho. Muitos clientes que não chegavam até mim estão me consultando agora!
            </p>
          </div>
        </div>
      </section>

      <section id="nossos-processos" className="flex flex-col items-center justify-center w-full py-20 px-6 gap-20">
        <div className="relative max-w-[1440px] w-full h-auto">
          {/* Background Blur */}
          <div className="absolute rounded-full w-[80%] max-w-[1200px] h-[70%] max-h-[1010px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
         bg-gradient-to-b from-[rgba(49,2,118,0.5)] to-[rgba(255,133,0,0.5)] blur-[80px] -z-10">
          </div>

          {/* Título */}
          <div className="w-full flex flex-col items-center text-center gap-4 mb-40">
            <p className="text-[#FF8500] font-neue-montreal text-lg md:text-xl">Nossos processos</p>
            <h1 className="text-white font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl">Como nós alavancamos o seu negócio!</h1>
          </div>

          {/* Etapas */}
          <div className="flex flex-col gap-20 w-full max-w-[1200px] mx-auto mb-28">
            {/* Etapa 1 */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10">
              <div className="w-[120px] h-[120px] md:w-[164px] md:h-[164px] bg-[rgba(49,2,118,0.3)] flex justify-center items-center rounded-full">
                <span className="text-white font-montserrat font-medium text-5xl md:text-[120px]">1</span>
              </div>
              <div className="text-center md:text-left w-full md:w-[433px]">
                <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl lg:text-3xl">Alinhamento de expectativas</h3>
                <p className="text-[#BABABA] font-montserrat font-medium text-base md:text-lg mt-2">
                  Entendemos seu negócio, público e objetivos. É aqui que começa a mágica.
                </p>
              </div>
            </div>

            {/* Etapa 2 */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10">
              <div className="w-[120px] h-[120px] md:w-[164px] md:h-[164px] bg-[rgba(49,2,118,0.3)] flex justify-center items-center rounded-full">
                <span className="text-white font-montserrat font-medium text-5xl md:text-[120px]">2</span>
              </div>
              <div className="text-center md:text-left w-full md:w-[433px]">
                <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl lg:text-3xl">Pesquisa e planejamento</h3>
                <p className="text-[#BABABA] font-montserrat font-medium text-base md:text-lg mt-2">
                  Analisamos o mercado, seus concorrentes e as melhores estratégias para você.
                </p>
              </div>
            </div>

            {/* Etapa 3 */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10">
              <div className="w-[120px] h-[120px] md:w-[164px] md:h-[164px] bg-[rgba(49,2,118,0.3)] flex justify-center items-center rounded-full">
                <span className="text-white font-montserrat font-medium text-5xl md:text-[120px]">3</span>
              </div>
              <div className="text-center md:text-left w-full md:w-[433px]">
                <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl lg:text-3xl">Implementação e lançamento</h3>
                <p className="text-[#BABABA] font-montserrat font-medium text-base md:text-lg mt-2">
                  Colocamos tudo em prática e garantimos que cada detalhe esteja perfeito.
                </p>
              </div>
            </div>

            {/* Etapa 4 */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-10">
              <div className="w-[120px] h-[120px] md:w-[164px] md:h-[164px] bg-[rgba(49,2,118,0.3)] flex justify-center items-center rounded-full">
                <span className="text-white font-montserrat font-medium text-5xl md:text-[120px]">4</span>
              </div>
              <div className="text-center md:text-left w-full md:w-[433px]">
                <h3 className="text-white font-montserrat font-bold text-xl md:text-2xl lg:text-3xl">Análise e evolução contínua</h3>
                <p className="text-[#BABABA] font-montserrat font-medium text-base md:text-lg mt-2">
                  Monitoramos os resultados e ajustamos o que for necessário para crescer juntos.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="lg:h-[104px] lg:w-[1020px] flex lg:flex-row flex-col w-full h-full items-center justify-between mx-auto bg-[#2900677c] gap-y-2 p-5 rounded-[4px]">
        <h3 className="text-white text-xl text-center">Faça sua empresa crescer com <span className="font-bold">constância.</span></h3>
        <FormModal buttonText="Elevar minha empresa agora" />
      </div>
      <Footer />
    </>
  );
}