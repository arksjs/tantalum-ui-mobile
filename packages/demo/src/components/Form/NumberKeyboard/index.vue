<template>
  <fx-group title="基础键盘">
    <fx-cell label="默认键盘" isLink @click="visible1 = true">
      <fx-number-keyboard
        v-model:visible="visible1"
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
    <fx-cell label="带小数点（customKey='.'）" isLink @click="visible2 = true">
      <fx-number-keyboard
        v-model:visible="visible2"
        customKey="."
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
    <fx-cell label="身份证（customKey='X'）" isLink @click="visible3 = true">
      <fx-number-keyboard
        v-model:visible="visible3"
        customKey="X"
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
  </fx-group>
  <fx-group title="带右侧栏键盘">
    <fx-cell label="默认键盘" isLink @click="visible4 = true">
      <fx-number-keyboard
        v-model:visible="visible4"
        type="rightColumn"
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
    <fx-cell
      label="1个自定义值（customKey=['.']）"
      isLink
      @click="visible5 = true"
    >
      <fx-number-keyboard
        v-model:visible="visible5"
        type="rightColumn"
        customKey="."
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
    <fx-cell
      label="2个自定义值（customKey=['00', '.']）"
      isLink
      @click="visible6 = true"
    >
      <fx-number-keyboard
        v-model:visible="visible6"
        type="rightColumn"
        :customKey="['00', '.']"
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
  </fx-group>
  <fx-group title="其他">
    <fx-cell label="设置标题" isLink @click="visible7 = true">
      <fx-number-keyboard
        title="键盘标题"
        v-model:visible="visible7"
        @input="onInput"
        @change="onChange"
        @delete="onDelete"
        @close="onClose"
      ></fx-number-keyboard>
    </fx-cell>
    <fx-form-item name="number" label="双向绑定" @click="visible8 = true">
      <fx-input v-model="value" readonly />
      <fx-number-keyboard
        v-model:visible="visible8"
        v-model="value"
      ></fx-number-keyboard>
    </fx-form-item>
  </fx-group>
</template>

<script lang="ts">
import {
  NumberKeyboardOnClose,
  NumberKeyboardOnDelete,
  showToast
} from '@/index'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ExpNumberKeyboard',
  setup() {
    const value = ref('')
    const visible1 = ref(false)
    const visible2 = ref(false)
    const visible3 = ref(false)
    const visible4 = ref(false)
    const visible5 = ref(false)
    const visible6 = ref(false)
    const visible7 = ref(false)
    const visible8 = ref(false)

    const onInput = (value: string) => {
      showToast(value)
    }

    const onChange = (value: string) => {
      console.log('change', value)
      showToast(`本次输入值为：${value}`)
    }

    const onDelete: NumberKeyboardOnDelete = res => {
      console.log('delete', res)
      showToast('删除')
    }

    const onClose: NumberKeyboardOnClose = res => {
      console.log('close', res)
    }

    return {
      value,

      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      visible6,
      visible7,
      visible8,

      onInput,
      onChange,
      onDelete,
      onClose
    }
  }
})
</script>
