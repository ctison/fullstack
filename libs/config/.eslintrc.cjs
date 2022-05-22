// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@rushstack/eslint-config/profile/web-app',
    // '@rushstack/eslint-config/mixins/friendly-locals',
    '@rushstack/eslint-config/mixins/tsdoc',
    '@rushstack/eslint-config/mixins/react',
    'plugin:mdx/recommended',
  ],
  settings: {
    react: {
      version: '18',
    },
  },
  plugins: ['simple-import-sort'],
}
