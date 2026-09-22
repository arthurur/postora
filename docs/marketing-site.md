# Postora marketing site

Status: scope, design A, and browser-level testing agreed. The [implementation spec](spec-marketing-site.md) consolidates these decisions; published as [GitHub issue #1](https://github.com/arthurur/postora/issues/1) with the ready-for-agent label.

## Confirmed decisions

- Build the homepage, pricing page, AI agent pages, channel pages, and MCP documentation in this branch.
- Address individual creators, business owners, freelance social media managers, and small agencies. Help people manage their own social presence as well as their clients' presence.
- Use the existing Postora app styling as the design reference.
- Serve the marketing site at https://postora.com.br and the app at https://app.postora.com.br.
- Use "Começar por R$0" for the primary call to action, linking to https://app.postora.com.br/auth.
- Display monthly BRL prices: Standard R$80, Team R$120, Pro R$150, Ultimate R$250. Retain the existing plan feature limits, including 5, 10, 30, and 100 connected channels respectively.
- Offer annual billing with a 25% discount against twelve monthly payments. Annual totals are Standard R$720, Team R$1,080, Pro R$1,350, and Ultimate R$2,250. These are already whole reais. Monthly equivalents are R$60, R$90, R$112.50, and R$187.50; format public prices using Brazilian conventions.
- The R$0 offer is a seven-day free trial.
- Launch channel pages cover X, Instagram, Facebook, TikTok, YouTube, LinkedIn, and Threads. Other channel pages can follow as support is set up; the upstream registry does not define the launch marketing scope.
- Build a separate Next.js app in the existing apps/marketing-site folder, with independent deployment and the current app's design tokens.
- Include Portuguese MCP documentation under the marketing domain covering introduction, client setup, tool reference, and examples. Agent pages link to the relevant docs.
- Individual AI agent pages cover Claude Code, Codex, Cursor, ChatGPT, Claude, and Claude Cowork. The user expanded the original three-client scope on 22 September 2026. Custom-connector setup for the new clients is documented with plan and permission requirements; deployed connections still require validation.
- Use Portuguese screenshots of the real app with fictional creator, business, and agency demo content. Review a visual proposal before implementation.
- BRL billing configuration is still pending. These prices are a marketing requirement, not evidence of an operational BRL checkout.

## Design review

- The user selected design A. Use two columns when there is sufficient space; otherwise stack the left-aligned introduction and CTA above the calendar.
- The user agreed with the final agent recommendation, completing the scope interview. Proceed with visual alternatives before building application components.
- Preview A leads with the calendar in a split layout. Preview B leads with consistent posting in a centered layout. Both use the app palette and Plus Jakarta Sans, with an illustrative calendar to be replaced by real app screenshots during implementation.
- The preview includes the monthly/annual price toggle, the seven launch networks, the three selected agents, and the four documentation topics. Checked at desktop, 736px, 390px, and 320px widths; no horizontal overflow or JavaScript errors were found. Annual totals and monthly equivalents match the agreed prices.

## Implementation outline

- Scaffold apps/marketing-site using the workspace's existing Next.js, React, Tailwind, and pnpm conventions.
- Build shared public navigation, footer, and reusable layouts for channel pages, agent pages, and documentation.
- Provide the homepage, monthly/annual pricing toggle, seven channel pages, six agent pages, their overview pages, and four MCP documentation pages.
- Keep public pages readable without authentication and render their content for search engines. Include route-specific titles, descriptions, canonical URLs, sitemap, and robots metadata.
- Connect signup actions to https://app.postora.com.br/auth and login actions to https://app.postora.com.br/auth/login.
- Verify desktop and mobile layouts, keyboard navigation, links, pricing arithmetic, and the marketing build. Review new code against existing project patterns.

## Connection responsibilities

Postora operates the public MCP endpoint and configures social provider applications. Customers connect their social accounts and configure their chosen AI client with the Postora endpoint and their organization API key. External MCP scheduling and listing do not require an AI-provider key on Postora's side; built-in AI and media generation require Postora's configured provider credentials. Verify deployed client connections before claiming they have been tested.

## Documentation approach

Proposed paths are /docs/mcp/introducao, /docs/mcp/configuracao, /docs/mcp/ferramentas, and /docs/mcp/exemplos. Write the reference against this repository's MCP tools and schemas, using Postiz docs as a structural reference. Identify configuration-dependent capabilities as such.

Explain how to copy the MCP address from Postora's developer settings rather than inventing a deployed hostname. Use placeholder credentials in examples. The checked-in server supports API-key authentication; official connector listings and automatic OAuth setup need separate verification before being advertised.

Keep the marketing site and documentation in Brazilian Portuguese for this launch. Reuse compatible translation infrastructure where useful; a language switcher is not currently requested.

## Reference site

Postiz is a reference for page structure and product topics. Write original Brazilian Portuguese copy for Postora. Postiz customer testimonials, official connector listings, commercial terms, and deployment-specific instructions do not establish equivalent Postora claims.

- [Homepage](https://postiz.com/)
- [Pricing](https://postiz.com/pricing)
- [Instagram channel page](https://postiz.com/channels/instagram)
- [ChatGPT integration page](https://postiz.com/chatgpt)
- [MCP introduction](https://docs.postiz.com/mcp/introduction)
- [MCP client setup](https://docs.postiz.com/mcp/setup)
- [MCP tools](https://docs.postiz.com/mcp/tools)
- [MCP examples](https://docs.postiz.com/mcp/examples)

## Implementation boundary

The interview and design review precede implementation. Publishing, production configuration, and billing changes require their own explicit scope. The existing app and unrelated working-tree changes must remain intact.

## Agent page expansion, 22 September 2026

All six pages now include setup requirements, supported automation features, a three-step workflow, the seven launch networks, client-specific scenarios, an explanation of the client, FAQs, and documentation links. They reuse design A and the existing rounded panels and brand icons. The directory, homepage agent links, static route generation and sitemap include the three added clients.

Structure references: [Postiz Codex](https://postiz.com/codex), [ChatGPT](https://postiz.com/chatgpt), [Claude](https://postiz.com/claude), and [Claude Cowork](https://postiz.com/claude-cowork). Copy is original Portuguese and describes this repository's MCP tools. It does not import Postiz's analytics, official marketplace listing, media-editing or recurring-task claims.

Client setup was checked against the official [ChatGPT MCP guidance](https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt), [developer-mode authentication options](https://developers.openai.com/api/docs/guides/developer-mode), [Claude remote connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp), and [Cowork guide](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork). The manual URL-key instructions use the repository's `/mcp/:id` route. They are not evidence of a successful live Postora connection. The server also contains `/mcp-oauth`, but deploying or configuring OAuth is outside this marketing change.

Validation: marketing build, TypeScript and lint pass. All 11 browser tests pass against the local development server, including the six client pages at 320px and 1440px, setup anchors, lazy-loaded icons, FAQs, 21 indexable routes, metadata, sitemap, navigation and pricing. Additional visual inspection covered desktop Codex and mobile Cowork. No deployment or authenticated app changes.
