import { withInstall } from '../helpers/with-install'
import Cascader from './Cascader.vue'
import CascaderPopup from './CascaderPopup.vue'
import CascaderView from './CascaderView.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { SelectorDetail } from '../SelectorField/types'
import type { ShowCascaderOptions } from './types'

const showCascader = createShowPopup<
  ShowCascaderOptions,
  PopupSuccessConfirmArgs<SelectorDetail>
>({
  apiName: 'showCascader',
  component: CascaderPopup,
  createHook: createConfirmHook
})

export { Cascader, CascaderPopup, CascaderView, showCascader }
export default Cascader
export const install = withInstall(Cascader)
