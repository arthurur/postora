# Postora marketing site

Independent public Next.js App Router application for issue #1. It uses the app's Sass palette, Plus Jakarta Sans, Tailwind 3 and root workspace dependencies. It does not read `.env`, connect to the database, mount the authenticated app or call billing and provider services.

## Local commands

Use the repository's Node 22 and pnpm 10.6.1. Run these commands from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev:marketing
pnpm build:marketing
pnpm start:marketing
pnpm typecheck:marketing
pnpm lint:marketing
pnpm exec playwright install chromium
pnpm test:marketing
```

The site runs at `http://127.0.0.1:4300`. The test command builds and starts its own production server on that port; stop another marketing server before running it. `PLAYWRIGHT_CHANNEL=chrome pnpm test:marketing` uses an installed Chrome instead of Playwright's downloaded Chromium.

## Docker Compose

From the repository root, `docker compose up -d --build` builds and starts the marketing site alongside the existing Postiz service and its dependencies. The marketing site is available on host port 4300; the app remains on host port 4007. To rebuild the marketing image after site changes, run `docker compose up -d --build marketing-site`.

For the planned domains, point both DNS records at the Docker host and configure its HTTPS reverse proxy to send `postora.com.br` to port 4300 and `app.postora.com.br` to port 4007. The Compose file publishes those ports but does not manage DNS or TLS. The marketing image builds from this monorepo; the existing Postiz service still uses the upstream image unless the separate production deployment flow replaces it with a locally built image.

On the deployment host, set `FRONTEND_URL=https://app.postora.com.br` and `NEXT_PUBLIC_BACKEND_URL=https://app.postora.com.br/api` in the app's `.env` before building the Postiz image. These URLs are used in redirects, cookies, API calls and the frontend build. Keep `BACKEND_INTERNAL_URL` pointed at the backend inside the app container. The existing `deploy:production` command updates only Postiz; use the Compose marketing command above when deploying marketing changes.

`docker-compose.dev.yaml` remains the infrastructure-only development stack. Run `pnpm dev:marketing` alongside `pnpm dev` when using that stack.

The browser/HTTP seam covers all 18 canonical pages, initial HTML without JavaScript, metadata, internal links, redirects, 404 status, pricing in both directions, keyboard navigation and layouts at 320, 390, 768 and 1440px. It inspects signup/login targets without visiting them. No test connects to live accounts or publishes posts.

## Product screenshots

`fixtures/main.jsx` renders the unchanged `MonthView` and `ListView` from the authenticated app's `calendar.tsx`, with its Tailwind configuration, current palette, Portuguese translations, drag-and-drop provider and fictional posts. Creator Marina, Café Aurora and Agência Horizonte are fictional. The small heading around the calendar identifies the capture as demonstration content.

The isolated fixture replaces app service/context and modal entry points. Fetching throws, and the capture browser blocks all nonlocal requests. It never loads production customer data. The fixture is outside the Next.js source tree and is not a public route or production dependency.

To reproduce the WebP screenshots and social preview:

```sh
pnpm demo:marketing
# In another terminal, from the repository root:
pnpm capture:marketing
# Or use installed Chrome:
PLAYWRIGHT_CHANNEL=chrome pnpm capture:marketing
```

The demo binds only to `127.0.0.1:4301`. Desktop uses the monthly calendar; phones use a readable capture of the actual list view. Both images open at full resolution. The font is the existing app's cached Latin Plus Jakarta Sans variable font, distributed under the included SIL OFL.

## Content sources and launch boundary

- The scope is `docs/spec-marketing-site.md` and GitHub issue #1, with approved design A. Context is in `CONTEXT.md`; the boundary is `docs/adr/0001-separate-marketing-app.md`.
- `src/content/pricing.ts` defines the approved BRL offer. Entitlements were checked against `libraries/nestjs-libraries/src/database/prisma/subscriptions/pricing.ts`, backend permissions, frontend billing, and media/subscription services. Standard's disabled image-generator flag takes precedence over its numeric allowance in the marketing comparison.
- Channel copy was checked against `libraries/nestjs-libraries/src/integrations/social/` and provider settings. The catalog includes only the seven launch networks.
- MCP names and inputs come from `chat/tools/tool.list.ts`, the twelve registered tools, `load.tools.service.ts` and `start.mcp.ts`. Public API settings and organization permissions determine where users find their key.
- Client setup syntax was checked on 2026-09-22 against the official [Claude Code](https://code.claude.com/docs/en/mcp), [Codex](https://developers.openai.com/codex/mcp), and [Cursor](https://cursor.com/docs/mcp) documentation. Public examples use placeholders; they do not claim a deployed hostname or verified live connection.

BRL checkout alignment and live MCP connectivity remain separate launch checks. Building this app does not configure subscriptions, deploy infrastructure or establish that checkout matches the advertised prices. Existing app commands, production settings, backend code and workflows are unchanged.

## Verification for issue #1

Verified locally on 2026-09-22 with Node 22.23.1, pnpm 10.6.1 and installed Chrome:

- Production build, application typecheck and marketing lint from the repository root passed.
- All nine Playwright tests passed, covering 18 canonical routes and the browser/HTTP behavior described above.
- Visually inspected real calendar/list assets, desktop homepage, 320px and 390px layouts, annual prices and narrow documentation code blocks.
- Frozen pnpm lockfile validation passed. Playwright is an explicit root development dependency.
- The inherited root Jest command was attempted once. It cannot load `jest.config.ts` because `@nx/jest` is absent. No unrelated test infrastructure was changed.

## Standards review

Independent review found no actionable documented-standard violations or practical code smells. The application follows the workspace, React, routing and pnpm conventions, shares the existing palette, and keeps the authenticated runtime separate. The screenshot fixture imports the real calendar without altering it. A minor image enlargement mismatch was corrected so phone visitors open the list image they see.

## Spec review

Independent review found one minor omission: the `postsListTool` reference did not include its optional `customer` input. The reference now describes that field and obtains its ID through `groupList`. No other substantive spec discrepancy was found. The final browser checks confirmed rendering and behavior, including useful 404 pages without JavaScript.
