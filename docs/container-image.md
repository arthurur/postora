# Imagem pública do Postora

O workflow `.github/workflows/build-containers.yml` gera as imagens do app e do site de marketing a cada
push na `main`. Também pode ser executado manualmente em **Actions > Build
Containers > Run workflow**, selecionando `main`. Execuções manuais em outras
branches são ignoradas. Tags Git não disparam esse workflow.

O app usa `Dockerfile.dev` e inclui frontend, backend e orchestrator. O site de
marketing usa `apps/marketing-site/Dockerfile` e roda como outro serviço no mesmo
projeto Compose. Ambos são publicados no pacote `ghcr.io/arthurur/postora`, com
tags diferentes. PostgreSQL, Redis e Temporal continuam como serviços separados.

## Estrutura do projeto na Hostinger

O projeto mostrado no painel da VPS tem nove containers. Adicionar o serviço
`marketing-site` ao mesmo Compose o levará a dez. O app e o site usam imagens
separadas para poderem iniciar seus próprios processos.

| Container                | Conteúdo                                 | Atualização com a imagem do Postora           |
| ------------------------ | ---------------------------------------- | --------------------------------------------- |
| `postiz`                 | Frontend, backend, orchestrator e Nginx  | Usa `ghcr.io/arthurur/postora:main`           |
| `marketing-site`         | Site público em Next.js                  | Usa `ghcr.io/arthurur/postora:marketing-main` |
| `postiz-postgres`        | Banco do app                             | Mantém a imagem e a configuração atuais       |
| `postiz-redis`           | Redis do app                             | Mantém a imagem e a configuração atuais       |
| `spotlight`              | Monitoramento e depuração                | Mantém a imagem e a configuração atuais       |
| `temporal`               | Servidor Temporal                        | Mantém a imagem e a configuração atuais       |
| `temporal-admin-tools`   | Ferramentas de administração do Temporal | Mantém a imagem e a configuração atuais       |
| `temporal-elasticsearch` | Elasticsearch do Temporal                | Mantém a imagem e a configuração atuais       |
| `temporal-postgresql`    | Banco do Temporal                        | Mantém a imagem e a configuração atuais       |
| `temporal-ui`            | Interface do Temporal                    | Mantém a imagem e a configuração atuais       |

O `orchestrator` é o worker do app e roda dentro de `postiz`; ele se conecta ao
servidor do container `temporal`. A publicação não cria containers separados para
frontend, backend ou worker. O Nginx continua ouvindo na porta interna `5000`,
compatível com o mapeamento `4007:5000` mostrado no painel.

O Compose deste repositório já inclui `marketing-site`, mas a captura da Hostinger
não mostra esse serviço. Ele precisa ser adicionado ao projeto existente. A captura
não informa as variáveis, redes ou volumes em uso; preserve essas configurações
na Hostinger.

## Publicação inicial

1. Coloque esta configuração na `main` do repositório `arthurur/postora`.
2. Confirme que GitHub Actions está habilitado e aguarde o workflow concluir.
   Ele usa `GITHUB_TOKEN` com `contents: read` e `packages: write`. Não é
   necessário cadastrar um token pessoal nem fornecer credenciais da VPS.
3. O app e o marketing ficam no mesmo pacote `postora` da conta `arthurur`.
   Confira que o pacote está **Public**. Não é necessária uma segunda mudança de
   visibilidade para a tag do marketing.
4. Verifique o download das duas imagens sem credenciais, usando um diretório
   temporário vazio:

   ```bash
   docker_config_dir=$(mktemp -d)
   docker --config "$docker_config_dir" pull ghcr.io/arthurur/postora:main
   docker --config "$docker_config_dir" pull ghcr.io/arthurur/postora:marketing-main
   rm -r "$docker_config_dir"
   ```

O workflow deriva o nome da imagem de `github.repository`. Se o repositório mudar de nome, atualize também a referência no Compose.

## Tags disponíveis

- `ghcr.io/arthurur/postora:main`: build publicado do commit que ainda era o topo
  da `main` na verificação de publicação.
- `ghcr.io/arthurur/postora:sha-<SHA completo>`: build de um commit específico.
- `ghcr.io/arthurur/postora:marketing-main`: site de marketing publicado do
  commit que ainda era o topo da `main` na verificação de publicação.
- `ghcr.io/arthurur/postora:marketing-sha-<SHA completo>`: site de marketing de
  um commit específico.
