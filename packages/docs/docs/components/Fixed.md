# Fixed 固定布局

<CodeDemo name="Fixed">

<<< @/../../demo/src/components/Navigation/Fixed/index.vue

</CodeDemo>

## Import

```js
import { TaFixed } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性                    | 类型          | 默认值   | 必填 | 说明                                                                               |
| ----------------------- | ------------- | -------- | ---- | ---------------------------------------------------------------------------------- |
| placement               | PlacementType | 'bottom' | 否   | 固定位置，可选 'bottom', 'top', 'left', 'right'                                    |
| background              | string        |          | 否   | 固定背景色，同 CSS 值                                                              |
| z-index                 | number        | 1        | 否   | 设定固定的 zIndex                                                                  |
| space-hold              | boolean       | true     | 否   | 是否预留占位元素，开启后元素位置预留跟固定元素一样大小的占位元素，防止挡住其他元素 |
| enable-safe-area-insets | boolean       | true     | 否   | 是否开启安全区适配                                                                 |

注：

在 iPhoneX 等机型开启 `enableSafeAreaInsets`，需要在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
```

## Slots

### 底部（#default）

```vue
<ta-fixed placement="bottom">
  固定内容
</ta-fixed>
```
