import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full max-w-[1440px] h-[406px] py-10 gap-4 mx-auto">
      {/* Footer Container */}
      <div className="flex flex-col items-start gap-[46px] w-full max-w-[1200px]">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-[46px] w-full">
          {/* Logo e Redes Sociais */}
          <div className="flex flex-col items-center gap-3 w-[120px]">
            <img src="/Logo Conste.png" alt="Logo Conste" className="w-[120px] h-[32px]" />
            <div className="flex gap-3">
              {/* Instagram */}
              <div className="flex justify-center items-center relative">
                <a href="https://www.instagram.com/constemarketing/" target="_blank" rel="noopener noreferrer">
                  <Image src="/Instagram.svg" alt="Instagram" width={92} height={92} className="hover:scale-125 duration-200" />
                </a>
              </div>

              {/* Facebook */}
              <div className="flex justify-center items-center relative">
                <a href="https://www.facebook.com/profile.php?id=61555449532582" target="_blank" rel="noopener noreferrer">
                  <Image src="/Facebook.svg" alt="Facebook" width={92} height={92} className="hover:scale-125 duration-200" />
                </a>
              </div>

              {/* Linkedin */}
              <div className="flex justify-center items-center relative">
                <a href="https://www.linkedin.com/company/conste-marketing?trk=public_profile_topcard-current-company" target="_blank" rel="noopener noreferrer">
                  <Image src="/Linkedin.svg" alt="Linkedin" width={92} height={92} className="hover:scale-125 duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="flex flex-col md:items-end items-center gap-4 w-[354px] text-white md:text-right text-center">
            <a href="https://www.google.com/maps/place/Conste+%7C+Ag%C3%AAncia+de+Marketing+Digital/data=!4m2!3m1!1s0x0:0xec8fb32d57dcef1b?sa=X&ved=1t:2428&ictx=111" target="_blank" rel="noopener noreferrer">
              <p className="hover:text-[#9151f1] duration-300 text-base hover:scale-105 leading-8">R. Haiti, 327 - Sala 1 - Parque Boa Esperança, Indaiatuba - SP, 13339-240</p>
            </a>
            <a target="_blank" href="https://api.whatsapp.com/send/?phone=5519989276583&text=Vim+do+site+e+gostaria+de+iniciar+um+projeto+com+a+Conste&type=phone_number&app_absent=0">
              <p className="hover:text-[#9151f1] duration-300 text-base hover:scale-105 leading-8">(19) 98927-6583</p>
            </a>
            <a href="mailto:contato@constemarketing.com.br" target="_blank" rel="noopener noreferrer">
              <p className="hover:text-[#9151f1] duration-300 text-base hover:scale-105 leading-8">contato@constemarketing.com.br</p>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white"></div>

        {/* Direitos Autorais */}
        <div className="flex justify-center items-center text-center w-full">
          <p className="text-base text-white">
            © 2025 Conste Marketing - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}