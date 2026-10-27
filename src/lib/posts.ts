import { getCollection } from 'astro:content';

// Posts visíveis, do mais novo para o mais antigo. Rascunhos só aparecem em desenvolvimento.
export async function getPosts() {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
