import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";

import { Providers } from "./providers";
import ModalWindow from "./modalWindow";

import { siteConfig } from "@/config/site";
import NavHeader from "@/components/navbar";
import ImageBgAnimation from "@/components/ImageBgAnimation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          `min-h-screen bg-background antialiased ${inter.className}`,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <CookiesProvider>
            <div className="relative flex flex-col h-screen *>font-mono">
              <ImageBgAnimation />
              <ModalWindow />
              <NavHeader />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </CookiesProvider>
        </Providers>
      </body>
    </html>
  );
}
