# syntax=docker/dockerfile:1.7

# ---- build stage -----------------------------------------------------------
FROM node:24-alpine AS build

ENV PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH \
    CI=1

# pnpm via corepack — version matches packageManager in package.json.
RUN corepack enable

WORKDIR /app

# Install deps with cached layer.
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod=false

# Copy source and build.
COPY . .
RUN pnpm build

# ---- runtime stage ---------------------------------------------------------
FROM node:24-alpine AS runtime

ENV NODE_ENV=production \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

# Run as a non-root user.
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

# Only the Nitro server output is needed at runtime.
COPY --from=build --chown=app:app /app/.output ./.output

USER app
EXPOSE 3000

# Basic healthcheck — your orchestrator can also probe this.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", ".output/server/index.mjs"]
