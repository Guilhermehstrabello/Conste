import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import SmoothScroll from "@/components/scroll";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "Conste",
  description: `Na Conste, a gente não aposta em sorte, e sim em constância. 
  Criamos estratégias de marketing que entregam resultado hoje, amanhã e depois. Nada de picos passageiros: aqui, o crescimento é contínuo.
  Sempre constantes, sempre crescendo.`,
  icons: {
    icon: "/icone_conste.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-montserrat">
          {/* Script Microsoft Clarity */}
        <Script
          id="microsoft-clarity-analytics"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sjxf5yw5cb");
          `}
        </Script>
        <Analytics />
        <GoogleTagManager gtmId="GTM-TVRWH47F" />
        <AuthProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
