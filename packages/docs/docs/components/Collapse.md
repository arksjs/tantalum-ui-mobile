# Collapse/CollapseItem 折叠面板

<CodeDemo name="Collapse">

<<< @/../../demo/src/components/Show/Collapse/index.vue

</CodeDemo>

## Import

```js
import { TaCollapse, TaCollapseItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type { CollapseOnChange, CollapseItemOnToggle } from 'tantalum-ui-mobile'
```

## Collapse Props

| 属性      | 类型            | 默认值 | 必填 | 说明                                                                    |
| --------- | --------------- | ------ | ---- | ----------------------------------------------------------------------- |
| v-model   | string/string[] | []     | 否   | 当前展开面板的 `name` 列表，需要每个 `CollapseItem` 组件都设置上 `name` |
| accordion | boolean         | false  | 否   | 是否开启手风琴模式                                                      |

## Collapse Events

| 事件   | 描述           | 回调函数参数                      | TypeScript 函数  |
| ------ | -------------- | --------------------------------- | ---------------- |
| change | 切换面板时触发 | activeNames: (string \| number)[] | CollapseOnChange |

## Collapse Slots

### #default

注：其中只可放置 [CollapseItem](./Collapse.md#collapseitem-折叠面板子项) 组件，否则会导致未定义的行为。

```vue
<ta-collapse>
  <ta-collapse-item title="标题1" name="row1">
    <div class="pad">
    代码是写出来给人看的，附带能在机器上运行
    </div>
  </ta-collapse-item>
  <ta-collapse-item title="标题2" name="row2">
    <div class="pad">
    代码是写出来给人看的，附带能在机器上运行
    </div>
  </ta-collapse-item>
  <ta-collapse-item title="标题3" name="row3">
    <div class="pad">
    代码是写出来给人看的，附带能在机器上运行
    </div>
  </ta-collapse-item>
</ta-collapse>
```

## CollapseItem Props

| 属性     | 类型    | 默认值 | 必填 | 说明                                                              |
| -------- | ------- | ------ | ---- | ----------------------------------------------------------------- |
| title    | string  | ''     | 否   | 面板子项标题                                                      |
| icon     | string  |        | 否   | 面板子项标题前图标，使用 [Icon](./Icon.md) 组件                   |
| name     | string  |        | 是   | 唯一标识，设置后配合 Collapse 组件的 `v-model` 和 `onChange` 使用 |
| disabled | boolean | false  | 否   | 是否禁用                                                          |

## CollapseItem Events

| 事件   | 描述                    | 回调函数参数                                                                       | TypeScript 函数      |
| ------ | ----------------------- | ---------------------------------------------------------------------------------- | -------------------- |
| toggle | 面板子项展开/收起时触发 | payload: { name: string, spread: boolean } 其中 spread=true 展开/spread=false 收起 | CollapseItemOnToggle |
