import { withNoopInstall } from '../helpers/with-install'
import { StickyViewItem } from '../StickyView'

export { StickyViewItem }
export default StickyViewItem
export const install = withNoopInstall(StickyViewItem)