- `build-<run id>-<tentativa>[-marketing]-<arquitetura>`: imagens intermediárias
  de cada execução, usadas para montar as imagens finais.

As tags finais suportam `linux/amd64` e `linux/arm64`. As tags `main` e
`marketing-main` só são atualizadas quando os quatro builds terminam. Se um
build falhar antes da publicação, elas mantêm as imagens anteriores. A atualização
das duas tags finais acontece em operações separadas no GHCR. Se a publicação
falhar entre as operações, elas podem apontar temporariamente para commits
diferentes. Para implantar as duas imagens do mesmo commit, use as tags
`sha-<SHA completo>` e `marketing-sha-<SHA completo>` de um workflow concluído
com sucesso.
Reexecutar um commit antigo publica sua tag de commit, mas não deve substituir
`main`. Não publicamos uma tag `latest`.

Uma nova execução do mesmo commit pode atualizar sua tag, pois as imagens base e
os passos de build podem mudar. Para fixar exatamente o mesmo artefato, use o
endereço com digest, `ghcr.io/arthurur/postora@sha256:<digest>`.

## Atualização na VPS da Hostinger

No editor Compose do **projeto que já está em uso na Hostinger**, localize
`services.postiz.image` e substitua seu valor por `ghcr.io/arthurur/postora:main`.
Adicione o serviço `marketing-site` ao mesmo projeto, com a imagem
`ghcr.io/arthurur/postora:marketing-main` e porta `4300:4300`. Preserve o nome
do projeto, as variáveis, os volumes, as redes e os demais serviços. O site não
precisa de `.env`, banco de dados ou volume de uploads.

Este trecho mostra apenas os dois serviços relevantes. Não substitua o conteúdo
inteiro do editor por ele:

```yaml
services:
  postiz:
    image: ghcr.io/arthurur/postora:main
  marketing-site:
    image: ghcr.io/arthurur/postora:marketing-main
    restart: always
    ports:
      - '4300:4300'
```

Se o serviço tiver `build:` ou `pull_policy: never` de uma configuração anterior,
remova essas opções ao passar a usar a imagem publicada.

Antes de atualizar, faça backup do banco e registre a imagem/digest atual.
O comando de inicialização existente executa `prisma db push --accept-data-loss`.
Uma mudança de schema pode alterar ou excluir dados. Voltar à imagem anterior
não desfaz essas alterações; pode ser necessário restaurar o backup.

Depois de confirmar o build e a visibilidade pública, execute no diretório do
Compose ativo, com o mesmo nome de projeto e os mesmos arquivos `-f`, se usados:

```bash
docker compose pull postiz marketing-site
docker compose up -d --no-deps --no-build postiz marketing-site
docker compose ps postiz marketing-site
docker compose logs --tail=100 postiz marketing-site
```

O comando `up` acima inicia o marketing e recria o app caso sua imagem tenha
mudado. Os outros oito containers continuam em execução. Confira o acesso ao app
e ao site, além dos logs. A recriação do app pode causar uma breve indisponibilidade.
O site responde na porta 4300 do host; para acessá-lo pelo domínio, configure o
proxy HTTPS da Hostinger para encaminhar `postora.com.br` a essa porta.

O `docker-compose.yaml` deste repo usa `POSTORA_IMAGE_TAG` para ambos os serviços.
Se estiver usando esse formato na VPS, defina `POSTORA_IMAGE_TAG=sha-<SHA completo>`
no `.env` para selecionar o mesmo commit do app e do marketing. Deixe a variável
ausente para acompanhar `main` e `marketing-main`.

O comando existente `pnpm deploy:production` continua fazendo build local na VPS.
Ele não implementa esse fluxo de download e não deve ser usado para atualizar a
imagem publicada. Não há deploy automático nem conexão com a VPS neste workflow.

## Credenciais e contexto de build

O build usa um checkout do GitHub e não recebe o `.env` da VPS. O `.dockerignore`
exclui arquivos `.env`, diretórios `.secrets` e `.ssh`, chaves e diretórios locais
de uploads, backups e configuração. As credenciais de produção devem entrar
somente na execução do container, por variáveis ou arquivos montados na VPS.

Não adicione segredos ao Dockerfile, aos argumentos de build nem aos arquivos
versionados. Se um build precisar de um segredo, use um secret mount do BuildKit.

Referências:

- [GitHub Container Registry: autenticação e visibilidade](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Segredos no build Docker](https://docs.docker.com/build/building/secrets/)
