import { multiWithInstall } from '../helpers/with-install'
import StickyView from './StickyView.vue'
import StickyViewItem from './StickyViewItem.vue'

export { StickyView, StickyViewItem }
export default StickyView
export const install = multiWithInstall(StickyView, [StickyViewItem])
