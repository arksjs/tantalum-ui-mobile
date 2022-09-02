import { multiWithInstall } from '../helpers/with-install'
import Swiper from './Swiper.vue'
import SwiperItem from './SwiperItem.vue'

export { Swiper, SwiperItem }
export default Swiper
export const install = multiWithInstall(Swiper, [SwiperItem])
