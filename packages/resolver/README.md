# @arksjs/ui-resolver

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) Resolver for [Tantalum UI](https://github.com/arksjs/tantalum-ui-mobile)。

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
import { UIResolver } from '@arksjs/ui-resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [UIResolver()]
    })
  ]
})
```

Or `vue.config.js`

```JavaScript
const Components = require('unplugin-vue-components/webpack')
const { UIResolver } = require('@arksjs/ui-resolver')

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [UIResolver()]
      })
    ]
  }
}
```

4. 现在就可以在模版中引入组件

```HTML
<template>
  <ta-button>提交</ta-button>
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
import 'tantalum-ui-mobile/es/Button/style/index'

// set 'sass'
import 'tantalum-ui-mobile/es/Button/style/sass'

// set false
```

### format

```TypeScript
type Format = 'esm' | 'cjs'
```

假设我们按需引入了 `Button` 组件：

```JavaScript
// set 'esm' or no set
import 'tantalum-ui-mobile/es/Button'

// set 'cjs'
import 'tantalum-ui-mobile/lib/Button'
```
