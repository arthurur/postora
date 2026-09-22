# Postora marketing site

Status: prepared from the completed requirements interview and approved design A. The user confirmed browser-level checks and visual review. Published as [GitHub issue #1](https://github.com/arthurur/postora/issues/1) with the ready-for-agent label.

## Problem Statement

People considering Postora currently encounter an authenticated app without a public introduction to the product. Brazilian creators, business owners, freelance social media managers, and agencies need to understand what Postora does, whether it supports their channels, how much it costs, and how to start a free trial before creating an account.

People who want to use an external AI agent also need Portuguese instructions that describe Postora's own connection process and capabilities. Postiz's hosted services, marketplace listings, and setup instructions cannot be assumed to work for the Postora deployment.

## Solution

Build a Brazilian Portuguese marketing site at https://postora.com.br, separate from the authenticated app at https://app.postora.com.br. Use the app's visual language and the approved design A: a left-aligned introduction and primary call to action alongside a product calendar on wide screens, with the introduction above the calendar when horizontal space is insufficient.

Provide a homepage, pricing, seven social network pages and a directory, three AI agent pages and an overview, and four MCP documentation pages. Every primary signup action reads "Começar por R$0" and links to https://app.postora.com.br/auth. Explain that the offer is a seven-day free trial.

Show the agreed BRL plans with monthly and discounted annual billing. Explain the product through real app screenshots populated with fictional content. Use original Portuguese copy that reflects verified Postora functionality, with Postiz as a reference for page structure and subject matter.

## User Stories

1. As a visitor, I want to view the marketing site without signing in, so that I can evaluate Postora before creating an account.
2. As a Brazilian visitor, I want navigation, product descriptions, prices, and documentation in Brazilian Portuguese, so that I can understand the offer without translating it.
3. As an individual creator, I want to see how Postora helps me plan my own content, so that I can maintain a consistent social presence.
4. As a business owner, I want to understand how advance scheduling fits around running my business, so that I can decide whether Postora suits my routine.
5. As a freelance social media manager, I want to understand how Postora organizes connected accounts and publishing, so that I can evaluate it for client work.
6. As an agency member, I want to understand the available collaboration and plan capabilities, so that I can choose a suitable plan for my team.
7. As a visitor, I want to see the real product interface with representative content, so that I understand what I will use after signing up.
8. As a desktop visitor, I want to see the main product message and calendar together, so that I can connect the explanation to the interface.
9. As a mobile visitor, I want the introduction, signup action, and calendar to stack clearly, so that I can read the page without horizontal scrolling.
10. As a keyboard user, I want to navigate links, open mobile navigation, and switch pricing periods, so that I can use the site without a mouse.
11. As a screen reader user, I want meaningful headings, control labels, image descriptions, and pricing state, so that the content and interactions are understandable.
12. As a visitor, I want navigation to pricing, channels, agents, and documentation, so that I can find the information relevant to my decision.
13. As a prospective customer, I want the signup action to open Postora registration, so that I can begin trying the product.
14. As a returning customer, I want an explicit login link to the app, so that I can reach my existing account.
15. As a prospective customer, I want to know that the R$0 offer lasts seven days, so that I do not mistake it for a permanent free plan.
16. As a prospective customer, I want to compare Standard, Team, Pro, and Ultimate in reais, so that I can evaluate the cost for my needs.
17. As a prospective customer, I want to switch between monthly and annual pricing, so that I can compare the available billing periods.
18. As an annual customer, I want to see both the annual charge and its monthly equivalent, so that the amount charged is clear.
19. As a prospective customer, I want to see the 25% annual discount, so that I can understand the saving against twelve monthly payments.
20. As a customer managing multiple profiles, I want to know that each connected account or page uses a channel slot, so that I can choose the correct plan even when several accounts belong to the same network.
21. As a prospective customer, I want plan comparisons to reflect actual product entitlements, so that I do not choose a plan based on unavailable features.
22. As a visitor, I want a directory of the seven launch networks, so that I can quickly check whether Postora covers the networks I use.
23. As an X user, I want an X-specific page, so that I can understand Postora's supported publishing capabilities for that network.
24. As an Instagram user, I want an Instagram-specific page that explains supported formats and account requirements, so that I can assess whether my account and content fit.
25. As a Facebook user, I want a Facebook-specific page that describes the supported account types and publishing capabilities, so that I can evaluate it for my business.
26. As a TikTok user, I want a TikTok-specific page, so that I can understand its supported publishing workflow.
27. As a YouTube user, I want a YouTube-specific page, so that I can understand how the supported video workflow fits my channel.
28. As a LinkedIn user, I want a LinkedIn-specific page, so that I can understand the supported profile and page publishing capabilities.
29. As a Threads user, I want a Threads-specific page, so that I can understand how Postora supports publishing to that network.
30. As a visitor, I want channel-specific limitations to be clear, so that I do not assume every network supports the same formats or analytics.
31. As an AI agent user, I want an overview of the launch integrations, so that I can identify a suitable way to connect my assistant.
32. As a Claude Code user, I want a dedicated integration page linked to setup instructions, so that I can configure Postora as an MCP server.
33. As a Codex user, I want a dedicated integration page linked to setup instructions, so that I can configure Postora as an MCP server.
34. As a Cursor user, I want a dedicated integration page linked to setup instructions, so that I can configure Postora as an MCP server.
35. As an AI agent user, I want an introduction to what Postora exposes through MCP, so that I can understand the connection before configuring it.
36. As an organization administrator, I want instructions for obtaining the Postora API key and connection address from the app, so that I can configure my client using the correct credentials and endpoint.
37. As an AI agent user, I want to understand which account permissions and API entitlements are required, so that I can resolve missing developer settings or credentials.
38. As an AI agent user, I want a reference for the tools and their inputs and limits, so that I can understand what my assistant can do.
39. As an AI agent user, I want examples using the launch networks, so that I can try relevant scheduling and draft workflows.
40. As an AI agent user, I want to distinguish my AI client's access from Postora's media generation credentials and allowances, so that I understand which service supplies each capability.
41. As an AI agent user, I want instructions for checking a connection and updating credentials after key rotation, so that I can recover from common setup problems.
42. As a visitor arriving from search or a shared link, I want a descriptive title and preview for the specific page, so that I understand its relevance before opening it.
43. As a visitor following an invalid link, I want a useful not-found page, so that I can return to the product information.
44. As an existing customer, I want the new public site to leave the authenticated app's URLs and behavior intact, so that my current workflow continues working.

## Implementation Decisions

### Application boundary

- Build a separate marketing application in the existing marketing-site workspace package. Use the repository's installed Next.js App Router, React, Tailwind 3, and pnpm conventions. The authenticated frontend is Next.js despite older repository prose describing it as Vite.
- Keep the marketing application independently buildable and runnable, with additive development and build commands. Do not change the behavior of existing app commands or production deployment configuration as part of this feature.
- Public pages must render without an authenticated session, database connection, billing call, or running app backend. Do not import the authenticated app shell, session providers, or authentication redirects into the marketing application.
- Use shared styling and compatible presentational primitives where they remain independent of app-only runtime dependencies. Do not refactor the authenticated application merely to share a marketing component.
- Use the existing single-context domain glossary and the accepted separate-app architecture decision. No database schema changes, migrations, backend API changes, Temporal workflow changes, or provider behavior changes are required.

### Public URL contract

The following route naming is the implementation contract for the agreed page scope. Paths in this table are public URLs, not source file locations.

| Public path | Purpose |
| --- | --- |
| `/` | Homepage |
| `/precos` | Pricing and focused pricing FAQ |
| `/canais` | Launch network directory |
| `/canais/x` | X |
| `/canais/instagram` | Instagram |
| `/canais/facebook` | Facebook |
| `/canais/tiktok` | TikTok |
| `/canais/youtube` | YouTube |
| `/canais/linkedin` | LinkedIn |
| `/canais/threads` | Threads |
| `/agentes` | AI agent overview |
| `/agentes/claude-code` | Claude Code |
| `/agentes/codex` | Codex |
| `/agentes/cursor` | Cursor |
| `/docs/mcp/introducao` | MCP introduction |
| `/docs/mcp/configuracao` | Client setup |
| `/docs/mcp/ferramentas` | Tools reference |
| `/docs/mcp/exemplos` | Examples |

- Resolve `/docs` and `/docs/mcp` to the MCP introduction. These are navigation conveniences, not additional documentation topics.
- Use reusable layouts and typed page content for channel and agent families. Keep network-specific descriptions in the relevant content entries; do not mix provider-specific behavior into generic rendering logic.
- Directory and overview entries link to their corresponding detail pages. Detail pages offer signup and relevant navigation back to the directory or documentation.
- Unknown routes render a useful not-found response rather than falling through to app authentication or a generic supported-channel page.

### Design and content

- Implement approved design A, not design B. On wide screens, place the left-aligned headline, description, trial CTA, and pricing link beside the product calendar screenshot.
- At widths where both columns no longer fit comfortably, stack the introduction and CTA above the calendar. Preserve left alignment; the mobile arrangement resembles B's stacking without adopting its centered typography or headline.
- Preserve A's selected headline: "Seu conteúdo. Suas redes. Um só calendário." Supporting copy should address people managing their own brand as well as client brands.
- Use Plus Jakarta Sans and the existing app palette, including its purple primary action, neutral surfaces, borders, and appropriate text contrast. Use current design tokens rather than deprecated custom-color tokens. Keep information dense and copy concise, without em dashes or continuously repainting animations.
- Retain the agreed homepage topics: product introduction, launch networks, scheduling and publishing benefits, the four audiences, plan summary, three AI agents, and entry points to the four documentation topics.
- Use real app screenshots with fictional demo content for creators, businesses, and agencies. The proposal's hand-built calendar is illustrative only and is not the final product screenshot. Capture screenshots from controlled local/demo states, not production customer accounts.
- Use original Brazilian Portuguese product copy. Keep public content Portuguese regardless of the visitor's browser language. Reuse the existing translation infrastructure if it helps without importing app runtime dependencies; a language switcher is not required.
- Do not inherit Postiz testimonials, customer counts, official connector listings, service promises, refund terms, or self-hosting offers as Postora claims.
- Channel pages explain the relevant formats, account requirements, workflow, and limitations verified against the existing provider implementations. Avoid unsupported claims about inboxes, optimal posting-time automation, approvals, or universal analytics.
- Limit the advertised launch network catalog to the seven selected networks. The broader provider registry is not evidence that those other networks are offered by Postora.
- Provide semantic navigation, visible focus, labeled controls, accessible mobile navigation, meaningful screenshot descriptions, and readable text. All content must remain usable at narrow phone widths without page-level horizontal overflow.

### Pricing and conversion

| Plan | Monthly price | Annual charge | Monthly equivalent on annual billing | Connected channels |
| --- | ---: | ---: | ---: | ---: |
| Standard | R$80 | R$720 | R$60 | 5 |
| Team | R$120 | R$1.080 | R$90 | 10 |
| Pro | R$150 | R$1.350 | R$112,50 | 30 |
| Ultimate | R$250 | R$2.250 | R$187,50 | 100 |

- Annual charges equal twelve monthly payments less 25%. The annual totals already contain no fractional reais; do not round monthly equivalents in a way that changes the annual charge or advertised discount.
- Start with monthly pricing selected, as in the approved prototype. Switching billing periods updates all four displayed prices and their billing explanations together. Show the annual total prominently enough to make the actual charge clear.
- Keep pricing consistent between the homepage summary and pricing page through one marketing pricing definition. Do not source BRL marketing prices from the inherited USD billing configuration, and do not modify checkout to make this spec pass.
- Retain existing plan entitlements. Before writing the detailed comparison, check current feature availability and enforcement; do not infer availability from a numerical allowance alone when its feature flag is disabled.
- Explain a channel as one connected account, profile, or page. Multiple accounts on one social network consume multiple channel slots.
- Every primary signup CTA uses "Começar por R$0" and links to https://app.postora.com.br/auth. Explain the seven-day free trial near the offer. Do not invent a no-card-required promise, automatic plan selection, checkout link, or permanent free tier.
- Login links target https://app.postora.com.br/auth/login. Billing selection changes the displayed offer; it does not add an unverified checkout or signup query contract.
- BRL checkout configuration remains separate work and must be aligned with advertised pricing before public launch. Completion of the marketing implementation does not establish that checkout is ready.

### AI agents and documentation

- Launch agent pages for Claude Code, Codex, and Cursor, plus their overview. Defer ChatGPT and Claude chat until their connections have been validated against the Postora deployment.
- Link agent pages to Portuguese documentation hosted on the marketing domain. Do not send customers to upstream Postiz credentials or endpoints as if those belong to Postora.
- Write MCP documentation against the tools and schemas actually implemented in this fork. Postiz's current documentation may include tools absent from this version; do not copy its tool count or claim unsupported operations.
- Explain that Postora operates the MCP endpoint and social-provider applications, while customers connect their social accounts and configure their AI client using their organization's Postora API key and actual connection address.
- Direct customers to the developer settings in the app for their endpoint and key. Explain the relevant administrator and API-entitlement requirements. Use placeholders in public examples; do not invent a deployed MCP hostname or expose real credentials.
- Describe the supported API-key connection paths accurately. Verify client setup syntax against current primary client documentation during implementation. Do not promise an official marketplace listing or universally automatic OAuth setup.
- Explain the difference between external-agent scheduling/listing and Postora's internal AI or media generation. The former does not require a Postora-side AI-provider key; generation tools still use Postora's configured providers and allowances.
- Keep examples relevant to the seven launch networks. Prefer a read-only connection check, draft creation, and deliberate scheduling examples. Explain the limits of existing-post settings updates rather than implying full editing, rescheduling, or deletion through MCP.
- Include concise troubleshooting for invalid/rotated keys and unavailable connection settings. Documentation describes supported configuration; successful live connectivity remains a separate verification step.

### Search and page delivery

- Render meaningful public content in the initial page response. Avoid making core copy, plan information, or navigation depend on authenticated or browser-only fetching.
- Set the document language to Brazilian Portuguese and provide page-specific titles, descriptions, canonical URLs, and social sharing metadata using the marketing domain.
- Include the canonical public pages in a sitemap and provide appropriate robots metadata. Keep app authentication routes and duplicate documentation entry aliases out of the marketing sitemap.
- Size and optimize screenshots to preserve readability while avoiding preventable layout shifts. Load primary content promptly and defer noncritical images where appropriate.

## Testing Decisions

The user confirmed this approach during the to-spec workflow:

- Use one primary seam: the running marketing application as observed through its rendered pages and HTTP responses. Tests should verify what visitors can see and do, rather than component names, internal state, CSS class strings, or content object structure.
- Cover homepage/navigation, the pricing interaction, a representative channel and agent detail page, and documentation navigation through the same browser-facing seam. Add a compact route/content check for the complete canonical route set rather than duplicating an entire browser journey per page.
- Verify public pages load without authentication or app backend services, internal links resolve, unknown routes produce a not-found response, and signup/login anchors target the agreed app URLs. Inspect those outbound URLs without creating accounts or calling live services.
- Verify monthly prices, annual equivalents, annual totals, and the 25% discount for all four plans through the rendered pricing controls. Toggle both directions and check that price labels and billing explanations stay consistent.
- Verify mobile navigation by keyboard and pointer, meaningful control labels and focus, and the selected state of the billing control. Review accessible page structure and images alongside the browser checks.
- Review desktop and representative narrow layouts, including 320px and 390px widths. Confirm A's two-column layout becomes an ordered, left-aligned stack, with no overlapping text, clipped prices, hidden essential actions, or page-level horizontal overflow.
- Inspect initial HTML and public metadata through the same running application, including the Portuguese language, page-specific canonical URLs, sitemap membership, and robots response.
- Validate real screenshot assets visually. Avoid treating a snapshot of a hand-built calendar or empty UI as evidence for the agreed product imagery.
- Prior art: this task's prototype was checked in Chromium with browser automation for pricing, responsiveness, and JavaScript errors. The repository contains a root Jest entry point and React Testing Library dependencies, but no checked-in application test cases or Playwright configuration were found in the inspection. The Jest configuration references Nx helpers, so its existence alone does not establish a working frontend test setup.
- Establish only the minimal repeatable browser test setup needed for this public-site seam. Browser tooling available in the current workspace is not proof of a declared project dependency; implementation must make any new test command reproducible using pnpm and root dependency conventions.
- Run the marketing production build and applicable type/lint checks. Run lint from the repository root. Keep verification scoped to the new application and any shared surface actually changed.
- Review the final implementation against this spec and existing project patterns. Tests and reviews must not create live posts, call paid AI generation, change billing, or touch production databases.

## Out of Scope

- Implementing or changing BRL Stripe products, checkout, subscription enforcement, annual billing, or trial behavior. The feature displays the agreed offer and routes visitors to existing authentication.
- Publishing the site, changing DNS, modifying production infrastructure, or changing daily-driver deployment channels.
- Provisioning social network apps, requesting provider approvals, exposing a live MCP endpoint, adding OAuth capabilities, or obtaining AI-provider credentials.
- Adding or disabling social providers in the authenticated app. The seven-network choice defines the initial marketing catalog, not a backend feature deletion.
- ChatGPT and Claude chat marketing pages before connection validation, additional AI clients, and an externally distributed Postora CLI.
- Blog posts, news, competitor comparisons, free marketing tools, enterprise/white-label offers, affiliate programs, and self-hosting marketing.
- Translating or rebranding the entire authenticated app, changing its authentication flow, or redesigning its components.
- A CMS, a language switcher, a new theme switcher, lead-capture forms, or new analytics/tracking integrations.
- Writing unapproved legal policies, fabricating testimonials or customer metrics, or publishing placeholder support/legal links as real destinations.
- Broad backend refactoring, database migrations, workflow changes, and tests unrelated to this public marketing experience.

## Further Notes

- The user approved design A and explicitly confirmed that it should stack when there is insufficient width for two columns. The stacked version remains left-aligned.
- The requirements interview and design exploration are complete. Implementation should not repeat that interview; resolve ordinary implementation details using this spec and repository conventions.
- Relevant architecture: an independent public marketing application avoids inheriting the existing app's authentication redirects and runtime providers.
- Suggested later implementation slices are the homepage and public shell, pricing, channel pages, and agent pages with MCP documentation. This spec does not create tickets or prescribe their final dependency graph.
- The issue tracker for this spec is GitHub Issues in arthurur/postora, with the ready-for-agent triage label. The user enabled Issues and requested publication.
- Publication through the to-spec workflow is authorized by its invocation once the tracker prerequisite is satisfied; the user has confirmed the test approach. Application implementation, commits, PR creation, and production deployment have not been performed by this spec task.
- Reference material: [Postiz homepage](https://postiz.com/), [pricing](https://postiz.com/pricing), [Instagram page](https://postiz.com/channels/instagram), and MCP [introduction](https://docs.postiz.com/mcp/introduction), [client setup](https://docs.postiz.com/mcp/setup), [tools](https://docs.postiz.com/mcp/tools), and [examples](https://docs.postiz.com/mcp/examples). These are research references, not an authority for Postora commercial terms or deployed capabilities.
