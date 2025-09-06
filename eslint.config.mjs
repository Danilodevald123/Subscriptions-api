// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // <-- nuevo

export default tseslint.config(
  { ignores: ['eslint.config.mjs', 'dist', 'coverage'] }, // podés sumar dist/coverage
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: { 'simple-import-sort': simpleImportSort }, // <-- registrar plugin en flat config
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Ordena imports/exports (warning para que no sea bloqueante en primeras pasadas)
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Tus reglas existentes:
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
);
