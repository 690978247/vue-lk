# vue 项目 Eslint + Prettier + Husky

参考: [Vue eslint 规则](https://github.com/vuejs/eslint-config-vue)，[eslint 文档](https://eslint.org/docs/latest/rules/)，[eslint 中文文档](https://zh-hans.eslint.org/)

## 依赖安装

`npm i -D prettier eslint eslint-plugin-vue @vue/eslint-config-prettier @vue/eslint-config-typescript`

- `Prettier` 的作用是格式化代码风格，后续加上 VS Code 的 Prettier 插件，可以在保存代码时候，自动格式化代码风格
- `eslint` 是 ESLint 的核心模块，包括 CLI 命令工具
- `eslint-plugin-vue` 是 ESLint 的 Vue.js 语法插件，主要用于检查 Vue 代码文件语法
- `@vue/eslint-config-prettier` 是 ESLint 的 Prettier 配置，主要是联动 Prettier 进行代码规范的格式化
- `@vue/eslint-config-typescript` 是 ESLint 的 TypeScript 配置，主要是检查 Vue.js 项目中的 TypeScript 语法(项目若未用到 Ts 语法，可无需安装)

## 设置 ESlint 配置文件

- 在项目根目录下新建文件，命名为 .eslintrc

```vue3 config
  module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'

  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'curly': [2, 'multi-line'],
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],

    'no-console': 'error'
  },
}

```

## 设置.eslintignore 文件

- 在项目根目录下新建文件，命名为 .eslintignore

```eslintignore
public
dist
*.d.ts
/src/assets
package.json
```

## 设置 Prettier 配置文件

- 在项目根目录下新建文件，命名为 .prettierrc.js

```config
module.exports = {
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "auto",
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": false,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

## vscode 插件下载

`下载5个插件:`

<!-- - `Vue.volar` Vue 3 官方推荐的 VS Code 开发插件
- `Vue.vscode-typescript-vue-plugin` Vue 3 TypeScript 语法辅助 VS Code 插件
- `dbaeumer.vscode-eslint` ESLint 的 VS Code 插件
- `esbenp.prettier-vscode` Prettier 的 VS Code 插件
- `rvest.vs-code-prettier-eslint` ESLint 联动 Prettier 的 VS Code 插件 -->

- 在项目根目录下新建文件夹.vscode 文件夹, 新建 extensions.json

```vscode
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "rvest.vs-code-prettier-eslint",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

保存之后若有插件未安装, `vscode`会提醒安装插件

`配置 VS Code 的项目本地配置文件 .vscode/settings.json` 文件 => 首选项 => 设置 => setting.json

```config
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"editor.formatOnSave": true,
"eslint.format.enable": true,
"prettier.configPath": ".prettierrc.js",
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

## Eslint 检查代码问题

`npm run lint`

```script

{
   "scripts": {
    "lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock,build}/**/*.{vue,js,ts,tsx}\" --fix",
    "lint:prettier": "prettier --write  \"src/**/*.{js,ts,json,tsx,css,scss,vue,html,md}\"",
    "lint": "npm run lint:eslint && npm run lint:prettier --fix"
   }
 }

```

`.gitignore` 添加.eslintcache

## 取消 eslint 校验(不推荐取消)

找到 `vite.config.js | vue.config.js` 文件。 进行如下设置 `lintOnSave: false` 即可

---

分割线

---

## 添加 Husky

**一个项目通常是团队合作，我们不能保证每个人在提交代码之前执行一遍 lint 校验，所以需要 git hooks 来自动化校验的过程，否则禁止提交。**

- 安装 Husky 并生成.husky 文件夹

```husky
npm install husky --dev
or
yarn add husky --dev
```

- 初始化 husky 配置

```init
npx husky install
or
yarn husky install
```

- 在每次执行 npm install 时自动启用 husky, 如果你的`npm`版本大于`7.1.0` `注：npm最新版已弃用set-script 指令，请手动在package.json中添加`

```husky set
npm set-script prepare "husky install"
```

- 否则手动在`package.json`中添加

```scripts
"scripts": {
  "prepare": "husky install"
},
```

- 然后添加一个`lint` 钩子

```lint
npx husky add .husky/pre-commit "npm run lint"
```

- 相当于手动在.husky/pre-commit 文件写入以下内容

```husky
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npm run lint
```

- 提交 commit

`git commit -m "message"`

## 添加 lint-staged

**husky 代码提交时会校验所有的文件。每次提交代码，需要帮助把别人的代码问题解决了才能顺利提交。且当项目大了之后，检查速度也会越来越慢。`lint-staged` 就是为了解决上面的痛点。他只会校验检查你提交或者说你修改的部分内容。**

- 安装

```install
  npm install lint-staged --dev
```

然后修改`package.json`的配置

```lint-staged
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.vue": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{vue,css,scss,postcss,less}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
}
```

- 修改 .husky/pre-commit 文件
  `npm run lint` 改为 `npx lint-staged`
