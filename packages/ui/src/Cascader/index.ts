import Cascader from './Cascader.vue'
import CascaderPopup from './CascaderPopup.vue'
import CascaderView from './CascaderView.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { ShowCascaderOptions, CascaderDetail } from './types'

const showCascader = createShowPopup<
  ShowCascaderOptions,
  PopupSuccessConfirmArgs<CascaderDetail>
>({
  apiName: 'showCascader',
  component: CascaderPopup,
  createHook: createConfirmHook
})

export { Cascader, CascaderPopup, CascaderView, showCascader }
export default Cascader
