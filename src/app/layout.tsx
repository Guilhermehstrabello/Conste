import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next"

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
        <Analytics />
        <GoogleTagManager gtmId="GTM-TVRWH47F" />
        {children}
      </body>
    </html>
  );
}
