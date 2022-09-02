<template>
  <ak-group title="基础用法">
    <ak-input type="text" focus placeholder="请输入文本" />
    <ak-input type="text" modelValue="禁用" disabled />
    <ak-input type="text" placeholder="showLimit=true" showLimit showClear />
  </ak-group>
  <ak-group title="textarea">
    <ak-input
      type="textarea"
      placeholder="showLimit=true"
      showLimit
      maxlength="200"
    />
  </ak-group>
  <ak-group title="Slot prepend/append">
    <ak-input type="text" focus placeholder="请输入网址">
      <template #prepend>https://</template>
    </ak-input>
    <ak-input type="text" focus placeholder="请输入网址">
      <template #append>.com</template>
    </ak-input>
  </ak-group>
  <ak-group title="与 Cell 组合">
    <ak-cell label="文本">
      <ak-input type="text" placeholder="请输入文本" />
    </ak-cell>
  </ak-group>
  <ak-group title="设置 type 类型">
    <ak-cell label="文本 text">
      <ak-input type="text" placeholder="请输入文本" />
    </ak-cell>
    <ak-cell label="电话 tel">
      <ak-input type="tel" placeholder="请输入电话" />
    </ak-cell>
    <ak-cell label="整数 digit">
      <ak-input type="digit" placeholder="请输入整数" />
    </ak-cell>
    <ak-cell label="数字 number">
      <ak-input type="number" placeholder="请输入数字" />
    </ak-cell>
    <ak-cell label="搜索 search">
      <ak-input type="search" placeholder="请输入要搜索的内容" />
    </ak-cell>
    <ak-cell label="密码 password">
      <ak-input type="password" placeholder="请输入密码" />
    </ak-cell>
    <ak-cell label="文本 textarea">
      <ak-input type="textarea" placeholder="请输入多行文本" />
    </ak-cell>
  </ak-group>
  <ak-group title="其他">
    <ak-cell label="只读 readonly">
      <ak-input type="text" modelValue="只读文本" readonly />
    </ak-cell>
    <ak-cell label="禁用 disabled">
      <ak-input type="text" modelValue="禁用文本" disabled />
    </ak-cell>
    <ak-cell label="可清除 showClear">
      <ak-input
        type="text"
        placeholder="请输入文本"
        modelValue="文本内容"
        showClear
      />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="input">
      <ak-input
        type="text"
        placeholder="请输入文本"
        showClear
        v-model="value"
        @input="onInput"
      />
    </ak-cell>
    <ak-cell label="change">
      <ak-input
        type="text"
        placeholder="请输入文本"
        showClear
        v-model="changeValue"
        @change="onInput"
      />
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpInput',
  setup() {
    const value = ref('')
    const changeValue = ref('')

    function onInput(value: string) {
      showToast(`当前值为：${value}`)
    }

    return {
      value,
      changeValue,
      onInput
    }
  }
})
</script>
