// Public tool names are the keys assembled by LoadToolsService, not always createTool.id.
export const mcpTools = [
  {
    name: 'integrationList',
    title: 'Listar canais',
    input:
      'group?: string. Sem group, lista os canais da organização. Use um ID retornado por groupList para filtrar por cliente.',
    result:
      'Retorna os IDs, nomes, plataformas e imagens dos canais. Consulta sem publicar conteúdo.',
  },
  {
    name: 'groupList',
    title: 'Listar grupos de clientes',
    input: 'Objeto vazio: {}.',
    result:
      'Retorna id e name de cada grupo. Use o id no filtro de integrationList.',
  },
  {
    name: 'integrationSchema',
    title: 'Consultar regras de uma rede',
    input:
      'platform: string, identificador retornado por integrationList. isPremium: boolean, informe false quando não se aplicar.',
    result:
      'Retorna rules, maxLength, settings e tools. Consulte antes de criar posts; os campos e limites variam por rede e tipo de conta.',
  },
  {
    name: 'triggerTool',
    title: 'Buscar opções de uma conexão',
    input:
      'integrationId: string, methodName: string e dataSchema: Array<{ key: string, value: string }>. Use um método e os parâmetros indicados por integrationSchema.',
    result:
      'Consulta opções como identificadores exigidos pelas configurações da rede. Pode contatar a rede e renovar a conexão; não aceita métodos arbitrários.',
  },
  {
    name: 'integrationSchedulePostTool',
    title: 'Criar rascunhos e publicações',
    input:
      'socialPost: lista de posts. Cada item exige integrationId: string, isPremium: boolean, date: string em UTC, shortLink: boolean, type: "draft" | "schedule" | "now", postsAndComments e settings.',
    result:
      'Retorna postId e integration dos posts criados ou erros de validação. type="now" publica imediatamente. A operação não é idempotente: repetir pode criar duplicatas.',
  },
  {
    name: 'postsListTool',
    title: 'Consultar posts de um período',
    input:
      'startDate: string e endDate: string, ambas em UTC. customer?: string, ID de grupo retornado por groupList, para filtrar pelos canais de um cliente.',
    result:
      'Retorna posts cuja data está no intervalo, incluindo rascunhos, agendados, publicados e com erro. Inclui id, data, estado, conteúdo, canal e configurações.',
  },
  {
    name: 'postSettingsTool',
    title: 'Alterar configurações de um post',
    input:
      'id: string, retornado por postsListTool. settings: Array<{ key: string, value: valor do campo }>. Consulte integrationSchema para os campos aceitos.',
    result:
      'Mescla somente as configurações enviadas em um rascunho ou post ainda não publicado. Não altera o texto nem a data. Não exclui posts. Retorna postId e publishDate ou um erro.',
  },
  {
    name: 'uploadFromUrlTool',
    title: 'Importar mídia de uma URL',
    input: 'url: string com uma URL pública de imagem ou vídeo.',
    result:
      'Salva o arquivo na biblioteca e retorna id e path, ou error. Aceita JPEG, PNG, GIF, WebP, AVIF, BMP, TIFF e MP4. Limites: 10 MiB por imagem e 1 GiB por vídeo. O formato ainda precisa ser aceito pela rede de destino.',
  },
  {
    name: 'generateImageTool',
    title: 'Gerar uma imagem',
    input: 'prompt: string.',
    result:
      'Gera e salva uma imagem, retornando id e path. Usa o provedor de IA configurado pelo Postora e créditos de imagem da organização. A permissão para o gerador no app depende do plano.',
  },
  {
    name: 'generateVideoOptions',
    title: 'Consultar opções de geração de vídeo',
    input: 'reasoning?: string, uma justificativa curta opcional.',
    result:
      'Retorna tipos de vídeo, orientação, ferramentas auxiliares e esquema dos parâmetros. A lista de opções não garante que todos estejam disponíveis no teste grátis.',
  },
  {
    name: 'videoFunctionTool',
    title: 'Consultar parâmetros auxiliares de vídeo',
    input:
      'identifier: string e functionName: string, conforme generateVideoOptions.',
    result:
      'Retorna opções auxiliares, como vozes. Use somente funções indicadas para o gerador escolhido.',
  },
  {
    name: 'generateVideoTool',
    title: 'Gerar um vídeo',
    input:
      'identifier: string, output: "vertical" | "horizontal" e customParams: Array<{ key: string, value: valor do campo }> conforme o esquema do gerador.',
    result:
      'Retorna url ou error. Depende dos provedores configurados e dos créditos de vídeo. Alguns geradores não permitem uso durante o teste grátis.',
  },
] as const;
