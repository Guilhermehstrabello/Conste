import type { Metadata } from "next";
import Link from "next/link";
import FornecedoresForm from "./FornecedoresForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fornecedores | Conste",
  description:
    "Landing page para fornecedores Conste — conheça benefícios, processo de parceria e como fazer parte da nossa rede.",
};

const benefits = [
  {
    title: "Visibilidade estratégica",
    description:
      "Seja visto por clientes de alto potencial com campanhas alinhadas ao mercado B2B e pequenas empresas.",
  },
  {
    title: "Processos otimizados",
    description:
      "Trabalhe com um fluxo claro, desde integração até entrega de demandas e pagamento rápido.",
  },
  {
    title: "Parceria de longo prazo",
    description:
      "Relacionamento baseado em confiança, previsibilidade e crescimento constante para sua empresa.",
  },
];

const partnerLogos = [
  { src: "/1.png", alt: "TechCorp" },
  { src: "/2.png", alt: "TechCorp" },
  { src: "/3.png", alt: "TechCorp" },
  { src: "/4.png", alt: "TechCorp" },
  { src: "/5.png", alt: "FinServe" },
  { src: "/6.png", alt: "FinServe" },
  { src: "/7.png", alt: "TechCorp" },
  { src: "/8.png", alt: "TechCorp" },
];

const processSteps = [
  {
    step: "1",
    title: "Preencha o cadastro",
    description: "Nos conte sobre sua especialidade, capacidade de entrega e segmento atendido.",
  },
  {
    step: "2",
    title: "Validação rápida",
    description: "Analisamos o fit do seu serviço e alinhamos expectativas com o nosso time.",
  },
  {
    step: "3",
    title: "Projeto piloto",
    description: "Comece com demandas pequenas e ganhe espaço para contratos maiores e recorrentes.",
  },
  {
    step: "4",
    title: "Crescimento conjunto",
    description: "Você entra na nossa cadeia de fornecedores com prioridade em novos lançamentos.",
  },
];

const categoryCards = [
  { title: "Contabilidade", subtitle: "3 fornecedores" },
  { title: "Fotografia e Vídeo", subtitle: "3 fornecedores" },
  { title: "Tecnologia e Desenvolvimento", subtitle: "3 fornecedores" },
  { title: "Design e Branding", subtitle: "3 fornecedores" },
  { title: "Eventos e Estrutura", subtitle: "3 fornecedores" },
  { title: "Logística e Distribuição", subtitle: "3 fornecedores" },
];

