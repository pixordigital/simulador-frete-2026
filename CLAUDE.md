# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
- Build: `npm run build`
- Development: `npm run dev`
- Lint: `npm run lint`
- Tests: `npm test` (standard Jest/Vitest setup expected)

## Architecture and Logic
- **Framework**: Next.js 14+ (App Router) using TypeScript and Tailwind CSS.
- **Core Logic**: Located in `utils/calculos.ts`.
    - Handles freight cost calculation including insurance and overhead.
    - Implements **ANTT Floor** compliance check: `(Km * CCD) + CC`.
    - Implements **Tax Gross-up**: Price is calculated "inside" the tax rate for ICMS, CBS, and IBS.
    - **Toll Handling**: According to Law 10209/2001, tolls are added at the final step and are excluded from the tax and profit margin base.
- **UI Structure**: Single-page application in `app/page.tsx` with real-time state synchronization between inputs and the financial summary.
- **Deployment Target**: Optimized for Edge runtime (Cloudflare Pages).
