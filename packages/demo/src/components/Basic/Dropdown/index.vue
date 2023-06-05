<template>
  <ta-group title="基础用法">
    <ta-cell
      label="基础"
      isLink
      id="dropdownCell"
      @click=";(selector = '#dropdownCell'), (visible = true)"
    />
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell
      label="visible-state-change"
      id="dropdownCellEvent"
      @click=";(selector = '#dropdownCellEvent'), (visibleEvent = true), (visible = true)"
    />
  </ta-group>
  <ta-dropdown
    v-model:visible="visible"
    :selector="selector"
    @visibleStateChange="onVisibleStateChange"
  >
  </ta-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { type PopupOnVisibleStateChange, showToast } from '@/index'

export default defineComponent({
  name: 'ExpDropdown',
  setup() {
    const visible = ref(false)
    const selector = ref('')
    const visibleEvent = ref(false)

    const onVisibleStateChange: PopupOnVisibleStateChange = ({ state }) => {
      if (visibleEvent.value) {
        showToast(`${state} 事件触发`)
        console.log('visible-state-change', state)
      }
      if (state === 'hidden') {
        visibleEvent.value = false
      }
    }

    return {
      visible,
      selector,
      visibleEvent,

      onVisibleStateChange
    }
  }
})
</script>
