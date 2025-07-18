export default function ObrigadoPage() {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-r from-[#310276] to-[#ff8500]">
      <h1 className="text-3xl font-bold mb-4">Obrigado pelo contato!</h1>
      <p className="mb-6">Recebemos suas informações e entraremos em contato em breve.</p>
      <a
        href="https://wa.me/SEUNUMERO"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
      >
        Ir para o WhatsApp
      </a>
    </div>
  );
}
