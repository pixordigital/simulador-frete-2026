1. Crie SPA Next.js (App Router) + TypeScript + Tailwind para Simulador de Frete 2026, otimizado para Edge/Cloudflare Pages.
2. Design: Tema escuro (bg-slate-950, cards bg-slate-900, azul focus), layout em grid com inputs e resultados em tempo real.
3. Inputs 1005 editaveis; Custos (Combustivel/km, Motorista, Seguro %, Overhead, Outros) e Rota (Km, Eixos, Pedagio destacado).
4. Regras Fiscais; Coeficientes ANTT (CCD, CC), Aliquotas ICMS, IVA Dual (CBS+IBS) e Margem de Lucro % editaveis.
5. Motor: Custo=(Km+Combustivel)+Motorista+Overhead+Outros. Piso ANTT=(Km*CCD)+CC. Preco com Gross Up de impostos. 
6. Pedagio: Lei 10209/2001. Somado apenas no preco final, fora da base de calculo de impostos e da margem de lucro.
7. Compliance: Alerta visual vermelho se Preco Final 9sem pedagio0 < Piso ANTT. Exiba selo verde se em conformidade.
8. Arquitetura: Codigo limpo, tipado e modular. Sem dependencias pesadas que quebrem o build do Cloudflare Pages.
9. Output: Gere os arquivos estruturados prontos para uso: page.tsx, componentes e utils/calculos.ts (sem acentos).
