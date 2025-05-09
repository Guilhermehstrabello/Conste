import Image from "next/image";
import { useState } from "react";

interface GlassCardProps {
    title: string;
    description: string;
    image: string;
}

export default function GlassCard({ title, description, image }: GlassCardProps) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="md:flex-row flex-col relative flex items-center justify-center md:justify-between w-11/12 lg:w-[1200px] p-6 md:p-12 lg:p-20 border hover:border-[#310276] border-transparent bg-[#6b63ff18] rounded-md mx-auto 
                hover:bg-[#3002763a] backdrop-blur-lg transition-all overflow-hidden text-[#A99F9E] hover:text-white duration-300 space-y-6"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Texto à Esquerda */}
            <div className="md:w-1/3 w-full">
                <h1 className="text-2xl md:text-4xl font-bold">
                    {title}
                </h1>
            </div>

            {/*
            {/* Imagem Aparecendo no Hover (Centralizada) * /}
            {hover && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src={image}
                        alt="Imagem de Hover"
                        className="w-[150px] md:w-[200px] animate-fade-in transition-opacity duration-1000"
                        width={200}
                        height={200}
                    />
                </div>
            )}
            */}

            {/* Texto à Direita */}
            <div className="md:w-1/3 w-full">
                <p className="text-sm md:text-base ">
                {description}
                </p>
            </div>
        </div>
    );
}
