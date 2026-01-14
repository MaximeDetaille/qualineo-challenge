module.exports = {
  extends: ['../../.eslintrc.json'],
  globals: {
    NodeJS: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    requireConfigFile: false,
  },
  ignorePatterns: ['*.graphql', 'webpack.config.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
  ],
}
