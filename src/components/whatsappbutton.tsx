"use client";

import React from "react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  children: React.ReactNode;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ children, className = "" }) => {
  const whatsappUrl = "https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste";

  return (
    <div className="flex items-center h-fit">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative inline-block p-px font-semibold leading-6 text-white bg-[#310276] shadow-2xl cursor-pointer rounded-[100px] shadow-[#310276] transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-orange-500 z-10 ${className}`}
      >
        <span className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-[#310276] via-orange-500 to-orange-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        <span className="relative z-10 block px-4 py-3 rounded-[100px] bg-neutral-950">
          <div className="relative z-10 flex items-center space-x-3">
            <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-orange-300 text-sm md:text-base lg:text-base whitespace-pre-wrap">
              {children}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-orange-300"
            >
              <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
            </svg>
          </div>
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;