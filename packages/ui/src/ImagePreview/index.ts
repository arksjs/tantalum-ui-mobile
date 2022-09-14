import ImagePreview from './ImagePreview.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { EmptyObject } from '../helpers/types'
import type { PopupSuccessConfirmArgs } from '../popup/types'

const showImagePreview = createShowPopup<
  {
    urls: string[]
    content?: string
    showClose?: boolean
    navigationButtons?: boolean
    imageHighRendering?: boolean
  },
  PopupSuccessConfirmArgs<EmptyObject>
>({
  apiName: 'showImagePreview',
  component: ImagePreview,
  createHook: createConfirmHook
})

export { ImagePreview, showImagePreview }
export default ImagePreview
