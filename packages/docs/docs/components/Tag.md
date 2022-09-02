# Tag 标签

<CodeDemo name="Tag">

<<< @/../../demo/src/components/Show/Tag/index.vue

</CodeDemo>

## Import

```js
import { FxTag } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { StateType, SizeType, TagPattern } from 'arkui-mobile-vue'
```

## Props

| 属性     | 类型       | 默认值    | 必填 | 说明                                                                               |
| -------- | ---------- | --------- | ---- | ---------------------------------------------------------------------------------- |
| type     | StateType  | 'default' | 否   | 标签类型                                                                           |
| pattern  | TagPattern | 'light'   | 否   | 标签款式                                                                           |
| color    | string     |           | 否   | 自定义色彩，支持 hex rgb hsl 等写法，详细效果[查看](../design/color.md#自定义色彩) |
| size     | SizeType   | 'large'   | 否   | 标签尺寸                                                                           |
| closable | boolean    | true      | 否   | 是否展示关闭按钮，只推荐在 size='large' 情况下开启                                 |

### StateType 的合法值

| 值      | 说明 |
| ------- | ---- |
| default | 次要 |
| primary | 主要 |
| success | 成功 |
| warning | 警告 |
| danger  | 危险 |

### TagPattern 的合法值

| 值    | 说明                         |
| ----- | ---------------------------- |
| light | 浅色标签，浅色底，深色字     |
| dark  | 深色标签，深色底，白色字     |
| plain | 空心标签，白底，深色字，有边 |

### SizeType 的合法值

| 值     | 说明     |
| ------ | -------- |
| middle | 默认尺寸 |
| small  | 小尺寸   |

## Events

| 事件       | 描述               | 回调函数参数 |
| ---------- | ------------------ | ------------ |
| click      | 点击时触发         | MouseEvent   |
| close      | 关闭按钮点击时触发 |              |
| long-press | 长按标签时触发     |              |

## Slots

### #default

```vue
<ak-tag>标签</ak-tag>
```
