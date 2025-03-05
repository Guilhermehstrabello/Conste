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
            className="relative flex items-center justify-between w-full 2xl:w-[1360px] xl:max-w-[1200px] p-6 md:p-12 lg:p-20 border border-[#310276] rounded-md mx-auto 
                bg-[#3002766b] backdrop-blur-lg transition-all overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Texto à Esquerda */}
            <div className="w-1/3">
                <h1 className="text-2xl md:text-4xl font-bold text-[#A99F9E]">
                    {title}
                </h1>
            </div>

            {/* Imagem Aparecendo no Hover (Centralizada) */}
            {hover && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src={image}
                        alt="Imagem de Hover"
                        className="w-[150px] md:w-[200px] animate-fade-in transition-opacity duration-500"
                        width={200}
                        height={200}
                    />
                </div>
            )}

            {/* Texto à Direita */}
            <div className="w-1/3">
                <p className="text-sm md:text-base text-[#A99F9E]">
                {description}
                </p>
            </div>
        </div>
    );
}
