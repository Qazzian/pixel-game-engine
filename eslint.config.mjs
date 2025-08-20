// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginJest from 'eslint-plugin-jest';

export default tseslint.config(
	{
		files: ['**/*.ts', '**/*.tsx'],
		ignores: ['dist/**', 'esm/**'],
		plugins: {
			tseslint,
		},
		extends: [eslint.configs.recommended, tseslint.configs.recommended],
	},
	{
		files: ['**/*.test.js', '**/*.test.jsx'],
		ignores: ['dist/**', 'esm/**'],
		plugins: { pluginJest },
		languageOptions: {
			globals: pluginJest.environments.globals.globals,
		},
		rules: {
			'jest/no-disabled-tests': 'warn',
			'jest/no-focused-tests': 'error',
			'jest/no-identical-title': 'error',
			'jest/prefer-to-have-length': 'warn',
			'jest/valid-expect': 'error',
		},
	},
);
