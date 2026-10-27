import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Cada post é uma pasta: src/content/blog/<slug>/index.md, com as imagens ao lado.
	// É o formato que o Sveltia CMS grava (ver public/admin/config.yml).
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			heroAlt: z.string().optional(),
			tags: z.array(z.string()).default([]),
			// Rascunho aparece no `npm run dev`, mas fica fora do site publicado.
			draft: z.boolean().default(false),
		}),
});

// Páginas fixas (Sobre, Repositório BR...), criadas pelo painel.
// Cada uma vira src/content/paginas/<slug>/index.md e fica no endereço /<slug>/.
const paginas = defineCollection({
	loader: glob({ base: './src/content/paginas', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Aparece no menu do topo e no rodapé, em ordem crescente de `ordem`.
		menu: z.boolean().default(false),
		ordem: z.number().default(50),
	}),
});

// Catálogo do Repositório BR: um arquivo por jogo em src/content/jogos/<slug>.md, só com os dados.
// As listas abaixo são as mesmas opções do painel (public/admin/config.yml): mude nos dois lugares.
export const TIPOS = ['Jogo', 'Suplemento', 'Aventura', 'Cenário', 'Guia'] as const;
export const ESTILOS = ['NSR', 'OSR', 'Indie'] as const;
export const PRECOS = ['Gratuito', 'Pague quanto quiser', 'Pago'] as const;

const jogos = defineCollection({
	loader: glob({ base: './src/content/jogos', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		autoria: z.string(),
		descricao: z.string(),
		link: z.string().url(),
		// Imagem pelo endereço (ex.: a capa no itch.io), sem upload.
		imagem: z.string().url().optional(),
		tipo: z.enum(TIPOS),
		estilos: z.array(z.enum(ESTILOS)).default([]),
		preco: z.enum(PRECOS).optional(),
	}),
});

export const collections = { blog, paginas, jogos };
