import { computed, onMounted, ref, watch, inject, shallowRef } from 'vue'
import type { SetupContext } from 'vue'
import {
  noop,
  addClassName,
  getScrollTop,
  removeClassName,
  popupZIndex,
  type PropsToEmits
} from '../helpers'
import type {
  VisibleState,
  PopupCustomCancel,
  PopupCustomConfirm,
  PopupBridge,
  OnVisibleStateChange,
  OnCancel,
  PopupProps,
  PopupEmits,
  PopupRef
} from './types'
import { useDocumentBlur, type UseEmitFn } from '../hooks'
import { getNewZIndex, getPopupStyles } from './util'

type EmitCallback = (event: keyof PropsToEmits<PopupEmits>, res: any) => void

type UseOptions = Partial<{
  initialForbidScroll: boolean // 初始是否禁用滚动条
  initialFocusFixed: boolean // 初始话固定不跟随，（在不禁用滚动条的场景下使用）
  initialEnableBlurCancel: boolean
  emitCallback: EmitCallback
}>

function useEmitHook(emit: any, emitCallback?: EmitCallback) {
  const apis = inject<PopupBridge>('taApis', {})

  const emitHook: UseEmitFn<PropsToEmits<PopupEmits>> = (event, res) => {
    // 增加api的钩子
    emit(event, res)
    emitCallback && emitCallback(event, res)
    apis.in && apis.in(event, res)
  }

  function cancelHook(customCancel: PopupCustomCancel) {
    apis.out && apis.out('customCancel', customCancel)
  }

  return {
    emitHook,
    cancelHook
  }
}

export function usePopup(
  props: PopupProps & {
    showMask?: boolean
  },
  ctx: SetupContext<any>,
  useOptions: UseOptions
) {
  const { emitHook, cancelHook } = useEmitHook(
    ctx.emit,
    useOptions.emitCallback
  )
  // const isParent = inject<boolean>('taPopupExtend', false)

  const isShow = ref(false)
  const zIndex = ref(popupZIndex)
  const visible2 = ref(false)
  const absTop = ref<number | null>(null)
  const position = ref<'absolute' | null>(null)

  let isShowing = false
  let isHiding = false
  let visibleTimer: number

  let enableBlurCancel = !!useOptions.initialEnableBlurCancel
  const focusFixed = !!useOptions.initialFocusFixed

  function setEnableBlurCancel(enable: boolean) {
    enableBlurCancel = enable
  }

  function isShowMask() {
    // 如果有蒙层，则禁止滚动
    return !(props.showMask === false)
  }

  function show() {
    if (isShowing || isShow.value) {
      return
    }

    isHiding = false
    isShowing = true
    // 如果禁止滚动
    if (isShowMask()) {
      addClassName(document.body, 'ta-overflow-hidden')
    } else if (!focusFixed) {
      position.value = 'absolute'
      absTop.value = getScrollTop()
    }
    zIndex.value = getNewZIndex()
    isShow.value = true

    clearTimeout(visibleTimer)
    visibleTimer = window.setTimeout(() => {
      visible2.value = true

      visibleTimer = window.setTimeout(() => {
        isShowing = false
        emitVisibleState('shown')
      }, 210)
    }, 17)

    if (!props.visible) {
      emitHook('update:visible', true)
    }

    emitVisibleState('show')
  }

  function hide() {
    if (isHiding || !isShow.value) {
      return
    }

    isHiding = true
    isShowing = false
    removeClassName(document.body, 'ta-overflow-hidden')
    visible2.value = false

    clearTimeout(visibleTimer)
    visibleTimer = window.setTimeout(() => {
      isShow.value = false
      isHiding = false

      position.value = null
      absTop.value = null
      emitVisibleState('hidden')
    }, 210)

    if (props.visible) {
      emitHook('update:visible', false)
    }

    emitVisibleState('hide')
  }

  function emitVisibleState(state: VisibleState) {
    emitHook('visibleStateChange', {
      state
    })
  }

  function onMaskClick() {
    if (!props.maskClosable) {
      return
    }
    customCancel('maskClick')
  }

  function onCloseClick() {
    customCancel('closeClick', true)
  }

  function onCancelClick() {
    customCancel('cancelClick')
  }

  const customCancel: PopupCustomCancel = (key, focus = false) => {
    if (isShowing && !focus) {
      return
    }
    emitHook('cancel', { source: key })
    hide()
  }

  const customConfirm: PopupCustomConfirm = detail => {
    emitHook('confirm', detail)
    hide()
  }

  useDocumentBlur(() => {
    if (enableBlurCancel && isShow.value) {
      customCancel('blur')
    }
  })

  onMounted(() => {
    // 兼容devtools
    props.visible && show()
  })

  const popupStyles = computed(() =>
    getPopupStyles(zIndex.value, absTop.value, isShow.value)
  )

  const popupClasses = computed(() => [
    'ta-popup',
    { visible: visible2.value, dismask: props.showMask === false }
  ])

  watch(
    () => props.visible,
    val => {
      val ? show() : hide()
    }
  )

  cancelHook(customCancel)

  return {
    isShow,
    visible2,
    zIndex,
    popupClasses,
    popupStyles,
    show,
    hide,
    customConfirm,
    customCancel,
    noop,
    onMaskClick,
    onCloseClick,
    onCancelClick,
    setEnableBlurCancel
  }
}

export function usePopupExtend<T>({ emit }: SetupContext<any>) {
  const popupRef = shallowRef<PopupRef | null>(null)
  const isShow = ref(false)

  const customCancel: PopupCustomCancel = (key, focus = false) => {
    popupRef.value?.customCancel(key, focus)
  }

  const customConfirm: PopupCustomConfirm<T> = detail => {
    popupRef.value?.customConfirm(detail)
  }

  const onVisibleStateChange: OnVisibleStateChange = e => {
    switch (e.state) {
      case 'show':
        isShow.value = true
        break
      case 'hidden':
        isShow.value = false
        break
      default:
        break
    }

    emit('visibleStateChange', e)
  }

  function onCancelClick() {
    customCancel('cancelClick')
  }

  function onCloseClick() {
    customCancel('closeClick', true)
  }

  const onCancel: OnCancel = res => {
    emit('cancel', res)
  }

  function onConfirm(res: T) {
    emit('confirm', res)
  }

  function onUpdateVisible(value: boolean) {
    emit('update:visible', value)
  }

  return {
    isShow,
    popupRef,
    customCancel,
    customConfirm,
    onUpdateVisible,
    onVisibleStateChange,
    onCancelClick,
    onCloseClick,
    onCancel,
    onConfirm
  }
}
