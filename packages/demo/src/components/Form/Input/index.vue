<template>
  <fx-group title="基础用法">
    <fx-input type="text" focus placeholder="请输入文本" />
    <fx-input type="text" modelValue="禁用" disabled />
    <fx-input type="text" placeholder="showLimit=true" showLimit showClear />
  </fx-group>
  <fx-group title="textarea">
    <fx-input
      type="textarea"
      placeholder="showLimit=true"
      showLimit
      maxlength="200"
    />
  </fx-group>
  <fx-group title="Slot prepend/append">
    <fx-input type="text" focus placeholder="请输入网址">
      <template #prepend>https://</template>
    </fx-input>
    <fx-input type="text" focus placeholder="请输入网址">
      <template #append>.com</template>
    </fx-input>
  </fx-group>
  <fx-group title="与 Cell 组合">
    <fx-cell label="文本">
      <fx-input type="text" placeholder="请输入文本" />
    </fx-cell>
  </fx-group>
  <fx-group title="设置 type 类型">
    <fx-cell label="文本 text">
      <fx-input type="text" placeholder="请输入文本" />
    </fx-cell>
    <fx-cell label="电话 tel">
      <fx-input type="tel" placeholder="请输入电话" />
    </fx-cell>
    <fx-cell label="整数 digit">
      <fx-input type="digit" placeholder="请输入整数" />
    </fx-cell>
    <fx-cell label="数字 number">
      <fx-input type="number" placeholder="请输入数字" />
    </fx-cell>
    <fx-cell label="搜索 search">
      <fx-input type="search" placeholder="请输入要搜索的内容" />
    </fx-cell>
    <fx-cell label="密码 password">
      <fx-input type="password" placeholder="请输入密码" />
    </fx-cell>
    <fx-cell label="文本 textarea">
      <fx-input type="textarea" placeholder="请输入多行文本" />
    </fx-cell>
  </fx-group>
  <fx-group title="其他">
    <fx-cell label="只读 readonly">
      <fx-input type="text" modelValue="只读文本" readonly />
    </fx-cell>
    <fx-cell label="禁用 disabled">
      <fx-input type="text" modelValue="禁用文本" disabled />
    </fx-cell>
    <fx-cell label="可清除 showClear">
      <fx-input
        type="text"
        placeholder="请输入文本"
        modelValue="文本内容"
        showClear
      />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="input">
      <fx-input
        type="text"
        placeholder="请输入文本"
        showClear
        v-model="value"
        @input="onInput"
      />
    </fx-cell>
    <fx-cell label="change">
      <fx-input
        type="text"
        placeholder="请输入文本"
        showClear
        v-model="changeValue"
        @change="onInput"
      />
    </fx-cell>
  </fx-group>
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
