import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			smartypants: {
				quotes: true,
				ellipses: true,
				dashes: 'oldschool',
			},
		}),
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$pages: path.resolve('./src/pages'),
					$dictionary: path.resolve('./src/dictionary'),
					$types: path.resolve('./src/types'),
					$assets: path.resolve('./src/assets'),
					$styles: path.resolve('./src/styles'),
					$store: path.resolve('./src/store'),
				},
			},
		},
	},
};

export default config;
