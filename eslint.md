# ESLint

不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性

## 配置项

参考: [Vue eslint规则](eslint-config-vue)，[eslint文档](https://eslint.org/docs/latest/rules/)，[eslint中文文档](https://zh-hans.eslint.org/)

所有的配置文件都在 .eslintrc.js 中。本项目基本规范是依托于 vue 官方的 eslint 规则 eslint-config-vue 做了少许的修改。大家可以按照自己的需求进行定制化配置

`取消eslint校验(不推荐取消)`

    找到 vue.config.js 文件。 进行如下设置 lintOnSave: false 即可

`使用vscode配置eslint`

    1. 安装eslint插件
    2. 依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件添加如下配置
    {
        "files.autoSave": "off",
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            "vue-html",
            {
            "language": "vue",
            "autoFix": true
            }
        ],
        "eslint.run": "onSave",
        "eslint.autoFixOnSave": true
    }

`others`

[饿了么 eslint](https://www.npmjs.com/package/eslint-config-elemefe)

[vscode插件推荐](https://github.com/varHarrie/varharrie.github.io/issues/10)
