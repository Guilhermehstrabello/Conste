import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLenis } from "@/components/scroll"; // Import Lenis hook

const NAV_ITEMS = [
  "Quem Somos",
  "Setores",
  "Cases",
  "Depoimentos",
  "Nossos Processos",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section && lenis) {
      lenis.scrollTo(section, { offset: -40, duration: 1.2 });
    }
  };

  return (
    <nav>
      <div
        className="flex justify-between items-center md:h-24 h-20 px-6 md:px-10 mx-auto relative"
        style={{ maxWidth: "1200px" }}
      >
        {/* Logo */}
        <div className="text-2xl font-bold hover:scale-110 duration-200">
          <Image src="/Logo Conste.png" alt="Logo Conste" width={120} height={120} />
        </div>

        {/* Botão de Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
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
          } md:hidden fixed top-0 left-0 w-full h-screen bg-black text-white flex-col items-center justify-center text-lg space-y-6 z-50`}
        >
          {/* Logo no topo */}
          <Link href="https://www.constemarketing.com.br" onClick={() => setIsOpen(false)}>
            <img src="/Logo Conste.png" alt="Logo Conste" className="h-10" />
          </Link>

          {/* Links do Menu */}
          <ul className="flex flex-col items-center space-y-6">
            {NAV_ITEMS.map((item) => {
              const id = item.toLowerCase().replace(/ /g, "-");
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={(e) => handleSmoothScroll(e, id)}
                  className="block w-full"
                >
                  <li className="hover:bg-[#310276] p-4 duration-200 rounded-lg text-center w-full">
                    {item}
                  </li>
                </a>
              );
            })}            
          </ul>

          {/* Botão de Fechar (X) após os links */}
          <button onClick={() => setIsOpen(false)} className="text-white mt-8">
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
            {NAV_ITEMS.map((item) => {
              const id = item.toLowerCase().replace(/ /g, "-");
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={(e) => handleSmoothScroll(e, id)}
                  className="block"
                >
                  <li className="hover:scale-110 duration-300 p-4 hover:bg-[#310276] rounded-md cursor-pointer">
                    {item}
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;