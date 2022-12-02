import {
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  watch,
  type Ref
} from 'vue'

interface UseOptions {
  fixed: Ref<boolean>
  disableFixed: boolean
  root: Ref<HTMLElement | null>
  inner: Ref<HTMLElement | null>
}

export function useFixed({ fixed, root, inner, disableFixed }: UseOptions) {
  onActivated(() => fixed.value && toBody())

  onDeactivated(recover)

  onMounted(() => fixed.value && toBody())

  onBeforeUnmount(recover)

  function toBody() {
    // 针对在tranform下 fixed 会失效的问题
    disableFixed &&
      inner.value &&
      document.body.append(inner.value as HTMLElement)
  }

  function recover() {
    // 收回挂回body的元素
    disableFixed &&
      (root.value as HTMLElement).append(inner.value as HTMLElement)
  }

  watch(fixed, val => {
    val ? toBody() : recover()
  })

  return {
    toBody,
    backRoot: recover
  }
}
