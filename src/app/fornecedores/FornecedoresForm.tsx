"use client";

import Image from "next/image";
import { useState } from "react";

const FornecedoresForm = () => {
  const [isOfferingServices, setIsOfferingServices] = useState(false);

  return (
    <section className="border-t border-white/10 px-4 py-10 lg:px-12" id="contato">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.3)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0e0e0e] px-4 py-8 text-center">
          <Image src="/blur_top.svg" alt="Blur colorido" className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 object-cover md:w-[490px] md:h-[200px]" width={300} height={200} />
          <div className="relative z-10 mx-auto space-y-10">
            <div className="space-y-4">
              <h2 className="md:text-4xl text-3xl font-bold text-[#f2f2f2] lg:text-6xl">
                Está buscando fornecedores ou pretende entrar na nossa rede?
              </h2>
              <p className="mt-4 text-base leading-7 text-[#A3A3A3] sm:text-lg">
                Preencha o formulário para que você seja cadastrado.
              </p>
            </div>


            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsOfferingServices(false)}
                className={`inline-flex min-w-[220px] items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition ${!isOfferingServices
                  ? "bg-[#6D4CFF] text-white hover:bg-[#5a3ee7]"
                  : "border border-[#6D4CFF] bg-transparent text-[#E8E3FF] hover:bg-[#5a3ee7]/20"
                  }`}
              >
                Estou buscando fornecedores
              </button>
              <button
                type="button"
                onClick={() => setIsOfferingServices(true)}
                className={`inline-flex min-w-[220px] items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition ${isOfferingServices
                  ? "bg-[#6D4CFF] text-white hover:bg-[#5a3ee7]"
                  : "border border-[#6D4CFF] bg-transparent text-[#E8E3FF] hover:bg-[#5a3ee7]/20"
                  }`}
              >
                Estou oferecendo meus serviços
              </button>
            </div>
          </div>
        </div>

        {isOfferingServices ? (
          <form className="mt-4 grid gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Nome completo</span>
                <input
                  type="text"
                  placeholder="João Silva"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">E-mail</span>
                <input
                  type="email"
                  placeholder="joao@empresa.com.br"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Empresa</span>
                <input
                  type="text"
                  placeholder="Nome da sua empresa"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Telefone</span>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Serviço oferecido</span>
                <input
                  type="text"
                  placeholder="Ex: Consultoria financeira"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Segmento de atuação</span>
                <input
                  type="text"
                  placeholder="Ex: Tecnologia, Saúde, Varejo..."
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Cidade</span>
                <input
                  type="text"
                  placeholder="São Paulo, SP"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Link do seu site</span>
                <input
                  type="url"
                  placeholder="https://www.seusite.com.br"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">Conte mais sobre seu serviço e experiência</span>
              <textarea
                rows={6}
                placeholder="Descreva brevemente o que você oferece, há quanto tempo atua no mercado e diferenciais do seu serviço..."
                className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
              />
            </label>

            <button
              type="submit"
              className="w-fit rounded-2xl bg-[#6D4CFF] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#5a3ee7]"
            >
              Enviar formulário
            </button>
          </form>
        ) : (
          <form className="mt-4 grid gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Insira o seu nome</span>
                <input
                  type="text"
                  placeholder="João Silva"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Insira o seu e-mail</span>
                <input
                  type="email"
                  placeholder="joao@empresa.com.br"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Nome da empresa</span>
                <input
                  type="text"
                  placeholder="Razão social ou nome fantasia"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Insira o seu telefone</span>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Cidade</span>
                <input
                  type="text"
                  placeholder="São Paulo, SP"
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Segmento de atuação</span>
                <input
                  type="text"
                  placeholder="Ex: Tecnologia, Saúde, Varejo..."
                  className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">Tem alguma dúvida ou questionamento? Deixe a sua mensagem</span>
              <textarea
                rows={6}
                placeholder="Escreva aqui sua dúvida ou mensagem..."
                className="w-full rounded-2xl border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-white/30 outline-none transition focus:border-[#6D4CFF]"
              />
            </label>

            <button
              type="submit"
              className="w-fit rounded-2xl bg-[#6D4CFF] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#5a3ee7]"
            >
              Enviar formulário
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default FornecedoresForm;
