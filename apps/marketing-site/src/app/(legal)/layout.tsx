import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

// Keep these drafts out of search until remaining operational details are confirmed.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-layout">
      <nav className="docs-nav" aria-label="Informações legais">
        <Link href="/privacidade">Política de privacidade</Link>
        <Link href="/termos">Termos de uso</Link>
      </nav>
      <div>
        <aside className="panel small mb-8" aria-label="Status do documento">
          <strong>Rascunho para revisão. Ainda não está em vigor.</strong>
          <p className="mb-0 mt-2">
            Os dados de contato já foram incluídos. As pendências indicadas nos
            documentos precisam ser resolvidas antes da publicação.
          </p>
        </aside>
        {children}
      </div>
    </div>
  );
}
