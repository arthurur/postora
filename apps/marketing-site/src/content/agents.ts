export const agents = [
  {
    slug: 'claude-code',
    name: 'Claude Code',
    intro:
      'Transforme seu planejamento em rascunhos e agendamentos a partir do terminal.',
    usage:
      'Peça ao Claude Code para consultar os canais conectados, preparar o texto e mostrar a proposta antes de criar um post.',
    source: 'https://code.claude.com/docs/en/mcp',
  },
  {
    slug: 'codex',
    name: 'Codex',
    intro:
      'Leve o planejamento de conteúdo para o seu fluxo de trabalho com o Codex.',
    usage:
      'Use o Codex para listar posts de um período e preparar novos rascunhos. Confira o canal, o texto e o horário antes de autorizar um agendamento.',
    source: 'https://developers.openai.com/codex/mcp',
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    intro:
      'Prepare publicações com o agente do Cursor, no mesmo lugar em que você trabalha.',
    usage:
      'Conecte o servidor MCP ao Cursor e peça ao agente para consultar os canais, buscar as regras de uma rede e preparar um rascunho.',
    source: 'https://cursor.com/docs/mcp',
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
    description: 'Conecte Claude Code, Codex ou Cursor.',
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
