import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'ExpHome', component: Home },
  {
    path: '/ColorCard',
    name: 'ExpColorCard',
    component: () => import('../views/Color/ColorCard.vue')
  },
  {
    path: '/CustomTheme',
    name: 'ExpCustomTheme',
    component: () => import('../views/Color/CustomTheme.vue')
  },
  {
    path: '/Button',
    name: 'ExpButton',
    component: () => import('../components/Basic/Button/index.vue')
  },
  {
    path: '/Skeleton',
    name: 'ExpSkeleton',
    component: () => import('../components/Show/Skeleton/index.vue')
  },
  {
    path: '/Cell',
    name: 'ExpCell',
    component: () => import('../components/Show/Cell/index.vue')
  },
  {
    path: '/Tab',
    name: 'ExpTab',
    component: () => import('../components/Navigation/Tab/index.vue')
  },
  {
    path: '/Form',
    name: 'ExpForm',
    component: () => import('../components/Form/Form/index.vue')
  },
  {
    path: '/Stepper',
    name: 'ExpStepper',
    component: () => import('../components/Form/Stepper/index.vue')
  },
  {
    path: '/Input',
    name: 'ExpInput',
    component: () => import('../components/Form/Input/index.vue')
  },
  {
    path: '/NavBar',
    name: 'ExpNavBar',
    component: () => import('../components/Navigation/NavBar/index.vue')
  },
  {
    path: '/Toast',
    name: 'ExpToast',
    component: () => import('../components/Feedback/Toast/index.vue')
  },
  {
    path: '/Dialog',
    name: 'ExpDialog',
    component: () => import('../components/Feedback/Dialog/index.vue')
  },
  {
    path: '/Notify',
    name: 'ExpNotify',
    component: () => import('../components/Feedback/Notify/index.vue')
  },
  {
    path: '/Layout',
    name: 'ExpLayout',
    component: () => import('../components/Show/Layout/index.vue')
  },
  {
    path: '/Drawer',
    name: 'ExpDrawer',
    component: () => import('../components/Basic/Drawer/index.vue')
  },
  {
    path: '/ImagePreview',
    name: 'ExpImagePreview',
    component: () => import('../components/Show/ImagePreview/index.vue')
  },
  {
    path: '/Swiper',
    name: 'ExpSwiper',
    component: () => import('../components/Show/Swiper/index.vue')
  },
  {
    path: '/Image',
    name: 'ExpImage',
    component: () => import('../components/Basic/Image/index.vue')
  },
  {
    path: '/BackTop',
    name: 'ExpBackTop',
    component: () => import('../components/Navigation/BackTop/index.vue')
  },
  {
    path: '/Badge',
    name: 'ExpBadge',
    component: () => import('../components/Show/Badge/index.vue')
  },
  {
    path: '/Copy',
    name: 'ExpCopy',
    component: () => import('../components/Other/Copy/index.vue')
  },
  {
    path: '/ScrollView',
    name: 'ExpScrollView',
    component: () => import('../components/Basic/ScrollView/index.vue')
  },
  {
    path: '/VirtualList',
    name: 'ExpVirtualList',
    component: () => import('../components/Show/VirtualList/index.vue')
  },
  {
    path: '/FlatList',
    name: 'ExpFlatList',
    component: () => import('../components/Show/FlatList/index.vue')
  },
  {
    path: '/Empty',
    name: 'ExpEmpty',
    component: () => import('../components/Show/Empty/index.vue')
  },
  {
    path: '/Group',
    name: 'ExpGroup',
    component: () => import('../components/Show/Group/index.vue')
  },
  {
    path: '/PickerView',
    name: 'ExpPickerView',
    component: () => import('../components/Form/PickerView/index.vue')
  },
  {
    path: '/PickerPopup',
    name: 'ExpPickerPopup',
    component: () => import('../components/Form/PickerPopup/index.vue')
  },
  {
    path: '/Picker',
    name: 'ExpPicker',
    component: () => import('../components/Form/Picker/index.vue')
  },
  {
    path: '/NoticeBar',
    name: 'ExpNoticeBar',
    component: () => import('../components/Show/NoticeBar/index.vue')
  },
  {
    path: '/Divider',
    name: 'ExpDivider',
    component: () => import('../components/Show/Divider/index.vue')
  },
  {
    path: '/Slider',
    name: 'ExpSlider',
    component: () => import('../components/Form/Slider/index.vue')
  },
  {
    path: '/Switch',
    name: 'ExpSwitch',
    component: () => import('../components/Form/Switch/index.vue')
  },
  {
    path: '/Rate',
    name: 'ExpRate',
    component: () => import('../components/Form/Rate/index.vue')
  },
  {
    path: '/Cascader',
    name: 'ExpCascader',
    component: () => import('../components/Form/Cascader/index.vue')
  },
  {
    path: '/CascaderPopup',
    name: 'ExpCascaderPopup',
    component: () => import('../components/Form/CascaderPopup/index.vue')
  },
  {
    path: '/CascaderView',
    name: 'ExpCascaderView',
    component: () => import('../components/Form/CascaderView/index.vue')
  },
  {
    path: '/Radio',
    name: 'ExpRadio',
    component: () => import('../components/Form/Radio/index.vue')
  },
  {
    path: '/Checkbox',
    name: 'ExpCheckbox',
    component: () => import('../components/Form/Checkbox/index.vue')
  },
  {
    path: '/Modal',
    name: 'ExpModal',
    component: () => import('../components/Basic/Modal/index.vue')
  },
  {
    path: '/Calendar',
    name: 'ExpCalendar',
    component: () => import('../components/Form/Calendar/index.vue')
  },
  {
    path: '/CalendarPopup',
    name: 'ExpCalendarPopup',
    component: () => import('../components/Form/CalendarPopup/index.vue')
  },
  {
    path: '/CalendarView',
    name: 'ExpCalendarView',
    component: () => import('../components/Form/CalendarView/index.vue')
  },
  {
    path: '/ActionSheet',
    name: 'ExpActionSheet',
    component: () => import('../components/Feedback/ActionSheet/index.vue')
  },
  {
    path: '/Popover',
    name: 'ExpPopover',
    component: () => import('../components/Basic/Popover/index.vue')
  },
  {
    path: '/PopDialog',
    name: 'ExpPopDialog',
    component: () => import('../components/Feedback/PopDialog/index.vue')
  },
  {
    path: '/PopMenu',
    name: 'ExpPopMenu',
    component: () => import('../components/Navigation/PopMenu/index.vue')
  },
  {
    path: '/Collapse',
    name: 'ExpCollapse',
    component: () => import('../components/Show/Collapse/index.vue')
  },
  {
    path: '/Dropdown',
    name: 'ExpDropdown',
    component: () => import('../components/Basic/Dropdown/index.vue')
  },
  {
    path: '/Icon',
    name: 'ExpIcon',
    component: () => import('../components/Basic/Icon/index.vue')
  },
  {
    path: '/TabView',
    name: 'ExpTabView',
    component: () => import('../components/Navigation/TabView/index.vue')
  },
  {
    path: '/Sticky',
    name: 'ExpSticky',
    component: () => import('../components/Navigation/Sticky/index.vue')
  },
  {
    path: '/ScrollTab',
    name: 'ExpScrollTab',
    component: () => import('../components/Navigation/ScrollTab/index.vue')
  },
  {
    path: '/IndexView',
    name: 'ExpIndexView',
    component: () => import('../components/Navigation/IndexView/index.vue')
  },
  {
    path: '/TabBar',
    name: 'ExpTabBar',
    component: () => import('../components/Navigation/TabBar/index.vue')
  },
  {
    path: '/SearchBar',
    name: 'ExpSearchBar',
    component: () => import('../components/Form/SearchBar/index.vue')
  },
  {
    path: '/SideTab',
    name: 'ExpSideTab',
    component: () => import('../components/Navigation/SideTab/index.vue')
  },
  {
    path: '/SwipeCell',
    name: 'ExpSwipeCell',
    component: () => import('../components/Feedback/SwipeCell/index.vue')
  },
  {
    path: '/Progress',
    name: 'ExpProgress',
    component: () => import('../components/Show/Progress/index.vue')
  },
  {
    path: '/Tag',
    name: 'ExpTag',
    component: () => import('../components/Show/Tag/index.vue')
  },
  {
    path: '/Fixed',
    name: 'ExpFixed',
    component: () => import('../components/Navigation/Fixed/index.vue')
  },
  {
    path: '/Order',
    name: 'ExpOrder',
    component: () => import('../components/Show/Order/index.vue')
  },
  {
    path: '/NumberKeyboard',
    name: 'ExpNumberKeyboard',
    component: () => import('../components/Form/NumberKeyboard/index.vue')
  },
  {
    path: '/ImageUploader',

    name: 'ExpImageUploader',
    component: () => import('../components/Form/ImageUploader/index.vue')
  },
  {
    path: '/CountDown',
    name: 'ExpCountDown',
    component: () => import('../components/Show/CountDown/index.vue')
  },
  {
    path: '/Steps',
    name: 'ExpSteps',
    component: () => import('../components/Show/Steps/index.vue')
  },
  {
    path: '/Price',
    name: 'ExpPrice',
    component: () => import('../components/Show/Price/index.vue')
  },
  {
    path: '/Avatar',
    name: 'ExpAvatar',
    component: () => import('../components/Show/Avatar/index.vue')
  },
  {
    path: '/Timeline',
    name: 'ExpTimeline',
    component: () => import('../components/Show/Timeline/index.vue')
  },
  {
    path: '/Stopwatch',
    name: 'ExpStopwatch',
    component: () => import('../components/Show/Stopwatch/index.vue')
  },
  {
    path: '/Result',
    name: 'ExpResult',
    component: () => import('../components/Show/Result/index.vue')
  },
  {
    path: '/LoadMore',
    name: 'ExpLoadMore',
    component: () => import('../components/Show/LoadMore/index.vue')
  },
  {
    path: '/DatePicker',
    name: 'ExpDatePicker',
    component: () => import('../components/Form/DatePicker/index.vue')
  },
  {
    path: '/DatePickerPopup',
    name: 'ExpDatePickerPopup',
    component: () => import('../components/Form/DatePickerPopup/index.vue')
  },
  {
    path: '/DatePickerView',
    name: 'ExpDatePickerView',
    component: () => import('../components/Form/DatePickerView/index.vue')
  },
  {
    path: '/Range',
    name: 'ExpRange',
    component: () => import('../components/Form/Range/index.vue')
  },
  {
    path: '/TimeAgo',
    name: 'ExpTimeAgo',
    component: () => import('../components/Show/TimeAgo/index.vue')
  },
  {
    path: '/CountUp',
    name: 'ExpCountUp',
    component: () => import('../components/Show/CountUp/index.vue')
  },
  {
    path: '/Pagination',
    name: 'ExpPagination',
    component: () => import('../components/Navigation/Pagination/index.vue')
  },
  {
    path: '/CircleProgress',
    name: 'ExpCircleProgress',
    component: () => import('../components/Show/CircleProgress/index.vue')
  },
  {
    path: '/ActivityIndicator',
    name: 'ExpActivityIndicator',
    component: () => import('../components/Show/ActivityIndicator/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
