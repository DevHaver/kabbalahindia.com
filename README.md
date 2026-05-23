# Kabbalah Academy India — landing page

Bilingual (English + Hindi) landing page for the free Introductory Kabbalah Course. Built with Nuxt 4 + Nuxt UI v3, runs as a Node SSR app.

## Local dev

```bash
pnpm install
cp .env.example .env   # then fill in NUXT_PUBLIC_WHATSAPP_NUMBER at minimum
pnpm dev
```

Open <http://localhost:3000>.

## Deploy

The repo ships a multi-stage `Dockerfile` and `.dockerignore`. Build the image, run it on port `3000`, set the environment variables below, point your domain at it, and enable HTTPS.

```bash
docker build -t kabbalahindia .
docker run --rm -p 3000:3000 \
  -e NUXT_PUBLIC_WHATSAPP_NUMBER=919876543210 \
  -e NUXT_SIGNUP_WEBHOOK_URL=https://your.webhook/endpoint \
  kabbalahindia
```

**Environment variables** (set in your host's secret store, never commit):

| Variable                      | Required | Notes                                                               |
| ----------------------------- | -------- | ------------------------------------------------------------------- |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | yes      | Plain digits, country code first, no `+`. E.g. `919876543210`       |
| `NUXT_TELEGRAM_BOT_TOKEN`     | no       | Bot token from `@BotFather` — for instant signup notifications      |
| `NUXT_TELEGRAM_CHAT_ID`       | no       | Your chat id (from `bot<TOKEN>/getUpdates` after messaging the bot) |
| `NUXT_SIGNUP_WEBHOOK_URL`     | no       | URL each accepted signup is POSTed to as JSON                       |
| `NUXT_SIGNUP_WEBHOOK_TOKEN`   | no       | Sent as `Authorization: Bearer <token>` so your receiver can verify |

If neither Telegram nor webhook is configured, signups are still captured — they're logged to stdout as `[signup] {...JSON...}` lines, which any container host retains. Add a receiver later without losing anything.

## How signups are handled

The form posts to `POST /api/signup` (`server/api/signup.post.ts`). It:

- Re-validates the payload with the same valibot schema the client uses
- Drops bot submissions via a hidden honeypot field (`website`)
- Per-IP fixed-window rate limit: 5 attempts per hour (in-memory)
- Logs the accepted submission to stdout
- Pings your Telegram chat with a formatted card (if `NUXT_TELEGRAM_BOT_TOKEN` + `NUXT_TELEGRAM_CHAT_ID` are set) — tap the WhatsApp link to reply directly
- Forwards it to the generic webhook (if `NUXT_SIGNUP_WEBHOOK_URL` is set) — fires alongside Telegram
- Both deliveries run in parallel with 5s timeouts; failures are logged but not surfaced to the user

## Security defaults

- `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` set via Nitro `routeRules`
- `/api/**` is `Cache-Control: no-store`
- Docker image runs as a non-root `app` user
- `.env*` is gitignored (except `.env.example`)

## Project structure

```
app/
  components/     # 23 components — primitives + 15 section components
  pages/          # single landing page at /
  assets/css/     # gemstone palette + font tokens
  composables/    # useWhatsApp
server/
  api/            # signup.post.ts
  utils/          # rateLimit.ts
Designs/          # source design file (design.pen — Penpot JSON)
```
