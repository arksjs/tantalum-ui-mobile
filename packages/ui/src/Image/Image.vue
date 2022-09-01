<template>
  <div class="fx-image" ref="root">
    <span
      v-if="aspectRatio != null && aspectRatio > 0"
      class="fx-image_ratio"
      :style="ratioStyles"
    ></span>
    <i class="fx-image_loading" v-if="loading">
      <Icon :icon="loadingIcon" :size="iconSize" />
    </i>
    <i class="fx-image_error" v-if="error">
      <Icon :icon="errorIcon" :size="iconSize" />
    </i>
    <img
      v-if="currentSrc"
      :class="imgClasses"
      :src="currentSrc"
      @dragstart="onDrag"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  onBeforeUnmount,
  computed
} from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import {
  addLazyQueue,
  loadNow,
  removeComponentFromLazy,
  withCheckInView
} from '../Image/load-image'
import {
  createEnumsValidator,
  emitErrorValidator,
  iconValidator
} from '../helpers/validator'
import type { OnError, PropsToEmits } from '../helpers/types'
import type { ImageEmits, LoadedResource, Mode } from './types'
import ImageOutlined from '../Icon/icons/ImageOutlined'
import ImageBreakOutlined from '../Icon/icons/ImageBreakOutlined'
import type { IconData } from '../Icon/types'
import { getImgClasses, getRatioStyles, MODE_NAMES } from './util'
import { isString } from '../helpers/util'

export default defineComponent({
  name: 'fx-image',
  components: { Icon },
  props: {
    // 图片资源地址
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String as PropType<Mode>,
      validator: createEnumsValidator(MODE_NAMES)
    },
    // 图片懒加载，在即将进入一定范围(preload=1.3)时才开始加载
    lazyLoad: {
      type: Boolean,
      default: false
    },
    // 自适应正方形
    aspectRatio: {
      type: Number,
      default: null
    },
    // 允许拖拽
    draggable: {
      type: Boolean,
      default: true
    },
    // 加载图标名称
    loadingIcon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator,
      default: ImageOutlined
    },
    // 加载失败图标名称
    errorIcon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator,
      default: ImageBreakOutlined
    },
    iconSize: {
      type: Number,
      default: null
    }
  },
  emits: {
    load: payload =>
      payload &&
      payload.width > 0 &&
      payload.height > 0 &&
      isString(payload.src),
    error: emitErrorValidator
  } as PropsToEmits<ImageEmits>,
  setup(props, { emit }) {
    const loading = ref(true)
    const error = ref(false)
    const root = ref<HTMLElement>()
    const currentSrc = ref<string | null>(null)
    const uid = Symbol()

    function load(src: string) {
      ;(props.lazyLoad ? addLazyQueue : loadNow)({
        src,
        uid,
        checkInView: withCheckInView(root.value as HTMLElement),
        onLoad,
        onError
      })
    }

    const onLoad = (res: LoadedResource) => {
      if (res.src === props.src) {
        // 防止多次变更图片导致的图片不正确
        loading.value = false
        error.value = false
        currentSrc.value = res.src
      }

      emit('load', {
        width: res.naturalWidth,
        height: res.naturalHeight,
        src: res.src
      })
    }

    const onError: OnError = e => {
      loading.value = false
      error.value = true

      emit('error', e)
    }

    function onDrag(e: Event) {
      if (!props.draggable) {
        e.preventDefault()
      }
    }

    onMounted(() => props.src && load(props.src))

    onBeforeUnmount(() => removeComponentFromLazy(uid))

    watch(
      () => props.src,
      val => load(val)
    )

    const imgClasses = computed(() => getImgClasses(props.mode))
    const ratioStyles = computed(() => getRatioStyles(props.aspectRatio))

    return {
      currentSrc,
      imgClasses,
      ratioStyles,
      loading,
      error,
      root,
      onDrag
    }
  }
})
</script>
