# Form/FormFooter/FormItem 表单

寄语：表单这块一直没有能深度去思考，之前做过一般跟其他 UI 库一样校验，但是都觉得不满意，现只保留最简单最布局功能。

注：

- 这几个组件主要聚焦于布局。
- 如果想要复杂的表单设计或者校验功能，可以借助 [formilyjs](https://formilyjs.org/zh-CN/guide) 来实现。

<CodeDemo name="Form">

<<< @/../../demo/src/components/Form/Form/index.vue

</CodeDemo>

## Import

```js
import { TaForm, TaFormFooter, TaFormItem } from 'tantalum-ui-mobile'
```

具体的引入方式可以参考[引入组件](../guide/import.md)。

## Form Slots

### #default

```vue
<ta-form>
  <ta-input type="text" />
</ta-form>
```

### footer

```vue
<ta-form>
  <template #footer>
    <ta-button form-type="submit">提交</ta-button>
  </template>
</ta-form>
```

## FormFooter Slots

### #default

```vue
<ta-form-footer>
  <ta-button form-type="submit">提交</ta-button>
</ta-form-footer>
```

## FormItem Props

| 属性     | 类型               | 默认值 | 必填 | 说明                                         |
| -------- | ------------------ | ------ | ---- | -------------------------------------------- |
| error    | string \| string[] |        | 否   | 错误提示信息                                 |
| label    | string             |        | 否   | 设置该行名称，比如 `昵称`                    |
| required | boolean            | false  | 否   | 是否必填，设置 `true` 后 label 会展示必填`*` |

## FormItem Slots

### default

```vue
<ta-form-item>
  <ta-input type="text" />
</ta-form-item>
```

## 支持表单的组件

- [Input](./Input.md)
- [RadioGroup](./Radio.md#radiogroup)
- [CheckboxGroup](./Checkbox.md#checkboxgroup)
- [Switch](./Switch.md)
- [Stepper](./Stepper.md)
- [Slider](./Slider.md)
- [Range](./Range.md)
- [Rate](./Rate.md)
- [Calendar](./Calendar.md)
- [DatePicker](./DatePicker.md)
- [Cascader](./Cascader.md)
- [Picker](./Picker.md)
- [ImageUploader](./ImageUploader.md)

## 与 **Formily** 配合

关于 **Formily** 的介绍可以查看阿里巴巴的[官网](https://formilyjs.org/zh-CN)。

### 安装

```sh
npm install --save @formily/core @formily/vue
```

### 对 `FormItem` 做下适配

`FormilyFormItem.js`:

```js
import { FormItem } from 'tantalum-ui-mobile'
import { connect, mapProps } from '@formily/vue'
import { isVoidField } from '@formily/core'

export default connect(
  FormItem,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props

      const getMessage = () => {
        if (field.validating) return
        if (props.error) return props.error
        if (field.selfErrors.length) return field.selfErrors
        // if (field.selfWarnings.length) return split(field.selfWarnings)
        // if (field.selfSuccesses.length) return split(field.selfSuccesses)
      }

      return {
        error: getMessage()
      }
    }
  )
)
```

### 设计表单

```vue
<template>
  <FormProvider :form="form">
    <Field
      name="nickname"
      title="昵称"
      required
      :component="[Input, { placeholder: '请输入昵称' }]"
      :decorator="[FormilyFormItem]"
    />
    <Field
      name="gender"
      title="性别"
      required
      :component="[
        RadioGroup,
        {
          options: genderOptions
        }
      ]"
      :decorator="[FormilyFormItem]"
    />
    <FormConsumer>
      <template #default="{ form }">
        <pre class="exp-form-json">{{
          JSON.stringify(form.values, null, 2)
        }}</pre>
        <ta-form-footer>
          <ta-button
            type="primary"
            @click="
              () => {
                form.submit(onSubmit)
              }
            "
            >提交</ta-button
          >
        </ta-form-footer>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<script>
import { multiOptions, regionOptions } from '../Picker/data'
import { Input, RadioGroup, Dialog } from 'tantalum-ui-mobile'
import { createForm, setValidateLanguage } from '@formily/core'
import { FormProvider, Field, FormConsumer } from '@formily/vue'
import FormilyFormItem from './FormilyFormItem'

setValidateLanguage('zh-CN')

export default {
  name: 'ExpForm',
  components: { FormProvider, Field, FormConsumer },
  data() {
    return {
      FormilyFormItem,
      Input,
      RadioGroup,
      form: createForm({ validateFirst: true }),

      genderOptions: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ]
    }
  },
  methods: {
    onBaseSubmit() {
      Dialog.showDialog({
        showCancel: false,
        content: `nickname: ${this.baseForm.nickname}
        gender: ${this.baseForm.gender}
        `
      })
    }
  }
}
</script>
```

### 附录：

- [Formily Vue Library](https://vue.formilyjs.org/)
- [更多开发模式](https://vue.formilyjs.org/guide/concept.html#%E4%B8%89%E7%A7%8D%E5%BC%80%E5%8F%91%E6%A8%A1%E5%BC%8F)
- [表单校验](https://formilyjs.org/zh-CN/guide/advanced/validate)
