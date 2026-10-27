// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

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
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
