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
            <a href="#fornecedores">Fornecedores</a>
            <a href="#categorias">Categorias</a>
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

      <section className="bg-[#0e0e0e] px-6 py-20 lg:px-12">
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

    </main>
  );
}
