export const agents = [
  {
    slug: 'chatgpt',
    icon: '/icons/agents/openai.svg',
    name: 'ChatGPT',
    intro:
      'Desenvolva suas ideias na conversa e prepare publicações para o calendário do Postora.',
    about:
      'ChatGPT é o assistente de IA da OpenAI para conversas e tarefas. Com um app MCP personalizado habilitado na conta, a conversa pode consultar ferramentas externas. A conexão com o Postora permite trabalhar com seus canais e publicações a partir das instruções que você dá.',
    setup:
      'Cadastre uma conexão MCP personalizada no ChatGPT usando o endereço completo com chave copiado do Postora. Confira as ferramentas antes de usar na conversa.',
    requirement:
      'ChatGPT na web com criação de apps MCP permitida. Para salvar ou agendar, a conta e o workspace precisam permitir ações de escrita, que não estão disponíveis em todos os planos.',
    prompt:
      'Quero divulgar a nova coleção. Prepare opções de legenda para Instagram e um texto para Facebook. Liste meus canais e me diga quais fotos preciso enviar ao Postora antes de agendar.',
    scenarios: [
      {
        title: 'Desenvolva uma ideia',
        text: 'Converse sobre o público, a oferta e o tom do post antes de escolher a versão que vai para o calendário.',
      },
      {
        title: 'Adapte uma campanha',
        text: 'Peça textos diferentes para cada rede e revise os formatos e as mídias necessárias para publicar.',
      },
      {
        title: 'Consulte a semana',
        text: 'Veja o que já está planejado em um intervalo de datas e use o resultado para orientar os próximos pedidos.',
      },
    ],
    question: 'Basta abrir qualquer conversa no ChatGPT?',
    answer:
      'Primeiro é preciso criar e habilitar a conexão personalizada. O acesso depende do plano, das permissões do workspace e das ferramentas liberadas para a conversa. Este guia não representa uma listagem oficial do Postora no diretório de apps.',
    source:
      'https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt',
  },
  {
    slug: 'codex',
    icon: '/icons/agents/openai.svg',
    name: 'Codex',
    intro:
      'Leve o planejamento de conteúdo para o seu fluxo de trabalho com o Codex.',
    about:
      'Codex é o agente de programação da OpenAI. Ele ajuda a entender projetos e executar tarefas com código e ferramentas. Conectado ao Postora por MCP, também pode consultar publicações e preparar a comunicação de um produto a partir do contexto que você fornece.',
    setup:
      'Configure o servidor MCP no Codex e use uma variável de ambiente para fornecer a chave de API do Postora.',
    requirement:
      'Um ambiente do Codex com suporte a servidores MCP remotos e acesso à configuração do cliente.',
    prompt:
      'A partir deste resumo da nova versão, prepare um post para o LinkedIn. Confira as publicações da semana para evitar repetição e me mostre a proposta antes de agendar.',
    scenarios: [
      {
        title: 'Explique o que mudou',
        text: 'Passe um resumo das melhorias e peça um texto voltado a quem usa o produto, sem detalhes internos do código.',
      },
      {
        title: 'Prepare uma campanha',
        text: 'Peça variações de um anúncio para as contas conectadas. Escolha os textos e confirme o horário de cada publicação.',
      },
      {
        title: 'Revise o planejamento',
        text: 'Liste rascunhos e agendamentos de um período para decidir o que ainda precisa ser preparado.',
      },
    ],
    question: 'Preciso de uma chave da OpenAI no Postora para usar o Codex?',
    answer:
      'Para consultar canais e criar agendamentos por MCP, você usa o acesso do próprio Codex e a chave da organização no Postora. Uma chave de provedor de IA no Postora só é necessária para recursos de geração de mídia que dependem desse provedor.',
    source: 'https://developers.openai.com/codex/mcp',
  },
  {
    slug: 'cursor',
    icon: '/icons/agents/cursor.svg',
    name: 'Cursor',
    intro:
      'Prepare publicações com o agente do Cursor, no mesmo lugar em que você trabalha.',
    about:
      'Cursor é um editor de código com recursos de IA. Seu agente pode usar o contexto de um projeto e ferramentas conectadas por MCP. O Postora acrescenta canais e publicações a esse fluxo, para você preparar conteúdo enquanto trabalha no produto.',
    setup:
      'Adicione o Postora à configuração MCP do Cursor e confira se as ferramentas estão disponíveis para o agente.',
    requirement:
      'Cursor com o agente e servidores MCP habilitados, além da chave de API disponível no ambiente do editor.',
    prompt:
      'Use este briefing para preparar um anúncio da funcionalidade. Faça uma versão para o LinkedIn e outra para o X, consulte as regras de cada canal e aguarde minha revisão.',
    scenarios: [
      {
        title: 'Do briefing ao anúncio',
        text: 'Use o documento que já está no projeto para preparar uma publicação sobre a próxima entrega.',
      },
      {
        title: 'Mantenha a voz do produto',
        text: 'Forneça exemplos e orientações de escrita para o agente adaptar o texto às suas redes.',
      },
      {
        title: 'Separe seus clientes',
        text: 'Consulte os grupos e canais da organização antes de preparar conteúdo para uma conta específica.',
      },
    ],
    question: 'Preciso criar uma integração no código do meu projeto?',
    answer:
      'Não. A conexão é configurada no cliente MCP do Cursor. O guia usa a configuração do usuário, fora do repositório, para que a credencial do Postora não seja incluída no código do projeto.',
    source: 'https://cursor.com/docs/mcp',
  },
  {
    slug: 'claude',
    icon: '/icons/agents/claude.svg',
    name: 'Claude',
    intro:
      'Trabalhe o texto com o Claude e organize os próximos posts da sua marca no Postora.',
    about:
      'Claude é o assistente de IA da Anthropic. Você pode conversar sobre ideias, revisar textos e trabalhar com documentos. Um conector MCP remoto dá acesso às ferramentas do Postora, reunindo a preparação do conteúdo e a consulta ao calendário na conversa.',
    setup:
      'Adicione o endereço MCP do Postora como um conector personalizado no Claude e habilite suas ferramentas na conversa.',
    requirement:
      'Acesso a conectores personalizados na sua conta do Claude. Em organizações, o administrador pode precisar liberar o conector primeiro.',
    prompt:
      'Use este briefing da marca para propor três posts para o LinkedIn. Consulte meus canais, evite repetir os temas já agendados neste mês e mostre os textos para revisão.',
    scenarios: [
      {
        title: 'Aproveite um briefing',
        text: 'Forneça informações da marca e peça propostas de conteúdo coerentes com a campanha.',
      },
      {
        title: 'Revise antes de salvar',
        text: 'Ajuste linguagem, tamanho e chamada do texto na conversa antes de autorizar a criação do rascunho.',
      },
      {
        title: 'Planeje com contexto',
        text: 'Consulte o calendário de um período para distribuir os assuntos entre as próximas publicações.',
      },
    ],
    question: 'É a mesma conexão do Claude Code?',
    answer:
      'Os dois usam as ferramentas MCP do Postora, mas a configuração é diferente. No Claude, você adiciona um conector remoto pela interface. No Claude Code, configura o servidor no ambiente de desenvolvimento.',
    source:
      'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp',
  },
  {
    slug: 'claude-code',
    icon: '/icons/agents/claude.svg',
    name: 'Claude Code',
    intro:
      'Transforme seu planejamento em rascunhos e agendamentos a partir do terminal.',
    about:
      'Claude Code é o agente de programação da Anthropic. Ele trabalha com arquivos e ferramentas no seu ambiente de desenvolvimento. Com o MCP do Postora, você pode usar esse contexto para preparar a divulgação de um projeto e consultar seu calendário de publicações.',
    setup:
      'Adicione o servidor HTTP do Postora ao Claude Code pelo terminal e autentique com a chave da sua organização.',
    requirement:
      'Claude Code instalado e acesso a servidores MCP no ambiente em que você trabalha.',
    prompt:
      'Leia as notas de lançamento deste projeto e prepare versões para LinkedIn e X. Consulte meus canais e mostre os textos antes de salvar qualquer rascunho.',
    scenarios: [
      {
        title: 'Divulgue uma versão',
        text: 'Use as notas de lançamento como ponto de partida para explicar o que mudou e para quem a novidade é útil.',
      },
      {
        title: 'Organize uma sequência',
        text: 'Transforme um guia do projeto em propostas de posts. Revise cada texto e escolha as datas antes de agendar.',
      },
      {
        title: 'Confira o calendário',
        text: 'Consulte os posts do período antes de preparar outra publicação sobre o mesmo assunto.',
      },
    ],
    question: 'Preciso deixar o terminal aberto depois de agendar?',
    answer:
      'Depois que o agendamento foi criado e confirmado no Postora, o serviço cuida da publicação. A sessão do Claude Code só precisa estar ativa enquanto você consulta ou envia pedidos.',
    source: 'https://code.claude.com/docs/en/mcp',
  },
  {
    slug: 'claude-cowork',
    icon: '/icons/agents/claude.svg',
    name: 'Claude Cowork',
    intro:
      'Organize briefings e tarefas de conteúdo com o Cowork e leve os posts aprovados para o Postora.',
    about:
      'Cowork é o ambiente da Anthropic para delegar tarefas em várias etapas ao Claude, usando arquivos e ferramentas conectadas. Com o conector do Postora, um trabalho de planejamento pode incluir a consulta aos canais e a preparação de publicações para revisão.',
    setup:
      'Adicione o Postora como conector remoto do Claude e disponibilize a conexão para a tarefa no Cowork.',
    requirement:
      'Acesso ao Cowork e a conectores personalizados. As permissões para arquivos e ferramentas dependem da conta e do ambiente usados na tarefa.',
    prompt:
      'Organize este briefing em uma proposta de calendário semanal para LinkedIn e Facebook. Consulte os posts já agendados, apresente os textos e horários e espere minha aprovação antes de criar publicações.',
    scenarios: [
      {
        title: 'Organize o material',
        text: 'Reúna os documentos que a tarefa pode acessar e peça um plano de conteúdo com os pontos que faltam confirmar.',
      },
      {
        title: 'Prepare a semana',
        text: 'Distribua os assuntos entre canais e datas. Revise a proposta antes de permitir que a tarefa crie agendamentos.',
      },
      {
        title: 'Confira a entrega',
        text: 'Depois de autorizar os agendamentos, peça uma consulta ao período e compare o resultado com a proposta aprovada.',
      },
    ],
    question: 'Conectar o Cowork cria uma rotina automática?',
    answer:
      'A conexão disponibiliza ferramentas, mas não cria uma tarefa recorrente. Uma rotina no cliente depende dos recursos e da configuração da sua conta. Agendamentos já confirmados no Postora seguem o calendário do serviço.',
    source:
      'https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork',
  },
] as const;

