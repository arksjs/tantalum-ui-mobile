<script lang="ts">
export default {
  name: 'ExpHome'
}
</script>

<script lang="ts" setup>
import { getScrollTop, scrollTo } from '@/helpers/dom'
import { onActivated, onDeactivated } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { navConfig } from './data'
import logo from '../assets/logo.svg?vueComponent'

let scrollTop = 0

onActivated(() => scrollTo(document, scrollTop, false))
onDeactivated(() => scrollTo(document, 0, false))
onBeforeRouteLeave((to, from, next) => {
  scrollTop = getScrollTop(document)
  next()
})

const $router = useRouter()

function onItemClick({ name }: { name: string }) {
  $router.push({ name: 'Exp' + name })
}
</script>

<template>
  <div class="exp-home">
    <div class="exp-home-header">
      <logo class="exp-home-logo" />
      <h1 class="exp-home-title">ArkUI</h1>
    </div>
    <div class="exp-home-body">
      <ak-group
        :title="group.name + ' ' + group.zhName"
        v-for="group in navConfig"
        :key="group.name"
        card
      >
        <ak-cell
          :clickable="true"
          :label="item.name + ' ' + item.zhName"
          v-for="item in group.list"
          :key="item.name"
          @click="onItemClick(item)"
        ></ak-cell>
      </ak-group>
    </div>
  </div>
</template>
