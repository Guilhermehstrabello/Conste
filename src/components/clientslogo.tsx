import Image from "next/image";

const logos = [
  "/Agrotuba.png",
  "/Arita.png",
  "/Domus.png",
  "/Dra Ethel Sfeir.png",
  "/Ella Belle.png",
  "/Hide Sushi.png",
  "/Jackeline.png",
  "/Leluh Kids.png",
  "/Qajuste.png",
  "/Queropraxia.png",
  "/Sogima Embalagens.png",
];

export default function ScrollingLogos() {
  return (
    <div className="overflow-hidden bg-background py-12">
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scrollLeft space-x-2 w-fit">
          {logos.concat(logos).map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              width={120}
              height={120}
              className="h-16 w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
