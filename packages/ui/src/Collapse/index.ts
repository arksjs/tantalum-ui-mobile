import { multiWithInstall } from '../helpers/with-install'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

export { Collapse, CollapseItem }
export default Collapse
export const install = multiWithInstall(Collapse, [CollapseItem])
