"use client";

import React, { useState } from "react";
import { db } from "../app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { shootConfetti } from "./confetti";
import { useRouter } from 'next/navigation';

interface FormModalProps {
  buttonText: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  revenue: string;
  company: string;
}

const FormModal: React.FC<FormModalProps> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

  if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

  if (value.length <= 10) {
    // Formato fixo: (99) 9999-9999
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    // Formato celular: (99) 99999-9999
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  setFormData((prev) => ({ ...prev, phone: value }));
};

  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    revenue: "",
    company: "",
  });

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setLoading(true);

  try {

    await addDoc(collection(db, "leads"), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      revenue: formData.revenue,
      company: formData.company,
      createdAt: serverTimestamp(),
    });

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Erro ao enviar e-mail");

    setFormData({ name: "", email: "", phone: "", revenue: "", company: "" });

    shootConfetti();
    router.push("/obrigado");
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar formulário. Por favor, tente novamente.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center h-fit">
      <button
        onClick={handleOpenModal}
        className="z-10 px-5 py-4 my-12 text-white bg-[#310276] hover:bg-[#40009E] duration-200 rounded-[6px]"
      >
        {buttonText}
      </button>

      {/* Formulário */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center text-left justify-center bg-black/50 z-50">
          <div className="bg-white p-6 shadow-lg w-[500px] relative rounded-[8px]">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-[#310276] hover:text-[#40009E]"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 text-left">
              Preencha o formulário e fale com um dos nossos especialistas
            </h2>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Campos do form — mantidos iguais */}
              <label className="font-bold text-sm">
                Qual o seu nome?
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu primeiro nome"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                  required
                />
              </label>

              <label className="font-bold text-sm">
                Qual o nome da sua empresa?
                <input
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                />
              </label>

              <label className="font-bold text-sm">
                Qual o seu melhor e-mail?
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="meuemail@gmail.com"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                  required
                />
              </label>

              <label className="font-bold text-sm">
                Qual o seu Whatsapp?
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(19)99999-9999"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                  required
                />
              </label>

              <label className="font-bold text-sm">
                Qual sua média de faturamento mensal?
                <select
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="border p-3 my-2 bg-white text-[#310276] text-base rounded-[4px] font-medium w-full focus:outline-[#310276] focus:bg-white"
                  required
                >
                  <option value="">Selecionar faturamento</option>
                  <option value="R$0 - R$30.000">R$0 - R$30.000</option>
                  <option value="R$30.000 - R$50.000">R$30.000 - R$50.000</option>
                  <option value="R$50.000 - R$100.000">R$50.000 - R$100.000</option>
                  <option value="R$100.000 - R$500.000">R$100.000 - R$500.000</option>
                  <option value="+ de R$1.000.000">+ de R$1.000.000</option>
                </select>
              </label>

              <button
                type="submit"
                className="bg-[#310276] hover:bg-[#40009E] text-white font-bold py-3 px-6 rounded-[6px] transition duration-200"
                disabled={loading}>
                {loading ? "Enviando..." : "Solicitar contato"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;