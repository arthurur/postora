FROM node:22.20-bookworm-slim AS builder

RUN corepack enable && corepack prepare pnpm@10.6.1 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps ./apps
COPY libraries ./libraries
RUN pnpm install --frozen-lockfile
RUN pnpm build:marketing

FROM node:22.20-bookworm-slim

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=4300

WORKDIR /app
COPY --from=builder --chown=node:node /app/apps/marketing-site/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/marketing-site/.next/static ./apps/marketing-site/.next/static
COPY --from=builder --chown=node:node /app/apps/marketing-site/public ./apps/marketing-site/public

USER node
EXPOSE 4300
CMD ["node", "apps/marketing-site/server.js"]
