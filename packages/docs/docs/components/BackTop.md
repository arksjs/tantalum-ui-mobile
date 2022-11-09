# BackTop 返回顶部

<CodeDemo name="BackTop">

<<< @/../../demo/src/components/Navigation/BackTop/index.vue

</CodeDemo>

## Import

```js
import { TaBackTop } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性                    | 类型     | 默认值 | 必填 | 说明                       |
| ----------------------- | -------- | ------ | ---- | -------------------------- |
| visible-height          | number   | 200    | 否   | 滚动高度达到此参数值才出现 |
| animated                | boolean  | true   | 否   | 是否需要动画               |
| offset                  | number[] | [0, 0] | 否   | 偏移量，格式为 [x, y]      |
| enable-safe-area-insets | boolean  | true   | 否   | 是否开启安全区适配         |

注：

在 iPhoneX 等机型开启 `enableSafeAreaInsets`，需要在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
```

## Events

| 事件  | 描述                   | 回调函数参数 |
| ----- | ---------------------- | ------------ |
| click | 回到顶部按钮点击时触发 | e: Event     |

## Slots

### 点击区域（#default）

```vue
<ta-back-top>
  回顶部
</ta-back-top>
```

#### default 的缺省内容

默认显示 <svg width="20px" height="20px" viewBox="64 64 896 896" focusable="false"><path d="M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z" /><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /></svg> 图标。
