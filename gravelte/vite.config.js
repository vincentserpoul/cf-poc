import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			// these are the aliases and paths to them
			'@components': path.resolve('./src/lib/components'),
			'@lib': path.resolve('./src/lib')
		}
	}
};

export default config;
