import type { Metadata } from "next";
import { Victor_Mono, Imbue } from "next/font/google";
import "./globals.css";

const victorMono = Victor_Mono({
  variable: "--font-victor-mono",
  subsets: ["latin"],
});

const imbue = Imbue({
  variable: "--font-imbue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HH Goa 2026 ID Generator",
  description: "Generate your custom HH Goa 2026 ID Card and share it!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${victorMono.variable} ${imbue.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-mono">
        {children}
      </body>
    </html>
  );
}
