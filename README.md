# Pklage.no

> Klage på urettmessig parkeringsgebyr — på 60 sekunder.

AI-generert, juridisk korrekt klage på private parkeringsgebyrer i Norge. **Gratis å lage. 149 kr kun hvis du sender.**

## Stack

- **Next.js 16** (App Router, Turbopack)
- **AI SDK v6** via Vercel AI Gateway (`anthropic/claude-sonnet-4-6`)
- **Stripe Checkout** for engangsbetaling (NOK)
- **Tailwind v4** + custom design system
- **Zod** for validering
- TypeScript strict

## Kjør lokalt

```bash
cp .env.example .env.local
# Legg inn AI_GATEWAY_API_KEY (eller ANTHROPIC_API_KEY) for ekte AI-generering
# La Stripe-nøklene stå tomme for å bruke demo-flowen (låses opp uten betaling)

npm run dev
```

Åpne <http://localhost:3000>.

## Routes

- `/` — landingsside (SEO-optimalisert mot "klage parkeringsgebyr")
- `/klage` — 5-stegs wizard + bilder + paywallet preview
- `/api/generate` — streamer ferdig klage (header JSON + `\n---\n` + body)
- `/api/checkout` — Stripe Checkout session for 149 NOK

## Deploy

```bash
vercel deploy        # preview
vercel deploy --prod # production
```

Sett `AI_GATEWAY_API_KEY` og `STRIPE_SECRET_KEY` i Vercel-prosjektet før prod.
