"use client";
import Navbar from "@/components/navbar";
import ClientLogos from "@/components/clientslogo";
import SmoothScroll from "@/components/scroll";
import FormModal from "@/components/formbutton";
import Image from "next/image";
import GlassCard from "@/components/glasscard";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <section className="relative gap-y-3 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-hero_bg bg-cover bg-center">
        <p className="text-[#e7e7e7] bg-[#300276d0] p-2 rounded-[6px]">Bem vindo à Conste 👋</p>
        <h1 className="z-10 w-[760px] text-center text-5xl font-bold font-montserrat text-white">
          Transformamos estratégias em crescimento constante para o seu negócio.
        </h1>
        <p className="text-[#9A9A9A] w-[500px] text-center">
          Criamos estratégias inovadoras que unem criatividade, dados e tecnologia para impulsionar marcas.
        </p>
        <FormModal buttonText="Eleve seus resultados" />
        <iframe src="https://lottie.host/embed/29c0b424-f966-42a9-8d57-a09a9f3b4fdf/gfVQpr5NXz.lottie"></iframe>
      </section>

      <section id="quem-somos" className="flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-4xl">Quem Somos</h2>
        <Image src="/Equipe.png" alt="Imagem da Equipe" width={674} height={370} />
        <div className="space-y-3 flex flex-col items-center justify-center text-base">
          <p className="text-[#9A9A9A] w-[580px] text-center">
            A Conste atua em soluções digitais, dedicada a impulsionar a captação de clientes para empresas por meio de estratégias de marketing digital.
          </p>
          <p className="text-[#9A9A9A] w-[480px] text-center">
            Somos especialistas em gestão de performance e vendas por meio de estratégias inteligentes, inovadoras e criativas.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center my-20 gap-y-20 py-16">
        <h2 className="md:w-[700px] text-center text-white font-bold text-4xl">Alguns números da implementação das nossas <span className="text-[#FF8500]"> estratégias </span></h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-11">
          <div className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7">
            <Image className="mb-3" src="/icon1.svg" width={40} height={40} alt="icone de experiência" />
            <h3 className="text-4xl font-bold">+5 Anos</h3>
            <p className="text-[#BABABA]">de Experiência</p>
          </div>
          <div className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7">
            <Image className="mb-3" src="/icon2.svg" width={40} height={40} alt="icone de experiência" />
            <h3 className="text-4xl font-bold">+110</h3>
            <p className="text-[#BABABA]">Clientes Atendidos</p>
          </div>
          <div className="bg-[linear-gradient(180deg,#310276_0%,#0E0E0E_45.19%)] p-6 rounded-[12px] flex flex-col items-center justify-center text-white text-center w-64 h-64 px-10 py-7">
            <Image className="mb-3" src="/icon3.svg" width={40} height={40} alt="icone de experiência" />
            <h3 className="text-4xl font-bold">+1.5M</h3>
            <p className="text-[#BABABA]">em Vendas</p>
          </div>
        </div>
        <FormModal buttonText="Quero Elevar meus resultados" />
      </section>

      <section className="flex flex-col items-center justify-center gap-y-3">
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
            image="/design.png"
          />
          <GlassCard
            title="Design"
            description="Criação dos designs dos posts, capas de vídeos, sites, landing pages e etc. "
            image="/marketing.png"
          />
          <GlassCard
            title="Desenvolvimento"
            description="Realizamos Desenvolvimento de sites, páginas de captura, páginas de vendas, ecommerce. E claro, tudo otimizado para os celulares.."
            image="/webdev.png"
          />
          <GlassCard
            title="Audiovisual"
            description="Captamos e editamos os vídeos para suas redes sociais. Capturamos tanto com câmera profissional, quanto com drone."
            image="/consultoria.png"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <FormModal buttonText="Quero Elevar meus resultados" />
        </div>
      </section>

      <ClientLogos />

      <section className="bg-white py-16 flex flex-col justify-center items-center gap-12">
        <div className="gap-y-3 flex flex-col items-center justify-center text-center">
          <p className="text-[#FF8500]">Desafios Comuns</p>
          <h2 className="font-bold text-black text-4xl md:w-[650px] w-fit text-center">
            Você passa ou já passou por algum desses <span className="text-[#FF8500]">desafios?</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-11">
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] rounded-[4px]">
            <Image className="mb-3" src="/icon4.svg" width={40} height={40} alt="icone de parceria" />
            <p className="text-center text-lg">Atração de novos clientes somente através de indicações.</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] rounded-[4px]">
            <Image className="mb-3" src="/icon5.svg" width={40} height={40} alt="icone de clientes" />
            <p className="text-center text-lg">Dificuldade na hora de atrair novos clientes e fechar negócios.</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] rounded-[4px]">
            <Image className="mb-3" src="/icon6.svg" width={40} height={40} alt="icone globo digital" />
            <p className="text-center text-lg">Ausência de presença digital, gerando menos oportunidades.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-11">
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] rounded-[4px]">
            <Image className="mb-3" src="/icon7.svg" width={40} height={40} alt="icone de megafone" />
            <p className="text-center text-lg">Falta de um plano de marketing e percas de oportunidades.</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 gap-3 w-[330px] h-[200px] border border-[#6C63FF] rounded-[4px]">
            <Image className="mb-3" src="/icon8.svg" width={40} height={40} alt="icone de gráfico" />
            <p className="text-center text-lg">Concorrência com práticas de preços baixos, gerando menos valor para os clientes</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FormModal buttonText="Quero Elevar meus resultados" />
        </div>
      </section>

      <section className="py-12 px-10 flex flex-col gap-12">
        <div className="gap-y-3 flex flex-col">
          <p className="text-[#FF8500]">Parcerias que evoluem:</p>
          <h2 className="font-bold text-white text-4xl md:w-[800px] w-fit">
            Confira os  <span className="text-[#FF8500]"> cases</span> que mostram nosso compromisso com o seu crescimento.
          </h2>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-between gap-x-10">
          <div className="flex flex-col justify-center items-center p-6 gap-6 w-[340px] h-full border border-[#310276] rounded-[10px]">
            {/* Imagem */}
            <div
              className="w-[260px] h-[54px] bg-[url('/image.png')] bg-cover bg-center"
            ></div>

            {/* Case Stats Container */}
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-full">

              {/* Stat Container 1 */}
              <div className="flex flex-col justify-center items-center px- w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+12.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">Visualizações</p>
              </div>

              {/* Stat Container 2 */}
              <div className="flex flex-col justify-center items-center px-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+140 Leads</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">qualificados</p>
              </div>

              {/* Stat Container 3 */}
              <div className="flex flex-col justify-center items-center px-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+R$ 750.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">Em oportunidade de vendas</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-6 gap-6 w-[340px] h-full border border-[#310276] rounded-[10px]">
            {/* Imagem */}
            <div
              className="w-[260px] h-[54px] bg-[url('/image.png')] bg-cover bg-center"
            ></div>

            {/* Case Stats Container */}
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-full">

              {/* Stat Container 1 */}
              <div className="flex flex-col justify-center items-center px- w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+12.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">Visualizações</p>
              </div>

              {/* Stat Container 2 */}
              <div className="flex flex-col justify-center items-center px-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+140 Leads</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">qualificados</p>
              </div>

              {/* Stat Container 3 */}
              <div className="flex flex-col justify-center items-center px-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+R$ 750.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">Em oportunidade de vendas</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-6 gap-6 w-[340px] h-full border border-[#310276] rounded-[10px]">
            {/* Imagem */}
            <div
              className="w-[260px] h-[54px] bg-[url('/image.png')] bg-cover bg-center"
            ></div>

            {/* Case Stats Container */}
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-full">

              {/* Stat Container 1 */}
              <div className="flex flex-col justify-center items-center px- w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+12.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">Visualizações</p>
              </div>

              {/* Stat Container 2 */}
              <div className="flex flex-col justify-center items-center px-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+140 Leads</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">qualificados</p>
              </div>

              {/* Stat Container 3 */}
              <div className="flex flex-col justify-center items-center px-4 w-[260px] h-full bg-[rgba(49,2,118,0.4)] rounded-md">
                <p className="w-full h-full text-center text-white font-montserrat font-semibold text-3xl">+R$ 750.000</p>
                <p className="w-full h-full text-center text-[#BABABA] font-montserrat font-normal text-xl">Em oportunidade de vendas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-10 flex flex-col gap-12">
        <div className="gap-y-3 flex flex-col">
          <p className="text-[#FF8500]">Nossos clientes</p>
          <h2 className="font-bold text-white text-4xl md:w-[800px] w-fit">
            O que falam sobre nós?
          </h2>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-between gap-x-10">
          <div className="flex flex-col justify-center items-center p-6 gap-6 w-[340px] h-full bg-[#31027699] rounded-[10px]">
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-full">
              <p>adfasdfa</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-6 gap-6 w-[340px] h-full bg-[#31027699] rounded-[10px]">
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-full">
              <p>adfasdfa</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-6 gap-6 w-[340px] h-full bg-[#31027699] rounded-[10px]">
            <div className="flex flex-col justify-center items-center gap-4 w-[260px] h-full">
              <p>adfasdfa</p>
            </div>
          </div>
        </div>
      </section>

      <div className="lg:h-[104px] lg:w-[1020px] flex lg:flex-row flex-col w-full h-full items-center justify-between mx-auto bg-[#2900677c] gap-y-2 p-6 rounded-[4px]">
        <h3 className="text-white text-xl text-center">Faça sua empresa crescer com <span className="font-bold">constância.</span></h3>
        <FormModal buttonText="Elevar minha empresa agora" />
      </div>
    </>
  );
}