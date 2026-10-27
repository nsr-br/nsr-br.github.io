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

// Páginas fixas editáveis pelo painel (hoje só a "Sobre").
const paginas = defineCollection({
	loader: glob({ base: './src/content/paginas', pattern: '*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = { blog, paginas };
