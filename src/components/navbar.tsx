import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-white">
      <div
        className="flex justify-between items-center md:h-24 h-20 px-6 md:px-10 mx-auto relative"
        style={{ maxWidth: "1320px" }}
      >
        {/* Logo */}
        <Link href="https://www.constemarketing.com.br" className="text-2xl font-bold hover:scale-110 duration-200">
          <img src="Logo Conste.png" alt="Logo Conste" className="h-12" />
        </Link>

        {/* Botão de Menu Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="h-12 w-12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menu Mobile */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:hidden fixed top-0 left-0 w-full h-screen bg-black flex-col items-center justify-center text-lg space-y-6 z-50`}
        >
          {/* Logo no topo */}
          <Link href="https://www.constemarketing.com.br" onClick={() => setIsOpen(false)}>
            <img src="Logo Conste.png" alt="Logo Conste" className="h-16" />
          </Link>

          {/* Links do Menu */}
          <ul className="flex flex-col items-center space-y-6">
            {["Quem Somos", "Setores", "Cases", "Depoimentos", "Nosso Processo"].map((item) => (
              <li key={item} className="hover:text-[#FF8500] duration-200">
                <Link href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botão de Fechar (X) após os links */}
          <button onClick={toggleMenu} className="text-white mt-8">
            <svg
              className="h-12 w-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links do Menu Desktop */}
        <div className="hidden md:flex items-center space-x-10">
          <ul className="flex space-x-8 text-white">
            {["Quem Somos", "Setores", "Cases", "Depoimentos", "Nosso Processo"].map((item) => (
              <li key={item} className="hover:text-[#FF8500] duration-200">
                <Link href={`#${item.toLowerCase().replace(" ", "-")}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão Desktop */}
        <div className="hidden md:block">
          <Link href="#contato" className="px-5 py-3 text-sm text-white bg-[#310276] hover:bg-[#40009E] duration-200 rounded-[4px] flex items-center">
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
