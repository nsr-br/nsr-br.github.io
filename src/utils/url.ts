// Prefixa caminhos internos com o `base` do site (ex.: /nome-do-repo/ no GitHub Pages).
// Use em todo link interno: <a href={url('/blog/')}>.
export function url(path = '/'): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const clean = path.startsWith('/') ? path : `/${path}`;
	return `${base}${clean}`;
}
