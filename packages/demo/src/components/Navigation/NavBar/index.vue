<template>
  <ta-group title="基础用法">
    <ta-nav-bar title="标题" />
  </ta-group>
  <ta-group title="显示返回按钮">
    <ta-nav-bar title="标题" showBack />
  </ta-group>
  <ta-group title="展示首页按钮">
    <ta-nav-bar title="标题" showBack showHome />
  </ta-group>
  <ta-group title="展示右侧按钮">
    <ta-nav-bar
      title="标题"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
  </ta-group>
  <ta-group title="按钮带文本">
    <ta-nav-bar
      title="标题"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
    <ta-nav-bar
      title="标题"
      showBack
      :iconOnly="false"
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
  </ta-group>
  <ta-group title="固定顶部(配合 fixed 组件)">
    <div class="exp-navBar-fixed">上下滑动观察最顶部的导航</div>
  </ta-group>
  <ta-group title="事件监听">
    <ta-nav-bar
      title="标题双击"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      @backClick="showToast('返回按钮点击')"
      @homeClick="showToast('首页按钮点击')"
      @titleDbclick="showToast('标题双击')"
      @rightButtonClick="onRightButtonClick"
    >
    </ta-nav-bar>
  </ta-group>
  <ta-group title="Slot left / right">
    <ta-nav-bar title="标题" :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]">
      <template #left>
        <div class="exp-navBar-left">Left Slot</div>
      </template>
    </ta-nav-bar>
    <ta-nav-bar title="标题" showBack showHome>
      <template #right>
        <div class="exp-navBar-right">Right Slot</div>
      </template>
    </ta-nav-bar>
    <ta-nav-bar title="标题" showBack showHome>
      <template #left>
        <div class="exp-navBar-left">
          <ta-button type="primary" icon="LeftOutlined" size="small"> 返回 </ta-button>
        </div>
      </template>
      <template #right>
        <div class="exp-navBar-right">
          <ta-button type="primary" icon="MenuOutlined" size="small"> 菜单 </ta-button>
        </div>
      </template>
    </ta-nav-bar>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast, showDialog, type NavBarOnButtonClick } from '@/index'

export default defineComponent({
  name: 'ExpNavBar',
  setup() {
    const onRightButtonClick: NavBarOnButtonClick = res => {
      console.log(res)

      showDialog({
        title: '右侧按钮点击',
        showCancel: false,
        content: `text: '${res.item.text}'\nindex: ${res.index}`
      })
    }

    return { showToast, onRightButtonClick }
  }
})
</script>
