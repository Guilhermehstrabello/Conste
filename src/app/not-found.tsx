import Image from "next/image";

export default function NotFound() {
  
    return (
        <>
            <section className="flex flex-col items-center gap-10 justify-center h-screen bg-gradient-to-r from-[#310276] to-[#A96EFF] text-white">
            <Image src="/Logo Conste.png" alt="Logo Conste" width={140} height={140} />
            <h1 className="md:text-4xl text-2xl font-bold">Ops, página não encontrada</h1>
            <p className="md:text-lg text-base">A página que você está procurando não existe.</p>
            <a href="/">
                <button className="bg-[#FF8500] text-white px-4 py-2 rounded-[100px] hover:bg-[#e67600] transition-colors duration-300">
                    Voltar para a página inicial
                </button>
            </a>
        </section>
    </>
  );
}