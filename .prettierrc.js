module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 行尾不需要分号
  semi: false,
  // // jsx 标签的反尖括号需要换行
  // jsxBracketSameLine: false,
  // // jsx 不使用单引号，而使用双引号
  // jsxSingleQuote: false,
  // 箭头函数，只有一个参数的时候，不需要括号
  arrowParens: 'avoid',
  // 使用单引号代替双引号
  singleQuote: true,
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 末尾不使用逗号
  trailingComma: 'none',
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  // htmlWhitespaceSensitivity: 'css'
  // 宽度显示字符个数
  printWidth: 100
}
