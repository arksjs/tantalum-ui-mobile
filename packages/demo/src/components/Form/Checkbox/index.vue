<template>
  <ta-group title="基础用法">
    <ta-cell label="默认">
      <ta-checkbox />
    </ta-cell>
    <ta-cell label="带文案">
      <ta-checkbox v-model:checked="checked">勾选</ta-checkbox>
    </ta-cell>
    <ta-cell label="默认激活">
      <ta-checkbox checked>勾选</ta-checkbox>
    </ta-cell>
    <ta-cell label="自定义颜色">
      <ta-checkbox checked activeColor="#8b1721">勾选</ta-checkbox>
    </ta-cell>
    <ta-cell label="禁用">
      <ta-checkbox disabled>勾选</ta-checkbox>
    </ta-cell>
  </ta-group>
  <ta-group title="CheckboxGroup">
    <ta-cell label="默认">
      <ta-checkbox-group v-model="groupValue">
        <ta-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ta-checkbox>
      </ta-checkbox-group>
    </ta-cell>
    <ta-cell label="内联">
      <ta-checkbox-group v-model="groupValue" inline activeColor="#8b1721">
        <ta-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ta-checkbox>
      </ta-checkbox-group>
    </ta-cell>
    <ta-cell label="禁用">
      <ta-checkbox-group :modelValue="['A']" disabled>
        <ta-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ta-checkbox>
      </ta-checkbox-group>
    </ta-cell>
    <ta-cell label="通过options设置">
      <ta-checkbox-group v-model="groupValue" :options="groups" />
    </ta-cell>
  </ta-group>
  <ta-group title="CheckboxGroup + Cell">
    <ta-checkbox-group v-model="groupValue">
      <ta-cell v-for="item in groups" :key="item" :label="'单元格 ' + item">
        <template #icon>
          <ta-checkbox circle :checkedValue="item" />
        </template>
      </ta-cell>
    </ta-checkbox-group>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-checkbox-group @change="onChange">
        <ta-checkbox v-for="item in groups" :key="item" :checkedValue="item">{{
          item
        }}</ta-checkbox>
      </ta-checkbox-group>
    </ta-cell>
  </ta-group>
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
