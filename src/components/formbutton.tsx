"use client";

import React, { useState } from "react";
import { db } from "../app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { shootConfetti } from "./confetti";

interface FormModalProps {
  buttonText: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  revenue: string;
  message: string;
}

const FormModal: React.FC<FormModalProps> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    revenue: "",
    message: "",
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
        message: formData.message,
        createdAt: serverTimestamp()
      });

      setFormData({ name: "", email: "", phone: "", revenue: "", message: "" });
      setSuccessModalOpen(true); // mostra modal de sucesso
      shootConfetti();
    } catch (error) {
      console.error("Erro ao enviar:", error);
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
                  onChange={handleChange}
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

              <label className="font-bold text-sm">
                Tem alguma dúvida ou mensagem?
                <textarea
                  name="message"
                  typeof="text"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`p-4 ${loading ? 'bg-gray-400' : 'bg-[#310276] hover:bg-[#40009E]'} text-white rounded-[4px] transition-colors`}
              >
                {loading ? "Enviando..." : "Solicitar contato"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de sucesso */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm text-center animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-[#310276]">Formulário enviado com sucesso!</h2>
            <p className="text-gray-700 mb-6">
              Obrigado pelo seu contato. Em breve entraremos em contato com você.
            </p>
            <button
              className="px-5 py-2 bg-[#310276] text-white rounded-lg hover:bg-[#40009E] transition"
              onClick={() => {
                setSuccessModalOpen(false);
                setIsOpen(false); // fecha o form também
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
