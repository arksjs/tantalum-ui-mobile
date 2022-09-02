<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { navConfig } from './views/data'
import { useRoute, useRouter } from 'vue-router'
import type { NavBarOnButtonClick, SideTabOnChange } from '@/index'
import useDark from './utils/useDark'

const $route = useRoute()
const $router = useRouter()
const isDocs = computed(() => $route.query.docs === '1')

const menuVisible = ref(false)

const { isDarkTheme, sessionSwitchTheme, switchTheme } = useDark()

watch(isDocs, val => sessionSwitchTheme(!val))

const menuList = [
  {
    label: '首页',
    value: 'ExpHome'
  },
  ...navConfig
    .map(group => {
      return group.list.map(item => {
        return {
          label: item.name,
          value: 'Exp' + item.name
        }
      })
    })
    .flat()
]

const navBarTitle = computed(() => {
  return (
    ($route.name &&
      typeof $route.name === 'string' &&
      $route.name.replace('Exp', '')) ||
    ''
  )
})

const onMenuChange: SideTabOnChange = value => {
  if (value !== $route.name) {
    menuVisible.value = false

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })

    $router.push({ name: value.toString() })
  }
}

function onBack() {
  $router.go(-1)
}
function onBackHome() {
  $router.replace({ name: 'ExpHome' })
}

const onRightButtonClick: NavBarOnButtonClick = e => {
  if (e.item.text === 'menu') {
    menuVisible.value = true
  } else if (e.item.text === 'theme') {
    switchTheme(!isDarkTheme.value)
  }
}

const activeValue = computed(() => {
  return ($route.name as string) ?? ''
})
</script>

<template>
  <ak-config-provider>
    <ak-fixed placement="top">
      <ak-nav-bar
        :title="navBarTitle"
        v-show="$route.path !== '/' && !isDocs"
        :show-back="true"
        :show-home="true"
        @back-click="onBack"
        @home-click="onBackHome"
        :rightButtons="[
          { icon: isDarkTheme ? 'MoonOutlined' : 'SunOutlined', text: 'theme' },
          { icon: 'MenuOutlined', text: 'menu' }
        ]"
        @rightButtonClick="onRightButtonClick"
      ></ak-nav-bar>
    </ak-fixed>
    <router-view v-slot="{ Component }">
      <keep-alive include="ExpHome">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <ak-drawer
      ref="drawer"
      title="Menu"
      placement="right"
      v-model:visible="menuVisible"
    >
      <ak-side-tab
        :options="menuList"
        :activeValue="activeValue"
        @change="onMenuChange"
      ></ak-side-tab>
    </ak-drawer>
  </ak-config-provider>
</template>
