import Link from 'next/link';
import { notFound } from 'next/navigation';
import { channels } from '../../../content/channels';
import { pageMetadata } from '../../../content/site';
import { TrialOffer } from '../../../components/signup';

export const dynamicParams = false;

export function generateStaticParams() {
  return channels.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const channel = channels.find((entry) => entry.slug === slug);
  if (!channel) notFound();
  return pageMetadata(
    `/canais/${slug}`,
    `Agende publicações no ${channel.name}`,
    channel.intro
  );
}
export default async function ChannelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const channel = channels.find((entry) => entry.slug === slug);
  if (!channel) notFound();
  return (
    <>
      <header className="page-heading">
        <Link className="text-link small" href="/canais">
          Todos os canais
        </Link>
        <p className="eyebrow mt-6">{channel.name}</p>
        <h1>Agende suas publicações no {channel.name}</h1>
        <p className="muted">{channel.intro}</p>
        <TrialOffer />
      </header>
      <div className="detail-grid">
        <section className="panel">
          <h2>O que você pode publicar</h2>
          <p>{channel.formats}</p>
        </section>
        <section className="panel">
          <h2>Qual conta conectar</h2>
          <p>{channel.account}</p>
        </section>
        <section className="panel">
          <h2>Como funciona</h2>
          <p>{channel.workflow}</p>
        </section>
        <section className="panel">
          <h2>O que considerar</h2>
          <ul>
            {channel.limits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="section">
        <p>
          As regras de publicação e as métricas variam por rede. Confira as
          opções da sua conexão no app.
        </p>
        <Link className="text-link" href="/precos">
          Escolher um plano
        </Link>
      </section>
    </>
  );
}
