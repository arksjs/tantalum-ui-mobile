<template>
  <div class="ak-image-uploader" v-bind="$attrs">
    <Order
      :columnNumber="columnNumber"
      :deletable="deletable"
      :items="orderItems"
      @delete="onDelete"
      @update:items="onUpdateOrderItems"
    >
      <template #default="{ id }">
        <div
          :class="updateButtonClasses"
          v-if="id === addButtonID"
          @contextmenu.prevent="noop"
        >
          <Icon :icon="PlusOutlined" />
          <input
            type="file"
            name=""
            :accept="accept2"
            :disabled="disabled"
            :multiple="multiple"
            @change="onAddFiles"
          />
        </div>
        <UploaderItem
          v-else
          :item="getFileItemById(id)"
          :imageMode="imageMode"
          :onClick="onItemClick"
        />
      </template>
    </Order>
    <input type="hidden" :name="name" :value="formValue" ref="input" />
  </div>
  <ImagePreview
    class="ak-image-uploader_preview"
    :urls="formValue"
    v-model:visible="previewVisible"
    v-model:current="previewCurrent"
    showClose
  >
    <template #close="{ activeIndex }">
      <AkButton
        @click.stop="onPreviewDelete(activeIndex)"
        :icon="DeleteOutlined"
        size="large"
        pattern="borderless"
        shape="square"
        :ghost="true"
      ></AkButton>
    </template>
  </ImagePreview>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, ref } from 'vue'
import type { PropType } from 'vue'
import { Button as AkButton } from '../Button'
import { Icon } from '../Icon'
import { Order } from '../Order'
import { ImagePreview } from '../ImagePreview'
import { showDialog } from '../Dialog'
import {
  isPromiseLike,
  isStringArray,
  isSameArray,
  cloneData,
  noop,
  isNumber
} from '../helpers/util'
import { formatFileSize } from '../helpers/digital-conversion'
import { formItemProps } from '../Form/form'
import type { Mode } from '../Image/types'
import { useLocale } from '../ConfigProvider/context'
import type { OrderOnDelete, OrderItem } from '../Order/types'
import type {
  BeforeUpload,
  UploadReady,
  UploadHandlers,
  Accept,
  BeforeUploadReturn,
  FileItem,
  ImageUploaderEmits
} from './types'
import type { PropsToEmits, UniqueID } from '../helpers/types'
import PlusOutlined from '../Icon/icons/PlusOutlined'
import DeleteOutlined from '../Icon/icons/DeleteOutlined'
import { getAccepts, getNewUid, getUploadButtonClasses, urlId } from './util'
import UploaderItem from './ImageUploaderItem.vue'

const isValue = (val: string[]) => isStringArray(val)
const addButtonID = -1

