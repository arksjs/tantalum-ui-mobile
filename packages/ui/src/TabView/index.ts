import { multiWithInstall } from '../helpers/with-install'
import TabView from './TabView.vue'
import TabViewItem from './TabViewItem.vue'

export { TabView, TabViewItem }
export default TabView
export const install = multiWithInstall(TabView, [TabViewItem])
