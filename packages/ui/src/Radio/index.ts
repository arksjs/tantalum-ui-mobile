import { multiWithInstall } from '../helpers/with-install'
import Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

export { Radio, RadioGroup }
export default Radio
export const install = multiWithInstall(Radio, [RadioGroup])
