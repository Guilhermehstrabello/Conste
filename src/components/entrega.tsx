import React from "react";
import FormModal from "./formbutton";

interface CardData {
    image: string;
    title: string;
    description: string;
}

const cards: CardData[] = [
    {
        image: "/estrategia.png",
        title: "Estratégia que não chuta no escuro",
        description:
            "Antes de qualquer anúncio, mapeamos onde o seu cliente está, o que ele busca. Estratégia primeiro, investimento depois.",
    },
    {
        image: "/campanhas.png",
        title: "Campanhas que aparecem pra quem importa",
        description:
            "Seus anúncios chegam exatamente para quem está pronto para comprar sem desperdiçar verba com quem nunca vai converter.",
    },
    {
        image: "/resultados.png",
        title: "Resultados que você consegue acompanhar",
        description:
            "Chega de achismo. Você vê em tempo real quanto cada campanha gerou, o custo por lead e o retorno do seu investimento.",
    },
    {
        image: "/crescimento.png",
        title: "Crescimento que se sustenta",
        description:
            "Otimizamos continuamente com base em dados reais. O que funciona, a gente escala. O que não funciona, a gente corta.",
    },
];

function SectorCard({ image, title, description }: CardData) {
    return (
        <div
            className="
        flex flex-col items-center
        flex-1 min-w-0
        p-5 gap-10
        border border-[#7047BD] rounded-3xl
        h-[520px]
      "
        >
            {/* Imagem */}
            <div className="flex-1 w-full rounded-[4px] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-[4px]"
                />
            </div>

            {/* Texto */}
            <div className="flex flex-col items-start gap-[14px] w-full shrink-0">
                <h3
                    className="
            w-full
            font-montserrat font-bold text-lg leading-normal
            text-center text-white
          "
                >
                    {title}
                </h3>
                <p
                    className="
            w-full
            font-montserrat font-medium text-sm leading-normal
            text-center text-[#BABABA]
          "
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Setores() {
    return (
        <section
            className="
        flex flex-col justify-center items-center
        px-10 py-[62px] gap-11
        w-full bg-[#0E0E0E]
      "
        >
            {/* Header */}
            <div className="flex flex-col items-start gap-5 w-full max-w-[780px]">
                <h2
                    className="
            w-full
            font-montserrat font-bold text-[40px] leading-[49px]
            text-center text-white
          "
                >
                    O que você pode esperar?
                </h2>
                <p
                    className="
            w-full
            font-montserrat font-normal text-xl leading-6
            text-center text-[#D9D7D7]
          "
                >
                    Resultados reais, construídos com estratégia e dados — não com sorte.
                </p>
            </div>

            {/* Cards */}
            <div className="flex flex-row items-start gap-11 w-full max-w-[1360px]">
                {cards.map((card, index) => (
                    <SectorCard key={index} {...card} />
                ))}
            </div>

            {/* CTA */}
            <FormModal buttonText="Quero começar" />
        </section>
    );
}