import { multiWithInstall } from '../helpers/with-install'
import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

export { Button, ButtonGroup }
export default Button
export const install = multiWithInstall(Button, [ButtonGroup])
