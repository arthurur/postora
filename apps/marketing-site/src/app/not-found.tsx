import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="page-heading">
      <p className="eyebrow">404</p>
      <h1>Esta página não foi encontrada.</h1>
      <p>
        Você pode voltar ao início ou consultar os canais e a documentação do
        Postora.
      </p>
      <div className="actions">
        <Link className="button" href="/">
          Voltar ao início
        </Link>
        <Link className="secondary" href="/docs/mcp/introducao">
          Documentação
        </Link>
      </div>
    </div>
  );
}
