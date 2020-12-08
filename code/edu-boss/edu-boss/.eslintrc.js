module.exports = {
  root: true,
  env: {
    node: true
  },
  // 使用插件的编码校验规则
  'extends': [
    'plugin:vue/essential', // 检验语法错误、VUE中的指令规范及style-guide风格指南规范错误提示
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 自定义编码校验规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      "multiline": {
        "delimiter": 'none',
        "requireLast": true
      }
    }]
    // 'semi': ['off', 'always']
  }
}
