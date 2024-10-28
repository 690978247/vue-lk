# vue3-ts-project

vue3 学习项目

## 技术栈

vue3, vue-router, vue-i18n, typescript, pinia, axios, element plus, vite

## `Git` 代码提交规范

1. 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

   - `feat` 增加新功能
   - `fix` 修复问题/BUG
   - `style` 代码风格相关无影响运行结果的
   - `perf` 优化/性能提升
   - `refactor` 重构
   - `revert` 撤销修改
   - `test` 测试相关
   - `docs` 文档/注释
   - `chore` 依赖更新/脚手架配置修改等
   - `workflow` 工作流改进
   - `ci` 持续集成
   - `types` 类型定义文件更改
   - `wip` 开发中

   **指明模块（可选）**
   feat(Editor): 描述
   fix(request): xxx

   **bug 可以写上 #bugId 和简要描述**
   fix(scope): #12345 简要描述

2. 分支类型 [gitflow 工作流](https://blog.csdn.net/sunyctf/article/details/130587970)
   - `feature` 用于功能开发
   - `develop` 用于聚合 feature 分支开发的功能
   - `release` (`暂无`) 用于测试发版
   - `master` 打上版本 TAG 长期稳定支持，任何一个 tag 都可以稳定发布。 `注：只能从其他分支合并，不能直接修改`
   - `fix` 用于迭代 bug 的修复
   - `hotfix` 用于线上 BUG 的修复

2.1 团队成员工作流程简单介绍：

```流程
    1. 团队成员开发一个新功能时，基于develop分支创建一个feature(格式：feature/*) 分支
    2. feature功能开发完成后，将feature/*代码合并到develop分支
    3. 所有迭代功能开发完成且测试bug全部回归之后，团队leader将develop代码合并到master分支，并在master分支上面打上版本tag, 开发人员删除各自feature/*分支。
    4. 修复迭代bug时，团队成员基于develop分支创建一个fix(格式：fix/*)分支，迭代上线之后团队成员删除各自fix分支
    5. 修复正式环境线上bug时，基于master分支创建一个hotfix(格式: hotfix/*) 分支进行紧急修复
```

## 目录结构

```目录

|—— .vscode # vscode IDE工具推荐配置文件
│—— public # 静态资源
|—— src
│   |—— api # 接口请求统一管理
|   |—— assets  # 图片等静态资源
|   |—— components # 自定义通用组件
|   |—— config # 全局属性设置
|   |—— hooks # 自定义全局钩子函数
|   |—— language # 多语言
|   |—— layout # 主要页面布局
|   |—— router # 路由配置
|   |—— store #pinia 状态管理
|   |—— utils # 全局工具方法
|   |—— views # 业务代码存放
|   |—— styles # 全局存放处样式
|   |—— App.vue # 入口页面
|   |—— main.ts # 入口文件
|—— .env # 全局环境变量配置（当 .env 文件与 .env.development、.env.production、.env.staging 这三个文件之一存在相同的配置 key 时，.env 优先级更低）
|—— .env.prod # 生产环境配置
|—— .env.test # 测试环境配置
|—— .eslintignore # eslint 语法检查忽略文件
|—— .eslintrc # eslint 语法检查忽略文件
|—— .gitgnore # git 提交忽略文件
|—— package-lock.json # 依赖包版本锁定文件
|—— package.json # 依赖包管理以及命令配置
|—— postcss.config.js  # postcss 插件配置
|—— README.md  # README
|—— tsconfig # typescript 配置
└── vue.config.js # webpack 配置

```

## mock

- 使用 vite-plugin-mock 进行数据 mock

[pure admin Mock](https://yiming_chang.gitee.io/pure-admin-doc/pages/request/#mock)
[vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)

```mock

pnpm add mockjs && pnpm add vite-plugin-mock -D
```

- vite.config.ts 配置

```config

import { UserConfigExport, ConfigEnv } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
  }
}
```

## 分支

- `develop` 开发主分支
- `myStudy` 自用学习分支
