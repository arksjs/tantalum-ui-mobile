# NavBar 导航栏

<CodeDemo name="NavBar">

<<< @/../../demo/src/components/Navigation/NavBar/index.vue

</CodeDemo>

## Import

```js
import { AkNavBar } from 'arkui-mobile-vue'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

### Import Type

组件导出的类型定义：

```ts
import type {
  NavBarButtonOption,
  NavBarOnButtonClick,
  NavBarOnTitleDbClick
} from 'arkui-mobile-vue'
```

## Props

| 属性          | 类型                 | 默认值 | 必填 | 说明                                   |
| ------------- | -------------------- | ------ | ---- | -------------------------------------- |
| title         | string               | ''     | 否   | 标题                                   |
| show-back     | boolean              | false  | 否   | 是否展示返回按钮                       |
| show-home     | boolean              | false  | 否   | 是否展示首页按钮                       |
| left-buttons  | NavBarButtonOption[] | []     |      | 左侧按钮列表，优先级高于首页和返回按钮 |
| right-buttons | NavBarButtonOption[] | []     |      | 右侧按钮列表                           |
| icon-only     | boolean              | true   | 否   | 是否展示纯图标按钮                     |

### NavBarButtonOption 的结构

```ts
type NavBarButtonOption = {
  text: string
  icon?: IconData
  type?: StateType
}

const options: NavBarButtonOption[] = [{ icon: 'MenuOutlined', text: '菜单' }]
```

其中图标，使用 [Icon](./Icon.md) 组件。

## Events

| 事件               | 描述                                 | 回调函数参数                            | TypeScript 函数      |
| ------------------ | ------------------------------------ | --------------------------------------- | -------------------- |
| back-click         | 返回按钮点击时出发                   | payload: Payload, buttonEl: HTMLElement | NavBarOnButtonClick  |
| home-click         | 到首页按钮点击时触发                 | payload: Payload, buttonEl: HTMLElement | NavBarOnButtonClick  |
| title-dbclick      | 标题双击时触发，可配合做双击返回顶部 | titleEl: HTMLElement                    | NavBarOnTitleDbClick |
| left-button-click  | 左侧按钮点击时触发                   | payload: Payload, buttonEl: HTMLElement | NavBarOnButtonClick  |
| right-button-click | 右侧按钮点击时触发                   | payload: Payload, buttonEl: HTMLElement | NavBarOnButtonClick  |

### Payload

```ts
type Payload = {
  item: {
    text: string
  }
  index: number
}
```

| 参数      | 类型   | 描述             |
| --------- | ------ | ---------------- |
| item.text | string | 点击按钮的文本   |
| index     | number | 点击按钮的索引值 |

## Slots

### 左侧区域自定义（#left）

```vue
<ak-nav-bar
  title="标题"
  :right-buttons="[{ icon: 'MenuOutlined', text: '菜单' }]"
>
  <template #left>Left Slot</template>
</ak-nav-bar>
```

### 右侧区域自定义（#right）

```vue
<ak-nav-bar title="标题" :show-back="true" :show-home="true">
  <template #right>Right Slot</template>
</ak-nav-bar>
```
