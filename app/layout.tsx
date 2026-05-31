import './globals.css';
import type { Metadata } from 'next';

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
