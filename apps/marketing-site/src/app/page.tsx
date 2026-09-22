import Link from 'next/link';
import { Pricing } from '../components/pricing';
import { Signup } from '../components/signup';
import { ProductShot } from '../components/product-shot';
import { channels } from '../content/channels';
import { agents, docTopics } from '../content/agents';
import { pageMetadata } from '../content/site';

export const metadata = pageMetadata(
  '/',
  'Seu conteúdo. Suas redes. Um só calendário.',
  'Planeje e agende publicações para sua marca ou seus clientes. Conheça o Postora, compare os planos em reais e experimente por 7 dias grátis.'
);
export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Sua presença nas redes, organizada</p>
          <h1 id="hero-title">
            Seu conteúdo.
            <br /> Suas redes.
            <br /> <span>Um só calendário.</span>
          </h1>
          <p className="muted">
            Planeje, agende e acompanhe suas publicações. Para cuidar da sua
            marca ou das marcas dos seus clientes.
          </p>
          <div className="actions">
            <Signup />
            <Link className="secondary" href="/precos">
              Ver planos
            </Link>
          </div>
          <p className="small muted">Teste grátis por 7 dias.</p>
        </div>
        <ProductShot priority />
      </section>
      <section className="network-strip" aria-label="Redes disponíveis">
        <p className="small muted">
          Publique nas redes que fazem parte da sua rotina.
        </p>
        <div className="network-links">
          {channels.map((channel) => (
            <Link key={channel.slug} href={`/canais/${channel.slug}`}>
              {channel.name}
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Da ideia à próxima publicação.</h2>
            <p className="muted">
              Organize o trabalho de hoje. Deixe os próximos dias planejados.
            </p>
          </div>
        </div>
        <div className="grid-three">
          {[
            [
              '01',
              'Planeje com antecedência',
              'Veja suas publicações no calendário e escolha quando cada uma vai ao ar.',
            ],
            [
              '02',
              'Adapte para cada rede',
              'Prepare o conteúdo em um lugar e ajuste a mensagem e o formato para cada canal.',
            ],
            [
              '03',
              'Acompanhe os resultados',
              'Consulte as métricas disponíveis em cada rede e use o que aprendeu nos próximos posts.',
            ],
          ].map(([number, title, copy]) => (
            <div key={title}>
              <span className="feature-number">{number}</span>
              <h3>{title}</h3>
              <p className="muted">{copy}</p>
            </div>
          ))}
        </div>
        <div className="grid-four audiences">
          {[
            [
              'Criadores',
              'Dê continuidade à sua presença sem preparar tudo na hora.',
            ],
            [
              'Empreendedores',
              'Deixe os posts prontos enquanto cuida do negócio.',
            ],
            [
              'Social medias',
              'Organize as contas e publicações dos seus clientes.',
            ],
            [
              'Agências',
              'Trabalhe com sua equipe nos planos Team, Pro e Ultimate.',
            ],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <Pricing />
        <Link className="text-link" href="/precos">
          Comparar recursos dos planos
        </Link>
      </section>
      <section className="section split">
        <div>
          <p className="eyebrow">Agentes de IA</p>
          <h2>
            Seu assistente.
            <br />
            Conectado às suas redes.
          </h2>
          <p className="muted">
            Conecte seu agente por MCP para consultar canais, criar rascunhos e
            agendar publicações no Postora.
          </p>
          <div className="chips">
            {agents.map((agent) => (
              <Link
                className="secondary"
                key={agent.slug}
                href={`/agentes/${agent.slug}`}
              >
                {agent.name}
              </Link>
            ))}
          </div>
          <Link className="text-link" href="/agentes">
            Veja como conectar
          </Link>
        </div>
        <div className="panel">
          <p className="small muted">Um exemplo do que você pode pedir</p>
          <p className="prompt">
            “Crie um rascunho para o Instagram sobre o café novo que chega na
            sexta.”
          </p>
        </div>
      </section>
      <section className="section">
        <h2>Uma conexão, passo a passo.</h2>
        <p className="muted">
          Guias em português para usar o Postora com seu agente.
        </p>
        <div className="grid-four">
          {docTopics.map((topic) => (
            <Link
              className="panel card-link"
              key={topic.slug}
              href={`/docs/mcp/${topic.slug}`}
            >
              <h3>{topic.title}</h3>
              <p className="small muted">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
