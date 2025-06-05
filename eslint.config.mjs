import { FlatCompat } from '@eslint/eslintrc';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: ['node_modules', '.next', 'coverage', '.idea', '.vscode']
  },
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^@?\\w'], ['^~/(components|containers|hooks)/'], ['^(~/(utils|constants|styles|types)/|\\.)']]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  }
];

export default eslintConfig;
