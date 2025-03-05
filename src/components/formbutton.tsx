import React, { useState } from "react";

// Tipagem da prop que vai receber o texto do botão
interface FormModalProps {
  buttonText: string;
}

const FormModal: React.FC<FormModalProps> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Botão para abrir o formulário, com o texto passando como prop */}
      <button
        onClick={handleOpenModal}
        className="z-10 px-6 py-3 my-12 text-white bg-[#310276] hover:bg-[#40009E] duration-200 rounded-[6px]">
        {buttonText}
      </button>

      {/* Modal com o formulário */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 shadow-lg w-[500px] relative  rounded-[8px]">
            {/* Botão de Fechar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-[#310276] hover:text-[#40009E]"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 text-center">Preencha o formulário e fale com um dos nossos especialistas</h2>

            {/* Formulário */}
            <form className="flex flex-col gap-4">
              <label className="font-bold text-sm">
                Qual o seu nome?
                <input
                  type="text"
                  placeholder="Seu primeiro nome"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                />
              </label>
              <label className="font-bold text-sm">
                Qual o seu melhor e-mail?
                <input
                  type="email"
                  placeholder="meuemail@gmail.com"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                />
              </label>
              <label className="font-bold text-sm">
                Qual o seu Whatsapp?
                <input
                  type="tel"
                  placeholder="(19)99999-9999"
                  className="border p-3 my-2 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]"
                />
              </label>
              <label className="font-bold text-sm">
                Qual sua média de faturamento mensal?
                <select name="Selecione uma opção" className="border p-3 my-2 bg-gray-200 text-base rounded-[4px] font-medium w-full focus:outline-[#40009E]">
                  <option className="bg-red-50 duration-100 hover:bg-black" value="someOption">Selecionar faturamento</option>
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