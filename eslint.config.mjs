// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		files: ['**/*.ts', '**/*.tsx'],
		ignores: ["dist/**", "esm/**"],
		plugins: {
			tseslint,
		},
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommended,
		]
	},
);
