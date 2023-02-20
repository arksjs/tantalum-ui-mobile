# Empty 空状态

<CodeDemo name="Empty">

<<< @/../../demo/src/components/Show/Empty/index.vue

</CodeDemo>

## Import

```js
import { TaEmpty } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { EmptyType } from 'tantalum-ui-mobile'
```

## Props

| 属性        | 类型      | 默认值    | 必填 | 说明                                                   |
| ----------- | --------- | --------- | ---- | ------------------------------------------------------ |
| description | string    |           | 否   | 描述文字                                               |
| type        | EmptyType | 'default' | 否   | 图片类型，可选 'default', 'error', 'network', 'search' |

## Slots

### 底部（#default）

```vue
<ta-empty description="网络错误" type="network">
  <ta-button>
    刷新试试
  </ta-button>
</ta-empty>
```

### 图片区域（#image）

```vue
<ta-empty description="描述文字">
  <template #image>
    <ta-image src="xxx.jpg" />
  </template>
</ta-empty>
```

注：优先级比内置图片高。
