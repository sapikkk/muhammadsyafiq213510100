import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
import "./styles/ui-theme-wireframe-lock.css";
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
            __html: `(function(){try{var k="kokonus-ui-theme",t=localStorage.getItem(k),r=document.documentElement,b=document.body;if(t==="lime"){r.dataset.uiTheme="lime";r.dataset.system="lime";r.classList.add("lime-ui");b&&b.classList.add("lime");}else{r.dataset.uiTheme="wireframe";delete r.dataset.system;r.classList.remove("lime-ui");b&&b.classList.remove("lime");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} min-w-0 overflow-x-clip`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
