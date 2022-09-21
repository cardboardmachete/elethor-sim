export default {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
  ],
  plugins: ['vue'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'indent': ['error', 2],
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2],
    'vue/max-attributes-per-line': ['error', {
      singleline: 4,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/no-v-html': 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/require-default-prop': 'off',
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        'mixins',
        'key',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        'extends',
        'ROUTER_GUARDS',
        'layout',
        'middleware',
        'validate',
        'scrollToTop',
        'transition',
        'loading',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'emits',
        'setup',
        'asyncData',
        'data',
        'computed',
        'methods',
        'fetch',
        'head',
        'watch',
        'watchQuery',
        'LIFECYCLE_HOOKS',
        ['provide', 'inject'],
        ['components', 'directives', 'filters'],
        ['template', 'render'],
        'renderError',
      ],
    }],
  },
};
