module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: ['prettier'],
  rules: {
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off',
    'no-extra-semi': 'error',
    'no-empty-pattern': 'off',
    'no-case-declarations': 'off',
    'no-useless-escape': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'never'],
    'vue/no-v-html': ['off'],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/singleline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/script-indent': ['off', null, { baseIndent: 0 }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 2,
          allowFirstLine: false,
        },
      },
    ],
  },
}
