import { withNoopInstall } from '../helpers/with-install'
import { TimelineItem } from '../Timeline'

export { TimelineItem }
export default TimelineItem
export const install = withNoopInstall(TimelineItem)
