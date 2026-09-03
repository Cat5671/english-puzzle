import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**', 'coverage/**'],
  },

  eslint.configs.recommended,
  ...tseslint.configs.strict,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'max-lines-per-function': [
        'warn',
        { max: 40, skipBlankLines: true, skipComments: true },
      ],
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
          ignore: [-1, 0, 1], // Разрешаем базовые числа для индексов и счетчиков
        },
      ],
    },
  },
  eslintConfigPrettier,
];
