<template>
  <ta-group title="基础用法">
    <ta-search-bar />
  </ta-group>
  <ta-group title="搜索建议">
    <ta-search-bar @input="onInput" />
  </ta-group>
  <ta-group title="显示取消按钮">
    <ta-search-bar show-cancel />
  </ta-group>
  <ta-group title="设置候选项">
    <ta-search-bar :placeholders="placeholders" />
  </ta-group>
  <ta-group title="深色适配">
    <ta-search-bar class="exp-searchBar-dark-style" show-cancel ghost />
  </ta-group>
  <ta-group title="只读（readonly=true）">
    <ta-search-bar readonly :placeholders="placeholders" />
  </ta-group>
  <ta-group title="事件监听">
    <ta-search-bar
      show-cancel
      :placeholders="placeholders"
      @input="onInput2"
      @focus="onFocus"
      @blur="onBlur"
      @cancel="onCancel"
      @search="onSearch"
    >
    </ta-search-bar>
  </ta-group>
  <ta-group title="事件监听（readonly=true）">
    <ta-search-bar readonly :placeholders="placeholders" @field-click="onClick" />
  </ta-group>
</template>

<script lang="ts">
import { placeholders } from './data'
import {
  type SearchBarOnFieldClick,
  type SearchBarOnInput,
  type SearchBarOnSearch,
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
