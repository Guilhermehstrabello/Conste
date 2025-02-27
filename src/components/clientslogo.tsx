import Image from "next/image";

const logosTop = [
  "/Agrotuba.png",
  "/Arita.png",
  "/Domus.png",
  "/Dra Ethel Sfeir.png",
  "/Ella Belle.png",
  "/Hide Sushi.png",
];

const logosBottom = [
  "/Jackeline.png",
  "/Leluh Kids.png",
  "/Qajuste.png",
  "/Queropraxia.png",
  "/Sogima Embalagens.png",
];

// Componente
export default function ScrollingLogos() {
  return (
    <div className="overflow-hidden bg-background py-6">
      {/* Linha de cima */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scrollRight space-x-8">
          {logosTop.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          ))}
          {/* Repetindo para criar o loop infinito */}
          {logosTop.map((logo, index) => (
            <Image
              key={`copy-${index}`}
              src={logo}
              alt={`Logo ${index}`}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          ))}
        </div>
      </div>

      {/* Linha de baixo */}
      <div className="relative flex overflow-hidden mt-4">
        <div className="flex animate-scrollLeft space-x-8">
          {logosBottom.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          ))}
          {/* Repetindo para criar o loop infinito */}
          {logosBottom.map((logo, index) => (
            <Image
              key={`copy-${index}`}
              src={logo}
              alt={`Logo ${index}`}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
};