# Kabbalah Academy India — landing page

Bilingual (English + Hindi) landing page for the free Introductory Kabbalah Course. Built with Nuxt 4 + Nuxt UI v3, deployed on Cloudflare Pages.

## Local dev

```bash
pnpm install
cp .env.example .env   # then fill in NUXT_PUBLIC_WHATSAPP_NUMBER at minimum
pnpm dev
```

Open <http://localhost:3000>.

## Deploy

The Nitro `cloudflare-pages` preset produces a Workers-compatible bundle. Push to GitHub, connect the repo in the Cloudflare Pages dashboard, set the build command to `pnpm build`, and the output directory to `dist`. Cloudflare auto-provisions HTTPS for your custom domain.

**Environment variables** (set in the Cloudflare Pages dashboard → Settings → Environment variables; never commit):

| Variable                      | Required | Notes                                                               |
| ----------------------------- | -------- | ------------------------------------------------------------------- |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | yes      | Plain digits, country code first, no `+`. E.g. `919876543210`       |
| `NUXT_TELEGRAM_BOT_TOKEN`     | no       | Bot token from `@BotFather` — for instant signup notifications      |
| `NUXT_TELEGRAM_CHAT_ID`       | no       | Your chat id (from `bot<TOKEN>/getUpdates` after messaging the bot) |
| `NUXT_SIGNUP_WEBHOOK_URL`     | no       | URL each accepted signup is POSTed to as JSON                       |
| `NUXT_SIGNUP_WEBHOOK_TOKEN`   | no       | Sent as `Authorization: Bearer <token>` so your receiver can verify |

If neither Telegram nor webhook is configured, signups are still captured — they're logged to the Worker's stdout, visible in the Cloudflare Pages dashboard's real-time logs. Add a receiver later without losing anything.

The `Dockerfile` in the repo is dormant on Cloudflare Pages — it stays for local container testing and as an escape hatch if you ever move to a Node host.

## How signups are handled

The form posts to `POST /api/signup` (`server/api/signup.post.ts`). It:

- Re-validates the payload with the same valibot schema the client uses
- Drops bot submissions via a hidden honeypot field (`website`)
- Logs the accepted submission to stdout
- Pings your Telegram chat with a formatted card (if `NUXT_TELEGRAM_BOT_TOKEN` + `NUXT_TELEGRAM_CHAT_ID` are set) — tap the WhatsApp link to reply directly
- Forwards it to the generic webhook (if `NUXT_SIGNUP_WEBHOOK_URL` is set) — fires alongside Telegram
- Both deliveries run in parallel with 5s timeouts; failures are logged but not surfaced to the user

Rate limiting is delegated to Cloudflare — configure it in the Cloudflare dashboard under **Security → WAF → Rate limiting rules**. A sensible default is "10 requests per minute per IP to `/api/signup`".

## Security defaults

- `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` set via Nitro `routeRules`
- `/api/**` is `Cache-Control: no-store`
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
  utils/          # telegram.ts
tests/
  server/         # vitest unit tests
Designs/          # source design file (design.pen — Penpot JSON)
```
