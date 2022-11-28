import { onMounted, reactive, onBeforeUnmount, type Ref } from 'vue'
import safeAreaInsets from 'safe-area-insets'

export interface SafeAreaInsets {
  support: boolean
  top: number
  left: number
  right: number
  bottom: number
}

export function useSafeAreaInsets(enable: Ref<boolean>) {
  const data = reactive<SafeAreaInsets>({
    support: safeAreaInsets.support,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  })

  function updateSafeAreaInsets() {
    if (enable) {
      data.top = safeAreaInsets.top
      data.left = safeAreaInsets.left
      data.right = safeAreaInsets.right
      data.bottom = safeAreaInsets.bottom
    } else {
      data.top = 0
      data.left = 0
      data.right = 0
      data.bottom = 0
    }
  }

  onMounted(() => safeAreaInsets.onChange(updateSafeAreaInsets))

  onBeforeUnmount(() => safeAreaInsets.offChange(updateSafeAreaInsets))

  return { safeAreaInsets: data }
}
