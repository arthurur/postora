import Link from 'next/link';
import { BrandIcon } from '../../components/brand-icon';
import { agents } from '../../content/agents';
import { pageMetadata } from '../../content/site';
import { TrialOffer } from '../../components/signup';

export const metadata = pageMetadata(
  '/agentes',
  'Agentes de IA e MCP',
  'Conecte ChatGPT, Claude, Claude Cowork, Claude Code, Codex ou Cursor ao Postora por MCP para preparar e agendar publicações.'
);
export default function Agents() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Agentes de IA</p>
        <h1>Do seu assistente para o calendário.</h1>
        <p className="muted">
          Conecte seu cliente de IA ao Postora por MCP. Consulte suas contas e
          publicações, prepare rascunhos e aprove o que será agendado.
        </p>
      </header>
      <div className="grid-three agent-cards">
        {agents.map((agent) => (
          <article className="panel" key={agent.slug}>
            <h2 className="text-2xl">
              <Link
                className="text-link brand-label"
                href={`/agentes/${agent.slug}`}
              >
                <BrandIcon src={agent.icon} />
                {agent.name}
              </Link>
            </h2>
            <p>{agent.intro}</p>
          </article>
        ))}
      </div>
      <section className="section split">
        <div>
          <h2>A conexão é sua.</h2>
          <p>
            O Postora opera o servidor MCP e as aplicações das redes sociais.
            Você conecta suas contas e configura o cliente de IA com a chave da
            sua organização.
          </p>
          <p>
            Consultar e agendar com seu agente não exige uma chave de provedor
            de IA no Postora. Gerar mídia usa os provedores e créditos do
            Postora.
          </p>
          <Link className="text-link" href="/docs/mcp/introducao">
            Entender a conexão MCP
          </Link>
          <TrialOffer />
        </div>
        <div className="panel">
          <h3>Comece com uma consulta</h3>
          <p>
            “Liste meus canais conectados. Não crie nem altere nenhuma
            publicação.”
          </p>
          <p className="small muted">
            A configuração usa chave de API. A disponibilidade do endpoint da
            sua organização deve ser verificada no app.
          </p>
        </div>
      </section>
    </>
  );
}
