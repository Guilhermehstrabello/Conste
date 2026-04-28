"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { shootConfetti } from "@/components/confetti";
import { useRouter } from "next/navigation";

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export default function ContatoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const handlePhoneChange = (value: string) => {
    let phoneValue = value.replace(/\D/g, "");

    if (phoneValue.length > 11) {
      phoneValue = phoneValue.slice(0, 11);
    }

    if (phoneValue.length <= 10) {
      phoneValue = phoneValue.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      phoneValue = phoneValue.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    setFormData((prev) => ({ ...prev, phone: phoneValue }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.error || `API error ${response.status}`);
      }

      setFormData({ name: "", company: "", email: "", phone: "" });
      shootConfetti();
      router.push("/obrigado");
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Não foi possível enviar o formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-8 md:py-14">
        <section className="rounded-2xl border border-[#310276] bg-[linear-gradient(180deg,#1A0B2E_0%,#0E0E0E_100%)] p-6 md:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF8500]">
                Entre em contato
              </p>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">Vamos crescer sua empresa juntos</h1>
              <p className="mb-8 text-[#BABABA]">
                Preencha seus dados e nossa equipe retorna com o melhor plano para o seu negócio.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  required
                  className="w-full rounded-lg border border-[#310276]/40 bg-[#0E0E0E] px-4 py-3 text-white outline-none transition focus:border-[#310276]"
                />

                <input
                  name="company"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                  className="w-full rounded-lg border border-[#310276]/40 bg-[#0E0E0E] px-4 py-3 text-white outline-none transition focus:border-[#310276]"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="seuemail@email.com"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  required
                  className="w-full rounded-lg border border-[#310276]/40 bg-[#0E0E0E] px-4 py-3 text-white outline-none transition focus:border-[#310276]"
                />

                <input
                  name="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(event) => handlePhoneChange(event.target.value)}
                  required
                  className="w-full rounded-lg border border-[#310276]/40 bg-[#0E0E0E] px-4 py-3 text-white outline-none transition focus:border-[#310276]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#310276] px-4 py-3 font-bold text-white transition hover:bg-[#40009E] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Enviando..." : "Solicitar contato"}
                </button>
              </form>
            </div>

            <div className="relative">
              <Image
                src="/Equipe.png"
                alt="Equipe Conste"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