export const agentFeatures = [
  {
    emoji: '🎯',
    title: 'Encontre o canal certo',
    text: 'Consulte as contas conectadas e os grupos de clientes para preparar a publicação no lugar certo.',
  },
  {
    emoji: '✍️',
    title: 'Prepare rascunhos',
    text: 'Peça ao agente para trabalhar o texto e salve uma versão no Postora quando estiver pronta para revisão.',
  },
  {
    emoji: '📅',
    title: 'Agende com data definida',
    text: 'Informe canal, conteúdo, mídia e fuso horário. Confira a proposta antes de autorizar o agendamento.',
  },
  {
    emoji: '🔎',
    title: 'Consulte suas publicações',
    text: 'Liste os posts de um período e acompanhe o que está em rascunho, agendado ou publicado.',
  },
  {
    emoji: '📐',
    title: 'Respeite cada formato',
    text: 'O agente pode consultar as regras do canal e as opções exigidas pela rede antes de criar o post.',
  },
  {
    emoji: '🎬',
    title: 'Trabalhe com mídia',
    text: 'Use arquivos da biblioteca ou importe uma URL pública aceita. Gerar imagens e vídeos depende dos provedores e créditos disponíveis no Postora.',
  },
] as const;

export const docTopics = [
  {
    slug: 'introducao',
    title: 'Introdução ao MCP',
    description: 'O que seu agente pode fazer com o Postora.',
  },
  {
    slug: 'configuracao',
    title: 'Configuração',
    description: 'Conecte seu cliente de IA ao Postora.',
  },
  {
    slug: 'ferramentas',
    title: 'Referência de ferramentas',
    description: 'Entradas, resultados e limites de cada operação.',
  },
  {
    slug: 'exemplos',
    title: 'Exemplos',
    description: 'Consulte canais, crie rascunhos e agende com intenção.',
  },
] as const;
