# Imagem pública do Postora

O workflow `.github/workflows/build-containers.yml` gera a imagem do app a cada
push na `main`. Também pode ser executado manualmente em **Actions > Build
Containers > Run workflow**, selecionando `main`. Execuções manuais em outras
branches são ignoradas. Tags Git não disparam esse workflow.

A imagem inclui frontend, backend e orchestrator, usando `Dockerfile.dev`.
O site de marketing continua com seu próprio Dockerfile e não faz parte desta
publicação. PostgreSQL, Redis e Temporal continuam como serviços separados.

## Publicação inicial

1. Coloque esta configuração na `main` do repositório `arthurur/postora`.
2. Confirme que GitHub Actions está habilitado e aguarde o workflow concluir.
   Ele usa `GITHUB_TOKEN` com `contents: read` e `packages: write`. Não é
   necessário cadastrar um token pessoal nem fornecer credenciais da VPS.
3. No GitHub, abra o pacote `postora` da conta `arthurur`. Em **Package settings >
   Change visibility**, selecione **Public**. A primeira publicação cria um
   pacote privado por padrão, mesmo em repositórios públicos.
4. Verifique o download sem credenciais, usando um diretório temporário vazio:

   ```bash
   docker_config_dir=$(mktemp -d)
   docker --config "$docker_config_dir" pull ghcr.io/arthurur/postora:main
   rm -r "$docker_config_dir"
   ```

O workflow deriva o nome da imagem de `github.repository`. Se o repositório mudar
de nome, atualize também a referência no Compose.

## Tags disponíveis

- `ghcr.io/arthurur/postora:main`: build publicado do commit que ainda era o topo
  da `main` na verificação de publicação.
- `ghcr.io/arthurur/postora:sha-<SHA completo>`: build de um commit específico.
- `build-<run id>-<tentativa>-amd64` e `build-<run id>-<tentativa>-arm64`: imagens
  intermediárias de cada execução, usadas para montar a imagem final.

As tags finais suportam `linux/amd64` e `linux/arm64`. A tag `main` só é atualizada
quando ambos os builds terminam. Se o build falhar, ela mantém a imagem anterior.
Reexecutar um commit antigo publica sua tag de commit, mas não deve substituir
`main`. Não publicamos uma tag `latest`.

Uma nova execução do mesmo commit pode atualizar sua tag, pois as imagens base e
os passos de build podem mudar. Para fixar exatamente o mesmo artefato, use o
endereço com digest, `ghcr.io/arthurur/postora@sha256:<digest>`.

## Atualização na VPS da Hostinger

Edite o serviço do app no **projeto Compose que já está em uso na Hostinger**.
Preserve o nome do projeto, as variáveis, os volumes, as redes e os demais serviços.
Não substitua a configuração inteira pelo Compose de desenvolvimento deste repo.

```yaml
services:
  postiz:
    image: ghcr.io/arthurur/postora:main
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
docker compose pull postiz
docker compose up -d --no-deps --no-build postiz
docker compose ps postiz
docker compose logs --tail=100 postiz
```

Substitua `postiz` se o serviço tiver outro nome. A recriação pode causar uma breve
indisponibilidade. Confira o acesso ao app e os logs após a atualização.

O `docker-compose.yaml` deste repo usa
`ghcr.io/arthurur/postora:${POSTORA_IMAGE_TAG:-main}`. Se estiver usando esse mesmo
formato na VPS, defina `POSTORA_IMAGE_TAG=sha-<SHA completo>` no `.env` para
selecionar um commit. Deixe a variável ausente para acompanhar `main`.

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
