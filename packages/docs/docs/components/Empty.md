# Empty 空状态

<CodeDemo name="Empty">

<<< @/../../demo/src/components/Show/Empty/index.vue

</CodeDemo>

## Import

```js
import { Empty } from 'vfox'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { EmptyType } from 'vfox'
```

## Props

| 属性        | 类型      | 默认值    | 必填 | 说明                                                   |
| ----------- | --------- | --------- | ---- | ------------------------------------------------------ |
| description | string    |           | 否   | 描述文字                                               |
| type        | EmptyType | 'default' | 否   | 图片类型，可选 'default', 'error', 'network', 'search' |

## Slots

### 底部（#default）

```vue
<fx-empty description="网络错误" type="network">
  <fx-button>刷新试试</fx-button>
</fx-empty>
```

### 图片区域（#image）

```vue
<fx-empty description="描述文字">
  <template #image>
    <fx-image src="xxx.jpg" />
  </template>
</fx-empty>
```

注：优先级比内置图片高。