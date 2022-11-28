import ImagePreview from './ImagePreview.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { EmptyObject } from '../helpers'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { ShowImagePreviewOptions } from './types'

const showImagePreview = createShowPopup<
  ShowImagePreviewOptions,
  PopupSuccessConfirmArgs<EmptyObject>
>({
  apiName: 'showImagePreview',
  component: ImagePreview,
  createHook: createConfirmHook
})

export { ImagePreview, showImagePreview }
export default ImagePreview
