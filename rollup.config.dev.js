import htmlTemplate from 'rollup-plugin-generate-html-template';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import sveltePreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    name: 'app',
		sourcemap: true
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		production && terser(), // minify, but only in production
    json(),
    svelte({
      preprocess: sveltePreprocess({ postcss: true }),
    }),
    css({ output: 'index.css' }),
    progress({
      clearLine: false // default: true
    }),
    url(),
    htmlTemplate({
      template: 'src/index.html',
      target: 'index.html',
      attrs: ['defer']
    }),
    serve({
      contentBase: 'dist',
      historyApiFallback: true,
    }),
    livereload()
	]
};
