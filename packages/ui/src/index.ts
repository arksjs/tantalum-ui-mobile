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

export type { FnArgs } from './helpers/types'
export type {
  StateType,
  PlacementType,
  SizeType,
  ViewPosition
} from './helpers/types'

export type {
  VisibleState as PopupVisibleState,
  OnVisibleStateChange as PopupOnVisibleStateChange,
  OnCancel as PopupOnCancel
} from './popup/types'
export type {
  ShapeType as ButtonShape,
  PatternType as ButtonPattern
} from './Button/types'
export type {
  SelectorValueParser,
  SelectorValueFormatter,
  SelectorModelValue,
  SelectorDetail,
  SelectorOnChange,
  SelectorOnConfirm
} from './SelectorField/types'
export type {
  OnConfirm as PickerOnConfirm,
  UserFieldNames as PickerFieldNames,
  UserFieldNames as CascaderFieldNames
} from './Picker/types'
export type {
  OnSelect as CascaderOnSelect,
  OnConfirm as CascaderOnConfirm
} from './Cascader/types'
export type {
  Mode as DatePickerMode,
  OptionFilter as DatePickerOptionFilter,
  OnConfirm as DatePickerOnConfirm
} from './DatePicker/types'
export type {
  ValueFormatter as CalendarValueFormatter,
  ValueParser as CalendarValueParser,
  OnSelect as CalendarOnSelect,
  OnConfirm as CalendarOnConfirm,
  DayHandler as CalendarDayHandler,
  Mode as CalendarMode,
  CalendarDetail
} from './Calendar/types'
export type {
  Option as ActionSheetOption,
  OnConfirm as ActionSheetOnConfirm
} from './ActionSheet/types'
export type {
  Option as PopMenuOption,
  OnConfirm as PopMenuOnConfirm
} from './PopMenu/types'
export type { OnChange as ImagePreviewOnChange } from './ImagePreview/types'
export type {
  SetSuggestList as SearchBarSetSuggestList,
  OnInput as SearchBarOnFocus,
  OnInput as SearchBarOnBlur,
  OnInput as SearchBarOnInput,
  OnSearch as SearchBarOnSearch,
  OnFieldClick as SearchBarOnFieldClick
} from './SearchBar/types'
export type {
  PullDirection as ScrollViewPullDirection,
  OnScrollToUpper as ScrollViewOnScrollToUpper,
  OnScrollToLower as ScrollViewOnScrollToLower,
  OnRefreshing as ScrollViewOnRefreshing,
  OnScroll as ScrollViewOnScroll,
  OnRefreshing as FlatListOnRefreshing,
  OnScroll as FlatListOnScroll
} from './ScrollView/types'
export type {
  OnChange as TabOnChange,
  OnChange as TabBarOnChange,
  OnChange as SideTabOnChange,
  OptionList as TabOptions,
  OptionItem as TabOption
} from './Tab/types'
export type {
  OnChange as SwiperOnChange,
  OnAnimated as SwiperOnAnimated,
  OnChange as TabViewOnChange,
  OnAnimated as TabViewOnAnimated
} from './Swiper/types'
export type { StateType as ToastType } from './Toast/types'
export type {
  ButtonOption as SwipeCellButtonOption,
  OnButtonClick as SwipeCellOnButtonClick
} from './SwipeCell/types'
export type {
  OnChange as StickyViewOnChange,
  OnChange as IndexViewOnChange,
  OnChange as ScrollTabOnChange
} from './StickyView/types'
export type {
  ButtonOption as NavBarButtonOption,
  OnButtonClick as NavBarOnButtonClick,
  OnTitleDbClick as NavBarOnTitleDbClick
} from './NavBar/types'
export type {
  AvatarShape as SkeletonAvatarShape,
  ButtonShape as SkeletonButtonShape
} from './Skeleton/types'
export type {
  ActiveName as CollapseActiveName,
  OnChange as CollapseOnChange,
  ItemOnToggle as CollapseItemOnToggle
} from './Collapse/types'
export type {
  CountTime,
  OnEnd as CountDownOnEnd,
  OnPauseOrResume as CountDownOnPause,
  OnPauseOrResume as CountDownOnResume,
  CountDownRef
} from './CountDown/types'
export type {
  Speed as CountUpSpeed,
  OnCancel as CountUpOnCancel,
  OnAnimated as CountUpOnAnimated,
  CountUpRef
} from './CountUp/types'
export type { OnStop as StopwatchOnStop, StopwatchRef } from './Stopwatch/types'
export type {
  OnVisibleItemsChange as VirtualListOnVisibleItemsChange,
  OnVisibleItemsChange as FlatListOnVisibleItemsChange
} from './VirtualList/types'
export type { OnEndReached as FlatListOnEndReached } from './FlatList/types'
export type {
  OnDelete as NumberKeyboardOnDelete,
  OnClose as NumberKeyboardOnClose,
  KeyboardType as NumberKeyboardType
} from './NumberKeyboard/types'
export type { OnDelete as OrderOnDelete } from './Order/types'
export type {
  Accept as ImageUploaderAccept,
  BeforeUpload as ImageUploaderBeforeUpload,
  UploadReady as ImageUploaderUploadReady,
  OnDelete as ImageUploaderOnDelete
} from './ImageUploader/types'
export type { BadgeOption } from './Badge/types'
export type { Mode as ImageMode, OnLoad as ImageOnLoad } from './Image/types'
export type { ArrowDirection as CellArrowDirection } from './Cell/types'
export type { Mode as NoticeBarMode } from './NoticeBar/types'
export type { PatternType as TagPattern } from './Tag/types'
export type {
  UserOptionItem as CheckboxOptionItem,
  UserOptionItem as RadioOptionItem
} from './Checkbox/types'
export type {
  ShapeType as AvatarShape,
  UserSizeType as AvatarSize
} from './Avatar/types'
export type { EmptyType } from './Empty/types'
export type {
  JustifyType as RowJustify,
  AlignType as RowAlign
} from './Row/types'
export type { ResultType } from './Result/types'
