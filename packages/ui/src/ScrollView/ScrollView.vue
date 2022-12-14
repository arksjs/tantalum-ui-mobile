<template>
  <div :class="classes" ref="root" @scroll="onScroll">
    <div class="ta-scroll-view_inner">
      <div class="ta-scroll-view_content" :style="contentStyles">
        <div v-if="allowPullDirections.length > 0" :class="pullRefreshClasses">
          <slot
            v-bind:pullDirection="pullDirection"
            v-bind:pullRefreshState="pullRefreshState"
            v-bind:pullIndicatorSafeArea="pullIndicatorSafeArea"
            name="indicator"
          >
            <div :class="loadMoreClasses" :style="indicatorStyles">
              <ActivityIndicator
                class="ta-load-more_icon"
                v-if="pullRefreshState === PullRefreshState.Refreshing"
                :size="18"
              />
              <Icon class="ta-load-more_icon" v-else :icon="CircleOutlined" />
              <span class="ta-load-more_content">{{
                pullRefreshState === PullRefreshState.Refreshing
                  ? locale.scrollViewRefreshingText
                  : pullRefreshState === PullRefreshState.Holding
                  ? locale.scrollViewHoldingText
                  : locale.scrollViewPullingTexts[pullDirection]
              }}</span>
            </div></slot
          >
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  provide,
  shallowRef,
  type PropType
} from 'vue'
import { Icon } from '../Icon'
import { ActivityIndicator } from '../ActivityIndicator'
import {
  string2StringArray,
  type PropsToEmits,
  isStringOrStringArray
} from '../helpers'
import { useTouch, useScrollTo } from '../hooks'
import { useLocale } from '../ConfigProvider/context'
import {
  emitRefreshingValidator,
  emitScrollToLowerValidator,
  emitScrollToUpperValidator,
  emitScrollValidator
} from './props'
import type {
  PullDirection,
  PullDirectionOrDefault,
  PullIndicatorSafeArea,
  ScrollViewEmits
} from './types'
import CircleOutlined from '../Icon/icons/CircleOutlined'
import {
  ScrollState,
  PullRefreshState,
  getClasses,
  getContentStyles,
  getIndicatorStyles,
  getLoadMoreClasses,
  getPullRefreshClasses
} from './util'

interface ScrollCoords {
  pageX: number
  pageY: number
  scrollX: boolean
  scrollY: boolean
  directions?: PullDirection[]
  direction?: PullDirection
  stop: boolean | null
  isSetSafeArea?: boolean
}

