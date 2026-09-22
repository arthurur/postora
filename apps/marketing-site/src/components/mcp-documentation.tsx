import Link from 'next/link';
import { agents } from '../content/agents';
import { mcpTools } from '../content/tools';

export function McpIntroduction() {
  return (
    <>
      <p>
        O MCP conecta seu cliente de IA às ferramentas do Postora. Seu
        assistente pode consultar canais e posts, preparar rascunhos e criar
        agendamentos usando as contas da sua organização.
      </p>
      <h2>Quem cuida de cada parte</h2>
      <p>
        O Postora opera o endpoint MCP e configura as aplicações dos provedores
        sociais. Você autoriza suas contas sociais no app e conecta o cliente de
        IA com a chave de API da organização e o endereço exibido nas
        configurações de desenvolvedor.
      </p>
      <p>
        Há guias para Claude Code, Codex, Cursor, ChatGPT, Claude e Claude
        Cowork. O acesso e os custos do cliente de IA pertencem à sua conta
        nesse serviço. Conectores personalizados e ações de escrita dependem dos
        recursos e das permissões disponíveis na sua conta.
      </p>
      <h2>Agendar e gerar mídia são coisas diferentes</h2>
      <p>
        Listar canais e agendar pelo agente externo não exige uma chave de
        provedor de IA no Postora. O próprio cliente interpreta seu pedido. As
        ferramentas de geração de imagens e vídeos usam os provedores
        configurados pelo Postora e os créditos da sua organização.
      </p>
      <h2>O que conferir antes de começar</h2>
      <ul>
        <li>Tenha pelo menos um canal conectado para criar publicações.</li>
        <li>
          Peça a um administrador da organização acesso à configuração. A área
          de desenvolvedor depende da permissão administrativa e de um plano com
          API pública.
        </li>
        <li>
          Trate a chave como uma senha. Ela representa a organização, não apenas
          um canal.
        </li>
        <li>
          Comece listando os canais, depois revise um rascunho antes de
          autorizar o agendamento.
        </li>
      </ul>
      <p>
        As ferramentas atuais não excluem posts. A atualização de configurações
        de um post não edita seu texto nem reagenda sua data. Para essas
        mudanças, use o app.
      </p>
      <Link href="/docs/mcp/configuracao">Configurar seu cliente</Link>
    </>
  );
}

