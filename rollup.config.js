import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import json from 'rollup-plugin-json'
import sveltePreprocessPostcss from 'svelte-preprocess-postcss'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

export default {
	input: `./index.js`,
	output: {
		name: `app`,
		file: `./public/bundle.js`,
		format: `iife`,
		sourcemap: true,
	},
	plugins: [
		svelte({
			preprocess: {
				style: (...args) => sveltePreprocessPostcss()(...args).catch(err => {
					console.error(err)
					throw err
				}),
			},
			css(css) {
				css.write(`public/components-build.css`)
			},
		}),
		commonjs(),
		json(),
		resolve({
			browser: true,
		}),
		babel({
			babelrc: false,
			presets: [
				[
					`env`,
					{
						modules: false,
					},
				],
			],
			plugins: [
				`external-helpers`,
			],
		}),
		minify(),
	],
}
