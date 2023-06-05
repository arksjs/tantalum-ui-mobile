<template>
  <div :class="classes" ref="root">
    <span
      v-if="!autoHeight && aspectRatio != null"
      class="ta-image_ratio"
      :style="ratioStyles"
    ></span>
    <i class="ta-image_loading" v-if="loading">
      <Icon :icon="loadingIcon" :size="iconSize" />
    </i>
    <i class="ta-image_error" v-if="error">
      <Icon :icon="errorIcon" :size="iconSize" />
    </i>
    <img v-if="currentSrc" :class="imgClasses" :src="currentSrc" @dragstart="onDrag" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  onBeforeUnmount,
  computed,
  shallowRef,
  type PropType
} from 'vue'
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
  iconValidator,
  isString,
  type OnError,
  type PropsToEmits
} from '../helpers'
import type { ImageEmits, LoadedResource, Mode } from './types'
import ImageOutlined from '../Icon/icons/ImageOutlined'
import ImageBreakOutlined from '../Icon/icons/ImageBreakOutlined'
import type { IconData } from '../Icon/types'
import { getClasses, getImgClasses, getRatioStyles, MODE_NAMES } from './util'
import { useException } from '../hooks'

export default defineComponent({
  name: 'ta-image',
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
      type: [Number, String]
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
      type: [Number, String]
    },
    // 自动计算高度
    autoHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    load: payload => payload && payload.width > 0 && payload.height > 0 && isString(payload.src),
    error: emitErrorValidator
  } as PropsToEmits<ImageEmits>,
  setup(props, { emit }) {
    const { createException } = useException()
    const loading = ref(true)
    const error = ref(false)
    const root = shallowRef<HTMLElement | null>(null)
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

      emit('error', createException(e))
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

    const classes = computed(() => getClasses(props.autoHeight))
    const imgClasses = computed(() => getImgClasses(props.mode, props.autoHeight))
    const ratioStyles = computed(() => getRatioStyles(props.aspectRatio))

    return {
      currentSrc,
      classes,
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
