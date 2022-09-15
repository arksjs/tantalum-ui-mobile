# Empty 空状态

<CodeDemo name="Empty">

<<< @/../../demo/src/components/Show/Empty/index.vue

</CodeDemo>

## Import

```js
import { AkEmpty } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { EmptyType } from 'arkui-mobile-vue'
```

## Props

| 属性        | 类型      | 默认值    | 必填 | 说明                                                   |
| ----------- | --------- | --------- | ---- | ------------------------------------------------------ |
| description | string    |           | 否   | 描述文字                                               |
| type        | EmptyType | 'default' | 否   | 图片类型，可选 'default', 'error', 'network', 'search' |

## Slots

### 底部（#default）

```vue
<ak-empty description="网络错误" type="network">
  <ak-button>刷新试试</ak-button>
</ak-empty>
```

### 图片区域（#image）

```vue
<ak-empty description="描述文字">
  <template #image>
    <ak-image src="xxx.jpg" />
  </template>
</ak-empty>
```

注：优先级比内置图片高。
