// Next
import type { Metadata } from "next";

// Css
import "./globals.css";

// Biblioteca
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: "Cataloguê - Seu Catálogo Digital",
    template: "%s | Cataloguê - Catálogo Digital",
    absolute: "Crie e Compartilhe Seu Catálogo Digital | Cataloguê"
  },
  description: "Crie, organize e compartilhe seus catálogos digitais de produtos com facilidade e rapidez no Cataloguê. Ideal para negócios e empreendedores.",
  keywords: [
    "catálogo digital",
    "organizar produtos",
    "vendas online",
    "catálogo eletrônico",
    "negócios",
    "empreendedores",
    "e-commerce"
  ],
  openGraph: {
    type: "website",
    title: "Cataloguê - Seu Catálogo Digital",
    description: "Descubra como criar e compartilhar catálogos digitais de produtos com facilidade. Ideal para negócios de todos os tamanhos.",
    // url: "https://www.catalogue.com.br",
    siteName: "Cataloguê",
    images: [
      {
        url: "blob:https://web.whatsapp.com/a2298796-2df2-4094-9b1e-84ae3599918a",
        width: 1200,
        height: 630,
        alt: "Cataloguê - Seu Catálogo Digital",
      }
    ],
    locale: "pt_BR",
  },
  twitter: {
    title: "Cataloguê - Seu Catálogo Digital",
    description: "A maneira mais fácil de criar e compartilhar seus catálogos digitais.",
    images: ["blob:https://web.whatsapp.com/a2298796-2df2-4094-9b1e-84ae3599918a"]
  },
  authors: [{ name: "Tiago Rafael" }],
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.catalogue.com.br",
    languages: {
      "pt-BR": "https://www.catalogue.com.br",
      "en-US": "https://www.catalogue.com.br/en",
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="">
        <NextTopLoader
          color="#2563eb"
        />
        {children}
      </body>
    </html>
  );
}
