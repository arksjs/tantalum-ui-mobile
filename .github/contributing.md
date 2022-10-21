# arkui-mobile-vue 贡献指南

首先感谢你使用 arkui-mobile-vue。在贡献代码前，请务必花点时间阅读以下指南：

## 开发规范

项目环境要求：

- pnpm 7.x

- Node.js 16.0+

首先要安装相应的依赖。

```sh
pnpm install
```

如果是对组件进行开发，可以执行以下命令打开演示程序进行调试。

```sh
pnpm run demo:dev
```

如果是对文档进行修改，可以执行以下命令打开文档开发环境。

```sh
pnpm run docs:dev
```

## Pull Request 规范

- 请先 fork 一份到自己的项目下。

- 执行 `pnpm run test` 单元测试后没有输出错误。

- 执行 `pnpm run build` 和 `pnpm run build:site` 后可以正确打包文件。

- commit 信息要以 `type(scope): 修改内容的描述` 的形式进行填写，例如 `fix(components): [SearchBar] fix xxx bug`。

  - type: 必须是 build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test 其中的一个。

  - scope: 以 components, helpers, docs, demo 为准。

  - header: 描述信息不要超过 72 个字符。

  - 具体标准可以参考 [Git Commit 规范化](https://juejin.cn/post/7050303876443930660) 。

- `dist`，`lib`，`es` 里面打包的文件不要提交。

- 确保 PR 是提交到 main 分支。

- 如果是修复 bug，请在 PR 中给出描述信息。
