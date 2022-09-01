<template>
  <fx-group title="基础用法">
    <div class="exp-image-flex">
      <fx-row :gutter="[16, 16]">
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
          ></fx-image>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="填充模式">
    <div class="exp-image-flex">
      <fx-row :gutter="[16, 16]">
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="scaleToFill"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">scaleToFill</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="aspectFit"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">aspectFit</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="aspectFill"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">aspectFill</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="widthFix"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">widthFix</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">top</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">bottom</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="left"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">left</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="right"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">right</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top left"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">top left</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="top right"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">top right</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom left"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">bottom left</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            mode="bottom right"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">bottom right</span>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="设置宽高比（设置后高度按比例缩放）">
    <div class="exp-image-flex">
      <fx-row :gutter="[16, 16]" align="bottom">
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
          ></fx-image>
          <span class="exp-image-text">aspect-ratio=1</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1.5"
          ></fx-image>
          <span class="exp-image-text">aspect-ratio=1.5</span>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="0.5"
          ></fx-image>
          <span class="exp-image-text">aspect-ratio=0.5</span>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="加载/加载错误">
    <div class="exp-image-flex">
      <fx-row :gutter="[16, 16]">
        <fx-col :span="8">
          <fx-image class="exp-image-image" :aspect-ratio="1"></fx-image>
        </fx-col>
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            src="error"
            :aspect-ratio="1"
          ></fx-image>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
  <fx-group title="懒加载">
    <div class="exp-image-flex">
      <fx-row :gutter="[16, 16]">
        <fx-col :span="8">
          <fx-image
            class="exp-image-image"
            :src="imageUrl"
            :aspect-ratio="1"
            lazy-load
          ></fx-image>
        </fx-col>
      </fx-row>
    </div>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpImage',
  data() {
    return { imageUrl: 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg' }
  }
})
</script>
