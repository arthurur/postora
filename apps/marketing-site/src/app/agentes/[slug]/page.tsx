import Link from 'next/link';
import { notFound } from 'next/navigation';
import { agents } from '../../../content/agents';
import { pageMetadata } from '../../../content/site';
import { TrialOffer } from '../../../components/signup';

export const dynamicParams = false;

export function generateStaticParams() {
  return agents.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = agents.find((entry) => entry.slug === slug);
  if (!agent) notFound();
  return pageMetadata(
    `/agentes/${slug}`,
    `${agent.name} com Postora`,
    agent.intro
  );
}
export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = agents.find((entry) => entry.slug === slug);
  if (!agent) notFound();
  return (
    <>
      <header className="page-heading">
        <Link className="text-link small" href="/agentes">
          Todos os agentes
        </Link>
        <p className="eyebrow mt-6">{agent.name} + Postora</p>
        <h1>Suas publicações, com o {agent.name}.</h1>
        <p>{agent.intro}</p>
        <TrialOffer />
      </header>
      <div className="detail-grid">
        <section className="panel">
          <h2>No seu fluxo de trabalho</h2>
          <p>{agent.usage}</p>
          <Link
            className="text-link"
            href={`/docs/mcp/configuracao#${agent.slug}`}
          >
            Configurar o {agent.name}
          </Link>
        </section>
        <section className="panel">
          <h2>O que você precisa</h2>
          <p>
            Uma conta no cliente de IA, canais conectados ao Postora e acesso à
            chave de API da sua organização. Copie o endereço real nas
            configurações de desenvolvedor do app.
          </p>
          <p>
            O cliente usa sua própria IA para planejar e escrever. Gerar imagens
            ou vídeos pelo Postora depende dos provedores configurados e dos
            créditos do plano.
          </p>
        </section>
      </div>
      <section className="section">
        <Link className="text-link" href="/docs/mcp/exemplos">
          Ver exemplos de uso
        </Link>
        <p className="small muted mt-4">
          Configuração manual por MCP. Este guia não pressupõe listagem oficial
          em marketplace nem conexão já validada no seu ambiente.
        </p>
      </section>
    </>
  );
}
