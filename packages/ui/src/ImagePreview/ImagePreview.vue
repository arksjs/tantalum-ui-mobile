<template>
  <Modal
    class="ta-image-preview"
    :visible="visible"
    :showClose="false"
    :maskClosable="maskClosable"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <Swiper
      v-if="swiperInit"
      v-model:activeIndex="activeIndex"
      :navigationButtons="navigationButtons"
      @click="onPreviewClick"
      @activeIndexChange="onSwiperChange"
      @animated="onSwiperAnimated"
    >
      <SwiperItem v-for="(item, index) in images" :key="index">
        <div
          class="ta-image-preview_image-container"
          @touchstart="onImageTouchStart($event, item)"
          @touchmove="onImageTouchMove($event, item)"
          @touchend="onImageTouchEnd($event, item)"
        >
          <TaImage
            :src="item.src"
            :mode="'aspectFit'"
            @load="onImageLoad"
            :class="{ animated: zoomAnimated }"
            :style="getImageStyles(item)"
          />
        </div>
      </SwiperItem>
    </Swiper>
    <div class="ta-image-preview_pagination">{{ activeIndex + 1 }} / {{ urls.length }}</div>
    <div class="ta-image-preview_close">
      <slot name="close" :activeIndex="activeIndex">
        <TaButton
          v-if="showClose"
          @click.stop="onCloseClick"
          :icon="CloseOutlined"
          size="large"
          pattern="borderless"
          shape="square"
          :ghost="true"
        />
      </slot>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, type PropType } from 'vue'
import { Modal } from '../Modal'
import { Button as TaButton } from '../Button'
import { Image as TaImage } from '../Image'
import { Swiper, SwiperItem } from '../Swiper'
import {
  isStringArray,
  rangeNumber,
  isString,
  isNumber,
  type PropsToEmits,
  type EmptyObject,
  getNumber
} from '../helpers'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/props'
import type { ImageOnLoad } from '../Image/types'
import type { SwiperOnActiveIndexChange } from '../Swiper/types'
import type { ImageObject, DistanceOptions, ImagePreviewEmits } from './types'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import { getDistance, mergeLoadedData, getImageStyles } from './util'
import type { OnVisibleStateChange } from '../popup/types'

type ImageCoordsImage = {
  width: number
  height: number
}

type ImageCoordsScroll = {
  top: number
  left: number
  maxTop: number
  maxLeft: number
}

interface ImageCoords {
  start: {
    pageX: number
    pageY: number
  }
  start2?: {
    pageX: number
    pageY: number
  }
  image?: ImageCoordsImage
  scroll?: ImageCoordsScroll
  inZoom?: boolean
  inZoomEnd?: boolean
  hasZoom?: boolean
  inMove?: boolean
}

