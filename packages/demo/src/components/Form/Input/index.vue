<template>
  <ta-group title="基础用法">
    <ta-input type="text" focus placeholder="请输入文本" />
    <ta-input type="text" modelValue="禁用" disabled />
    <ta-input type="text" placeholder="showLimit=true" showLimit showClear />
  </ta-group>
  <ta-group title="textarea">
    <ta-input
      type="textarea"
      placeholder="showLimit=true"
      showLimit
      maxlength="200"
    />
  </ta-group>
  <ta-group title="Slot prepend/append">
    <ta-input type="text" focus placeholder="请输入网址">
      <template #prepend>https://</template>
    </ta-input>
    <ta-input type="text" focus placeholder="请输入网址">
      <template #append>.com</template>
    </ta-input>
  </ta-group>
  <ta-group title="与 Cell 组合">
    <ta-cell label="文本">
      <ta-input type="text" placeholder="请输入文本" />
    </ta-cell>
  </ta-group>
  <ta-group title="设置 type 类型">
    <ta-cell label="文本 text">
      <ta-input type="text" placeholder="请输入文本" />
    </ta-cell>
    <ta-cell label="电话 tel">
      <ta-input type="tel" placeholder="请输入电话" />
    </ta-cell>
    <ta-cell label="整数 digit">
      <ta-input type="digit" placeholder="请输入整数" />
    </ta-cell>
    <ta-cell label="数字 number">
      <ta-input type="number" placeholder="请输入数字" />
    </ta-cell>
    <ta-cell label="搜索 search">
      <ta-input type="search" placeholder="请输入要搜索的内容" />
    </ta-cell>
    <ta-cell label="密码 password">
      <ta-input type="password" placeholder="请输入密码" />
    </ta-cell>
    <ta-cell label="文本 textarea">
      <ta-input type="textarea" placeholder="请输入多行文本" />
    </ta-cell>
  </ta-group>
  <ta-group title="其他">
    <ta-cell label="只读 readonly">
      <ta-input type="text" modelValue="只读文本" readonly />
    </ta-cell>
    <ta-cell label="禁用 disabled">
      <ta-input type="text" modelValue="禁用文本" disabled />
    </ta-cell>
    <ta-cell label="可清除 showClear">
      <ta-input
        type="text"
        placeholder="请输入文本"
        modelValue="文本内容"
        showClear
      />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="input">
      <ta-input
        type="text"
        placeholder="请输入文本"
        showClear
        v-model="value"
        @input="onInput"
      />
    </ta-cell>
    <ta-cell label="change">
      <ta-input
        type="text"
        placeholder="请输入文本"
        showClear
        v-model="changeValue"
        @change="onInput"
      />
    </ta-cell>
  </ta-group>
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
