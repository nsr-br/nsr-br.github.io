import { getCollection } from 'astro:content';

// Endereços que já existem no site: uma página com esse slug seria ignorada.
export const RESERVADOS = new Set(['blog', 'admin', 'rss.xml', 'images']);

export async function getPaginas() {
	const paginas = await getCollection('paginas');
	return paginas.filter((p) => !RESERVADOS.has(p.id));
}

// Páginas marcadas "Mostrar no menu", na ordem escolhida no painel.
export async function getMenu() {
	const paginas = await getPaginas();
	return paginas
		.filter((p) => p.data.menu)
		.sort((a, b) => a.data.ordem - b.data.ordem || a.data.title.localeCompare(b.data.title, 'pt-BR'))
		.map((p) => ({ href: `/${p.id}/`, label: p.data.title }));
}
