// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// No GitHub Pages, o workflow de deploy preenche SITE e BASE_PATH sozinho
// (ex.: https://usuario.github.io + /nome-do-repo). Localmente, vale o padrão abaixo.
// Com domínio próprio, troque SITE pelo domínio e deixe BASE_PATH vazio.
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	trailingSlash: 'ignore',
	integrations: [mdx(), sitemap()],
});
