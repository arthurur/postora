import type { Metadata } from 'next';
import { channels } from './channels';
import { agents, docTopics } from './agents';

export const siteUrl = 'https://postora.com.br';
export const publicPaths = [
  '/',
  '/precos',
  '/canais',
  ...channels.map(({ slug }) => `/canais/${slug}`),
  '/agentes',
  ...agents.map(({ slug }) => `/agentes/${slug}`),
  ...docTopics.map(({ slug }) => `/docs/mcp/${slug}`),
];

export function pageMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: `${title} | Postora`,
      description,
      url: `${siteUrl}${path}`,
      siteName: 'Postora',
      locale: 'pt_BR',
      type: 'website',
      images: [
        {
          url: '/images/social-preview.png',
          width: 1200,
          height: 630,
          alt: 'Postora. Seu conteúdo. Suas redes. Um só calendário.',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Postora`,
      description,
      images: ['/images/social-preview.png'],
    },
  };
}
