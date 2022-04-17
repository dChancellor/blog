import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: 'src/routes/_post.svelte'
			},
			smartypants: {
				quotes: true,
				ellipses: true,
				dashes: 'oldschool'
			}
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$pages: path.resolve('./src/pages'),
					$types: path.resolve('./src/types'),
					$assets: path.resolve('./src/assets'),
					$styles: path.resolve('./src/styles')
				}
			}
		}
	}
};

export default config;
