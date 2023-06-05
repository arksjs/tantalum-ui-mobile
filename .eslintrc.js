require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 自定义规则，具体配置可参考：https://eslint.vuejs.org/rules/
  rules: {
    // override/add rules settings here, such as:
    // 禁止不必要的分号
    // '@typescript-eslint/no-extra-semi': 'off',
    // 如不禁用这条规则会导致命名为index或其他单字母组件名的文件报错，（不要求组件名称始终为多字）
    // 'vue/multi-word-component-names': 0,
    // 允许属性之间使用驼峰命名，不强制要求使用 - 连字符
    // 'vue/attribute-hyphenation': 0,
    // 不需要 props 的默认值
    // 'vue/require-default-prop': 'off',
    // 禁止 v-for 指令或范围属性的未使用变量定义（不检查下划线定义的变量）
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '(^_|source)',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '(^_|source)',
        varsIgnorePattern: '^_'
      }
    ]
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // '@typescript-eslint/no-explicit-any': 'off'
  }
}
