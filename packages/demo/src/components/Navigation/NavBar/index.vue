<template>
  <fx-group title="基础用法">
    <fx-nav-bar title="标题" />
  </fx-group>
  <fx-group title="显示返回按钮">
    <fx-nav-bar title="标题" showBack />
  </fx-group>
  <fx-group title="展示首页按钮">
    <fx-nav-bar title="标题" showBack showHome />
  </fx-group>
  <fx-group title="展示右侧按钮">
    <fx-nav-bar
      title="标题"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
  </fx-group>
  <fx-group title="按钮带文本">
    <fx-nav-bar
      title="标题"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
    <fx-nav-bar
      title="标题"
      showBack
      :iconOnly="false"
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
  </fx-group>
  <fx-group title="固定顶部(配合 fixed 组件)">
    <div class="exp-navBar-fixed">上下滑动观察最顶部的导航</div>
  </fx-group>
  <fx-group title="事件监听">
    <fx-nav-bar
      title="标题双击"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      @backClick="showToast('返回按钮点击')"
      @homeClick="showToast('首页按钮点击')"
      @titleDbclick="showToast('标题双击')"
      @rightButtonClick="onRightButtonClick"
    >
    </fx-nav-bar>
  </fx-group>
  <fx-group title="Slot left / right">
    <fx-nav-bar
      title="标题"
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    >
      <template #left>
        <div class="exp-navBar-left">Left Slot</div>
      </template>
    </fx-nav-bar>
    <fx-nav-bar title="标题" showBack showHome>
      <template #right>
        <div class="exp-navBar-right">Right Slot</div>
      </template>
    </fx-nav-bar>
    <fx-nav-bar title="标题" showBack showHome>
      <template #left>
        <div class="exp-navBar-left">
          <fx-button type="primary" icon="LeftOutlined" size="small">
            返回
          </fx-button>
        </div>
      </template>
      <template #right>
        <div class="exp-navBar-right">
          <fx-button type="primary" icon="MenuOutlined" size="small">
            菜单
          </fx-button>
        </div>
      </template>
    </fx-nav-bar>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast, showDialog, NavBarOnButtonClick } from '@/index'

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
