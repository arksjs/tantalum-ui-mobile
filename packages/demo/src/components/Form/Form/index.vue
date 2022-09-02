<template>
  <ak-group title="基础">
    <ak-form>
      <ak-form-item label="昵称">
        <ak-AkInput v-model="baseForm.nickname" placeholder="请输入昵称" />
      </ak-form-item>
      <ak-form-item label="性别">
        <ak-radio-group
          v-model="baseForm.gender"
          :options="genderOptions"
        ></ak-radio-group>
      </ak-form-item>
      <template #footer>
        <ak-button type="primary" @click="onBaseSubmit">提交</ak-button>
      </template>
    </ak-form>
  </ak-group>
  <ak-group title="Formily">
    <FormProvider :form="form">
      <Field
        name="nickname"
        title="昵称"
        required
        :component="[AkInput, { placeholder: '请输入昵称', showClear: true }]"
        :decorator="[FormItem]"
      />
      <Field
        name="avatar"
        title="头像"
        required
        :component="[
          AkImageUploader,
          { uploadReady: hookUpload, columnNumber: 1, maxCount: 1 }
        ]"
        :decorator="[FormItem]"
      />
      <Field
        name="gender"
        title="性别"
        required
        :component="[
          AkRadioGroup,
          {
            options: genderOptions
          }
        ]"
        :decorator="[FormItem]"
      />
      <Field
        name="weight"
        title="体重Kg"
        required
        :component="[AkSlider, { showValue: true, min: 35, max: 120 }]"
        :decorator="[FormItem]"
      />
      <Field
        name="season"
        title="季节"
        required
        :component="[
          AkPicker,
          { options: multiOptions, placeholder: '选择季节' }
        ]"
        :decorator="[FormItem]"
      />
      <Field
        name="birthday"
        title="生日"
        required
        :component="[AkCalendar, { placeholder: '选择生日' }]"
        :decorator="[FormItem]"
      />
      <Field
        name="character"
        title="性格"
        required
        :component="[AkCheckboxGroup, { options: characters }]"
        :decorator="[FormItem]"
      />
      <Field
        name="region"
        title="地区"
        required
        :component="[
          AkCascader,
          {
            placeholder: '选择地区',
            fieldNames: { value: 'label' },
            options: regionOptions
          }
        ]"
        :decorator="[FormItem]"
      />
      <Field
        name="happinessIndex"
        title="幸福指数"
        required
        :component="[AkRate, { allowHalf: true }]"
        :decorator="[FormItem]"
      />
      <Field
        name="AkStepper"
        title="步进器"
        required
        :component="[AkStepper, { max: 10, step: 0.2, decimalLength: 1 }]"
        :decorator="[FormItem]"
      />
      <Field
        name="agree"
        title="认可"
        required
        :component="[AkSwitch]"
        :decorator="[FormItem]"
      />
      <FormConsumer>
        <template #default="{ form }">
          <pre class="exp-form-json">{{
            JSON.stringify(form.values, null, 2)
          }}</pre>
          <ak-form-footer>
            <ak-button
              type="primary"
              @click="
                () => {
                  form.submit(onSubmit)
                }
              "
              >提交</ak-button
            >
          </ak-form-footer>
        </template>
      </FormConsumer>
    </FormProvider>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { multiOptions, regionOptions } from '../Picker/data'
import {
  AkInput,
  AkPicker,
  AkCalendar,
  AkCascader,
  AkSwitch,
  AkRate,
  AkSlider,
  AkRange,
  AkStepper,
  AkRadioGroup,
  AkCheckboxGroup,
  AkImageUploader,
  showToast,
  showDialog,
  ImageUploaderUploadReady
} from '@/index'
import { createForm, setValidateLanguage } from '@formily/core'
import { FormProvider, Field, FormConsumer } from '@formily/vue'
import FormItem from './FormItem'

setValidateLanguage('zh-CN')

export default defineComponent({
  name: 'ExpForm',
  components: { FormProvider, Field, FormConsumer },
  setup() {
    function getDataUrl(file: File) {
      return new Promise<string>(resolve => {
        const fr = new FileReader()
        fr.onload = function (e) {
          resolve((e.target?.result as string) ?? '')
        }
        fr.readAsDataURL(file)
      })
    }

    const hookUpload: ImageUploaderUploadReady = (file, handlers) => {
      getDataUrl(file).then(url => {
        handlers.success(url)
      })
    }

    return {
      hookUpload
    }
  },
  data() {
    return {
      baseForm: {
        nickname: '',
        gender: ''
      },

      FormItem,
      AkInput,
      AkPicker,
      AkCalendar,
      AkCascader,
      AkSwitch,
      AkRate,
      AkSlider,
      AkRange,
      AkStepper,
      AkRadioGroup,
      AkCheckboxGroup,
      AkImageUploader,
      form: createForm({ validateFirst: true }),

      genderOptions: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      regionOptions,
      multiOptions,
      characters: ['活泼', '内向', '高冷']
    }
  },
  methods: {
    onBaseSubmit() {
      showDialog({
        showCancel: false,
        content: `nickname: ${this.baseForm.nickname}
        gender: ${this.baseForm.gender}
        `
      })
    },
    onSubmit(...args: any[]) {
      console.log(...args)
      showToast('校验通过')
    }
  }
})
</script>
