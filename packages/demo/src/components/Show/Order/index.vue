<template>
  <!-- <ta-group title="基础用法">
    <div class="exp-order-box">
      <ta-order v-model:items="items">
        <template #default="{ id }">
          <div class="exp-order-item" :class="[maps.get(id)]"></div>
        </template>
      </ta-order>
    </div>
  </ta-group> -->
  <ta-group title="设置列数">
    <div class="exp-order-box">
      <ta-order v-model:items="items2" :columnNumber="4">
        <template #default="{ id }">
          <div class="exp-order-item" :class="[maps.get(id as number)]"></div>
        </template>
      </ta-order>
    </div>
  </ta-group>
  <ta-group title="允许删除">
    <div class="exp-order-box">
      <ta-order v-model:items="items3" :deletable="true">
        <template #default="{ id }">
          <div class="exp-order-item" :class="[maps.get(id as number)]">
            {{ maps.get(id as number) }}
          </div>
        </template>
      </ta-order>
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const items = [
  { id: 1, type: 'primary' },
  { id: 2, type: 'success' },
  { id: 3, type: 'warning' },
  { id: 4, type: 'danger' }
]

const maps = new Map(
  items.map(item => {
    return [item.id, item.type]
  })
)

export default defineComponent({
  name: 'ExpOrder',
  setup() {
    return {
      items: ref(
        items.map(item => {
          return { id: item.id }
        })
      ),
      items2: ref(
        items.map(item => {
          return { id: item.id }
        })
      ),
      items3: ref(
        items.map(item => {
          return { id: item.id }
        })
      ),
      maps
    }
  }
})
</script>
