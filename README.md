# NSR ANTIFA BR

Blog estático feito com [Astro](https://astro.build), com painel de edição [Sveltia CMS](https://sveltiacms.app)
em `/admin/` e publicação automática no GitHub Pages. Tudo código aberto e gratuito.

## Como funciona

1. Alguém escreve um post no painel (`https://<endereço do blog>/admin/`).
2. O painel salva o post como commit na branch `main` deste repositório.
3. O GitHub Actions (`.github/workflows/deploy.yml`) gera o site e publica no Pages em 1 ou 2 minutos.

## Publicar pela primeira vez

1. Crie o repositório no GitHub e envie este código para a branch `main`.
   - Repositório com nome `<conta>.github.io`: o blog fica em `https://<conta>.github.io/`.
   - Qualquer outro nome: o blog fica em `https://<conta>.github.io/<repo>/`.
   O deploy detecta sozinho qual dos dois e ajusta os links e o painel.
2. No repositório: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Rode o workflow (aba **Actions → Publicar no GitHub Pages → Run workflow**) ou faça um push.

## Entrar no painel

Abra `/admin/` e clique em **Entrar Usando Token de Acesso**. O painel mostra um link do GitHub que já
abre a criação do token com as permissões certas. Se for criar à mão, use um *fine-grained token*:

- **Repository access:** só este repositório
- **Permissions → Contents:** Read and write
- **Permissions → Pull requests:** Read and write

Cada pessoa que for escrever cria o próprio token, na própria conta, e precisa ter acesso de escrita
ao repositório.

> O botão **Entrar com GitHub** só funciona depois de publicar o
> [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) (Cloudflare Worker, grátis)
> e colocar a URL dele em `base_url` no `public/admin/config.yml`.

## Criar uma página nova

No painel: **Páginas → Novo**. Preencha título, resumo e texto e, se quiser, ligue **Mostrar no menu** e
escolha a **Posição no menu** (número menor aparece antes; Posts vem sempre primeiro). A página fica em
`/<título-sem-acento>/`, por exemplo "Repositório BR" → `/repositorio-br/`. Os títulos "Blog" e "Admin"
não podem ser usados, porque esses endereços já existem.

## Cadastrar um jogo no Repositório BR

No painel: **Repositório BR → Novo**. Nome, autoria, descrição, link, tipo, estilos e preço. A capa vai pelo
**endereço da imagem** (sem upload): no itch.io, botão direito na capa → "Copiar endereço da imagem". Se a
imagem faltar ou o endereço quebrar, o card mostra o nome do jogo no lugar.

Os filtros de Tipo e Estilo aparecem sozinhos quando o catálogo tem pelo menos dois valores diferentes.
Para mudar as opções (ex.: novo tipo), edite a lista em `public/admin/config.yml` **e** em `src/content.config.ts`.

## Escrever no computador, sem GitHub

```sh
npm install
npm run dev
```

- Blog: <http://localhost:4321/>
- Painel: <http://localhost:4321/admin/index.html>, opção **Trabalhar com Repositório Local**
  (Chrome, Chromium ou Edge). Ele grava direto nos arquivos desta pasta; depois é só fazer commit e push.

Rascunhos (`draft: true`) aparecem no `npm run dev` com um selo amarelo, mas ficam fora do site publicado.

## Onde mexer

| O quê | Onde |
|---|---|
| Nome e descrição do blog | `src/consts.ts` |
| Cores e fonte | topo de `src/styles/global.css` |
| Menu e rodapé | `src/components/Header.astro`, `src/components/Footer.astro` |
| Páginas (Sobre, Repositório BR...) | pelo painel (**Páginas**) ou `src/content/paginas/<slug>/index.md` |
| Posts | pelo painel ou `src/content/blog/<slug>/index.md` (imagens na mesma pasta) |
| Jogos do Repositório BR | pelo painel ou `src/content/jogos/<slug>.md` |
| Campos do painel | `public/admin/config.yml` |
| Logo e ícones | `src/assets/logo.png`, `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/icon-512.png`, `public/admin/logo.png` |
| Imagem de compartilhamento | `src/assets/og-default.png` |

## Domínio próprio (opcional)

Com um domínio (ex.: `nsrantifa.com.br`), basta configurá-lo em **Settings → Pages → Custom domain** e
rodar o deploy de novo: o workflow lê o endereço do Pages e ajusta links e painel sozinho.
