'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Signup } from './signup';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header wrap"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link className="brand" href="/" aria-label="Postora, início">
        <span aria-hidden="true" className="brand-mark">
          p
        </span>
        postora
      </Link>
      <button
        className="menu-toggle secondary"
        ref={toggle}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Fechar menu' : 'Abrir menu'}
      </button>
      <nav
        id="main-navigation"
        className="main-navigation"
        data-open={open}
        aria-label="Principal"
        onClick={() => setOpen(false)}
      >
        <Link href="/canais">Canais</Link>
        <Link href="/agentes">Agentes de IA</Link>
        <Link href="/precos">Preços</Link>
        <Link href="/docs/mcp/introducao">Docs</Link>
        <a href="https://app.postora.com.br/auth/login">Entrar</a>
        <Signup />
      </nav>
    </header>
  );
}
