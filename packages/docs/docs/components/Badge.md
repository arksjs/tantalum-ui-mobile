# Badge 徽标数

注：

- 这是个包裹组件，需要 `slot` 中提供被挂在的内容。

<CodeDemo name="Badge">

<<< @/../../demo/src/components/Show/Badge/index.vue

</CodeDemo>

## Import

```js
import { Badge } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性      | 类型             | 默认值 | 必填 | 说明                                                                               |
| --------- | ---------------- | ------ | ---- | ---------------------------------------------------------------------------------- |
| content   | number \| string | 0      | 否   | 消息条数或者文本                                                                   |
| max-count | number           | 99     | 否   | 最大完全显示消息条数                                                               |
| dot       | boolean          | false  | 否   | 是否显示为小红点                                                                   |
| show-zero | boolean          | false  | 否   | 消息数为 0 时是否显示                                                              |
| offset    | number[]         | [0, 0] | 否   | 偏移量，格式为 [x, y]                                                              |
| animated  | boolean          | false  | 否   | 是否开启动画                                                                       |
| color     | string           |        | 否   | 自定义色彩，支持 hex rgb hsl 等写法，详细效果[查看](../design/color.md#自定义色彩) |

## Slots

### #default

```vue
<fx-badge :count="1" show-zero>
  <fx-button>badge</fx-button>
</fx-badge>
```

### #badge

```vue
<fx-badge :content="1">
  <div class="exp-badge-slot"></div>
  <template #badge>
    <fx-icon icon="CheckOutlined"></fx-icon>
  </template>
</fx-badge>
```
