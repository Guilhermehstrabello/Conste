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
            <Image src="/Dra Ethel Sfeir.png" width={120} height={70} alt="Disney" />
          </li>
          <li>
            <Image src="/Ella Belle.png" width={120} height={70} alt="Airbnb" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/Hide Sushi.png" width={120} height={70} alt="Apple" />
          </li>
          <li>
            <Image src="/Jackeline.png" width={120} height={70} alt="Spark" />
          </li>
          <li>
            <Image src="/Leluh Kids.png" width={120} height={70} alt="Samsung" />
          </li>
          <li>
            <Image src="/Qajuste.png" width={120} height={70} alt="Quora" />
          </li>
          <li>
            <Image src="/Queropraxia.png" width={120} height={70} alt="Sass" />
          </li>
        </ul>
      </div>
    </>
  )
}