import { multiWithInstall } from '../helpers/with-install'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'

export { Checkbox, CheckboxGroup }
export default Checkbox
export const install = multiWithInstall(Checkbox, [CheckboxGroup])
