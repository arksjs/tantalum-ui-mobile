<template>
  <fx-group title="基础用法">
    <fx-search-bar />
  </fx-group>
  <fx-group title="搜索建议">
    <fx-search-bar @input="onInput" />
  </fx-group>
  <fx-group title="显示取消按钮">
    <fx-search-bar show-cancel />
  </fx-group>
  <fx-group title="设置候选项">
    <fx-search-bar :placeholders="placeholders" />
  </fx-group>
  <fx-group title="深色适配">
    <fx-search-bar class="exp-searchBar-dark-style" show-cancel ghost />
  </fx-group>
  <fx-group title="只读（readonly=true）">
    <fx-search-bar readonly :placeholders="placeholders" />
  </fx-group>
  <fx-group title="事件监听">
    <fx-search-bar
      show-cancel
      :placeholders="placeholders"
      @input="onInput2"
      @focus="onFocus"
      @blur="onBlur"
      @cancel="onCancel"
      @search="onSearch"
    >
    </fx-search-bar>
  </fx-group>
  <fx-group title="事件监听（readonly=true）">
    <fx-search-bar
      readonly
      :placeholders="placeholders"
      @field-click="onClick"
    />
  </fx-group>
</template>

<script lang="ts">
import { placeholders } from './data'
import {
  SearchBarOnFieldClick,
  SearchBarOnInput,
  SearchBarOnSearch,
  showToast
} from '@/index'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpSearchBar',
  setup() {
    const onCancel = () => {
      showToast('取消按钮点击')
    }

    const onInput: SearchBarOnInput = (text, fn) => {
      fn(
        text
          ? 'ABCD'.split('').map(v => {
              return {
                text: `${text} ${v}`,
                tags: ['tag1', 'tag2']
              }
            })
          : []
      )
    }

    const onInput2: SearchBarOnInput = (text, fn) => {
      showToast(`输入了 ${text}`)

      onInput(text, fn)
    }

    const onSearch: SearchBarOnSearch = res => {
      console.log('search', res)
      showToast(`搜索了 ${res.text}`)
    }

    const onClick: SearchBarOnFieldClick = res => {
      console.log('field-click', res)
      showToast(`搜索词 ${res.text}`)
    }

    return {
      placeholders,
      onFocus: () => showToast('focus'),
      onBlur: () => showToast('blur'),
      onCancel,
      onInput,
      onInput2,
      onSearch,
      onClick
    }
  }
})
</script>
