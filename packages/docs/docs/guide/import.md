# 引入组件

## 自动引入

利用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件的自动扫码可以自动加载组件代码和样式文件。

1. 先安装插件：

```Shell
npm i unplugin-vue-components -D
```

2. 安装组件 Resolver：

```Shell
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

更多 ArkUIResolver 参数可以[查看](https://github.com/arksjs/arkui-mobile-vue/tree/main/packages/arkui-mobile-vue-resolver)。

4. 现在就可以在模版中引入组件

```Vue
<template>
  <ak-button>提交</ak-button>
</template>
```

> 这种方式不支持 API 方式的调用

## 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件。

按需引入全局注册：

```JavaScript
import { install as Button } from 'arkui-mobile-vue/es/Button'
import 'arkui-mobile-vue/es/Button/style'

app.use(Button)
```

```Vue
<template>
  <ak-button>按钮</ak-button>
</template>
```

按需引入局部注册：

```Vue
<script>
import { AkButton } from 'arkui-mobile-vue/es/Button'
import 'arkui-mobile-vue/es/Button/style'
// import 'arkui-mobile-vue/es/Button/style/sass' // use sass

export default {
  components: { AkButton }
}
</script>

<template>
  <ak-button>按钮</ak-button>
</template>
```

## 全组件引入

```JavaScript
import ArkUI from 'arkui-mobile-vue'
import 'arkui-mobile-vue/es/style'
// import 'arkui-mobile-vue/es/style/sass' // use sass

app.use(ArkUI)
```

> 引入所有组件会增大代码包体积，毕竟 70+ 组件了，除非项目对大小要求不高。

## API 调用

API 调用需要先引入对应的组件，方可调用，引用方式同上。

如果是全组件引入：

```JavaScript
import { showToast } from 'arkui-mobile-vue'
```

如果是按需引入：

```JavaScript
import { showToast } from 'arkui-mobile-vue/es/Toast'
import 'arkui-mobile-vue/es/Toast/style'
```

调用方式：

```JavaScript
export default {
  mounted() {
    showToast({
      title: '成功',
      type: 'success',
      duration: 2000
    })
  }
}
```

## TypeScript 支持

在 `tsconfig.json` 中加入获得 `template` 类型提示：

```JSON
{
  "compilerOptions": {
    "types": ["arkui-mobile-vue/global"]
  }
}
```

## CDN 方式

如果是简单的应用，也提供了 CDN 的方式进行接入。

该版本最低要求支持 ES6 的浏览器。

```HTML
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/arkui-mobile-vue/dist/index.css" />

<!-- JavaScript -->
<script src="https://unpkg.com/arkui-mobile-vue/dist/index.js"></script>
```
