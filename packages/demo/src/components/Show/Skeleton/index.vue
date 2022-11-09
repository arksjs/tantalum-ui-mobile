<template>
  <ta-group title="基础用法">
    <div class="exp-skeleton-panel">
      <ta-skeleton />
    </div>
  </ta-group>
  <ta-group title="显示头像">
    <div class="exp-skeleton-panel">
      <ta-skeleton avatar />
    </div>
  </ta-group>
  <ta-group title="带动画">
    <div class="exp-skeleton-panel">
      <ta-skeleton avatar :animated="animated" :avatarShape="avatarShape" />
    </div>
  </ta-group>
  <ta-group title="显示子组件">
    <div class="exp-skeleton-panel">
      <div class="exp-skeleton-switch">
        <ta-switch v-model="loadingSwitch" />
      </div>
      <ta-skeleton avatar :loading="!loadingSwitch">
        <div class="exp-skeleton-sub-component">
          <ta-icon icon="HeartFilled" size="32" />
          <h4 class="title">hello World</h4>
          <p class="paragraph">简单不先于复杂，而是在复杂之后。</p>
        </div>
      </ta-skeleton>
    </div>
  </ta-group>
  <ta-group title="自由组合">
    <div class="exp-skeleton-panel">
      <ta-skeleton class="exp-skeleton-custom" :buttonShape="buttonShape">
        <template #layout>
          <ta-skeleton-image />
          <ta-skeleton-title />
          <ta-skeleton-paragraph :row="2" />
          <ta-skeleton-button />
        </template>
      </ta-skeleton>
    </div>
  </ta-group>
</template>

<script lang="ts">
import type { SkeletonAvatarShape, SkeletonButtonShape } from '@/index'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ExpSkeleton',
  setup() {
    const animated = ref(true)
    const avatarShape = ref<SkeletonAvatarShape>('circle')
    const buttonShape = ref<SkeletonButtonShape>('default')
    const loadingSwitch = ref(false)

    return {
      animated,
      avatarShape,
      buttonShape,
      loadingSwitch
    }
  }
})
</script>
