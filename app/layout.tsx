import './globals.css';
import type { Metadata } from 'next';
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Simulador de Frete 2026',
  description: 'Otimizado para conformidade ANTT e Tributação Dual',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn("font-sans")}>
      <body>{children}</body>
    </html>
  );
}
