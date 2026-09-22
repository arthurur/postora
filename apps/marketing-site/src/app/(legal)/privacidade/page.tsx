import Link from 'next/link';
import { pageMetadata } from '../../../content/site';

export const metadata = pageMetadata(
  '/privacidade',
  'Política de privacidade',
  'Como o Postora trata dados de conta, canais conectados e publicações, e quais são seus direitos de privacidade.'
);

export default function PrivacyPage() {
  return (
    <article className="prose">
      <p className="eyebrow">Informações legais</p>
      <h1>Política de privacidade</h1>
      <p className="small muted">
        Versão para revisão de 22 de setembro de 2026.
      </p>
      <p>
        Esta política descreve o tratamento de dados no site postora.com.br e no
        aplicativo web app.postora.com.br. Leia também os{' '}
        <Link href="/termos">Termos de uso</Link>.
      </p>

      <h2 id="responsavel">1. Responsável pelo tratamento</h2>
      <p>
        O Postora é operado por Hygge Solutions, CNPJ 63.340.076/0001-86. Para
        dúvidas e solicitações sobre dados pessoais, escreva para{' '}
        <a href="mailto:suporte@postora.com.br">suporte@postora.com.br</a>.
        Hygge Solutions é responsável pelas decisões sobre o tratamento dos
        dados de cadastro, cobrança e atendimento do serviço.
      </p>
      <p>
        Quando uma organização gerencia dados de clientes ou de seu público pelo
        Postora, ela é responsável por suas finalidades e instruções de
        tratamento. O Postora atua como operador quando trata esses dados em
        nome da organização e conforme suas instruções.
      </p>
      <p className="panel small">
        Pendente de confirmação: endereço comercial do responsável.
      </p>

      <h2>2. Dados utilizados no serviço</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Conta e equipe: nome, e-mail, informações de autenticação,
          organização, convites e permissões de acesso.
        </li>
        <li>
          Canais conectados: identificadores de perfis e páginas, autorizações
          de acesso, tokens e informações retornadas pelas redes dentro das
          permissões concedidas.
        </li>
        <li>
          Publicações: textos, arquivos de mídia, rascunhos, horários,
          configurações de publicação e resultados das operações. As métricas
          disponíveis variam conforme a rede conectada.
        </li>
        <li>
          Assinatura: plano, situação da cobrança e referências de pagamento
          necessárias para administrar o acesso contratado.
        </li>
        <li>
          Atendimento e operação: informações enviadas em solicitações de
          suporte e registros técnicos necessários para investigar falhas e
          proteger o acesso ao serviço.
        </li>
      </ul>
      <p>
        Esses dados são fornecidos por você e pelos membros da sua organização,
        recebidos das plataformas autorizadas ou gerados durante o uso do
        Postora. Não envie dados de terceiros sem autorização ou outra base
        legal adequada.
      </p>

      <h2>3. Finalidades e bases legais</h2>
      <p>
        Criar a conta, executar agendamentos, disponibilizar o plano e atender
        solicitações são atividades relacionadas à execução do contrato ou a
        procedimentos solicitados antes da contratação. Registros fiscais e
        respostas a determinações legais podem ser necessários para cumprir
        obrigações legais ou regulatórias.
      </p>
      <p>
        A prevenção de fraude e a proteção do serviço podem se apoiar em
        legítimo interesse, após avaliação da necessidade e dos direitos das
        pessoas envolvidas. Quando o tratamento depender de consentimento, ele
        deve ser específico e pode ser revogado. A leitura desta política não
        equivale a consentimento para qualquer uso de dados.
      </p>

      <h2>4. Redes sociais, equipe e inteligência artificial</h2>
      <p>
        Ao conectar um canal e solicitar uma publicação, você permite o envio do
        conteúdo e das informações necessárias à rede escolhida. Os membros da
        organização acessam os recursos conforme suas permissões. Cada rede
        também trata dados segundo sua própria política.
      </p>
      <p>
        Um agente conectado por MCP pode consultar informações e executar as
        ferramentas autorizadas pela chave da organização. As respostas chegam
        ao cliente de IA utilizado por você. Proteja essa chave e revise as
        ações antes de autorizá-las. A geração de mídia pode enviar instruções e
        arquivos ao provedor responsável pelo recurso.
      </p>
      <p>
        Os recursos de geração podem utilizar OpenAI para texto e imagens,
        fal.ai para imagens, ElevenLabs para voz e Kie AI para vídeo, conforme o
        recurso habilitado. A montagem de vídeos também pode utilizar
        Transloadit. Integrações opcionais com HeyGen e ReelFarm enviam os dados
        necessários quando você as conecta e solicita uma geração.
      </p>
      <p className="panel small">
        Provedores identificados no código do produto. A lista de recursos
        habilitados e as condições de retenção e treinamento precisam ser
        confirmadas na configuração de produção. Claude Code, Codex e Cursor são
        clientes MCP escolhidos pelo usuário, e não necessariamente fornecedores
        contratados pelo Postora.
      </p>
      <p>
        A integração com YouTube utiliza os serviços de API do YouTube. Consulte
        a{' '}
        <a href="https://policies.google.com/privacy">
          Política de Privacidade do Google
        </a>{' '}
        e os{' '}
        <a href="https://www.youtube.com/t/terms">
          Termos de Serviço do YouTube
        </a>
        . Você pode revogar o acesso nas{' '}
        <a href="https://security.google.com/settings/security/permissions">
          permissões da sua Conta Google
        </a>
        . Revogar uma conexão impede novos acessos autorizados por ela, mas não
        apaga publicações já enviadas à rede.
      </p>

      <h2>5. Cookies e armazenamento no navegador</h2>
      <p>
        O aplicativo utiliza cookies e recursos do navegador para autenticação,
        seleção da organização e preferências, como idioma e aparência.
        Bloqueá-los pode afetar essas funções. O aplicativo utiliza PostHog para
        análise de uso. Eventos podem ser associados ao identificador, nome e
        e-mail da conta. O site de apresentação não integra o PostHog nesta
        versão.
      </p>
      <p className="panel small">
        Pendente de confirmação: inventário de cookies, eventos e demais funções
        habilitadas no PostHog, base legal e controles de escolha para
        tecnologias não essenciais. Esta minuta não pressupõe a existência de um
        painel de consentimento.
      </p>

      <h2>6. Fornecedores e transferências internacionais</h2>
      <p>Os fornecedores informados para a operação do Postora são:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Hostinger: hospedagem do aplicativo e dos serviços em VPS.</li>
        <li>Cloudflare R2: armazenamento dos arquivos de mídia.</li>
        <li>
          Stripe: processamento de pagamentos e administração de assinaturas.
        </li>
        <li>PostHog: análise do uso do aplicativo.</li>
        <li>
          Provedores de IA e mídia: conforme os recursos descritos na seção 4.
        </li>
      </ul>
      <p>
        O compartilhamento deve se limitar às informações necessárias à função
        de cada fornecedor. A Stripe processa os dados de pagamento; o Postora
        utiliza as referências e os resultados da cobrança para administrar a
        assinatura. Informações também podem ser fornecidas a autoridades quando
        houver obrigação legal aplicável.
      </p>
      <p>
        Esses serviços podem envolver tratamento fora do Brasil. Transferências
        internacionais exigem uma hipótese e as garantias previstas na LGPD e na
        regulamentação aplicável.
      </p>
      <p className="panel small">
        Pendente de confirmação: países de tratamento e mecanismos de
        transferência, além do fornecedor de e-mail. O código admite Resend ou
        um serviço SMTP, mas não confirma qual está contratado.
      </p>

      <h2>7. Conservação, exclusão e segurança</h2>
      <p>
        A conservação deve se limitar ao necessário para cada finalidade.
        Obrigações legais e o exercício regular de direitos podem justificar a
        manutenção de determinados registros após o encerramento da conta.
        Cancelar uma assinatura, desconectar uma rede e pedir a exclusão dos
        dados são operações distintas.
      </p>
      <p className="panel small">
        Pendente de confirmação: prazos por categoria, descarte de tokens,
        exclusão da conta, ciclo de backups e medidas de segurança em operação.
        O procedimento de remoção de dados obtidos do YouTube também precisa ser
        validado antes da publicação desta política.
      </p>

      <h2>8. Seus direitos</h2>
      <p>
        Nos termos da LGPD, você pode solicitar confirmação do tratamento,
        acesso, correção e informações sobre compartilhamento. Também pode
        solicitar anonimização, bloqueio ou eliminação de dados desnecessários,
        excessivos ou tratados irregularmente; portabilidade conforme a
        regulamentação; e eliminação de dados tratados com consentimento,
        observadas as exceções legais.
      </p>
      <p>
        Você pode revogar consentimento, conhecer as consequências de não
        fornecê-lo, opor-se ao tratamento nas hipóteses legais e pedir revisão
        de decisões exclusivamente automatizadas que afetem seus interesses.
        Também pode apresentar petição à{' '}
        <a href="https://www.gov.br/anpd/pt-br">ANPD</a>.
      </p>
      <p>
        O atendimento deve observar os prazos legais e pode exigir confirmação
        proporcional de identidade para proteger seus dados. Envie a solicitação
        para <a href="mailto:suporte@postora.com.br">suporte@postora.com.br</a>,
        indicando a conta e o direito que deseja exercer. Não envie senhas nem
        chaves de acesso.
      </p>

      <h2>9. Atualizações</h2>
      <p>
        A versão publicada deverá informar a data de vigência. Mudanças nas
        finalidades ou práticas de tratamento exigem atualização destas
        informações e, quando necessário, novo consentimento. Esta minuta ainda
        não substitui uma política em vigor.
      </p>
    </article>
  );
}
