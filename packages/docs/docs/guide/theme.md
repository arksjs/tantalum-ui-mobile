# 主题定制

组件库的样式是基于 SCSS 开发的，可以通过提供的工具完成主题的个性化定制，主要是色彩相关。

在主题定制之前，推荐通过 [色卡](https://godxiaoji.github.io/vfox/demo/#/ColorCard) 查看下你钟意的颜色在色卡中的效果。推荐颜色值在 HSV 模式下 **S > 70% 且 V > 70%**。

1. 打开 [主题定制](https://godxiaoji.github.io/vfox/demo/#/CustomTheme) 工具，按操作完成定制并复制定制后的代码。
2. 新建自定义 SCSS 文件 `my-style.scss`，粘贴定制代码，如：

   `path/to/my-style.scss` :

```Scss
$primary-color-1: #c8d5db;
$primary-color-2: #9cbece;
$primary-color-3: #73a5c1;
$primary-color-4: #4f8cb4;
$primary-color-5: #2e74a8;
$primary-color-6: #125c9b;
$primary-color-7: #083f75;
$primary-color-8: #01264e;
$primary-color-9: #001228;
$primary-color-10: #000102;
$success-color-1: #a4b7ac;
$success-color-2: #74aa8d;
$success-color-3: #529d77;
$success-color-4: #349164;
$success-color-5: #1b8455;
$success-color-6: #057748;
$success-color-7: #005132;
$success-color-8: #002b1c;
$success-color-9: #000403;
$success-color-10: #00dd9f;
$warning-color-1: #d6cdc0;
$warning-color-2: #c9b191;
$warning-color-3: #bc9669;
$warning-color-4: #b07b46;
$warning-color-5: #a36127;
$warning-color-6: #96480c;
$warning-color-7: #702f03;
$warning-color-8: #4a1b00;
$warning-color-9: #230c00;
$warning-color-10: #fc4c00;
$danger-color-1: #f2e5e3;
$danger-color-2: #e5c5c2;
$danger-color-3: #d89795;
$danger-color-4: #cb6c6b;
$danger-color-5: #bf464a;
$danger-color-6: #b2252e;
$danger-color-7: #8c1621;
$danger-color-8: #660b17;
$danger-color-9: #3f040d;
$danger-color-10: #190106;
```

3. Vite 配置

```JavaScript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// import { ArkUIResolver } from '@arksjs/ui-resolver'

export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   dts: true,
    //   resolvers: [ArkUIResolver({ importStyle: 'sass' })]
    // })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "path/to/my-style.scss" as *;`
      }
    }
  }
})
```

注：Vue Cli 也有相应的配置。

4. 安装 scss 依赖

**Vite** 只需要预装 sass 预处理器，具体请参阅 [CSS Pre-processors](https://cn.vitejs.dev/guide/features.html#css-pre-processors)。

```Shell
npm install -D sass
```

**Vue CLI** 还需要相应的 loader，具体请参阅 [预处理器](https://cli.vuejs.org/zh/guide/css.html#%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8)。

```Shell
npm install -D sass-loader sass
```
