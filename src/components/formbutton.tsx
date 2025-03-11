import React, { useState } from "react";

interface FormModalProps {
  buttonText: string;
}

const FormModal: React.FC<FormModalProps> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    revenue: "",
  });

  const SUPABASE_URL = "https://liwlupnnccwnnkcjnfjm.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxpd2x1cG5uY2N3bm5rY2puZmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODEzMTcsImV4cCI6MjA1Njg1NzMxN30.z6J197-bSrylwAFjE5OzljmhT8cgYsvWHWZQMeNZiwc";

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Prefer": "return=representation",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar os dados");

      console.log("Enviado com sucesso!");
      alert("Formulário enviado!");
      setFormData({ name: "", email: "", phone: "", revenue: "" }); // Limpar formulário
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar formulário.");
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
                className="p-4 bg-[#310276] hover:bg-[#40009E] text-white rounded-[4px]"
              >
                Solicitar contato
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
