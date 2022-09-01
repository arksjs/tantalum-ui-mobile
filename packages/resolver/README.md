# @arksjs/ui-resolver

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) Resolver for [ArkUI](https://github.com/arksjs/arkui-mobile-vue)。

## 使用方式

1. 先安装插件：

```
npm i unplugin-vue-components -D
```

2. 安装组件 Resolver：

```
npm i @arksjs/ui-resolver -D
```

3. 配置 config

`vite.config.js`:

```JavaScript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ArkUIResolver } from '@arksjs/ui-resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ArkUIResolver()]
    })
  ]
})
```

Or `vue.config.js`

```JavaScript
const Components = require('unplugin-vue-components/webpack')
const { ArkUIResolver } = require('@arksjs/ui-resolver')

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ArkUIResolver()]
      })
    ]
  }
}
```

4. 现在就可以在模版中引入组件

```HTML
<template>
  <fx-button>提交</fx-button>
</template>
```

## 参数

### importStyle

```TypeScript
type ImportStyle = boolean | 'css' | 'sass'
```

假设我们按需引入了 `Button` 组件：

```JavaScript
// set true or 'css' or no set
import 'arkui-mobile-vue/es/Button/style/index'

// set 'sass'
import 'arkui-mobile-vue/es/Button/style/sass'

// set false
```

### format

```TypeScript
type Format = 'esm' | 'cjs'
```

假设我们按需引入了 `Button` 组件：

```JavaScript
// set 'esm' or no set
import 'arkui-mobile-vue/es/Button'

// set 'cjs'
import 'arkui-mobile-vue/lib/Button'
```
