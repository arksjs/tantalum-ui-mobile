import { multiWithInstall } from '../helpers/with-install'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

export { Timeline, TimelineItem }
export default Timeline
export const install = multiWithInstall(Timeline, [TimelineItem])
