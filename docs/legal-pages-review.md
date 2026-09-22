# Postora legal pages

Local drafts added on 2026-09-22 at `/privacidade` and `/termos`, linked from the marketing footer. They use the existing documentation layout and typography. Both carry `noindex, follow` and are intentionally absent from `publicPaths` and the sitemap until the remaining factual details are confirmed. No production configuration, account-acceptance flow or deployment was changed.

## Confirmed by Arthur

- Operator: Hygge Solutions, CNPJ 63.340.076/0001-86.
- Support and privacy contact: suporte@postora.com.br.
- Hostinger VPS; Cloudflare R2 media storage; Stripe payments; PostHog analytics.

## Reference material

Reviewed [Postiz privacy](https://postiz.com/privacy-policy) and [Postiz terms](https://postiz.com/terms-of-service), both dated May 3, 2026. They inform the topic coverage, not Postora's operating facts. The Portuguese drafts are original text tied to this repository and Arthur's answers. They do not reproduce Postiz's foreign entities, jurisdiction, liability cap, blanket no-refund language, mobile-app claims, security assurances, retention periods or training guarantees. Postiz's privacy and terms even differ on their model-training statements, so neither establishes Postora's provider arrangements.

Brazilian references: [LGPD, especially arts. 7–9, 15–20, 33 and 46](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), [CDC, especially arts. 49 and 51](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm). Integration reference: [YouTube developer policies](https://developers.google.com/youtube/terms/developer-policies), plus linked Google privacy, YouTube terms and Google permission revocation.

## Repository evidence

- `CONTEXT.md` and `docs/adr/0001-separate-marketing-app.md`: product identity and site/app boundary.
- `libraries/nestjs-libraries/src/database/prisma/schema.prisma`: account, organization, channel, media, post and subscription records.
- `libraries/nestjs-libraries/src/openai/openai.service.ts`: OpenAI for text and images.
- `libraries/nestjs-libraries/src/openai/fal.service.ts`: fal.ai generation.
- `libraries/nestjs-libraries/src/videos/images-slides/images.slides.ts`: image-slide video pipeline involving OpenAI, fal.ai, ElevenLabs and Transloadit, conditional on configured credentials.
- `libraries/nestjs-libraries/src/videos/veo3/veo3.ts`: Kie AI video generation, conditional on configured credentials.
- `libraries/nestjs-libraries/src/3rdparties/heygen/heygen.provider.ts` and `reelfarm/reelfarm.provider.ts`: optional connected providers.
- `libraries/react-shared-libraries/src/helpers/posthog.tsx`: analytics enabled only when key and host are provided. `libraries/helpers/src/utils/use.fire.events.ts` identifies user id, email and name. The marketing app contains no analytics integration.
- `libraries/nestjs-libraries/src/services/email.service.ts`: Resend, SMTP or disabled selection; no active provider inferred.
- `libraries/nestjs-libraries/src/services/stripe.service.ts`: seven-day trial support, recurring checkout, distinct immediate/end-of-period cancellation paths. A code path is not confirmation of the deployed customer journey.

No secrets or live systems were inspected. Repository support for a vendor does not establish that vendor as active in production.

## Remaining publication details

1. Business address and exact registered legal name if Hygge Solutions is a trading name.
2. Email delivery provider, enabled AI/media features, contracted provider terms and data-training arrangements.
3. Hosting and processing countries, international-transfer safeguards and vendor responsibilities.
4. Actual PostHog configuration, event/cookie inventory, legal basis and nonessential-cookie controls. No consent banner was added or claimed.
5. Retention by category, backup expiry, account/token/data-deletion workflow, security practices and YouTube data-deletion requirements.
6. Trial payment details, taxes, cancellation/access behavior, refunds beyond statutory rights, age eligibility and suspension/appeal process.
7. Final effective date and legal review; wire policy links/versioned acceptance in the authenticated signup/checkout in a separately scoped change. Existing app links were not silently repointed to drafts.

After resolving these details, replace the pending passages, remove the draft notice and noindex metadata, add both routes to `publicPaths` and the route-delivery test's canonical list, and verify the final text against the actual service before deploying.