export default defineComponent({
  name: 'ak-image-uploader',
  components: {
    Order,
    Icon,
    ImagePreview,
    AkButton,
    UploaderItem
  },
  props: {
    ...formItemProps,
    modelValue: {
      type: Array as PropType<string[]>,
      validator: isValue,
      default: () => [] as string[]
    },
    // 允许上传的图片类型
    accept: {
      type: [String, Array] as PropType<Accept | Accept[]>,
      validator: (val: Accept | Accept[]) => getAccepts(val).length > 0,
      default: 'all'
    },
    // 多少列展示
    columnNumber: {
      type: Number,
      default: 3
    },
    maxCount: {
      type: Number,
      default: 9
    },
    // 点击图片预览全图
    preview: {
      type: Boolean,
      default: true
    },
    // 支持多图片上传
    multiple: {
      type: Boolean,
      default: false
    },
    // 允许删除
    deletable: {
      type: Boolean,
      default: true
    },
    // 图片填充模式
    imageMode: {
      type: String as PropType<Mode>,
      default: 'aspectFill'
    },
    // 上传前处理函数，主要是判断大小，压缩等
    beforeUpload: {
      type: Function as PropType<BeforeUpload>,
      default: () => true
    },
    // 上传函数，在该函数内处理上传过程
    uploadReady: {
      type: Function as PropType<UploadReady>,
      default: () => true
      // required: true
    }
  },
  emits: {
    'update:modelValue': isValue,
    change: isValue,
    delete: payload => payload && isNumber(payload.index)
  } as PropsToEmits<ImageUploaderEmits>,
  setup(props, { emit }) {
    const { locale } = useLocale()
    const orderItems = reactive<OrderItem[]>([])
    const fileItems = ref<Record<number, FileItem>>({})
    const formValue = ref<string[]>([])
    const previewVisible = ref(false)
    const previewCurrent = ref('')

    function onAddFiles(e: Event) {
      const files = (e.target as HTMLInputElement).files || []

      for (let i = 0; i < files.length; i++) {
        addFile(files[i])
      }
    }

    function addFile(file: File) {
      beforePromise(
        props.beforeUpload(file, {
          formatSize: formatFileSize
        })
      ).then(res => {
        if (res instanceof File) {
          file = res
          res = true
        }

        res && uploadFile(file)
      })
    }

    function uploadFile(file: File) {
      if (orderItems.length - (hasUploadButton() ? 1 : 0) >= props.maxCount) {
        return
      }

      const fileItem: FileItem = {
        id: getNewUid(),
        status: 'reading',
        message: 'Reading'
      }

      fileItems.value[fileItem.id] = fileItem

      orderItems.splice(orderItems.length - (hasUploadButton() ? 1 : 0), 0, {
        id: fileItem.id
      })

      updateUploadButton()

      props.uploadReady(file, createUploadHandlers(fileItem.id))
    }

    function beforePromise(res: BeforeUploadReturn) {
      if (res == null) {
        return Promise.resolve(true)
      } else if (typeof res === 'boolean') {
        return Promise.resolve(res)
      } else if (isPromiseLike(res)) {
        return (res as Promise<boolean | File>)
          .then(res => {
            if (res instanceof File) {
              return res
            }

            return !!res
          })
          .catch(() => {
            return false
          })
      }

      return Promise.resolve(res instanceof File ? res : true)
    }

    function getFileItemById(id: UniqueID) {
      return fileItems.value[id as number] || null
    }

    /**
     * 是否完成上传
     */
    function isDone(fileItem: FileItem) {
      return fileItem.status === 'failed' || fileItem.status === 'uploaded'
    }

    function createUploadHandlers(id: number): UploadHandlers {
      return {
        getUploadId: () => id,
        formatSize: formatFileSize,
        setUploading(message) {
          const fileItem = getFileItemById(id)

          if (fileItem && !isDone(fileItem)) {
            fileItem.status = 'uploading'
            fileItem.message = message || 'Uploading'
          }
        },
        fail(e) {
          const fileItem = getFileItemById(id)

          if (fileItem && !isDone(fileItem)) {
            if (e instanceof Error) {
              fileItem.message = e.message
            } else if (e) {
              fileItem.message = e.toString()
            } else {
              fileItem.message = 'Failed'
            }
            fileItem.status = 'failed'
          }
        },
        success(url) {
          const fileItem = getFileItemById(id)

          if (fileItem && !isDone(fileItem)) {
            fileItem.url = url
            fileItem.status = 'uploaded'
            fileItem.message = 'Uploaded'
            urlId(url, id)

            updateValue()
          }
        }
      }
    }

    function updateValue() {
      const newVal: string[] = []

      orderItems.forEach(({ id }) => {
        if (id === addButtonID) {
          // 忽略上传按钮
          return
        }

        const fileItem = getFileItemById(id)

        if (fileItem.status === 'uploaded' && fileItem.url) {
          newVal.push(fileItem.url)
        }
      })

      if (!isSameArray(newVal, formValue.value)) {
        formValue.value = newVal

        emit('update:modelValue', cloneData(newVal))
        emit('change', cloneData(newVal))
      }
    }

    /**
     * 是否存在添加按钮
     */
    function hasUploadButton() {
      if (orderItems.length === 0) {
        return false
      }

      return orderItems[orderItems.length - 1].id === addButtonID
    }

    function updateUploadButton() {
      if (hasUploadButton()) {
        if (orderItems.length > props.maxCount) {
          // 超过要删掉按钮
          orderItems.splice(orderItems.length - 1, 1)
        }
      } else {
        if (orderItems.length < props.maxCount) {
          orderItems.push({
            id: addButtonID,
            draggable: false
          })
        }
      }
    }

    function isSameUploadedList() {
      const value = cloneData(props.modelValue)

      for (let i = 0; i < orderItems.length; i++) {
        const fileItem = orderItems[i] as FileItem

        if (fileItem.status === 'uploaded') {
          if (value.length === 0) {
            // orderItems 还有 value 没了
            return false
          }

          if (fileItem.url === value[0]) {
            value.shift()
          } else {
            return false
          }
        }
      }

      return value.length === 0
    }

    function updateUploadedList() {
      if (isSameUploadedList()) {
        return
      }

      const cache: FileItem[] = []

      orderItems.forEach(v => {
        if ((v as FileItem).status === 'uploading') {
          cache.push(v as FileItem)
        }
      })

      orderItems.splice(0, Infinity)
      formValue.value = []

      props.modelValue.forEach(url => {
        const fileItem: FileItem = {
          id: urlId(url),
          status: 'uploaded',
          url,
          message: 'Uploaded'
        }

        fileItems.value[fileItem.id] = fileItem
        orderItems.push({ id: fileItem.id })

        formValue.value.push(url)
      })

      cache.length > 0 && orderItems.push(...cache)

      updateUploadButton()
    }

    function onUpdateOrderItems(newOrderItems: OrderItem[]) {
      orderItems.splice(0, Infinity, ...newOrderItems)

      updateUploadButton()

      updateValue()
    }

    function onItemClick(fileItem: FileItem) {
      if (fileItem) {
        if (fileItem.status === 'uploaded') {
          if (props.preview) {
            previewCurrent.value = fileItem.url as string
            previewVisible.value = true
          }
        } else if (fileItem.status === 'failed') {
          for (let i = 0; i < orderItems.length; i++) {
            if (orderItems[i].id === fileItem.id) {
              orderItems.splice(i, 1)
              updateUploadButton()
            }
          }
        }
      }
    }

    const onDelete: OrderOnDelete = ({ index, item }) => {
      const fileItem = getFileItemById(item.id)

      fileItem &&
        emit('delete', {
          index,
          item: {
            id: fileItem.id,
            status: fileItem.status,
            url: fileItem.url || null
          }
        })
    }

    function onPreviewDelete(activeIndex: number) {
      const current = formValue.value[activeIndex]

      for (let i = 0, j = 0; i < orderItems.length; i++) {
        const optionItem = orderItems[i] as FileItem

        if (optionItem.status === 'uploaded') {
          if (j === activeIndex && optionItem.url === current) {
            showDialog({
              content: locale.value.imageUploaderDeleteContent,
              confirmText: locale.value.imageUploaderDeleteConfirmText
            }).then(res => {
              if (res.confirm) {
                orderItems.splice(i, 1)
                updateUploadButton()
                updateValue()

                if (formValue.value.length === 0) {
                  previewVisible.value = false
                }
              }
            })

            break
          }

          j++
        }
      }
    }

    const accept2 = computed(() => getAccepts(props.accept).join(', '))

    const updateButtonClasses = computed(() =>
      getUploadButtonClasses(props.disabled)
    )

    watch(() => props.modelValue, updateUploadedList, {
      immediate: true,
      deep: true
    })

    watch(() => props.maxCount, updateUploadButton)

    updateUploadButton()

    return {
      formValue,
      orderItems,
      accept2,
      onAddFiles,
      onUpdateOrderItems,
      onItemClick,
      onDelete,
      previewVisible,
      previewCurrent,
      onPreviewDelete,
      noop,
      PlusOutlined,
      DeleteOutlined,
      updateButtonClasses,
      getFileItemById,
      addButtonID
    }
  }
})
</script>
