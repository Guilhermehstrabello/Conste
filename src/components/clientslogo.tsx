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
            <Image src="/3Afest.png" width={200} height={100} alt="3Afest" />
          </li>
          <li>
            <Image src="/Agrotuba.png" width={200} height={100} alt="Agrotuba" />
          </li>
          <li>
            <Image src="/Alumifine.png" width={200} height={100} alt="Alumifine" />
          </li>
          <li>
            <Image src="/Bless.png" width={200} height={100} alt="Bless" />
          </li>
          <li>
            <Image src="/Campconsulting.png" width={200} height={100} alt="Campconsulting" />
          </li>
          <li>
            <Image src="/Centopeia.png" width={200} height={100} alt="Centopeia" />
          </li>
          <li>
            <Image src="/Comercial.png" width={200} height={100} alt="Comercial" />
          </li>
          <li>
            <Image src="/Delux.png" width={200} height={100} alt="Delux" />
          </li>
          <li>
            <Image src="/Domus.png" width={200} height={100} alt="Domus" />
          </li>
          <li>
            <Image src="/Dra_Ethel.png" width={200} height={100} alt="Dra Ethel" />
          </li>
          <li>
            <Image src="/Drix.png" width={200} height={100} alt="Drix" />
          </li>
          <li>
            <Image src="/Ep_tijolos.png" width={200} height={100} alt="Ep tijolos" />
          </li>
          <li>
            <Image src="/Imperio.png" width={200} height={100} alt="Imperio" />
          </li>
          <li>
            <Image src="/Jackeline.png" width={200} height={100} alt="Jackeline" />
          </li>
          <li>
            <Image src="/JE_polimetal.png" width={200} height={100} alt="JE polimetal" />
          </li>
          <li>
            <Image src="/Jmex.png" width={200} height={100} alt="Jmex" />
          </li>
          <li>
            <Image src="/LeluhKids.png" width={200} height={100} alt="Leluh Kids" />
          </li>
          <li>
            <Image src="/Maile.png" width={200} height={100} alt="Maile" />
          </li>
          <li>
            <Image src="/Meu_pet.png" width={200} height={100} alt="Meu pet" />
          </li>
          <li>
            <Image src="/Monstermill.png" width={200} height={100} alt="Monstermill" />
          </li>
          <li>
            <Image src="/Patricia_yano.png" width={200} height={100} alt="Patricia Yano" />
          </li>
          <li>
            <Image src="/Qajuste.png" width={200} height={100} alt="Qajuste" />
          </li>
          <li>
            <Image src="/Rei_do_basico.png" width={200} height={100} alt="Rei do basico" />
          </li>
          <li>
            <Image src="/Sathya.png" width={200} height={100} alt="Sathya" />
          </li>
          <li>
            <Image src="/SHT.png" width={200} height={100} alt="SHT" />
          </li>
        </ul>

        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
          <li>
            <Image src="/3Afest.png" width={200} height={100} alt="3Afest" />
          </li>
          <li>
            <Image src="/Agrotuba.png" width={200} height={100} alt="Agrotuba" />
          </li>
          <li>
            <Image src="/Alumifine.png" width={200} height={100} alt="Alumifine" />
          </li>
          <li>
            <Image src="/Bless.png" width={200} height={100} alt="Bless" />
          </li>
          <li>
            <Image src="/Campconsulting.png" width={200} height={100} alt="Campconsulting" />
          </li>
          <li>
            <Image src="/Centopeia.png" width={200} height={100} alt="Centopeia" />
          </li>
          <li>
            <Image src="/Comercial.png" width={200} height={100} alt="Comercial" />
          </li>
          <li>
            <Image src="/Delux.png" width={200} height={100} alt="Delux" />
          </li>
          <li>
            <Image src="/Domus.png" width={200} height={100} alt="Domus" />
          </li>
          <li>
            <Image src="/Dra_Ethel.png" width={200} height={100} alt="Dra Ethel" />
          </li>
          <li>
            <Image src="/Drix.png" width={200} height={100} alt="Drix" />
          </li>
          <li>
            <Image src="/EpTijolos.png" width={200} height={100} alt="Ep tijolos" />
          </li>
          <li>
            <Image src="/Imperio.png" width={200} height={100} alt="Imperio" />
          </li>
          <li>
            <Image src="/Jackeline.png" width={200} height={100} alt="Jackeline" />
          </li>
          <li>
            <Image src="/JEPolimetal.png" width={200} height={100} alt="JE polimetal" />
          </li>
          <li>
            <Image src="/Jmex.png" width={200} height={100} alt="Jmex" />
          </li>
          <li>
            <Image src="/LeluhKids.png" width={200} height={100} alt="Leluh Kids" />
          </li>
          <li>
            <Image src="/Maile.png" width={200} height={100} alt="Maile" />
          </li>
          <li>
            <Image src="/Meu_pet.png" width={200} height={100} alt="Meu pet" />
          </li>
          <li>
            <Image src="/Monstermill.png" width={200} height={100} alt="Monstermill" />
          </li>
          <li>
            <Image src="/Patricia_yano.png" width={200} height={100} alt="Patricia Yano" />
          </li>
          <li>
            <Image src="/Qajuste.png" width={200} height={100} alt="Qajuste" />
          </li>
          <li>
            <Image src="/Rei_do_basico.png" width={200} height={100} alt="Rei do basico" />
          </li>
          <li>
            <Image src="/Sathya.png" width={200} height={100} alt="Sathya" />
          </li>
          <li>
            <Image src="/SHT.png" width={200} height={100} alt="SHT" />
          </li>
        </ul>
      </div>
    </>
  )
}