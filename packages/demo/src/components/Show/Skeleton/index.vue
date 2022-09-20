<template>
  <ak-group title="基础用法">
    <div class="exp-skeleton-panel">
      <ak-skeleton />
    </div>
  </ak-group>
  <ak-group title="显示头像">
    <div class="exp-skeleton-panel">
      <ak-skeleton avatar />
    </div>
  </ak-group>
  <ak-group title="带动画">
    <div class="exp-skeleton-panel">
      <ak-skeleton avatar :animated="animated" :avatarShape="avatarShape" />
    </div>
  </ak-group>
  <ak-group title="显示子组件">
    <div class="exp-skeleton-panel">
      <div class="exp-skeleton-switch">
        <ak-switch v-model="loadingSwitch" />
      </div>
      <ak-skeleton avatar :loading="!loadingSwitch">
        <div class="exp-skeleton-sub-component">
          <ak-icon icon="HeartFilled" size="32" />
          <h4 class="title">hello World</h4>
          <p class="paragraph">简单不先于复杂，而是在复杂之后。</p>
        </div>
      </ak-skeleton>
    </div>
  </ak-group>
  <ak-group title="自由组合">
    <div class="exp-skeleton-panel">
      <ak-skeleton class="exp-skeleton-custom" :buttonShape="buttonShape">
        <template #layout>
          <ak-skeleton-image />
          <ak-skeleton-title />
          <ak-skeleton-paragraph :row="2" />
          <ak-skeleton-button />
        </template>
      </ak-skeleton>
    </div>
  </ak-group>
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
