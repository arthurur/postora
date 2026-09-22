export type Channel = {
  slug: string;
  name: string;
  intro: string;
  formats: string;
  account: string;
  workflow: string;
  limits: string[];
};

// Capabilities checked against the corresponding social providers and settings DTOs.
export const channels: Channel[] = [
  {
    slug: 'x',
    name: 'X',
    intro: 'Prepare suas ideias e organize a próxima conversa no X.',
    formats:
      'Posts de texto, até quatro imagens ou um vídeo. Sequências de posts e artigos também têm configurações próprias.',
    account:
      'Conecte a conta do X que você quer usar. Confira qual conta está aberta no X antes de autorizar.',
    workflow:
      'Escreva o post, escolha os anexos e defina quando publicar. Para uma sequência, revise também as respostas antes de agendar.',
    limits: [
      'O limite de texto verificado pelo Postora é de 280 caracteres para posts comuns ou 4.000 quando a conexão informa Premium.',
      'Artigos aceitam imagens, não vídeos. Um artigo salvo como rascunho no X não aceita respostas de uma sequência.',
      'O acesso a artigos e outros recursos depende da elegibilidade da conta no X.',
    ],
  },
  {
    slug: 'instagram',
    name: 'Instagram',
    intro: 'Organize o feed, os Reels e os Stories no seu calendário.',
    formats:
      'Fotos, carrosséis, Reels e Stories. O conteúdo precisa ter mídia; uma legenda sozinha não é uma publicação do Instagram.',
    account:
      'Use uma conta profissional. A conexão pelo Facebook exige uma conta comercial vinculada a uma Página. A conexão direta pelo Instagram usa a autorização da própria conta profissional.',
    workflow:
      'Selecione a conta, envie a mídia, escolha o formato e revise a legenda e as configurações antes de agendar.',
    limits: [
      'Legendas de até 2.200 caracteres. A conexão pelo Facebook valida carrosséis com até dez mídias.',
      'Stories são publicados como itens individuais, não como carrossel. A disponibilidade depende do tipo de conta e das permissões concedidas.',
      'Um Reel de teste precisa de exatamente um vídeo. Nem toda conta tem acesso a todos os recursos do Instagram.',
    ],
  },
  {
    slug: 'facebook',
    name: 'Facebook',
    intro:
      'Mantenha a Página do seu negócio presente, com posts preparados antes.',
    formats: 'Texto, fotos, vídeos e Stories para Páginas do Facebook.',
    account:
      'Autorize uma conta com permissão para gerenciar a Página e selecione a Página desejada. A integração publica em Páginas, não em perfis pessoais ou grupos.',
    workflow:
      'Escolha a Página, prepare o conteúdo e defina a data no calendário. Cada Página conectada ocupa um canal do plano.',
    limits: [
      'Stories precisam de foto ou vídeo. Cada mídia é publicada como um Story separado.',
      'As permissões de publicação da Página precisam continuar ativas. O Facebook pode exigir uma nova autorização.',
      'Métricas dependem das permissões e dos dados disponibilizados pelo Facebook.',
    ],
  },
  {
    slug: 'tiktok',
    name: 'TikTok',
    intro: 'Prepare vídeos e fotos, e escolha como terminar a publicação.',
    formats:
      'Um vídeo, uma foto ou várias fotos. Não é possível misturar um vídeo com outros anexos no mesmo post.',
    account:
      'Conecte a conta do TikTok e autorize o envio e a publicação. As opções de privacidade dependem da conta.',
    workflow:
      'Escolha publicação direta para publicar na conta. Se preferir finalizar no TikTok, selecione envio para o aplicativo e conclua a publicação por lá em até 24 horas.',
    limits: [
      'O modo de envio para o aplicativo não publica automaticamente. Sem conclusão em até 24 horas, o envio é descartado.',
      'No modo de envio, o TikTok ignora as configurações além do título ou conteúdo. Ajustes de privacidade, comentários, dueto, stitch e conteúdo comercial exigem publicação direta.',
      'A indicação de vídeo feito com IA, dueto e stitch se aplicam somente a vídeos. O limite de texto no Postora é de 2.000 caracteres.',
    ],
  },
  {
    slug: 'youtube',
    name: 'YouTube',
    intro: 'Planeje os próximos vídeos do seu canal com antecedência.',
    formats:
      'Publicação de um vídeo por post, com título, descrição e configurações de visibilidade.',
    account:
      'Conecte a conta Google que tem acesso ao canal do YouTube e conceda as permissões de envio de vídeo.',
    workflow:
      'Envie um arquivo MP4, preencha título e descrição, escolha a visibilidade e marque a data de publicação.',
    limits: [
      'O post precisa de exatamente um vídeo MP4. Imagens avulsas e posts de comunidade não fazem parte deste fluxo.',
      'A descrição aceita até 5.000 caracteres. Revise também a indicação de conteúdo infantil e as demais configurações exigidas.',
      'O processamento e as verificações do YouTube podem continuar após o envio.',
    ],
  },
  {
    slug: 'linkedin',
    name: 'LinkedIn',
    intro: 'Dê espaço às suas ideias e às novidades da empresa no calendário.',
    formats:
      'Texto, imagens, um vídeo ou carrossel em documento gerado a partir de imagens.',
    account:
      'Conecte seu perfil pessoal ou uma Página de empresa que você pode administrar. São conexões distintas, e cada uma ocupa um canal.',
    workflow:
      'Escolha o perfil ou a Página, prepare o texto e a mídia e revise o formato antes de agendar.',
    limits: [
      'Vídeos usam um único anexo. O carrossel em documento exige pelo menos duas imagens.',
      'Permissões e recursos diferem entre perfis pessoais e Páginas. Não presuma que terão as mesmas métricas.',
      'O limite de texto do provedor é de 3.000 caracteres.',
    ],
  },
  {
    slug: 'threads',
    name: 'Threads',
    intro: 'Organize as ideias que você quer compartilhar no Threads.',
    formats: 'Texto, imagem, vídeo e carrosséis de mídia.',
    account:
      'Conecte seu perfil do Threads e autorize o Postora a publicar em seu nome.',
    workflow:
      'Prepare o texto e os anexos, confira as opções de resposta e escolha a data no calendário.',
    limits: [
      'O limite de texto do provedor é de 500 caracteres.',
      'Vídeos e carrosséis precisam passar pelo processamento do Threads antes da publicação.',
      'As opções e métricas disponíveis dependem das permissões concedidas pela rede.',
    ],
  },
];
