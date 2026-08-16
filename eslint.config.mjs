import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['build/', '.next/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...[next].flat(),
  prettierRecommended,
  {
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // components here are consistently `const X = memo(() => ...)`
      'react/display-name': 'off',
      // goober's `glob` is a tagged template used for its side effect
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTaggedTemplates: true },
      ],
    },
  }
);
