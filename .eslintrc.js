// /* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution")

// module.exports = {
// 	root: true,
// 	extends: [
// 		"plugin:vue/vue3-essential",
// 		"eslint:recommended",
// 		"@vue/eslint-config-typescript/recommended"
// 	],
// 	parserOptions: {
// 		ecmaVersion: "latest"
// 	},
// 	rules: {
// 		//关闭组件命名规则
// 		"vue/multi-word-component-names": "off",
// 		// "@typescript-eslint/no-explicit-any": "error", // 'off' 移除any 错误提示
// 	}
// }

/*
 *   off: 关闭规则 0
 *   warn: 将规则作为警告打开（不影响退出代码） 1
 *   error: 将规则作为错误打开（触发时退出代码为1）2
 */

module.exports = {
  root: true, // 标识当前配置文件为eslint的根配置文件, 让其停止在父级目录中继续寻找
  // 环境提供预定义的全局变量
  env: {
    browser: true, // 浏览器全局变量。
    es2021: true, // 添加所有ECMAScript 2021 全局变量，并将解析器选项设置为12
    node: true // nodejs 全局变量和nodejs 作用域
  },
  // 配置插件 添加扩展 可省略eslint-plugin-
  plugins: ['prettier'],
  // 扩展eslint配置
  extends: [
    // 'eslint:recommended' // eslint:recommended： eslint 规则默认推荐全部打开
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest', // 设置ECMAScript版本
    sourceType: 'module', //  设置为 （默认） 为'script'|'module' (如果你的的代码在 ECMAScript 模块中)
    ecmaFeatures: {
      jsx: true // 支持jsx
    }
  },
  // 设置全局变量，若某个全局变量中没有该属性，ESLint就会报错，此时需要往此处添加要辨别的变量  readonly/false——只读 writable/true——可写 off——禁用该全局变量
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  // 具体配置规则项
  rules: {
    'vue/multi-word-component-names': 'off',
    // 'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // any 错误提示
    'arrow-spacing': [
      2,
      {
        // 箭头函数中，强制箭头保持一致的间距
        before: true,
        after: true
      }
    ],
    'block-spacing': [2, 'always'], // 在开始之后和结束之前添加空格
    'brace-style': [
      2,
      '1tbs',
      {
        // 强制一致的大括号样式
        allowSingleLine: true
      }
    ],
    camelcase: [
      0,
      {
        // 驼峰命名规则
        properties: 'always'
      }
    ],
    'comma-dangle': [2, 'never'], // 禁止尾随逗号
    'comma-spacing': [
      2,
      {
        // 逗号前后空格设置
        before: false, // 不允许逗号前的空格
        after: true // 逗号后需要有一个空格
      }
    ],
    'comma-style': [2, 'last'], // 一致的逗号样式,在数组元素、对象属性或变量声明之后和同一行上使用逗号
    curly: [2, 'multi-line'], // 所有控制语句强制一致的大括号样式
    eqeqeq: ['error', 'always', { null: 'ignore' }], // 强制全等
    'no-unused-vars': [
      2,
      {
        // 禁止使用未使用的变量
        vars: 'all',
        args: 'none'
      }
    ],
    semi: [2, 'never'], // 禁止末尾分号
    'semi-spacing': [
      // 设置分号前后间隔
      2,
      {
        before: false,
        after: true
      }
    ],
    // 禁用console
    'no-console': 'error'
  }
  // 要在配置文件中禁用一组文件的规则
  // overrides: {},
}
