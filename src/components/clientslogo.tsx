import Image from "next/image";

const logos = Array.from({ length: 34 }, (_, i) => ({
  src: `/${i + 1}.png`,
  alt: `Logo cliente ${i + 1}`,
}));

export default function ClientsLogo() {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden">
      <ul className="py-6 flex items-center justify-center md:justify-start [&_li]:mx-14 [&_img]:max-w-none animate-infinite-scroll">
        {logos.map((logo) => (
          <li key={`logo-${logo.src}`}>
            <Image src={logo.src} width={200} height={100} alt={logo.alt} />
          </li>
        ))}
      </ul>

      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-14 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {logos.map((logo) => (
          <li key={`logo-duplicate-${logo.src}`}>
            <Image src={logo.src} width={200} height={100} alt={logo.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}