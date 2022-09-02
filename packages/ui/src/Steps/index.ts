import { multiWithInstall } from '../helpers/with-install'
import Steps from './Steps.vue'
import Step from './Step.vue'

export { Steps, Step }
export default Steps
export const install = multiWithInstall(Steps, [Step])
