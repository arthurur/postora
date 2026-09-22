import Link from 'next/link';
import { pageMetadata } from '../../../content/site';

export const metadata = pageMetadata(
  '/termos',
  'Termos de uso',
  'Condições de uso do Postora, contas, publicações, planos, integrações e direitos dos usuários.'
);

export default function TermsPage() {
  return (
    <article className="prose">
      <p className="eyebrow">Informações legais</p>
      <h1>Termos de uso</h1>
      <p className="small muted">
        Versão para revisão de 22 de setembro de 2026.
      </p>
      <p>
        Estes termos descrevem as condições propostas para o site postora.com.br
        e o aplicativo web app.postora.com.br. O tratamento de dados está
        descrito na <Link href="/privacidade">Política de privacidade</Link>.
        Esta versão é uma minuta e ainda não constitui um contrato em vigor.
      </p>

      <h2>1. Identificação e contratação</h2>
      <p>
        Postora é um serviço de planejamento e agendamento de publicações para
        criadores, empreendedores, social medias e agências. O serviço utiliza
        software derivado do projeto Postiz. Essa origem não torna os operadores
        do Postiz parte do contrato com o Postora.
      </p>
      <p>
        O serviço é operado por Hygge Solutions, CNPJ 63.340.076/0001-86.
        Solicitações de atendimento, cancelamento, privacidade e reclamações
        podem ser enviadas para{' '}
        <a href="mailto:suporte@postora.com.br">suporte@postora.com.br</a>.
      </p>
      <p className="panel small">
        Pendente de confirmação: endereço comercial e data de vigência. A
        apresentação e o aceite destes termos no cadastro e na contratação ainda
        precisam ser integrados ao aplicativo.
      </p>

      <h2>2. Conta e organização</h2>
      <p>
        Mantenha os dados de cadastro atualizados e proteja senhas e chaves de
        API. Convide apenas pessoas autorizadas a trabalhar na organização e
        revise suas permissões. Quem conecta contas de uma empresa ou de
        clientes precisa ter autorização para administrá-las e publicar em seu
        nome.
      </p>
      <p className="panel small">
        Pendente de confirmação: idade mínima de contratação e fluxo de
        encerramento de conta. Relate suspeitas de acesso indevido ao e-mail de
        atendimento.
      </p>

      <h2>3. Publicações e canais</h2>
      <p>
        Um canal corresponde a uma conta, perfil ou página conectada. Duas
        contas na mesma rede ocupam dois canais. Formatos, permissões e métricas
        dependem da rede e do plano. Consulte as páginas de{' '}
        <Link href="/canais">canais disponíveis</Link> e{' '}
        <Link href="/precos">preços</Link> antes de contratar.
      </p>
      <p>
        Antes de agendar, confira conteúdo, anexos, destinatário, horário e
        fuso. Autorizações expiradas, restrições da plataforma e falhas técnicas
        podem impedir uma publicação. Acompanhe o resultado no aplicativo. O
        Postora não promete alcance, engajamento ou aprovação do conteúdo pela
        rede.
      </p>

      <h2>4. Planos, teste e cobrança</h2>
      <p>
        A oferta atual inclui sete dias de teste gratuito. Os planos são
        apresentados em reais, com cobrança mensal ou anual. No plano anual, o
        valor por mês exibido é uma referência calculada a partir do total
        anual, e não uma promessa de parcelamento mensal.
      </p>
      <p>
        As assinaturas são processadas pela Stripe e têm renovação recorrente
        conforme o período escolhido, até o cancelamento. A contratação deve
        apresentar o valor total, a periodicidade, os recursos incluídos e as
        condições de renovação antes da confirmação. Alterações comerciais devem
        respeitar a oferta contratada e os direitos previstos em lei.
      </p>
      <p className="panel small">
        Pendente de confirmação: exigência de cartão no teste, cobrança ao final
        do período gratuito, tributos e procedimento de comunicação de mudanças
        de preço.
      </p>

      <h2>5. Cancelamento e reembolso</h2>
      <p>
        Nas relações de consumo em que o artigo 49 do Código de Defesa do
        Consumidor se aplica, a contratação fora do estabelecimento permite
        desistência em sete dias, contados da assinatura ou do recebimento do
        produto ou serviço, conforme o caso, com devolução dos valores pagos nos
        termos da lei. O teste gratuito não substitui esse direito.
      </p>
      <p>
        Estes termos não afastam direitos legais por falha na prestação do
        serviço, cobrança indevida ou descumprimento da oferta. Não há nesta
        minuta uma regra geral de pagamentos não reembolsáveis.
      </p>
      <p>
        Para pedir cancelamento ou exercer o direito de arrependimento, entre em
        contato pelo e-mail{' '}
        <a href="mailto:suporte@postora.com.br">suporte@postora.com.br</a>. O
        aplicativo também oferece o gerenciamento da assinatura na área de
        cobrança. O cancelamento da assinatura não equivale à exclusão dos dados
        pessoais nem remove publicações feitas nas redes.
      </p>
      <p className="panel small">
        Pendente de confirmação: momento de encerramento do acesso em cada fluxo
        de cancelamento, tratamento do saldo anual e política de reembolsos fora
        das hipóteses legais. O código possui fluxos de cancelamento imediato e
        ao fim do período, que precisam ser validados na jornada oferecida ao
        cliente.
      </p>

      <h2>6. Conteúdo e uso permitido</h2>
      <p>
        Você mantém os direitos sobre o conteúdo que envia. A autorização de uso
        pelo Postora deve se limitar a armazenar, preparar e transmitir esse
        conteúdo para executar as funções solicitadas. Não há transferência de
        propriedade das suas publicações ao Postora.
      </p>
      <p>
        Use apenas materiais e dados que você pode utilizar legalmente. Não use
        o serviço para fraude, spam, violação de privacidade ou direitos
        autorais, exploração de menores, distribuição de malware ou acesso não
        autorizado. Respeite as regras de cada rede e as restrições técnicas de
        suas APIs.
      </p>
      <p>
        Marcas de terceiros identificam as integrações. As licenças dos
        componentes de código aberto continuam aplicáveis; estes termos não
        retiram os direitos concedidos por essas licenças.
      </p>

      <h2>7. Agentes e geração com IA</h2>
      <p>
        Ao conectar um agente por MCP, você permite que ele utilize as
        ferramentas acessíveis à chave da organização. Uma solicitação pode
        consultar dados, criar rascunhos ou agendar publicações. Revise a
        proposta antes de autorizar alterações e mantenha a chave protegida.
      </p>
      <p>
        Resultados de IA podem conter erros e exigem revisão de fatos, direitos
        de uso e adequação ao público. Consulte as regras do provedor utilizado.
        Recursos de geração de mídia estão sujeitos à disponibilidade e aos
        créditos do plano.
      </p>

      <h2>8. Serviços de terceiros</h2>
      <p>
        As redes conectadas mantêm suas próprias regras de acesso, moderação e
        publicação. Mudanças nessas regras podem afetar uma integração. Isso não
        elimina as obrigações do Postora previstas na legislação aplicável.
      </p>
      <p>
        O uso da integração com YouTube está sujeito aos{' '}
        <a href="https://www.youtube.com/t/terms">
          Termos de Serviço do YouTube
        </a>{' '}
        e à{' '}
        <a href="https://policies.google.com/privacy">
          Política de Privacidade do Google
        </a>
        . A <Link href="/privacidade">Política de privacidade do Postora</Link>{' '}
        explica o acesso a dados e a revogação de permissões.
      </p>

      <h2>9. Suspensão e encerramento</h2>
      <p>
        Descumprimento destes termos, inadimplência ou risco à segurança podem
        justificar restrições proporcionais ao acesso, respeitadas as obrigações
        legais e o direito de contestação. A interrupção de um agendamento no
        Postora não apaga conteúdo já publicado em outra plataforma.
      </p>
      <p className="panel small">
        Pendente de confirmação: procedimento de aviso e contestação,
        encerramento, exportação e destino dos dados após o término do serviço.
      </p>

      <h2>10. Legislação, responsabilidade e alterações</h2>
      <p>
        A proposta é regida pela legislação brasileira, incluindo a LGPD e o
        Código de Defesa do Consumidor quando aplicável. Permanecem preservados
        os direitos que não podem ser afastados por contrato e as regras legais
        de competência, inclusive o foro do consumidor nas hipóteses previstas
        em lei.
      </p>
      <p>
        A responsabilidade de cada parte será apurada conforme a legislação
        aplicável. Esta minuta não fixa um teto de indenização nem exclui a
        responsabilidade por falhas atribuíveis ao Postora. A versão final
        deverá indicar sua vigência e como alterações relevantes serão
        comunicadas aos usuários.
      </p>
    </article>
  );
}
