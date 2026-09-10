import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axiom - Operations Dashboard",
  description: "Classic minimalist operations dashboard built with Next.js and AG Grid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full bg-[#fafaf9]`}>
      <body className="h-full bg-[#fafaf9] text-stone-900 font-sans antialiased selection:bg-stone-200">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 p-6 md:p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}