export default defineComponent({
  name: 'ta-image-preview',
  components: { TaButton, Swiper, SwiperItem, TaImage, Modal },
  props: {
    ...popupProps,
    urls: {
      type: Array as PropType<string[]>,
      validator: (val: string) => isStringArray(val),
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    showClose: {
      type: Boolean,
      default: false
    },
    navigationButtons: {
      type: Boolean,
      default: false
    },
    imageHighRendering: {
      type: Boolean,
      default: true
    },
    // 放大倍数
    magnification: {
      type: [Number, String],
      default: 1
    }
  },
  emits: {
    ...popupEmits,
    'update:modelValue': current => isString(current),
    change: (current, index, fromIndex) =>
      isString(current) && isNumber(index) && isNumber(fromIndex)
  } as PropsToEmits<ImagePreviewEmits>,
  setup(props, ctx) {
    const { emit } = ctx
    const activeIndex = ref(0)
    const images = reactive<ImageObject[]>([])
    const zoomAnimated = ref(false)
    const swiperInit = ref(false)

    const popup = usePopupExtend<EmptyObject>(ctx)

    let coords: ImageCoords | null

    function onImageTouchStart(e: TouchEvent, item: ImageObject) {
      zoomAnimated.value = false

      if (e.touches.length >= 2) {
        e.preventDefault()
        e.stopPropagation()

        coords = {
          start: {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY
          },
          start2: {
            pageX: e.touches[1].pageX,
            pageY: e.touches[1].pageY
          },
          image: {
            width: item.width,
            height: item.height
          },
          inZoom: true
        }
      } else {
        const { clientWidth, clientHeight } = document.documentElement

        if (item.width <= clientWidth && item.height <= clientHeight) {
          // 图片小于屏幕，不劫持滑动操作
        } else {
          coords = {
            start: {
              pageX: e.touches[0].pageX,
              pageY: e.touches[0].pageY
            },
            scroll: {
              top: (item.height - clientHeight) / 2 - item.offsetTop,
              left: (item.width - clientWidth) / 2 - item.offsetLeft,
              maxTop: item.height - clientHeight,
              maxLeft: item.width - clientWidth
            }
          }
        }
      }
    }

    function onImageTouchMove(e: TouchEvent, item: ImageObject) {
      if (!coords) {
        return
      }

      if (coords.inZoom) {
        if (!coords.inZoomEnd) {
          coords.hasZoom = true
          const scale =
            getDistance(e.touches[0], e.touches[1]) /
            getDistance(coords.start, coords.start2 as DistanceOptions)

          item.width = (coords.image as ImageCoordsImage).width * scale
          item.height = (coords.image as ImageCoordsImage).height * scale
        } else {
          // 放开一只手指就不执行缩放操作
        }
        e.preventDefault()
        e.stopPropagation()
      } else {
        const touch = e.touches[0]
        const scroll = coords.scroll as ImageCoordsScroll

        const offsetX = coords.start.pageX - touch.pageX
        const offsetY = coords.start.pageY - touch.pageY

        if (!coords.inMove) {
          const verticalMove = Math.abs(offsetY) > Math.abs(offsetX)

          if (
            (verticalMove && offsetY > 0 && scroll.top < scroll.maxTop) ||
            (verticalMove && offsetY < 0 && scroll.top > 0) ||
            (!verticalMove && offsetX > 0 && scroll.left < scroll.maxLeft) ||
            (!verticalMove && offsetX < 0 && scroll.left > 0)
          ) {
            coords.inMove = true
          }
        }

        if (coords.inMove) {
          const { offsetTop, offsetLeft } = getUpdateOffset(
            {
              top: Math.max(0, Math.min(scroll.maxTop, scroll.top + offsetY)),
              left: Math.max(0, Math.min(scroll.maxLeft, scroll.left + offsetX)),
              isScrollValue: true
            },
            item
          )

          item.offsetTop = offsetTop
          item.offsetLeft = offsetLeft

          e.preventDefault()
          e.stopPropagation()
        } else {
          coords = null
        }
      }
    }

    function onImageTouchEnd(e: TouchEvent, item: ImageObject) {
      if (!coords) {
        return
      }

      if (coords.hasZoom) {
        e.preventDefault()
        e.stopPropagation()

        zoomAnimated.value = true
        const magnification = getNumber(props.magnification, 1)
        const maxWidth = item.naturalWidth * magnification
        const maxHeight = item.naturalHeight * magnification
        if (item.width < item.initialWidth) {
          item.width = item.initialWidth
        } else if (item.width > maxWidth) {
          item.width = maxWidth
        }
        if (item.height < item.initialHeight) {
          item.height = item.initialHeight
        } else if (item.height > maxHeight) {
          item.height = maxHeight
        }

        const { offsetTop, offsetLeft } = getUpdateOffset(
          {
            top: item.offsetTop,
            left: item.offsetLeft,
            isScrollValue: false
          },
          item
        )
        item.offsetTop = offsetTop
        item.offsetLeft = offsetLeft
      } else if (coords.inMove) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (e.touches.length > 0) {
        // 放开一只手指
        coords.inZoomEnd = true
      } else {
        // 放开两只手指
        coords = null
      }
    }

    function getUpdateOffset(
      { top, left, isScrollValue }: { top: number; left: number; isScrollValue: boolean },
      item: ImageObject
    ) {
      const { clientHeight, clientWidth } = document.documentElement

      let offsetTop: number
      let offsetLeft: number

      if (item.height <= clientHeight) {
        offsetTop = 0
      } else {
        const diff = (item.height - clientHeight) / 2
        offsetTop = rangeNumber(isScrollValue ? diff - top : top, -diff, diff)
      }

      if (item.width <= clientWidth) {
        offsetLeft = 0
      } else {
        const diff = (item.width - clientWidth) / 2

        offsetLeft = rangeNumber(isScrollValue ? diff - left : left, -diff, diff)
      }

      return {
        offsetTop,
        offsetLeft
      }
    }

    function updateCurrent(val: string) {
      let hasUrl = false

      for (let i = 0, len = images.length; i < len; i++) {
        if (images[i].src === val) {
          if (activeIndex.value !== i) {
            activeIndex.value = i
          }
          hasUrl = true
          break
        }
      }

      if (!hasUrl && images[0]) {
        activeIndex.value = 0
        emit('update:modelValue', images[0].src)
      }
    }

    /**
     * 重置图片为初始大小
     * @param item ImageObject
     */
    function resetImageSize(item: ImageObject) {
      item.width = item.initialWidth
      item.height = item.initialHeight
      item.offsetTop = 0
      item.offsetLeft = 0
    }

    function onSwiperAnimated() {
      images.forEach((item, index) => {
        if (index !== activeIndex.value) {
          // 切走的图片恢复原有大小
          resetImageSize(item)
        }
      })
    }

    const onSwiperChange: SwiperOnActiveIndexChange = (index, fromIndex) => {
      const current = props.urls[index]

      emit('update:modelValue', current)

      emit('change', current, index, fromIndex)
    }

    function onPreviewClick() {
      props.maskClosable && popup.customCancel('previewClick')
    }

    const onVisibleStateChange: OnVisibleStateChange = res => {
      popup.onVisibleStateChange(res)

      if (res.state === 'hidden') {
        images.forEach(item => {
          // 关闭时的图片恢复原有大小
          resetImageSize(item)
        })
      }
    }

    const onImageLoad: ImageOnLoad = res => {
      if (props.imageHighRendering) {
        const dpr = window.devicePixelRatio || 1
        res.width = res.width / dpr
        res.height = res.height / dpr
      }

      for (let i = 0; i < images.length; i++) {
        const image = images[i]

        if (image.src === res.src) {
          images[i] = mergeLoadedData(image, res)
        }
      }
    }

    watch(
      () => props.urls,
      () => {
        const map: Record<string, ImageObject> = {}

        images.forEach(v => {
          map[v.src] = v
        })

        images.length = 0

        props.urls.forEach(url => {
          if (map[url]) {
            images.push(map[url])
          } else {
            images.push({
              src: url,
              width: 0,
              height: 0,
              initialWidth: 0,
              initialHeight: 0,
              naturalWidth: 0,
              naturalHeight: 0,
              offsetTop: 0,
              offsetLeft: 0,
              loaded: false
            })
          }
        })

        // updateCurrent(props.current)
      },
      {
        immediate: true,
        deep: true
      }
    )

    watch(
      () => props.modelValue,
      val => updateCurrent(val),
      {
        immediate: true
      }
    )

    watch(popup.isShow, () => {
      swiperInit.value = true
    })

    return {
      ...popup,
      swiperInit,
      activeIndex,
      images,
      zoomAnimated,
      updateCurrent,
      onImageTouchStart,
      onImageTouchMove,
      onImageTouchEnd,
      onSwiperAnimated,
      onSwiperChange,
      onPreviewClick,
      onImageLoad,
      CloseOutlined,
      getImageStyles,
      onVisibleStateChange
    }
  }
})
</script>
