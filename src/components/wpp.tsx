'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <Link
        href="https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg"
        style={{
          width: '60px',
          height: '60px',
        }}
      >
        <FaWhatsapp className="text-[34px]" />
      </Link>
    </motion.div>
  );
}
