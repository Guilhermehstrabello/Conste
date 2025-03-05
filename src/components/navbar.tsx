import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white">
      <div
        className="flex justify-around items-center h-20 mx-auto"
        style={{
          maxWidth: "1320px", // Limita a largura máxima
          marginLeft: "auto", // Centraliza horizontalmente
          marginRight: "auto",
        }}
      >
        {/* Logo */}
        <Link href="https://www.constemarketing.com.br" className="text-2xl font-bold">
          <img src="Logo Conste.png" alt="" />
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${isOpen ? "block" : "hidden"
            } absolute md:relative md:block left-0 w-full md:w-auto xl:mx-10 bg-black z-50`}
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-16 text-white">
            <li className="hover:text-gray-400">
              <Link href="#quem-somos">Quem Somos</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="#setores">Setores</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="#cases">Cases</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="#depoimentos">Depoimentos</Link>
            </li>
            <li className="hover:text-gray-400">
              <Link href="#nosso-processo">Nosso Processo</Link>
            </li>
          </ul>
        </div>

        {/* Botão */}
        <div className="hidden md:block">
          <Link href="#contato" className="px-5 py-3 text-sm text-white bg-[#310276] hover:bg-[#40009E] duration-200 rounded-[6px] flex items-center">
            Contratar a Conste{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 hover:-rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
