import type { Plugin } from 'vue'
import * as Components from './components'

const ArkUI: Plugin = {
  install(app) {
    Object.values(Components).forEach(Component => {
      app.component(Component.name, Component)
    })
  }
}

export * from './components/api'
export * from './components'
export default ArkUI

export type {
  FnArgs,
  StateType,
  PlacementType,
  SizeType,
  ViewPosition
} from './helpers/types'
export type {
  PopupVisibleState,
  PopupOnVisibleStateChange,
  PopupOnCancel
} from './popup/types'
export type { ButtonShape, ButtonPattern } from './Button/types'
export type {
  SelectorValueParser,
  SelectorValueFormatter,
  SelectorModelValue,
  SelectorDetail,
  SelectorOnChange,
  SelectorOnConfirm
} from './SelectorField/types'
export type {
  PickerDetail,
  PickerOnChange,
  PickerOnConfirm,
  PickerFieldNames
} from './Picker/types'
export type {
  CascaderDetail,
  CascaderFieldNames,
  CascaderOnSelect,
  CascaderOnChange,
  CascaderOnConfirm
} from './Cascader/types'
export type {
  DatePickerDetail,
  DatePickerMode,
  DatePickerOptionFilter,
  DatePickerOnChange,
  DatePickerOnConfirm
} from './DatePicker/types'
export type {
  CalendarValueFormatter,
  CalendarValueParser,
  CalendarOnChange,
  CalendarOnSelect,
  CalendarOnConfirm,
  CalendarDayHandler,
  CalendarMode,
  CalendarDetail
} from './Calendar/types'
export type {
  ActionSheetOption,
  ActionSheetOnConfirm
} from './ActionSheet/types'
export type { PopMenuOption, PopMenuOnConfirm } from './PopMenu/types'
export type { ImagePreviewOnChange } from './ImagePreview/types'
export type {
  SearchBarSetSuggestList,
  SearchBarOnFocus,
  SearchBarOnBlur,
  SearchBarOnInput,
  SearchBarOnSearch,
  SearchBarOnFieldClick
} from './SearchBar/types'
export type {
  ScrollViewPullDirection,
  ScrollViewOnScrollToUpper,
  ScrollViewOnScrollToLower,
  ScrollViewOnRefreshing,
  ScrollViewOnScroll
} from './ScrollView/types'
export type { TabOnChange, TabOptions, TabOption, TabRef } from './Tab/types'
export type {
  TabBarOnChange,
  TabBarOptions,
  TabBarOption,
  TabBarRef
} from './TabBar/types'
export type {
  SideTabOnChange,
  SideTabOptions,
  SideBarOption,
  SideBarRef
} from './SideTab/types'
export type {
  SwiperOnActiveIndexChange,
  SwiperOnAnimated,
  SwiperRef
} from './Swiper/types'
export type {
  TabViewOnChange,
  TabViewOnAnimated,
  TabViewRef
} from './TabView/types'
export type { ToastType } from './Toast/types'
export type {
  SwipeCellButtonOption,
  SwipeCellOnButtonClick
} from './SwipeCell/types'
export type { StickyViewOnChange, StickyViewRef } from './StickyView/types'
export type { ScrollTabOnChange, ScrollTabRef } from './ScrollTab/types'
export type { IndexViewOnChange, IndexViewRef } from './IndexView/types'
export type {
  NavBarButtonOption,
  NavBarOnButtonClick,
  NavBarOnTitleDbClick
} from './NavBar/types'
export type { SkeletonAvatarShape, SkeletonButtonShape } from './Skeleton/types'
export type {
  CollapseActiveName,
  CollapseOnChange,
  CollapseItemOnToggle
} from './Collapse/types'
export type {
  CountTime,
  CountDownOnEnd,
  CountDownOnPause,
  CountDownOnResume,
  CountDownRef
} from './CountDown/types'
export type {
  CountUpSpeed,
  CountUpOnCancel,
  CountUpOnAnimated,
  CountUpRef
} from './CountUp/types'
export type { StopwatchOnStop, StopwatchRef } from './Stopwatch/types'
export type { VirtualListOnVisibleItemsChange } from './VirtualList/types'
export type {
  FlatListOnEndReached,
  FlatListOnVisibleItemsChange,
  FlatListOnRefreshing,
  FlatListOnScroll
} from './FlatList/types'
export type {
  NumberKeyboardOnDelete,
  NumberKeyboardOnClose,
  NumberKeyboardType
} from './NumberKeyboard/types'
export type { OrderOnDelete } from './Order/types'
export type {
  ImageUploaderAccept,
  ImageUploaderBeforeUpload,
  ImageUploaderUploadReady,
  ImageUploaderOnDelete
} from './ImageUploader/types'
export type { BadgeOption } from './Badge/types'
export type { ImageMode, ImageOnLoad } from './Image/types'
export type { CellArrowDirection } from './Cell/types'
export type { NoticeBarMode } from './NoticeBar/types'
export type { TagPattern } from './Tag/types'
export type { CheckboxOptionItem, RadioOptionItem } from './Checkbox/types'
export type { AvatarShape, AvatarSize } from './Avatar/types'
export type { EmptyType } from './Empty/types'
export type { RowJustify, RowAlign } from './Row/types'
export type { ResultType } from './Result/types'