export function McpSetup() {
  return (
    <>
      <p>
        Entre no app, selecione a organização e abra{' '}
        <strong>Configurações → Desenvolvedores → Acesso</strong>. Copie a chave
        de API e o endereço MCP mostrados ali. Se a interface ainda exibir os
        rótulos em inglês, procure Settings, Developers e Access.
      </p>
      <p>
        Essa área exige acesso administrativo, como ADMIN ou SUPERADMIN, e a
        disponibilidade da API pública no plano. Se não aparecer, confirme a
        organização e as permissões com seu administrador.
      </p>
      <h2>Escolha a forma de autenticação</h2>
      <ul>
        <li>
          <strong>Cabeçalho:</strong> endereço terminado em <code>/mcp</code>,
          com <code>Authorization: Bearer SUA_CHAVE_POSTORA</code>.
        </li>
        <li>
          <strong>Chave no endereço:</strong> copie a URL completa terminada em{' '}
          <code>/mcp/SUA_CHAVE_POSTORA</code>. Nesse caso, o cabeçalho não é
          necessário. A URL inteira é uma credencial, não a compartilhe.
        </li>
      </ul>
      <p>
        Use o host real exibido no app. Os valores abaixo são marcadores para
        substituir, não endereços de produção. O servidor também tem transporte
        SSE legado, mas estes exemplos usam HTTP. A configuração por chave não
        depende de uma listagem em marketplace nem de OAuth automático.
      </p>
      <h2 id="claude-code">Claude Code</h2>
      <p>
        No terminal, substitua os dois marcadores. O endereço de cabeçalho é a
        URL terminada em <code>/mcp</code>.
      </p>
      <pre>
        <code>
          {
            'claude mcp add --transport http \\\n  --header "Authorization: Bearer SUA_CHAVE_POSTORA" \\\n  postora "ENDERECO_MCP_COPIADO_DO_APP"'
          }
        </code>
      </pre>
      <p>
        Para a alternativa com chave no endereço, omita <code>--header</code> e
        use a URL completa copiada do app. Execute <code>claude mcp list</code>{' '}
        ou abra <code>/mcp</code> na sessão para conferir o servidor.
      </p>
      <h2 id="codex">Codex</h2>
      <p>
        Adicione ao arquivo <code>~/.codex/config.toml</code>. Disponibilize a
        variável <code>POSTORA_API_KEY</code> no ambiente que inicia o Codex,
        com a chave copiada do app.
      </p>
      <pre>
        <code>
          {
            '[mcp_servers.postora]\nurl = "ENDERECO_MCP_COPIADO_DO_APP"\nbearer_token_env_var = "POSTORA_API_KEY"'
          }
        </code>
      </pre>
      <p>
        Para usar a URL com chave, copie essa URL em <code>url</code> e remova{' '}
        <code>bearer_token_env_var</code>. Confira o servidor com{' '}
        <code>codex mcp list</code>.
      </p>
      <h2 id="cursor">Cursor</h2>
      <p>
        Adicione ao arquivo <code>~/.cursor/mcp.json</code>. A variável{' '}
        <code>POSTORA_API_KEY</code> precisa estar disponível no ambiente que
        inicia o Cursor.
      </p>
      <pre>
        <code>
          {JSON.stringify(
            {
              mcpServers: {
                postora: {
                  url: 'ENDERECO_MCP_COPIADO_DO_APP',
                  headers: { Authorization: 'Bearer ${env:POSTORA_API_KEY}' },
                },
              },
            },
            null,
            2
          )}
        </code>
      </pre>
      <p>
        Para usar a chave no endereço, substitua <code>url</code> pela URL
        completa e remova <code>headers</code>. Confira o status nas
        configurações de ferramentas MCP do Cursor.
      </p>
      <h2 id="chatgpt">ChatGPT</h2>
      <p>
        Na versão web, confira se sua conta permite criar apps MCP
        personalizados e executar ações de escrita. Em workspaces, o
        administrador precisa liberar esses recursos. A disponibilidade varia
        por plano; consulte a{' '}
        <a href="https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt">
          documentação de apps MCP do ChatGPT
        </a>
        .
      </p>
      <ol>
        <li>
          Abra as configurações de Apps e a opção de criar um app personalizado,
          com o modo de desenvolvedor habilitado.
        </li>
        <li>
          Informe o nome Postora e a URL HTTPS completa com chave, terminada em{' '}
          <code>/mcp/SUA_CHAVE_POSTORA</code>, copiada do app.
        </li>
        <li>
          Para essa URL com chave, selecione a opção sem autenticação adicional.
          A credencial já está no endereço. Não insira a chave como segredo de
          cliente OAuth.
        </li>
        <li>
          Carregue as ferramentas, salve o app e habilite-o na conversa. Comece
          com a consulta de canais descrita abaixo.
        </li>
      </ol>
      <p>
        Este é um caminho de configuração manual a verificar no seu ambiente,
        não uma conexão Postora já homologada pelo ChatGPT. Se a conta permitir
        apenas leitura, ela não poderá criar rascunhos nem agendamentos.
      </p>
      <h2 id="claude">Claude</h2>
      <p>
        Nas configurações de personalização do Claude, abra Conectores e escolha
        adicionar um conector personalizado. Dê o nome Postora e informe a URL
        HTTPS completa com chave copiada do app. Não preencha campos OAuth para
        essa forma de conexão. Habilite o conector na conversa e teste a
        consulta aos canais antes de criar posts.
      </p>
      <p>
        Em contas de equipe, um administrador pode precisar cadastrar o conector
        para a organização antes de você habilitá-lo. Confira a disponibilidade
        e as etapas na{' '}
        <a href="https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp">
          documentação de conectores remotos do Claude
        </a>
        .
      </p>
      <h2 id="claude-cowork">Claude Cowork</h2>
      <p>
        Configure o conector remoto do Postora conforme os passos para o Claude
        acima. No Cowork, disponibilize esse conector para a tarefa e confira as
        permissões de uso das ferramentas. Comece pedindo apenas a lista de
        canais, depois forneça o briefing e peça uma proposta de calendário.
      </p>
      <p>
        Arquivos acessíveis à tarefa não são enviados automaticamente ao
        Postora. Para publicar mídia, use arquivos da biblioteca ou uma URL
        pública aceita pela ferramenta de importação. Consulte os recursos da
        sua conta no{' '}
        <a href="https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork">
          guia do Cowork
        </a>
        .
      </p>
      <h2>Conectores remotos precisam alcançar o servidor</h2>
      <p>
        ChatGPT, Claude e Cowork precisam alcançar o endpoint HTTPS público do
        Postora. Um endereço localhost na sua máquina não atende a esse acesso
        remoto. Estes guias não usam os conectores oficiais do Postiz: cadastre
        o endereço da sua própria organização no Postora. A URL com chave é uma
        credencial; não a publique em documentos, mensagens ou repositórios.
      </p>
      <h2>Confira a conexão sem publicar</h2>
      <p>
        Peça: “Use integrationList para listar meus canais. Não crie nem altere
        posts.” Compare o resultado com os canais da organização no app. Estes
        passos descrevem a configuração suportada; a conexão com o endpoint da
        sua organização ainda precisa passar por essa verificação.
      </p>
      <h2>Se não conectar</h2>
      <ul>
        <li>
          Chave inválida: confira se a chave pertence à organização selecionada
          e se não há espaços extras. No cabeçalho, mantenha o prefixo Bearer.
        </li>
        <li>
          Chave rotacionada: substitua a chave em todos os clientes. Se usava a
          chave na URL, copie também o novo endereço. Reinicie ou reconecte o
          cliente.
        </li>
        <li>
          Configurações ausentes: confira a organização, a função administrativa
          e o acesso à API no plano.
        </li>
        <li>
          Servidor indisponível: confira o endereço no app e a disponibilidade
          do serviço Postora. Não substitua por um endpoint do Postiz.
        </li>
      </ul>
      <p>
        Evite salvar chaves em arquivos versionados ou em capturas de tela. Uma
        chave no comando também pode ficar no histórico do terminal.
      </p>
      <h2>Documentação dos clientes</h2>
      <p>
        Sintaxe conferida em 22 de setembro de 2026. Referências oficiais:{' '}
        {agents.map((agent, index) => (
          <span key={agent.slug}>
            {index > 0 && ', '}
            <a href={agent.source}>{agent.name}</a>
          </span>
        ))}
        .
      </p>
    </>
  );
}

