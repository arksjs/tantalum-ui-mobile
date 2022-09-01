import { withNoopInstall } from '../helpers/with-install'
import { Step } from '../Steps'

export { Step }
export default Step
export const install = withNoopInstall(Step)
