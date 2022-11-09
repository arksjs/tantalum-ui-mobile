<template>
  <ta-group title="基础用法">
    <div class="exp-image-flex">
      <ta-row :gutter="[16, 16]">
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
            @error="onError"
          ></ta-image>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="填充模式">
    <div class="exp-image-flex">
      <ta-row :gutter="[16, 16]">
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="scaleToFill"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">scaleToFill</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="aspectFit"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">aspectFit</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="aspectFill"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">aspectFill</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="widthFix"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">widthFix</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">top</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">bottom</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="left"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">left</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="right"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">right</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top left"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">top left</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top right"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">top right</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom left"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">bottom left</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom right"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">bottom right</span>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="设置宽高比（设置后高度按比例缩放）">
    <div class="exp-image-flex">
      <ta-row :gutter="[16, 16]" align="bottom">
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
          ></ta-image>
          <span class="exp-image-text">aspect-ratio=1</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1.5"
          ></ta-image>
          <span class="exp-image-text">aspect-ratio=1.5</span>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="0.5"
          ></ta-image>
          <span class="exp-image-text">aspect-ratio=0.5</span>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="加载/加载错误">
    <div class="exp-image-flex">
      <ta-row :gutter="[16, 16]">
        <ta-col :span="8">
          <ta-image class="exp-image-image" :aspect-ratio="1"></ta-image>
        </ta-col>
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            src="error"
            :aspect-ratio="1"
          ></ta-image>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
  <ta-group title="懒加载">
    <div class="exp-image-flex">
      <ta-row :gutter="[16, 16]">
        <ta-col :span="8">
          <ta-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
            lazy-load
          ></ta-image>
        </ta-col>
      </ta-row>
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpImage',
  setup() {
    function onError(e: Error) {
      console.error(e)
    }

    return {
      onError,
      imageUrl: 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg'
    }
  }
})
</script>
