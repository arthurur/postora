import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import { Navigation } from '../components/navigation';
import { siteUrl } from '../content/site';
import './globals.scss';

const jakarta = localFont({
  src: '../fonts/plus-jakarta-sans-latin.woff2',
  weight: '200 800',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Postora', template: '%s | Postora' },
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${jakarta.className} light`}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Navigation />
        <main id="conteudo" className="wrap" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer wrap">
          <Link className="brand" href="/">
            postora
          </Link>
          <nav aria-label="Rodapé">
            <Link href="/precos">Preços</Link>
            <Link href="/canais">Canais</Link>
            <Link href="/agentes">Agentes de IA</Link>
            <Link href="/docs/mcp/introducao">Documentação</Link>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de uso</Link>
          </nav>
          <span className="muted">Português · Brasil</span>
        </footer>
      </body>
    </html>
  );
}