export default defineComponent({
  name: 'ta-scroll-view',
  components: { Icon, ActivityIndicator },
  props: {
    // ??????????????????
    scrollX: {
      type: Boolean,
      default: false
    },
    // ??????????????????
    scrollY: {
      type: Boolean,
      default: false
    },
    // ?????????????????????????????????????????????
    scrollAnimated: {
      type: Boolean,
      default: false
    },
    // ?????????/???????????????????????? scrolltoupper ??????
    upperThreshold: {
      type: Number,
      default: 50
    },
    // ?????????/???????????????????????? scrolltolower ??????
    lowerThreshold: {
      type: Number,
      default: 50
    },
    // ???????????????????????????
    scrollTop: {
      type: Number,
      default: 0
    },
    // ???????????????????????????
    scrollLeft: {
      type: Number,
      default: 0
    },
    // ??????????????????
    enablePullDirections: {
      type: [String, Array] as PropType<PullDirection | PullDirection[]>,
      validator: isStringOrStringArray
    },
    // ??????????????????
    pullRefreshThreshold: {
      type: Number,
      default: 48
    }
  },
  emits: {
    scrollToUpper: emitScrollToUpperValidator,
    scrollToLower: emitScrollToLowerValidator,
    scroll: emitScrollValidator,
    refreshing: emitRefreshingValidator
  } as PropsToEmits<ScrollViewEmits>,
  setup(props, ctx) {
    const { locale } = useLocale()
    const { emit } = ctx
    let _isToLowerOrUpperY = ScrollState.Upper
    let _isToLowerOrUpperX = ScrollState.Upper
    let _prevY = 0
    let _prevX = 0
    let coords: ScrollCoords | null

    const pullRefreshState = ref(PullRefreshState.Pulling)
    const root = shallowRef<HTMLElement | null>(null)
    const pullDistance = ref(0)
    const translateDuration = ref(0)
    const pullDirection = ref<PullDirectionOrDefault>('')
    const pullIndicatorSafeArea = ref<PullIndicatorSafeArea>({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })

    function loadComplete() {
      pullRefreshState.value = PullRefreshState.Pulling
      pullDistance.value = 0
    }

    /**
     * ??????????????????
     */
    function onScroll() {
      const { upperThreshold, lowerThreshold, scrollX, scrollY } = props
      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      } = root.value as HTMLElement

      let isToLowerY = false
      let isToUpperY = false
      let isToLowerX = false
      let isToUpperX = false

      // ????????????
      emit('scroll', {
        scrollTop,
        scrollLeft,
        scrollWidth,
        scrollHeight,
        clientHeight,
        clientWidth
      })

      // ????????????
      if (scrollY) {
        if (
          scrollTop + clientHeight + lowerThreshold >= scrollHeight &&
          scrollTop > _prevY
        ) {
          isToLowerY = true
        } else if (scrollTop <= upperThreshold && scrollTop < _prevY) {
          isToUpperY = true
        }
      }

      // ????????????
      if (scrollX) {
        if (
          scrollLeft + clientWidth + lowerThreshold >= scrollWidth &&
          scrollLeft > _prevX
        ) {
          isToLowerX = true
        } else if (scrollLeft <= upperThreshold && scrollLeft < _prevX) {
          isToUpperX = true
        }
      }

      // ???????????????
      if (isToUpperY || isToLowerY) {
        if (_isToLowerOrUpperY === ScrollState.Upper) {
          // ?????????????????????
          isToUpperY = false
        } else if (_isToLowerOrUpperY === ScrollState.Lower) {
          // ?????????????????????
          isToLowerY = false
        }
      } else {
        _isToLowerOrUpperY = ScrollState.Center
      }
      if (isToUpperX || isToLowerX) {
        if (_isToLowerOrUpperX === ScrollState.Upper) {
          // ?????????????????????
          isToUpperX = false
        } else if (_isToLowerOrUpperX === ScrollState.Lower) {
          // ?????????????????????
          isToLowerX = false
        }
      } else {
        _isToLowerOrUpperX = ScrollState.Center
      }

      const typeLower = 'scrollToLower'
      const typeUpper = 'scrollToUpper'

      if (isToUpperY) {
        // ??????
        _isToLowerOrUpperY = ScrollState.Upper

        emit(typeUpper, {
          direction: 'top'
        })
      } else if (isToLowerY) {
        // ??????
        _isToLowerOrUpperY = ScrollState.Lower

        emit(typeLower, {
          direction: 'bottom'
        })
      }
      if (isToUpperX) {
        // ??????
        _isToLowerOrUpperX = ScrollState.Upper

        emit(typeUpper, {
          direction: 'left'
        })
      } else if (isToLowerX) {
        // ??????
        _isToLowerOrUpperX = ScrollState.Lower

        emit(typeLower, {
          direction: 'right'
        })
      }

      _prevY = scrollTop
      _prevX = scrollLeft
    }

    function updateScroll() {
      const { scrollY, scrollX } = props

      if (scrollY || scrollX) {
        scrollToOffset({
          x: scrollX ? props.scrollLeft : 0,
          y: scrollY ? props.scrollTop : 0,
          animated: props.scrollAnimated
        })
      }
    }

    onMounted(() => updateScroll)
    watch([() => props.scrollLeft, () => props.scrollTop], updateScroll)

    const classes = computed(() =>
      getClasses({
        scrollX: props.scrollX,
        scrollY: props.scrollY,
        scrollAnimated: props.scrollAnimated
      })
    )
    const pullRefreshClasses = computed(() =>
      getPullRefreshClasses(pullDirection.value)
    )
    const loadMoreClasses = computed(() =>
      getLoadMoreClasses(pullDirection.value)
    )
    const contentStyles = computed(() =>
      getContentStyles({
        translateDuration: translateDuration.value,
        pullDirection: pullDirection.value,
        pullDistance: pullDistance.value
      })
    )
    const indicatorStyles = computed(() =>
      getIndicatorStyles(pullIndicatorSafeArea.value)
    )
    const allowPullDirections = computed(() =>
      string2StringArray(props.enablePullDirections)
    )

    useTouch({
      el: root,
      onTouchStart(e) {
        const { pageX, pageY } = e.touchObject
        const $scroll = root.value as HTMLElement
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth
        } = $scroll

        coords = {
          pageX,
          pageY,
          scrollX: props.scrollX && scrollWidth > clientWidth,
          scrollY: props.scrollY && scrollHeight > clientHeight,
          stop: null
        }

        if (pullRefreshState.value === PullRefreshState.Refreshing) {
          return
        }

        if (allowPullDirections.value.length === 0) {
          return
        }

        pullDistance.value = 0
        translateDuration.value = 0
        pullDirection.value = ''

        // ??????????????????????????????0-4???????????????
        const directions: PullDirection[] = []

        if (scrollTop === 0 && allowPullDirections.value.includes('down')) {
          directions.push('down')
        }
        if (
          scrollTop + clientHeight >= scrollHeight &&
          allowPullDirections.value.includes('up')
        ) {
          directions.push('up')
        }
        if (scrollLeft === 0 && allowPullDirections.value.includes('right')) {
          directions.push('right')
        }
        if (
          scrollLeft + clientWidth >= scrollWidth &&
          allowPullDirections.value.includes('left')
        ) {
          directions.push('left')
        }

        if (directions[0]) {
          // ????????????????????????
          coords.directions = directions
        }
      },
      onTouchMove(e) {
        if (!coords) {
          return
        }

        // ??????????????????
        const { pageX, pageY } = e.touchObject
        const offsetX = pageX - coords.pageX
        const offsetY = pageY - coords.pageY
        const y = _isToLowerOrUpperY
        const x = _isToLowerOrUpperX

        if (coords.stop == null) {
          if (
            (coords.scrollY &&
              Math.abs(offsetY) >= Math.abs(offsetX) &&
              (y === ScrollState.Center ||
                (y === ScrollState.Upper && offsetY < 0) ||
                (y === ScrollState.Lower && offsetY > 0))) ||
            (coords.scrollX &&
              Math.abs(offsetX) >= Math.abs(offsetY) &&
              (x === ScrollState.Center ||
                (x === ScrollState.Upper && offsetX < 0) ||
                (x === ScrollState.Lower && offsetX > 0)))
          ) {
            coords.stop = true
          } else {
            coords.stop = false
          }
        }

        if (coords.stop) {
          e.stopPropagation()
        }

        // ??????????????????
        if (!coords.directions) {
          return
        }

        let _pullDirection = coords.direction

        if (!_pullDirection) {
          // ????????????????????????????????????????????????????????????
          if (Math.abs(offsetY) >= Math.abs(offsetX)) {
            coords.directions = coords.directions.filter(v => {
              return (
                ['up', 'down'].includes(v) &&
                ((v === 'down' && offsetY > 0) || (v === 'up' && offsetY < 0))
              )
            })
          } else {
            coords.directions = coords.directions.filter(v => {
              return (
                ['left', 'right'].includes(v) &&
                ((v === 'right' && offsetX > 0) ||
                  (v === 'left' && offsetX < 0))
              )
            })
          }

          coords.direction = _pullDirection = coords.directions[0]
        }

        if (!_pullDirection) {
          delete coords.directions
          return
        }

        e.preventDefault()

        if (!coords.isSetSafeArea) {
          const $scroll = root.value as HTMLElement
          const _pullIndicatorSafeArea = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }

          if (['up', 'down'].includes(_pullDirection)) {
            _pullIndicatorSafeArea.left = $scroll.scrollLeft
            _pullIndicatorSafeArea.right =
              $scroll.scrollWidth - $scroll.scrollLeft - $scroll.clientWidth
          } else {
            _pullIndicatorSafeArea.top = $scroll.scrollTop
            _pullIndicatorSafeArea.bottom =
              $scroll.scrollHeight - $scroll.scrollTop - $scroll.clientHeight
          }

          pullIndicatorSafeArea.value = _pullIndicatorSafeArea
          coords.isSetSafeArea = true
        }

        pullDirection.value = _pullDirection

        let distance
        if (['up', 'down'].includes(pullDirection.value)) {
          distance = offsetY
        } else {
          distance = offsetX
        }
        distance = Math.abs(distance)
        const pullRefreshThreshold = props.pullRefreshThreshold

        if (distance >= pullRefreshThreshold) {
          if (pullRefreshState.value === PullRefreshState.Pulling) {
            pullRefreshState.value = PullRefreshState.Holding
          }

          distance =
            pullRefreshThreshold +
            Math.ceil(
              (distance - pullRefreshThreshold) /
                Math.log(Math.abs(distance - pullRefreshThreshold) / 2)
            ) // ??????2????????????????????????
        }

        pullDistance.value = ['down', 'right'].includes(pullDirection.value)
          ? distance
          : -distance
      },
      onTouchEnd() {
        if (!coords) {
          return
        }
        coords = null

        translateDuration.value = 200

        if (pullRefreshState.value === PullRefreshState.Holding) {
          pullRefreshState.value = PullRefreshState.Refreshing
          pullDistance.value = ['down', 'right'].includes(pullDirection.value)
            ? props.pullRefreshThreshold
            : -props.pullRefreshThreshold

          emit(
            'refreshing',
            {
              pullDirection: pullDirection.value as PullDirection
            },
            loadComplete
          )
        } else {
          pullDistance.value = 0
        }
      }
    })

    const { scrollToOffset, scrollToEnd } = useScrollTo(root)

    provide('disableFixed', true)

    return {
      allowPullDirections,
      pullRefreshState,
      pullDistance,
      pullDirection,
      root,
      classes,
      pullRefreshClasses,
      loadMoreClasses,
      contentStyles,
      indicatorStyles,
      onScroll,
      pullIndicatorSafeArea,
      PullRefreshState,
      scrollTo: scrollToOffset,
      scrollToEnd,
      locale,
      CircleOutlined
    }
  }
})
</script>
