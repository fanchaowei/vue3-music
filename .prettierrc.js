module.exports = {
  //缩进几格
  tabWidth: 2,
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: true,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 一行最多几个字符
  printWidth: 100,
  // 使用单引号
  singleQuote: true,
  //不检测分号
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
}
