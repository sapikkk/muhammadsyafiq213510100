import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
import "./styles/ui-theme-lime.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kokonus Farm",
  description: "Tata kelola biaya produksi hidroponik rakit apung.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-ui-theme="wireframe" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="kokonus-ui-theme",t=localStorage.getItem(k);if(t==="lime"){document.documentElement.dataset.uiTheme="lime";document.documentElement.classList.add("lime-ui");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} min-w-0 overflow-x-clip`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
