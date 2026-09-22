import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BrandIcon } from '../../../components/brand-icon';
import { TrialOffer } from '../../../components/signup';
import { agentFeatures, agents } from '../../../content/agents';
import { channels } from '../../../content/channels';
import { pageMetadata } from '../../../content/site';

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
      <header className="hero">
        <div className="hero-copy">
          <Link className="text-link small block w-fit" href="/agentes">
            Todos os agentes
          </Link>
          <p className="eyebrow mt-6 brand-label">
            <BrandIcon src={agent.icon} />
            {agent.name} + Postora
          </p>
          <h1>Suas publicações, com o {agent.name}.</h1>
          <p>{agent.intro}</p>
          <TrialOffer />
        </div>
        <div className="panel">
          <p className="eyebrow">Um pedido para começar</p>
          <blockquote className="prompt">{agent.prompt}</blockquote>
          <p className="small muted mt-6">
            Exemplo de pedido. Conecte sua conta e confira as ferramentas
            disponíveis antes de executar.
          </p>
          <Link className="text-link" href="#configuracao">
            Ver como conectar
          </Link>
        </div>
      </header>

      <section className="section split" id="configuracao">
        <div>
          <p className="eyebrow">Conexão MCP</p>
          <h2>Configure uma vez. Depois, é só pedir.</h2>
          <p>{agent.setup}</p>
          <p>
            O MCP permite que o agente use ferramentas do Postora. Depois de
            configurar, você pode pedir consultas, rascunhos e agendamentos em
            linguagem natural.
          </p>
          <Link
            className="text-link"
            href={`/docs/mcp/configuracao#${agent.slug}`}
          >
            Configurar o {agent.name}
          </Link>
        </div>
        <div className="panel">
          <h3>O que você precisa</h3>
          <p>{agent.requirement}</p>
          <p>
            No Postora, conecte seus canais e peça a um administrador a chave da
            organização. O plano precisa incluir acesso à API pública.
          </p>
          <p className="small muted">
            Configuração manual. Verifique a conexão com o endereço real do app.
            Se trocar a chave, atualize o cliente.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ferramentas à disposição</p>
            <h2>Feito para automatizar sua rotina.</h2>
            <p>
              Escolha a tarefa. O agente usa as ferramentas disponíveis para
              preparar e organizar suas publicações.
            </p>
          </div>
        </div>
        <div className="grid-three">
          {agentFeatures.map((feature) => (
            <article className="panel" key={feature.title}>
              <span
                aria-hidden="true"
                className="mb-3 block text-3xl leading-none"
              >
                {feature.emoji}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
        <p className="small muted mt-6">
          A conexão não cria rotinas recorrentes sozinha. Você define o pedido e
          as permissões no cliente de IA.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Do pedido ao calendário</p>
            <h2>Como funciona</h2>
          </div>
        </div>
        <ol className="grid-three">
          <li className="panel">
            <span className="feature-number">01</span>
            <h3>Conte o que quer publicar</h3>
            <p>
              Forneça o assunto, o público e os canais desejados. Peça ao{' '}
              {agent.name} para consultar suas contas e as regras de cada rede.
            </p>
          </li>
          <li className="panel">
            <span className="feature-number">02</span>
            <h3>Revise a proposta</h3>
            <p>
              Confira o texto, a mídia, a conta e o horário. Você pode pedir
              ajustes na conversa antes de autorizar a criação do post.
            </p>
          </li>
          <li className="panel">
            <span className="feature-number">03</span>
            <h3>Confirme no Postora</h3>
            <p>
              Depois de autorizar, confira o resultado no calendário. O Postora
              cuida dos agendamentos confirmados, mesmo depois que a conversa
              termina.
            </p>
          </li>
        </ol>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">Canais conectados</p>
          <h2>Um pedido. Várias redes.</h2>
          <p>
            Use uma mesma ideia como ponto de partida e peça versões para cada
            rede. Escolha as contas, adapte o formato e defina quando cada
            publicação deve sair.
          </p>
          <div className="chips">
            {channels.map((channel) => (
              <Link
                className="secondary brand-label"
                href={`/canais/${channel.slug}`}
                key={channel.slug}
              >
                <BrandIcon src={channel.icon} />
                {channel.name}
              </Link>
            ))}
          </div>
          <p className="small muted">
            Cada conta, perfil ou página conectada usa um canal do plano. Os
            formatos e as permissões variam entre as redes.
          </p>
        </div>
        <div className="panel campaign-example">
          <h3>Uma campanha, versões próprias</h3>
          <div className="campaign-request">
            <p className="eyebrow">Seu pedido</p>
            <p>
              Divulgue o novo café da Aurora no LinkedIn, X e Instagram. Adapte
              o texto a cada rede.
            </p>
          </div>
          <ul className="campaign-versions" aria-label="Versões da campanha">
            <li className="campaign-version">
              <div className="campaign-platform">
                <span className="brand-label">
                  <BrandIcon src="/icons/platforms/linkedin.webp" />
                  LinkedIn
                </span>
                <span className="campaign-format">Contexto</span>
              </div>
              <p>
                Do produtor à xícara: conheça o novo café da Aurora e a história
                de quem cultiva cada grão.
              </p>
            </li>
            <li className="campaign-version">
              <div className="campaign-platform">
                <span className="brand-label">
                  <BrandIcon src="/icons/platforms/x.webp" />X
                </span>
                <span className="campaign-format">Direto ao ponto</span>
              </div>
              <p>
                Café novo na Aurora. ☕ Uma nova origem para a sua pausa de todo
                dia.
              </p>
            </li>
            <li className="campaign-version">
              <div className="campaign-platform">
                <span className="brand-label">
                  <BrandIcon src="/icons/platforms/instagram.webp" />
                  Instagram
                </span>
                <span className="campaign-format">Foto + legenda</span>
              </div>
              <div className="campaign-media">
                <span className="campaign-thumbnail" aria-hidden="true">
                  ☕
                </span>
                <p>
                  Sua próxima pausa tem um novo sabor. Vem conhecer o café que
                  acabou de chegar. ☕
                </p>
              </div>
            </li>
          </ul>
          <p className="small muted">
            Exemplo ilustrativo de uma marca fictícia. Revise os textos e envie
            a mídia ao Postora antes de agendar.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ideias para o seu trabalho</p>
            <h2>O que fazer com {agent.name} e Postora</h2>
          </div>
        </div>
        <div className="grid-three">
          {agent.scenarios.map((scenario) => (
            <article className="panel" key={scenario.title}>
              <h3>{scenario.title}</h3>
              <p>{scenario.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow brand-label">
            <BrandIcon src={agent.icon} />
            Conheça seu assistente
          </p>
          <h2>O que é {agent.name}?</h2>
          <p>{agent.about}</p>
          <a className="text-link" href={agent.source}>
            Documentação oficial do {agent.name}
          </a>
        </div>
        <div className="panel">
          <h3>O agente prepara. O Postora organiza.</h3>
          <p>
            Seu cliente de IA interpreta o pedido e trabalha o texto. O Postora
            mantém os canais, a biblioteca de mídia e o calendário que você
            também pode consultar no app.
          </p>
          <p>
            O acesso ao cliente de IA é separado da assinatura do Postora. Gerar
            mídia pelas ferramentas do Postora depende dos provedores
            configurados e dos créditos disponíveis.
          </p>
        </div>
      </section>

      <section className="section faq">
        <h2>Perguntas frequentes</h2>
        <details>
          <summary>{agent.question}</summary>
          <p>{agent.answer}</p>
        </details>
        <details>
          <summary>O agente publica sem minha revisão?</summary>
          <p>
            Ele pode criar rascunhos, agendar ou publicar imediatamente quando
            essas ferramentas estão disponíveis. Peça uma proposta antes da
            execução e confira as permissões de aprovação no cliente. A conexão
            MCP, por si só, não impõe uma etapa de revisão humana.
          </p>
        </details>
        <details>
          <summary>Preciso programar para usar?</summary>
          <p>
            Os pedidos podem ser feitos em linguagem natural. A conexão inicial
            exige configurar o cliente e a credencial da organização. O guia
            mostra os passos para o {agent.name}; um administrador pode ajudar
            nessa etapa.
          </p>
        </details>
        <details>
          <summary>Posso alterar um post que já existe?</summary>
          <p>
            Use o app para editar o texto, reagendar ou excluir. As ferramentas
            MCP atuais consultam posts e alteram algumas configurações da rede.
            Criar outro post não atualiza o anterior.
          </p>
        </details>
        <details>
          <summary>Como sei se o agendamento funcionou?</summary>
          <p>
            Confira o retorno da ferramenta e a publicação no calendário do
            Postora. Se houver uma falha ou resposta incompleta, consulte os
            posts antes de repetir o pedido para evitar duplicatas.
          </p>
        </details>
      </section>

      <section className="section split">
        <div>
          <h2>Prepare seu próximo post com {agent.name}.</h2>
          <p>
            Conecte um canal, consulte suas publicações e comece com um
            rascunho.
          </p>
          <TrialOffer />
        </div>
        <div className="panel">
          <h3>Continue pelo guia</h3>
          <p>
            <Link className="text-link" href="/docs/mcp/exemplos">
              Pedidos de exemplo
            </Link>
          </p>
          <p>
            <Link className="text-link" href="/docs/mcp/ferramentas">
              Ferramentas e limites da conexão
            </Link>
          </p>
          <p>
            <Link className="text-link" href="/agentes">
              Conhecer os outros agentes
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