export function McpTools() {
  return (
    <>
      <p>
        Esta referência cobre as 12 ferramentas de produto registradas nesta
        versão do Postora. O cliente pode mostrar um prefixo com o nome do
        servidor. Consulte o esquema retornado pela conexão para os tipos
        completos.
      </p>
      {mcpTools.map((tool) => (
        <section className="tool" key={tool.name}>
          <h2>{tool.title}</h2>
          <p>
            <code>{tool.name}</code>
          </p>
          <p>
            <strong>Entrada: </strong>
            {tool.input}
          </p>
          <p>{tool.result}</p>
        </section>
      ))}
      <h2>Estrutura de uma publicação</h2>
      <p>
        Em <code>postsAndComments</code>, o primeiro item é o post, e os demais
        são comentários ou respostas, quando a rede permite. Cada item exige{' '}
        <code>content: string</code> em HTML e{' '}
        <code>attachments: string[]</code>. Use parágrafos{' '}
        <code>{'<p>…</p>'}</code>; os elementos aceitos são h1, h2, h3, u,
        strong, li, ul e p. Não combine u e strong.
      </p>
      <p>
        As URLs dos anexos precisam usar domínios de upload permitidos e
        extensões aceitas. Importe mídias externas com{' '}
        <code>uploadFromUrlTool</code> e use o <code>path</code> retornado.
        Configurações usam uma lista de objetos <code>{'{ key, value }'}</code>,
        com valores definidos pelo esquema da rede.
      </p>
      <p>
        Use datas em UTC e confira o fuso com a pessoa que pediu o agendamento.
        Rascunhos ainda precisam de conteúdo ou mídia; a validação completa de
        formato e tamanho é exigida para publicar. Não trate um rascunho salvo
        como garantia de que ele está pronto para ir ao ar.
      </p>
      <p>
        <code>postSettingsTool</code> não altera o texto nem a data de um post
        existente. Não há ferramenta de exclusão. Use o app para editar
        conteúdo, reagendar ou excluir.
      </p>
      <Link href="/docs/mcp/exemplos">Ver exemplos de uso</Link>
    </>
  );
}

