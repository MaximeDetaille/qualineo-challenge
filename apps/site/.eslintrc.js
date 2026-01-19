module.exports = {
  extends: ['../../.eslintrc.json'],
  parserOptions: {
    requireConfigFile: false,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['webpack.config.js', 'postcss.config.js', 'tailwind.config.js'],
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
}
