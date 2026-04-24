"use client";

import Image from "next/image";
import { useState } from "react";

type FormData = {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  cidade: string;
  segmento: string;
  servico: string;
  site: string;
  mensagem: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const inputClass = (error?: string) =>
  `w-full rounded-2xl border px-4 py-4 text-white placeholder:text-white/30 outline-none transition bg-transparent ${error ? "border-red-500/70" : "border-white/20 focus:border-[#6D4CFF]"
  }`;

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return value;
};

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const FornecedoresForm = () => {
  const [isOfferingServices, setIsOfferingServices] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormData>({
    nome: "", email: "", empresa: "", telefone: "",
    cidade: "", segmento: "", servico: "", site: "", mensagem: "",
  });

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === "telefone" ? formatPhone(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.email.trim()) e.email = "E-mail obrigatório";
    else if (!validateEmail(form.email)) e.email = "E-mail inválido";
    if (!form.empresa.trim()) e.empresa = "Empresa obrigatória";
    if (!form.telefone.trim()) e.telefone = "Telefone obrigatório";
    else if (form.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone inválido";
    if (!form.cidade.trim()) e.cidade = "Cidade obrigatória";
    if (!form.segmento.trim()) e.segmento = "Segmento obrigatório";
    if (isOfferingServices) {
      if (!form.servico.trim()) e.servico = "Serviço obrigatório";
      if (form.site && !validateUrl(form.site)) e.site = "URL inválida";
      if (!form.mensagem.trim()) e.mensagem = "Descreva seu serviço";
    } else {
      if (!form.mensagem.trim()) e.mensagem = "Mensagem obrigatória";
    }
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/fornecedores-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_type: isOfferingServices ? "fornecedor" : "comprador",
          full_name: form.nome,
          email: form.email,
          company: form.empresa,
          phone: form.telefone,
          city: form.cidade,
          segment: form.segmento,
          service_offered: isOfferingServices ? form.servico : null,
          site_url: isOfferingServices ? form.site || null : null,
          message: form.mensagem,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setErrors({});
      setForm({
        nome: "",
        email: "",
        empresa: "",
        telefone: "",
        cidade: "",
        segmento: "",
        servico: "",
        site: "",
        mensagem: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleTabChange = (offering: boolean) => {
    setIsOfferingServices(offering);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section className="border-t border-white/10 px-4 py-10 lg:px-12" id="contato">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.3)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0e0e0e] px-4 py-8 text-center">
          <Image
            src="/blur_top.svg"
            alt="Blur colorido"
            className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 object-cover md:w-[490px] md:h-[200px]"
            width={300}
            height={200}
          />
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
                onClick={() => handleTabChange(false)}
                className={`inline-flex min-w-[220px] items-center justify-center rounded-lg px-8 py-4 text-sm font-semibold transition ${!isOfferingServices
                  ? "bg-[#6D4CFF] text-white hover:bg-[#5a3ee7]"
                  : "border border-[#6D4CFF] bg-transparent text-[#E8E3FF] hover:bg-[#5a3ee7]/20"
                  }`}
              >
                Estou buscando fornecedores
              </button>
              <button
                type="button"
                onClick={() => handleTabChange(true)}
                className={`inline-flex min-w-[220px] items-center justify-center rounded-lg px-8 py-4 text-sm font-semibold transition ${isOfferingServices
                  ? "bg-[#6D4CFF] text-white hover:bg-[#5a3ee7]"
                  : "border border-[#6D4CFF] bg-transparent text-[#E8E3FF] hover:bg-[#5a3ee7]/20"
                  }`}
              >
                Estou oferecendo meus serviços
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-6" noValidate>
          {/* Nome + Email */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">
                {isOfferingServices ? "Nome completo" : "Insira o seu nome"}
              </span>
              <input type="text" value={form.nome} onChange={set("nome")} placeholder="João Silva" className={inputClass(errors.nome)} />
              {errors.nome && <span className="mt-1 block text-xs text-red-400">{errors.nome}</span>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">
                {isOfferingServices ? "E-mail" : "Insira o seu e-mail"}
              </span>
              <input type="email" value={form.email} onChange={set("email")} placeholder="joao@empresa.com.br" className={inputClass(errors.email)} />
              {errors.email && <span className="mt-1 block text-xs text-red-400">{errors.email}</span>}
            </label>
          </div>

          {/* Empresa + Telefone */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">
                {isOfferingServices ? "Empresa" : "Nome da empresa"}
              </span>
              <input type="text" value={form.empresa} onChange={set("empresa")} placeholder={isOfferingServices ? "Nome da sua empresa" : "Razão social ou nome fantasia"} className={inputClass(errors.empresa)} />
              {errors.empresa && <span className="mt-1 block text-xs text-red-400">{errors.empresa}</span>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">
                {isOfferingServices ? "Telefone" : "Insira o seu telefone"}
              </span>
              <input type="tel" value={form.telefone} onChange={set("telefone")} placeholder="(11) 99999-9999" className={inputClass(errors.telefone)} />
              {errors.telefone && <span className="mt-1 block text-xs text-red-400">{errors.telefone}</span>}
            </label>
          </div>

          {/* Cidade + Segmento */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">Cidade</span>
              <input type="text" value={form.cidade} onChange={set("cidade")} placeholder="São Paulo, SP" className={inputClass(errors.cidade)} />
              {errors.cidade && <span className="mt-1 block text-xs text-red-400">{errors.cidade}</span>}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-white">Segmento de atuação</span>
              <input type="text" value={form.segmento} onChange={set("segmento")} placeholder="Ex: Tecnologia, Saúde, Varejo..." className={inputClass(errors.segmento)} />
              {errors.segmento && <span className="mt-1 block text-xs text-red-400">{errors.segmento}</span>}
            </label>
          </div>

          {/* Campos exclusivos do fornecedor */}
          {isOfferingServices && (
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Serviço oferecido</span>
                <input type="text" value={form.servico} onChange={set("servico")} placeholder="Ex: Consultoria financeira" className={inputClass(errors.servico)} />
                {errors.servico && <span className="mt-1 block text-xs text-red-400">{errors.servico}</span>}
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Link do seu site <span className="text-white/30 font-normal">(opcional)</span></span>
                <input type="url" value={form.site} onChange={set("site")} placeholder="https://www.seusite.com.br" className={inputClass(errors.site)} />
                {errors.site && <span className="mt-1 block text-xs text-red-400">{errors.site}</span>}
              </label>
            </div>
          )}

          {/* Mensagem */}
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">
              {isOfferingServices
                ? "Conte mais sobre seu serviço e experiência"
                : "Tem alguma dúvida ou questionamento? Deixe a sua mensagem"}
            </span>
            <textarea
              rows={6}
              value={form.mensagem}
              onChange={set("mensagem")}
              placeholder={
                isOfferingServices
                  ? "Descreva brevemente o que você oferece, há quanto tempo atua no mercado e diferenciais do seu serviço..."
                  : "Escreva aqui sua dúvida ou mensagem..."
              }
              className={inputClass(errors.mensagem)}
            />
            {errors.mensagem && <span className="mt-1 block text-xs text-red-400">{errors.mensagem}</span>}
          </label>

          {/* Feedback de envio */}
          {status === "success" && (
            <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              Formulário enviado com sucesso! Entraremos em contato em breve.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              Ocorreu um erro ao enviar. Tente novamente.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-fit rounded-lg bg-[#6D4CFF] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#5a3ee7] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Enviando..." : "Enviar formulário"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FornecedoresForm;