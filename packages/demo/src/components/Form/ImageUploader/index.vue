<template>
  <ak-group title="基础用法">
    <ak-image-uploader
      :uploadReady="hookUploadOrFail"
      @change="onChange"
      @delete="onDelete"
      :accept="['png', 'jpg']"
      :maxCount="9"
      v-model="imageList"
      multiple
    />
  </ak-group>
  <ak-group title="上传前置处理">
    <ak-image-uploader
      :beforeUpload="hookBeforeUpload"
      :uploadReady="hookUpload"
      :accept="['png', 'jpg']"
      :maxCount="9"
      v-model="imageList3"
      multiple
    />
  </ak-group>
  <ak-group title="禁用删除">
    <ak-image-uploader
      v-model="imageList2"
      :deletable="false"
      :uploadReady="hookUpload"
    />
  </ak-group>
  <ak-group title="禁用上传">
    <ak-image-uploader disabled />
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  type ImageUploaderBeforeUpload,
  type ImageUploaderOnDelete,
  type ImageUploaderUploadReady,
  showToast
} from '@/index'

export default defineComponent({
  name: 'ExpImageUploader',
  setup() {
    const imageList = reactive<string[]>([])
    const imageList2 = reactive<string[]>([
      'https://cdn.fox2.cn/vfox/empty/default@2x.png',
      'https://cdn.fox2.cn/vfox/empty/error@2x.png'
    ])
    const imageList3 = reactive<string[]>([])

    const hookBeforeUpload: ImageUploaderBeforeUpload = (
      file,
      { formatSize }
    ) => {
      if (file.size > 1024 * 1024) {
        showToast(`上传图片不能大于 ${formatSize(1024 * 1024)}`)
        return false
      }
      showToast(`上传图片大小为 ${formatSize(file.size)}`)
    }

    const hookUploadOrFail: ImageUploaderUploadReady = (file, handlers) => {
      handlers.setUploading('上传中...')

      setTimeout(() => {
        getDataUrl(file).then(url => {
          if (Math.random() > 0.5) {
            handlers.fail('模拟失败')
          } else {
            handlers.success(url)
          }
        })
      }, 2000)
    }

    function getDataUrl(file: File) {
      return new Promise<string>(resolve => {
        const fr = new FileReader()
        fr.onload = function (e) {
          resolve((e.target?.result as string) ?? '')
        }
        fr.readAsDataURL(file)
      })
    }

    const hookUpload: ImageUploaderUploadReady = (file, handlers) => {
      getDataUrl(file).then(url => {
        handlers.success(url)
      })
    }

    const onChange = (res: string[]) => {
      console.log('change', res)
    }

    const onDelete: ImageUploaderOnDelete = res => {
      console.log('delete', res)
    }

    return {
      imageList,
      imageList2,
      imageList3,

      hookBeforeUpload,
      hookUploadOrFail,
      hookUpload,
      onChange,
      onDelete
    }
  }
})
</script>
