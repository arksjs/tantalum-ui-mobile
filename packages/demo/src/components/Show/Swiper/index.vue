<template>
  <ak-group title="基础用法">
    <ak-swiper class="exp-swiper-box">
      <ak-swiper-item v-for="(item, index) in swiperList" :key="item">
        <div class="exp-swiper-box-item" :class="{ even: index % 2 == 1 }">
          {{ item }}
        </div>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="显示面板指示点 indicator-dots=true">
    <ak-swiper class="exp-swiper-box" indicator-dots>
      <ak-swiper-item v-for="url in imageUrls" :key="url">
        <ak-image class="exp-swiper-image" :src="url"></ak-image>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="显示切换按钮 navigation-buttons=true">
    <ak-swiper class="exp-swiper-box" navigation-buttons>
      <ak-swiper-item v-for="url in imageUrls" :key="url">
        <ak-image class="exp-swiper-image" :src="url"></ak-image>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="循环展示 initial-circular=true">
    <ak-swiper class="exp-swiper-box" indicator-dots initial-circular>
      <ak-swiper-item v-for="(item, index) in swiperList" :key="item">
        <div class="exp-swiper-box-item" :class="{ even: index % 2 == 1 }">
          {{ item }}
        </div>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="垂直方向 initial-vertical=true">
    <ak-swiper class="exp-swiper-box" indicator-dots initial-vertical>
      <ak-swiper-item v-for="(item, index) in swiperList" :key="item">
        <div class="exp-swiper-box-item" :class="{ even: index % 2 == 1 }">
          {{ item }}
        </div>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="更改指示点颜色">
    <ak-swiper
      class="exp-swiper-box"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.5)"
      indicator-active-color="#ff4d4f"
    >
      <ak-swiper-item v-for="(item, index) in swiperList" :key="item">
        <div class="exp-swiper-box-item" :class="{ even: index % 2 == 1 }">
          {{ item }}
        </div>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="自动轮播（切换时长设置为3000ms）">
    <ak-swiper
      class="exp-swiper-box"
      indicator-dots
      :autoplay="autoplay"
      :interval="3000"
    >
      <ak-swiper-item v-for="url in imageUrls" :key="url">
        <ak-image class="exp-swiper-image" :src="url"></ak-image>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="滑动过程时长（设置为2000ms）">
    <ak-swiper class="exp-swiper-box" indicator-dots :duration="2000">
      <ak-swiper-item v-for="url in imageUrls" :key="url">
        <ak-image class="exp-swiper-image" :src="url"></ak-image>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
  <ak-group title="事件监听（change/animated/click）">
    <ak-swiper
      ref="swiperRef"
      class="exp-swiper-box"
      indicator-dots
      v-model:activeIndex="activeIndex"
      @activeIndexChange="onChange"
      @animated="onAnimated"
      @click="showToast(`click 触发`)"
    >
      <ak-swiper-item v-for="(item, index) in swiperList" :key="item">
        <div class="exp-swiper-box-item" :class="{ even: index % 2 == 1 }">
          {{ item }}
        </div>
      </ak-swiper-item>
    </ak-swiper>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  showToast,
  type SwiperOnAnimated,
  type SwiperOnActiveIndexChange,
  type SwiperRef
} from '@/index'

export default defineComponent({
  name: 'ExpSwiper',
  setup() {
    const activeIndex = ref(0)
    const swiperRef = ref<SwiperRef | null>(null)

    const onChange: SwiperOnActiveIndexChange = index => {
      showToast(`change 到第 ${index + 1} 张`)
      console.log('change', index)
    }

    const onAnimated: SwiperOnAnimated = index => {
      showToast(`第 ${index + 1} 张 animated`)
      console.log('animated', index)
    }

    onMounted(() => {
      // swiperRef.value?.next()
    })

    return {
      swiperRef,
      swiperList: [1, 2, 3, 4],
      imageUrls: [
        'https://cdn.fox2.cn/vfox/swiper/regular-1.jpg',
        'https://cdn.fox2.cn/vfox/swiper/regular-2.jpg',
        'https://cdn.fox2.cn/vfox/swiper/regular-3.jpg'
      ],
      activeIndex,
      autoplay: true,

      showToast,
      onChange,
      onAnimated
    }
  }
})
</script>
