import Popover from './Popover.vue'
import { createAlertHook, createShowPopup } from '../popup/api'
import type { PopupSuccessAlertArgs } from '../popup/types'
import type { PlacementType, Selector } from '../helpers/types'

interface ShowPopoverOptions {
  selector: Selector
  content: string
  placement?: PlacementType
}

const showPopover = createShowPopup<ShowPopoverOptions, PopupSuccessAlertArgs>({
  apiName: 'showPopover',
  component: Popover,
  createHook: createAlertHook
})

export { Popover, showPopover }
export default Popover
