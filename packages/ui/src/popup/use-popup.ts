import { computed, onMounted, ref, watch, inject, shallowRef } from 'vue'
import type { SetupContext } from 'vue'
import { noop } from '../helpers/util'
import { addClassName, getScrollTop, removeClassName } from '../helpers/dom'
import { popupZIndex } from '../helpers/layer'
import type { UseEmitFn } from '../hooks/types'
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
import type { Noop, PropsToEmits } from '../helpers/types'
import { useDocumentBlur } from '../hooks/use-event'
import { getNewZIndex, getPopupStyles } from './util'

type LifeName =
  | 'afterConfirm'
  | 'afterCancel'
  | 'afterShow'
  | 'afterShown'
  | 'afterHide'
  | 'afterHidden'

type UseOptions = Partial<
  Record<LifeName, Noop> & {
    initialForbidScroll: boolean // 初始是否禁用滚动条
    initialFocusFixed: boolean // 初始话固定不跟随，（在不禁用滚动条的场景下使用）
    initialEnableBlurCancel: boolean
  }
>

function useApiHook(emit: any) {
  const apis = inject<PopupBridge>('taApis', {})

  const emitHook: UseEmitFn<PropsToEmits<PopupEmits>> = (event, res) => {
    apis.in ? apis.in(event, res) : emit(event, res)
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
  props: PopupProps,
  ctx: SetupContext<any>,
  useOptions: UseOptions
) {
  const { emitHook, cancelHook } = useApiHook(ctx.emit)
  // const isParent = inject<boolean>('taPopupExtend', false)

  const isShow = ref(false)
  const zIndex = ref(popupZIndex)
  const visible2 = ref(false)
  const absTop = ref<number | null>(null)
  const position = ref<'absolute' | null>(null)

  let isShowing = false
  let isHiding = false
  let visibleTimer: number

  let forbidScroll = !(useOptions.initialForbidScroll === false)
  let enableBlurCancel = !!useOptions.initialEnableBlurCancel
  const focusFixed = !!useOptions.initialFocusFixed

  function setForbidScroll(isForbid: boolean) {
    forbidScroll = isForbid
  }

  function setEnableBlurCancel(enable: boolean) {
    enableBlurCancel = enable
  }

  function doShow(callback: () => void) {
    if (isShowing || isShow.value) {
      return false
    }
    isHiding = false
    isShowing = true

    clearTimeout(visibleTimer)

    // 如果禁止滚动
    if (forbidScroll) {
      addClassName(document.body, 'ta-overflow-hidden')
    } else if (!focusFixed) {
      position.value = 'absolute'
      absTop.value = getScrollTop()
    }

    zIndex.value = getNewZIndex()
    isShow.value = true

    visibleTimer = window.setTimeout(() => {
      visible2.value = true

      visibleTimer = window.setTimeout(() => {
        isShowing = false
        callback()
      }, 210)
    }, 17)

    if (!props.visible) {
      emitHook('update:visible', true)
    }

    return true
  }

  function show() {
    const isSuccess = doShow(() => {
      emitVisibleState('shown')
    })

    if (isSuccess) {
      emitVisibleState('show')
      afterCall('afterShow')
    }
  }

  function _doHide(callback?: () => void) {
    if (isHiding || !isShow.value) {
      return false
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
      callback && typeof callback === 'function' && callback()
    }, 210)

    if (props.visible) {
      emitHook('update:visible', false)
    }

    return true
  }

  function hide(lifeName?: LifeName) {
    const isSuccess = _doHide(() => {
      emitVisibleState('hidden')
      afterCall('afterHidden')
    })

    if (isSuccess) {
      lifeName && afterCall(lifeName)
      emitVisibleState('hide')
    }
  }

  function afterCall(lifeName: LifeName) {
    if (typeof useOptions[lifeName] === 'function') {
      ;(useOptions[lifeName] as () => void)()
    }
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
    hide('afterCancel')
  }

  const customConfirm: PopupCustomConfirm = detail => {
    emitHook('confirm', detail)
    hide('afterConfirm')
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

  const popupClasses = computed(() => ['ta-popup', { visible: visible2.value }])

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
    setEnableBlurCancel,
    setForbidScroll
  }
}

export function usePopupExtend<T>(ctx: SetupContext<any>) {
  const popupRef = shallowRef<PopupRef | null>(null)
  const { emitHook, cancelHook } = useApiHook(ctx.emit)

  const customCancel: PopupCustomCancel = (key, focus = false) => {
    popupRef.value?.customCancel(key, focus)
  }

  const customConfirm: PopupCustomConfirm<T> = detail => {
    popupRef.value?.customConfirm(detail)
  }

  const onVisibleStateChange: OnVisibleStateChange = e => {
    emitHook('visibleStateChange', e)
  }

  function onCancelClick() {
    customCancel('cancelClick')
  }

  const onCancel: OnCancel = res => {
    emitHook('cancel', res)
  }

  function onConfirm(res: T) {
    emitHook('confirm', res)
  }

  function onUpdateVisible(value: boolean) {
    emitHook('update:visible', value)
  }

  // provide('taPopupExtend', true)
  cancelHook(customCancel)

  return {
    popupRef,
    customCancel,
    customConfirm,
    onUpdateVisible,
    onVisibleStateChange,
    onCancelClick,
    onCancel,
    onConfirm
  }
}
