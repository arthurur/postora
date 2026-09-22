import Link from 'next/link';
import { BrandIcon } from '../../components/brand-icon';
import { channels } from '../../content/channels';
import { pageMetadata } from '../../content/site';
import { TrialOffer } from '../../components/signup';

export const metadata = pageMetadata(
  '/canais',
  'Redes sociais disponíveis',
  'Conheça as sete redes do Postora: X, Instagram, Facebook, TikTok, YouTube, LinkedIn e Threads. Confira formatos e requisitos para cada conexão.'
);
export default function Channels() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Canais</p>
        <h1>Suas redes, no mesmo calendário.</h1>
        <p className="muted">
          Conheça os formatos e os requisitos de cada rede. Cada conta, perfil
          ou página conectada usa um canal do plano.
        </p>
      </header>
      <div className="grid-three">
        {channels.map((channel) => (
          <article className="panel" key={channel.slug}>
            <h2 className="text-2xl">
              <Link
                className="text-link brand-label"
                href={`/canais/${channel.slug}`}
              >
                <BrandIcon src={channel.icon} />
                {channel.name}
              </Link>
            </h2>
            <p>{channel.intro}</p>
          </article>
        ))}
      </div>
      <section className="section">
        <TrialOffer />
      </section>
    </>
  );
}
