import { Pricing } from '../../components/pricing';
import { pageMetadata } from '../../content/site';

export const metadata = pageMetadata(
  '/precos',
  'Preços e planos',
  'Compare Standard, Team, Pro e Ultimate em reais. Planos a partir de R$80 por mês, 25% de desconto no anual e teste grátis por 7 dias.'
);
export default function Prices() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Preços</p>
        <h1>Planos para a sua rotina</h1>
        <p className="muted">
          Escolha pelo número de canais e pela forma como você trabalha.
        </p>
      </header>
      <section className="section">
        <Pricing detailed />
      </section>
      <section className="section faq">
        <h2>Antes de escolher</h2>
        {[
          [
            'O que conta como um canal?',
            'Cada conta, perfil ou página conectada conta como um canal. Dois perfis no Instagram usam dois canais, mesmo sendo da mesma rede.',
          ],
          [
            'Como funciona o teste grátis?',
            'Você tem 7 dias para experimentar o Postora sem cobrança de assinatura durante esse período. O botão Começar por R$0 leva ao cadastro no app; não é um plano gratuito permanente.',
          ],
          [
            'Quanto pago no plano anual?',
            'A cobrança é anual, em um único valor: R$720, R$1.080, R$1.350 ou R$2.250, conforme o plano. O valor mensal equivalente serve para comparação. O desconto é de 25% sobre doze mensalidades.',
          ],
          [
            'Posso trabalhar com uma equipe?',
            'A colaboração em equipe está incluída em Team, Pro e Ultimate. Standard é voltado ao uso individual.',
          ],
          [
            'Os agentes de IA estão incluídos?',
            'Todos os quatro planos incluem acesso à API pública usada na conexão MCP. O acesso ao Claude Code, Codex ou Cursor depende da sua conta nesse serviço. Geração de imagens e vídeos no Postora segue as permissões e os créditos do plano.',
          ],
          [
            'Todas as redes têm os mesmos recursos?',
            'Não. Formatos, permissões de conta e métricas variam por rede. Consulte a página de cada canal para conhecer os limites.',
          ],
        ].map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
