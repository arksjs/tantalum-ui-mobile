# Icon 图标

<CodeDemo name="Icon">

<<< @/../../demo/src/components/Basic/Icon/index.vue

</CodeDemo>

## Import

```js
import { AkIcon } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性   | 类型                | 默认值 | 必填 | 说明                                           |
| ------ | ------------------- | ------ | ---- | ---------------------------------------------- |
| icon   | string \| Component |        | 是   | 设置图标的名称（Sprite）或者传入自定义图标组件 |
| size   | number              | 24     | 否   | icon 的大小                                    |
| width  | number              |        | 否   | icon 的宽度                                    |
| height | number              |        | 否   | icon 的高度                                    |
| color  | string              |        | 否   | icon 的颜色                                    |

## 自定义 SVG 图标

### Vite 导入 SVG

`Vite` 开发者可以通过 [rollup-plugin-svg-sprites](https://github.com/godxiaoji/rollup-plugin-svg-sprites) 来将 SVG 作为 Vue 组件导入。

`vite.config.js`:

```js
import svgSprites from 'rollup-plugin-svg-sprites'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgSprites({
      vueComponent: true,
      exclude: ['node_modules/**']
    })
  ]
})
```

在单文件中：

```vue
<template>
  <MyIcon />
  // or:
  <ak-icon :icon="MyIcon">
</template>

<script setup>
import MyIcon from './my-icon.svg?vueComponent'
</script>
```

TypeScript 支持和更多用法可以查看[文档](https://github.com/godxiaoji/rollup-plugin-svg-sprites)。

### 批量导入 SVG

对于一个批量文件夹形式的图标集，可以通过 [svg-sprites-cli](https://github.com/godxiaoji/svg-sprites-cli) 转为 js。

#### 1. 安装 svg-sprites-cli

```sh
npm i -D svg-sprites-cli
```

#### 2. 通过指令执行：

```sh
svgjs -d ./icons -o path/to/lib/svg.js
```

假设 icons 目录下有：

```
- icons
  - Tab
    - home.svg
    - find.svg
    - user.svg
  - loading.svg
```

默认规则转出来的 id 为 `icon-homeTab`, `icon-findTab`, `icon-userTab`, `icon-loading`。

#### 3. 在入口中引入 js：

`main.ts`:

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'path/to/lib/svg.js'

createApp(App).use(router).mount('#app')
```

#### 4. Icon 组件通过展示

```vue
<ak-icon icon="icon-homeTab" />
```

### 附录：示例图标库

组件示例使用了一套图标库，涵盖了一些日常使用图标，具体效果和使用方式可以查看 [@arksjs/ui-icons](https://github.com/arksjs/arkui-mobile-vue/tree/main/packages/icons)。
