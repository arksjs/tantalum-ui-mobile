<template>
  <div
    class="ta-image-uploader_item"
    @contextmenu.prevent="noop"
    @click="onClick(item)"
  >
    <TaImage :src="item.url" :draggable="false" :mode="imageMode" />
    <div
      class="ta-image-uploader_item-status"
      v-if="item.status !== 'uploaded' && item.status !== 'reading'"
    >
      <ActivityIndicator
        v-if="item.status === 'uploading'"
        :size="40"
        color="#ffffff"
      />
      <Icon :icon="DeleteOutlined" v-else-if="item.status === 'failed'" />
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Image as TaImage } from '../Image'
import { Icon } from '../Icon'
import { ActivityIndicator } from '../ActivityIndicator'
import { noop } from '../helpers'
import type { ImageMode } from '../Image/types'
import type { FileItem } from './types'
import DeleteOutlined from '../Icon/icons/DeleteOutlined'

export default defineComponent({
  name: 'ta-image-uploader-item',
  components: { ActivityIndicator, TaImage, Icon },
  props: {
    item: {
      type: Object as PropType<FileItem>,
      required: true
    },
    imageMode: String as PropType<ImageMode>,
    onClick: {
      type: Function as PropType<(item: FileItem) => void>,
      required: true
    }
  },
  setup() {
    return {
      DeleteOutlined,
      noop
    }
  }
})
</script>
