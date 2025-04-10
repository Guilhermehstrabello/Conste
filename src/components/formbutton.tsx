import React, { useState } from "react";
import { db } from "../app/firebase"; // Certifique-se de ajustar o caminho para seu arquivo firebase
import { collection, addDoc } from "firebase/firestore";

interface FormModalProps {
  buttonText: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  revenue: string;
}

const FormModal: React.FC<FormModalProps> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    revenue: "",
  });

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Adicionando dados ao Firestore
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        revenue: formData.revenue,
        createdAt: new Date() // opcional: adiciona timestamp
      });
      
      console.log("Enviado com sucesso!");
      alert("Formulário enviado!");
      setFormData({ name: "", email: "", phone: "", revenue: "" });
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar formulário. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center h-fit">
      {/* Botão para abrir o formulário */}
      <button
        onClick={handleOpenModal}
        className="z-10 px-5 py-4 my-12 text-white bg-[#310276] hover:bg-[#40009E] duration-200 rounded-[6px]"
      >
        {buttonText}
      </button>

      {/* Modal com o formulário */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 shadow-lg w-[500px] relative rounded-[8px]">
            {/* Botão de Fechar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-[#310276] hover:text-[#40009E]"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 text-center">
              Preencha o formulário e fale com um dos nossos especialistas
            </h2>

            {/* Formulário */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                  className="border p-3 my-2 bg-gray-200 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
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
                disabled={loading}
                className={`p-4 ${loading ? 'bg-gray-400' : 'bg-[#310276] hover:bg-[#40009E]'} text-white rounded-[4px] transition-colors`}
              >
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