"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  {
    label: "Serviços",
    subitems: [
      { label: "Performance", path: "/performance" },
      { label: "Midias sociais", path: "/midias-sociais" },
      { label: "Sites", path: "/sites" },
      { label: "Audiovisual", path: "/audiovisual" },
    ],
  },
  { label: "Blog", path: "/blog" },
  { label: "Contato", path: "/contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-[#0E0E0E] sticky top-0 z-50">
      <div className="flex justify-between items-center h-20 px-6 md:px-10 mx-auto relative" style={{ maxWidth: "1200px" }}>
        {/* Logo */}
        <div className="flex items-center gap-3 text-2xl font-bold text-white hover:scale-105 duration-200">
          <Image src="/Logo Conste.png" alt="Logo Conste" width={120} height={120} />
        </div>

        {/* Botão de Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Menu Mobile */}
        <div
          className={`${isOpen ? "flex" : "hidden"} md:hidden fixed inset-0 bg-[#0E0E0E] text-white p-6 z-50`}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Image src="/Logo Conste.png" alt="Logo Conste" width={100} height={100} className="h-10 w-auto" />
              <span className="text-white font-bold text-lg">Conste</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white focus:outline-none">
              <svg
                className="h-10 w-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {NAV_ITEMS.map((item) => {
              if (item.subitems) {
                return (
                  <div key={item.label} className="space-y-3">
                    <div className="text-xs uppercase tracking-[.3em] text-[#A99F9E]">{item.label}</div>
                    <div className="space-y-2 rounded-3xl bg-[#5413a9] p-4 border border-[#310276]/20">
                      {item.subitems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.path}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-2xl px-4 py-3 text-lg font-medium text-white transition hover:bg-[#310276]/20"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-3xl bg-[#1A0B2E] px-5 py-4 text-lg font-medium text-white transition hover:bg-[#310276]/20"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Links do Menu Desktop */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-8 text-white">
            {NAV_ITEMS.map((item) => {
              if (item.subitems) {
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2 py-4 px-5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:bg-[#310276]/15"
                    >
                      {item.label}
                      <svg
                        className="h-3.5 w-3.5 text-[#A99F9E]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`absolute left-0 top-full mt-1 min-w-[260px] rounded-3xl border border-[#310276]/30 bg-[#200740] p-4 shadow-[0_20px_60px_rgba(49,2,118,0.25)] transition-opacity duration-200 ${openDropdown === item.label ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                      <div className="grid gap-2">
                        {item.subitems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.path}
                            className="block rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-[#5413a9]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Link href={item.path} className="rounded-full py-2 px-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#5413a9]">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;