export function McpExamples() {
  return (
    <>
      <p>
        Comece com consultas e use os IDs retornados pela sua conexão. Os nomes
        e os conteúdos abaixo são fictícios.
      </p>
      <h2>1. Verifique seus canais</h2>
      <pre>
        <code>
          {
            'Liste meus canais conectados com integrationList.\nMostre o nome e a rede de cada canal. Não crie nem altere posts.'
          }
        </code>
      </pre>
      <p>
        Para uma agência, consulte <code>groupList</code> e use o ID do cliente
        no campo <code>group</code> de <code>integrationList</code>.
      </p>
      <h2>2. Prepare um rascunho</h2>
      <pre>
        <code>
          {
            'Prepare um rascunho para o LinkedIn da Agência Horizonte:\n"Três aprendizados do nosso último projeto."\nConsulte as regras da conexão e mostre o texto para minha revisão.\nNão agende nem publique.'
          }
        </code>
      </pre>
      <p>
        Depois de revisar e autorizar a criação, o agente pode usar{' '}
        <code>integrationSchedulePostTool</code> com{' '}
        <code>{'type="draft"'}</code>. Este exemplo de estrutura usa um ID a
        substituir e uma data ilustrativa:
      </p>
      <pre>
        <code>
          {JSON.stringify(
            {
              socialPost: [
                {
                  integrationId: 'ID_DO_CANAL_LINKEDIN',
                  isPremium: false,
                  date: '2026-10-15T12:00:00Z',
                  shortLink: false,
                  type: 'draft',
                  postsAndComments: [
                    {
                      content:
                        '<p>Três aprendizados do nosso último projeto.</p>',
                      attachments: [],
                    },
                  ],
                  settings: [],
                },
              ],
            },
            null,
            2
          )}
        </code>
      </pre>
      <p>
        Consulte <code>integrationSchema</code> e preencha <code>settings</code>{' '}
        conforme o resultado. A lista vazia acima ilustra a estrutura, não
        substitui a configuração exigida pelo canal.
      </p>
      <h2>3. Agende com data e canal confirmados</h2>
      <pre>
        <code>
          {
            'Prepare um post de Instagram do Café Aurora com a foto que enviei.\nQuero publicar em 15 de outubro de 2026, às 9h, em America/Sao_Paulo.\nMostre a legenda, o canal, a mídia e o horário antes de agendar.\nSó crie o agendamento depois da minha confirmação.'
          }
        </code>
      </pre>
      <p>
        O agente deve consultar as regras da conexão, importar a foto para a
        biblioteca se necessário e converter o horário para UTC. Após sua
        confirmação, crie um novo post com <code>{'type="schedule"'}</code> e
        confira o resultado no calendário. Criar um novo post não converte um
        rascunho existente e pode duplicá-lo; para agendar aquele rascunho, use
        o app.
      </p>
      <h2>4. Consulte antes de alterar</h2>
      <pre>
        <code>
          {
            'Liste meus posts entre 2026-10-01T00:00:00Z e 2026-10-31T23:59:59Z.\nMostre quais estão em rascunho ou agendados. Não altere nada.'
          }
        </code>
      </pre>
      <p>
        Para mudar uma configuração da rede em um post ainda não publicado, use
        o ID encontrado e consulte o esquema. <code>postSettingsTool</code> não
        altera o texto nem a data. Exclusão e reagendamento ficam no app.
      </p>
      <h2>Adapte o pedido à rede</h2>
      <p>
        No TikTok, confirme publicação direta ou envio para finalizar no
        aplicativo. No YouTube, forneça um vídeo MP4. No X, confirme o limite de
        texto da conta. No Facebook, escolha a Página correta. No Threads,
        respeite o limite de texto e os formatos da conexão.
      </p>
      <Link href="/canais">Consultar os formatos de cada rede</Link>
    </>
  );
}
