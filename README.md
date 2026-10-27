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
| Cores | topo de `src/styles/global.css` |
| Menu e rodapé | `src/components/Header.astro`, `src/components/Footer.astro` |
| Página "Sobre" | pelo painel (**Páginas → Sobre**) ou `src/content/paginas/sobre.md` |
| Posts | pelo painel ou `src/content/blog/<slug>/index.md` (imagens na mesma pasta) |
| Campos do painel | `public/admin/config.yml` |
| Ícone / imagem de compartilhamento | `public/favicon.svg`, `src/assets/og-default.png` |

## Domínio próprio (opcional)

Com um domínio (ex.: `nsrantifa.com.br`), basta configurá-lo em **Settings → Pages → Custom domain** e
rodar o deploy de novo: o workflow lê o endereço do Pages e ajusta links e painel sozinho.
