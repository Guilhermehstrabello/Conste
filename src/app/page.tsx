"use client";
import Navbar from "@/components/navbar";
import ClientLogos from "@/components/clientslogo";
import SmoothScroll from "@/components/scroll";
import FormModal from "@/components/formbutton";
import Image from "next/image";

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

      <section id="quem-somos" className="flex flex-col items-center justify-center py-6">
        <h2 className="text-white font-bold text-4xl">Quem Somos</h2>
        <Image className="w-auto h-auto" src="/Equipe.png" alt="Imagem da Equipe" width={500} height={300} />
        <div className="space-y-3 flex flex-col items-center justify-center text-base">
          <p className="text-[#9A9A9A] w-[580px] text-center">
            A Conste atua em soluções digitais, dedicada a impulsionar a captação de clientes para empresas por meio de estratégias de marketing digital.
          </p>
          <p className="text-[#9A9A9A] w-[480px] text-center">
            Somos especialistas em gestão de performance e vendas por meio de estratégias inteligentes, inovadoras e criativas.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-y-11 py-16">
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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-11 p-10">
      </section>
      <div className="flex flex-col items-center justify-center">
        <FormModal buttonText="Quero Elevar meus resultados" />
      </div>

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
    </>
  );
}