export default function FornecedoresPage() {
  return (
    <main className="min-h-screen bg-[#0E0E0E] text-white">
      <section className="relative overflow-hidden px-6 py-20 lg:px-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-20 h-[260px] w-[260px] rounded-full bg-[#8B6DFF]/20 blur-3xl" />
          <div className="absolute right-[10%] top-10 h-[320px] w-[320px] rounded-full bg-[#74D4FF]/20 blur-3xl" />
          <div className="absolute left-[50%] top-36 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#9B7BFF]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
          <div className="text-3xl mb-10 font-bold hover:scale-110 duration-200">
            <Image src="/Logo Conste.png" alt="Logo Conste" width={200} height={200} />
          </div>

          <div className="flex flex-row mb-12 gap-12 [&:has(a:hover)>a]:scale-100 [&:has(a:hover)>a:hover]:scale-110 [&>a]:duration-100 [&>a]:inline-block">
            <a href="#comofunciona">Como funciona</a>
            <a href="#categorias">Categorias</a>
            <a href="#contato">Contato</a>
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-[120%] text-[#F2F2F2] md:text-6xl">
            Conecte seu projeto com os fornecedores certos
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#D7D7D7] sm:text-lg">
            Acesso gratuito a uma rede curada de fornecedores verificados. Preencha o formulário e nossa equipe faz a conexão.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#contato"
              className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[#8B6DFF] px-8 py-4 text-base font-semibold text-[#F2F2F2] transition hover:bg-[#7A5EEC]"
            >
              Estou buscando fornecedores
            </Link>
            <Link
              href="#contato"
              className="inline-flex min-w-[220px] items-center justify-center rounded-lg border border-white/15 bg-[#7047BD]/50 px-8 py-4 text-base font-semibold text-[#E8E3FF] transition hover:border-[#8B6DFF] hover:bg-[#2A2340]"
            >
              Quero ser um fornecedor
            </Link>
          </div>

          <div className="mt-16 w-full max-w-5xl rounded-[2rem] p-8">
            <p className="text-5xl font-semibold text-[#F2F2F2]">Empresas que fazem parte</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {partnerLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="comofunciona" className="border-t border-white/10 bg-[#0E0E0E] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-full">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold text-white sm:text-6xl">Como funciona</h2>
          </div>

          <div className="grid max-w-[1334px] mx-auto gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] bg-[#7047BD] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-white">Conectamos você ao fornecedor ideal.</p>
                <p className="text-sm leading-7 text-[#f2f2f2]">
                  Receba recomendações personalizadas.
                </p>
              </div>
              <Image
                src="/image1.png"
                alt="Formulário de Fornecedores Conste"
                width={400}
                height={320}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>

            <div className="rounded-[2rem] space-y-10 bg-[#7047BD] p-8 ">
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-white">Preencha o formulário</p>
                <p className="text-sm leading-2 text-[#f2f2f2]">
                  Forneça informações sobre seu projeto.
                </p>
              </div>
              <Image
                src="/image2.png"
                alt="Formulário de Fornecedores Conste"
                width={400}
                height={320}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#7047BD] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
              <div className="space-y-2">
                <p className="text-2xl font-semibold text-white">Nossa equipe analisa seu projeto</p>
                <p className="text-sm leading-7 text-[#f2f2f2]">
                  Avaliação detalhada por nossos especialistas.
                </p>
              </div>
              <Image
                src="/image3.png"
                alt="Formulário de Fornecedores Conste"
                width={400}
                height={320}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0E0E0E] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-full">
          <div className="flex flex-row items-center flex-wrap justify-center gap-4 lg:items-center">

            <div className="w-full md:max-w-[660px] h-[480px] overflow-hidden">
              <Image
                src="/global-connection.png"
                alt="Fornecedores Conste"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full md:max-w-[660px] h-[480px] rounded-2xl border border-[#9747FF] p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-[#f2f2f2]">Curadoria de empresas que realmente entregam qualidade</h3>
              <ul className="mt-10 space-y-6 text-lg text-[#f2f2f2]">
                <li className="flex items-center gap-4">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9747FF] text-sm font-semibold text-white">✓</span>
                  Respostas em até 48 horas;
                </li>
                <li className="flex items-center gap-4">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9747FF] text-sm font-semibold text-white">✓</span>
                  Apenas os fornecedores relevantes;
                </li>
                <li className="flex items-center gap-4">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9747FF] text-sm font-semibold text-white">✓</span>
                  Crescimento orgânico para a sua empresa;
                </li>
                <li className="flex items-center gap-4">
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9747FF] text-sm font-semibold text-white">✓</span>
                  Proteção e privacidade dos seus dados.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <section id="categorias" className="bg-[#0e0e0e] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-full">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold text-white sm:text-6xl">Categorias disponíveis</h2>
          </div>

          <div className="grid max-w-[1334px] mx-auto gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {categoryCards.map((category) => (
              <div
                key={category.title}
                className="group relative overflow-hidden rounded-[2rem]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#1d1135] via-[#2a184f] to-[#14091d] opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(108,86,247,0.24),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(116,215,255,0.18),_transparent_25%)]" />
                <div className="relative h-[260px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_60%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,95,255,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(94,214,255,0.16),transparent_22%)]" />
                </div>
                <div className="relative flex flex-col justify-between p-6">
                  <div>
                    <p className="text-2xl font-semibold text-white">{category.title}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-[#6D4CFF] px-4 py-2 text-sm font-semibold text-white">
                      {category.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FornecedoresForm />

      <footer className="bg-[#0e0e0e] px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-full">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-around">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src="/Logo Conste.png" alt="Conste" className="h-7 w-auto" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[20px] font-semibold leading-5 text-[#F2F2F2]">Seções</span>
              <a href="#comofunciona" className="text-sm leading-5 text-[#F2F2F2] hover:opacity-70 transition-opacity">Como funciona</a>
              <a href="#categorias" className="text-sm leading-5 text-[#F2F2F2] hover:opacity-70 transition-opacity">Categorias</a>
              <a href="#contato" className="text-sm leading-5 text-[#F2F2F2] hover:opacity-70 transition-opacity">Contato</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[20px] font-semibold leading-5 text-[#F2F2F2]">Redes sociais</span>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.635 2.014 1.976.635 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.856.563 3.698 1.904 5.039 1.341 1.341 3.183 1.819 5.039 1.904C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.856-.085 3.698-.563 5.039-1.904 1.341-1.341 1.819-3.183 1.904-5.039.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.085-1.856-.563-3.698-1.904-5.039C20.645.635 18.803.157 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors">
                  <svg width="10" height="14" viewBox="0 0 10 18" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1H6.5C5.4 1 4 2 4 3.5V6H1V9H4V17H7V9H9.5L10 6H7V3.5C7 3.2 7.3 3 7.5 3H9V1Z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom row */}
          <div className="mt-10 border-t border-white/10 pt-6 z-20">
            <p className="text-sm leading-5 text-center text-[#F2F2F2]/60">
              © {new Date().getFullYear()} Conste Conecta. Todos os direitos reservados.
            </p>
          </div>

        </div>

        <Image src="/blur_footer_bg.svg" alt="Blur colorido" className="object-cover w-full mx-auto left-0 -z-0 absolute" width={200} height={200} />

      </footer>
    </main>
  );
}
