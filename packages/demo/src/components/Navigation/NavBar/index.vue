<template>
  <ak-group title="基础用法">
    <ak-nav-bar title="标题" />
  </ak-group>
  <ak-group title="显示返回按钮">
    <ak-nav-bar title="标题" showBack />
  </ak-group>
  <ak-group title="展示首页按钮">
    <ak-nav-bar title="标题" showBack showHome />
  </ak-group>
  <ak-group title="展示右侧按钮">
    <ak-nav-bar
      title="标题"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
  </ak-group>
  <ak-group title="按钮带文本">
    <ak-nav-bar
      title="标题"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
    <ak-nav-bar
      title="标题"
      showBack
      :iconOnly="false"
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    />
  </ak-group>
  <ak-group title="固定顶部(配合 fixed 组件)">
    <div class="exp-navBar-fixed">上下滑动观察最顶部的导航</div>
  </ak-group>
  <ak-group title="事件监听">
    <ak-nav-bar
      title="标题双击"
      showBack
      showHome
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
      @backClick="showToast('返回按钮点击')"
      @homeClick="showToast('首页按钮点击')"
      @titleDbclick="showToast('标题双击')"
      @rightButtonClick="onRightButtonClick"
    >
    </ak-nav-bar>
  </ak-group>
  <ak-group title="Slot left / right">
    <ak-nav-bar
      title="标题"
      :rightButtons="[{ icon: 'MenuOutlined', text: '菜单' }]"
    >
      <template #left>
        <div class="exp-navBar-left">Left Slot</div>
      </template>
    </ak-nav-bar>
    <ak-nav-bar title="标题" showBack showHome>
      <template #right>
        <div class="exp-navBar-right">Right Slot</div>
      </template>
    </ak-nav-bar>
    <ak-nav-bar title="标题" showBack showHome>
      <template #left>
        <div class="exp-navBar-left">
          <ak-button type="primary" icon="LeftOutlined" size="small">
            返回
          </ak-button>
        </div>
      </template>
      <template #right>
        <div class="exp-navBar-right">
          <ak-button type="primary" icon="MenuOutlined" size="small">
            菜单
          </ak-button>
        </div>
      </template>
    </ak-nav-bar>
  </ak-group>
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
