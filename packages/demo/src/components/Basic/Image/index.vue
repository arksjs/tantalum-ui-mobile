<template>
  <ak-group title="基础用法">
    <div class="exp-image-flex">
      <ak-row :gutter="[16, 16]">
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
            @error="onError"
          ></ak-image>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="填充模式">
    <div class="exp-image-flex">
      <ak-row :gutter="[16, 16]">
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="scaleToFill"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">scaleToFill</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="aspectFit"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">aspectFit</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="aspectFill"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">aspectFill</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="widthFix"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">widthFix</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">top</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">bottom</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="left"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">left</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="right"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">right</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top left"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">top left</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top right"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">top right</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom left"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">bottom left</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom right"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">bottom right</span>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="设置宽高比（设置后高度按比例缩放）">
    <div class="exp-image-flex">
      <ak-row :gutter="[16, 16]" align="bottom">
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
          ></ak-image>
          <span class="exp-image-text">aspect-ratio=1</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1.5"
          ></ak-image>
          <span class="exp-image-text">aspect-ratio=1.5</span>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="0.5"
          ></ak-image>
          <span class="exp-image-text">aspect-ratio=0.5</span>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="加载/加载错误">
    <div class="exp-image-flex">
      <ak-row :gutter="[16, 16]">
        <ak-col :span="8">
          <ak-image class="exp-image-image" :aspect-ratio="1"></ak-image>
        </ak-col>
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            src="error"
            :aspect-ratio="1"
          ></ak-image>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
  <ak-group title="懒加载">
    <div class="exp-image-flex">
      <ak-row :gutter="[16, 16]">
        <ak-col :span="8">
          <ak-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
            lazy-load
          ></ak-image>
        </ak-col>
      </ak-row>
    </div>
  </ak-group>
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
