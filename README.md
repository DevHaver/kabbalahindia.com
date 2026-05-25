# Kabbalah Academy India — landing page

Bilingual (English + Hindi) landing page for the free Introductory Kabbalah Course at [kabbalahindia.com](https://kabbalahindia.com).

## Tech stack

- **[Nuxt 4](https://nuxt.com/)** with Vue 3 — SSR + prerendered routes
- **[Nuxt UI v3](https://ui.nuxt.com/)** — components and Tailwind layer
- **[@nuxt/fonts](https://fonts.nuxt.com/)**, **[@nuxt/image](https://image.nuxt.com/)**, **[@vueuse/nuxt](https://vueuse.org/nuxt/README.html)**
- **[valibot](https://valibot.dev/)** — schema validation, client + server
- **[vitest](https://vitest.dev/)** with `happy-dom` — unit tests
- **[Cloudflare Pages](https://pages.cloudflare.com/)** — hosting, via Nitro's `cloudflare-pages` preset
- **[pnpm 11](https://pnpm.io/)** — package manager

## Local development

Requires Node 22+ and pnpm 11+.

```bash
git clone git@github.com:DevHaver/kabbalahindia.com.git
cd kabbalahindia.com
pnpm install
cp .env.example .env   # fill in NUXT_PUBLIC_WHATSAPP_URL at minimum
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Script         | What it does                                  |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Start the Nuxt dev server on `0.0.0.0:3000`   |
| `pnpm build`   | Production build (`cloudflare-pages` preset)  |
| `pnpm preview` | Preview the production build locally          |
| `pnpm test`    | Run the vitest suite                          |
| `pnpm lint`    | `nuxt typecheck` + ESLint                     |
| `pnpm format`  | Prettier write across the repo                |

Please run `pnpm lint` and `pnpm test` before opening a PR.

## Project structure

```
app/
  assets/css/     # design tokens (gemstone palette, typography)
  components/     # primitives + section components
  composables/    # shared composables
  pages/          # landing page
  plugins/        # client-only plugins (analytics, etc.)
server/
  api/            # API route handlers
  middleware/     # request middleware
  utils/          # server-side helpers
tests/server/     # vitest unit tests
Designs/          # Penpot design source (design.pen)
```

## Environment variables

Names are prefixed `NUXT_` so they bind to `runtimeConfig` automatically. See `.env.example` for the full list with inline comments.

| Variable                       | Required | Purpose                                                 |
| ------------------------------ | -------- | ------------------------------------------------------- |
| `NUXT_PUBLIC_WHATSAPP_URL`     | yes      | WhatsApp group invite or `wa.me/...` link               |
| `NUXT_PUBLIC_UMAMI_WEBSITE_ID` | no       | Umami site UUID; analytics is disabled when unset       |
| `NUXT_TELEGRAM_BOT_TOKEN`      | no       | Telegram bot token for signup notifications             |
| `NUXT_TELEGRAM_CHAT_ID`        | no       | Telegram chat ID to deliver notifications to            |
| `NUXT_SIGNUP_WEBHOOK_URL`      | no       | Optional outbound webhook for signups                   |
| `NUXT_SIGNUP_WEBHOOK_TOKEN`    | no       | Bearer token sent with the webhook request              |

Never commit a `.env` file. `.env*` is gitignored except for `.env.example`.

## Deploy

Production deploys to Cloudflare Pages. Push to `main`, Cloudflare picks it up from the connected GitHub repo and builds with the Nitro `cloudflare-pages` preset. Environment variables are configured in the Cloudflare Pages dashboard under **Settings → Environment variables**.

The `Dockerfile` at the repo root is unused in production and kept only for local container experiments.

## Contributing

PRs are welcome. A few notes to make review smoother:

1. **Open an issue first** for anything larger than a small fix — it's faster than a back-and-forth on a PR.
2. **One concern per PR.** Mixing a refactor with a feature makes things hard to review.
3. **Run `pnpm lint` and `pnpm test` locally.** CI will run them too, but it's slower.
4. **Conventional commit messages** (`feat:`, `fix:`, `chore:`, `docs:`, …).
5. **Keep design changes consistent with the Penpot file** in `Designs/`.

## Reporting a security issue

Please do **not** open a public issue for security reports. Email the maintainers privately and we will respond as soon as possible. Coordinated disclosure is appreciated.
