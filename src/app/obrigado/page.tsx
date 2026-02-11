import Footer from "@/components/footer";

export default function ObrigadoPage() {
  return (
    <>
      <div className="text-white h-screen flex flex-col items-center justify-center text-center p-8 md:p-32 bg-gradient-to-br from-[#310276] via-[#40009E] to-[#1a0040] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff8500] rounded-full blur-[100px]"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#ff8500] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#ff8500] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Obrigado pelo contato!</h1>
          <p className="mb-8 text-lg opacity-90">Recebemos suas informações clique no botão abaixo e fale conosco, no WhatsApp.</p>
          <a
            href="https://wa.me/5519989276583?text=Vim%20do%20site%20e%20gostaria%20de%20iniciar%20um%20projeto%20com%20a%20Conste"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-[100px] shadow-green-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-green-500"
          >
            <span className="absolute inset-0 rounded-[100px] bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block px-6 py-3 rounded-[100px] bg-neutral-950">
              <div className="relative z-10 flex items-center space-x-3">
                <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-green-300">
                  Falar no WhatsApp
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-green-300"
                >
                  <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                </svg>
              </div>
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
