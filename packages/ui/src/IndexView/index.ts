import { multiWithInstall } from '../helpers/with-install'
import IndexView from './IndexView.vue'
import IndexViewItem from './IndexViewItem.vue'

export { IndexView, IndexViewItem }
export default IndexView
export const install = multiWithInstall(IndexView, [IndexViewItem])
