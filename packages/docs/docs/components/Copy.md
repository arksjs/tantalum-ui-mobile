# Copy 复制

注：

- 这是个包裹组件，本身不带展示效果，怎么展示通过 `slot` 来实现
- 不依赖 Flash，所以在某些老版本浏览器上可能失败

<CodeDemo name="Copy">

<<< @/../../demo/src/components/Other/Copy/index.vue

</CodeDemo>

## Import

```js
import { TaCopy } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Props

| 属性 | 类型   | 默认值 | 必填 | 说明           |
| ---- | ------ | ------ | ---- | -------------- |
| text | string |        | 是   | 需要复制的文本 |

## Events

| 事件    | 描述           | 回调函数参数            |
| ------- | -------------- | ----------------------- |
| success | 复制成功时触发 | text: string 复制的文本 |
| error   | 复制出错时触发 | e: Error                |

## Slots

```vue
<ta-copy text="复制的内容">
  <ta-button>复制</ta-button>
</ta-copy>
```
