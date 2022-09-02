<template>
  <ak-group title="基础用法">
    <ak-cell
      label="基础"
      isLink
      id="dropdownCell"
      @click=";(selector = '#dropdownCell'), (visible = true)"
    />
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell
      label="visible-state-change"
      id="dropdownCellEvent"
      @click="
        ;(selector = '#dropdownCellEvent'),
          (visibleEvent = true),
          (visible = true)
      "
    />
  </ak-group>
  <ak-dropdown
    v-model:visible="visible"
    :selector="selector"
    @visibleStateChange="onVisibleStateChange"
  >
  </ak-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PopupOnVisibleStateChange, showToast } from '@/index'

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
