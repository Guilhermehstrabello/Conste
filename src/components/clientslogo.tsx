import Image from "next/image";

export default function ClientsLogo() {
  return (
    <>
      <div
        x-data="{}"
        x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })"
        className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <ul x-ref="logos" className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          <li>
            <Image src="/Agrotuba.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Arita.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/bless.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/campconsulting.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/comercial.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/delux.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/doif.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/dom_portas.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Domus.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Dra Ethel Sfeir.png" width={120} height={70} alt="Disney" />
          </li>
          <li>
            <Image src="/Ella Belle.png" width={120} height={70} alt="Airbnb" />
          </li>
          <li>
            <Image src="/ep_tijolos.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/golden_boy.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/imperio.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Jackeline.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/je_polimetal.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/LeluhKids.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/maiale_pizza.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/meupet.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/patricia_yano.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Polimetal.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Qajuste.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Sogima Embalagens.png" width={120} height={70} alt="Facebook" />
          </li>
        </ul>

        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
        <li>
            <Image src="/Agrotuba.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Arita.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/bless.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/campconsulting.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/comercial.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/delux.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/doif.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/dom_portas.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Domus.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Dra Ethel Sfeir.png" width={120} height={70} alt="Disney" />
          </li>
          <li>
            <Image src="/Ella Belle.png" width={120} height={70} alt="Airbnb" />
          </li>
          <li>
            <Image src="/ep_tijolos.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/golden_boy.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/imperio.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Jackeline.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/je_polimetal.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/LeluhKids.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/maiale_pizza.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/meupet.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/patricia_yano.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Polimetal.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Qajuste.png" width={120} height={70} alt="Facebook" />
          </li>
          <li>
            <Image src="/Sogima Embalagens.png" width={120} height={70} alt="Facebook" />
          </li>
        </ul>
      </div>
    </>
  )
}