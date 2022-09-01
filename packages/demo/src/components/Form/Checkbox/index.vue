<template>
  <fx-group title="基础用法">
    <fx-cell label="默认">
      <fx-checkbox />
    </fx-cell>
    <fx-cell label="带文案">
      <fx-checkbox v-model:checked="checked">勾选</fx-checkbox>
    </fx-cell>
    <fx-cell label="默认激活">
      <fx-checkbox checked>勾选</fx-checkbox>
    </fx-cell>
    <fx-cell label="自定义颜色">
      <fx-checkbox checked activeColor="#8b1721">勾选</fx-checkbox>
    </fx-cell>
    <fx-cell label="禁用">
      <fx-checkbox disabled>勾选</fx-checkbox>
    </fx-cell>
  </fx-group>
  <fx-group title="CheckboxGroup">
    <fx-cell label="默认">
      <fx-checkbox-group v-model="groupValue">
        <fx-checkbox v-for="item in groups" :key="item" :value="item">{{
          item
        }}</fx-checkbox>
      </fx-checkbox-group>
    </fx-cell>
    <fx-cell label="内联">
      <fx-checkbox-group inline activeColor="#8b1721">
        <fx-checkbox v-for="item in groups" :key="item" :value="item">{{
          item
        }}</fx-checkbox>
      </fx-checkbox-group>
    </fx-cell>
    <fx-cell label="禁用">
      <fx-checkbox-group :modelValue="['A']" disabled>
        <fx-checkbox v-for="item in groups" :key="item" :value="item">{{
          item
        }}</fx-checkbox>
      </fx-checkbox-group>
    </fx-cell>
    <fx-cell label="通过options设置">
      <fx-checkbox-group v-model="groupValue" :options="groups" />
    </fx-cell>
  </fx-group>
  <fx-group title="CheckboxGroup + Cell">
    <fx-checkbox-group v-model="groupValue">
      <fx-cell v-for="item in groups" :key="item" :label="'单元格 ' + item">
        <template #icon>
          <fx-checkbox circle :value="item" />
        </template>
      </fx-cell>
    </fx-checkbox-group>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change">
      <fx-checkbox-group @change="onChange">
        <fx-checkbox value="A">A</fx-checkbox>
        <fx-checkbox value="B">B</fx-checkbox>
        <fx-checkbox value="C">C</fx-checkbox>
      </fx-checkbox-group>
    </fx-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpCheckbox',
  setup() {
    const checked = ref(false)
    const groupValue = ref(['A', 'C'])
    const groups = ref(['A', 'B', 'C'])

    function onChange(value: (string | number)[]) {
      console.log('change', value)
      showToast(`Change Value: ${value}`)
    }

    return {
      checked,
      groupValue,
      groups,

      onChange
    }
  }
})
</script>
