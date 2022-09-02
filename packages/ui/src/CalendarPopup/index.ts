import { withInstall } from '../helpers/with-install'
import { CalendarPopup, showCalendar } from '../Calendar'

export { CalendarPopup, showCalendar }
export default CalendarPopup
export const install = withInstall(CalendarPopup)
