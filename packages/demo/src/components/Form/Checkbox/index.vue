<template>
  <ak-group title="基础用法">
    <ak-cell label="默认">
      <ak-checkbox />
    </ak-cell>
    <ak-cell label="带文案">
      <ak-checkbox v-model:checked="checked">勾选</ak-checkbox>
    </ak-cell>
    <ak-cell label="默认激活">
      <ak-checkbox checked>勾选</ak-checkbox>
    </ak-cell>
    <ak-cell label="自定义颜色">
      <ak-checkbox checked activeColor="#8b1721">勾选</ak-checkbox>
    </ak-cell>
    <ak-cell label="禁用">
      <ak-checkbox disabled>勾选</ak-checkbox>
    </ak-cell>
  </ak-group>
  <ak-group title="CheckboxGroup">
    <ak-cell label="默认">
      <ak-checkbox-group v-model="groupValue">
        <ak-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ak-checkbox>
      </ak-checkbox-group>
    </ak-cell>
    <ak-cell label="内联">
      <ak-checkbox-group v-model="groupValue" inline activeColor="#8b1721">
        <ak-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ak-checkbox>
      </ak-checkbox-group>
    </ak-cell>
    <ak-cell label="禁用">
      <ak-checkbox-group :modelValue="['A']" disabled>
        <ak-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ak-checkbox>
      </ak-checkbox-group>
    </ak-cell>
    <ak-cell label="通过options设置">
      <ak-checkbox-group v-model="groupValue" :options="groups" />
    </ak-cell>
  </ak-group>
  <ak-group title="CheckboxGroup + Cell">
    <ak-checkbox-group v-model="groupValue">
      <ak-cell v-for="item in groups" :key="item" :label="'单元格 ' + item">
        <template #icon>
          <ak-checkbox circle :checkedValue="item" />
        </template>
      </ak-cell>
    </ak-checkbox-group>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-checkbox-group @change="onChange">
        <ak-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ak-checkbox>
      </ak-checkbox-group>
    </ak-cell>
  </ak-group>
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
