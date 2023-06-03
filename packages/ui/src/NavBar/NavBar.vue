<template>
  <div class="ta-nav-bar ta-horizontal-hairline">
    <div class="ta-nav-bar_inner">
      <div class="ta-nav-bar_left">
        <slot name="left" v-if="$slots.left"></slot>
        <ButtonGroup
          v-else-if="leftButtons.length > 0 || showBack || showHome"
          class="ta-nav-bar_button-group"
          size="large"
          :shape="iconOnly ? 'square' : 'rectangle'"
          pattern="borderless"
        >
          <template v-if="leftButtons.length > 0">
            <TaButton
              class="ta-nav-bar_button"
              transparent
              :type="item.type || 'default'"
              :icon="item.icon"
              v-for="(item, index) in leftButtons"
              :key="index"
              @click="onLeftIconClick($event, item, index)"
              >{{ item.text }}</TaButton
            >
          </template>
          <template v-else>
            <TaButton
              class="ta-nav-bar_button"
              type="default"
              :icon="LeftOutlined"
              transparent
              v-if="showBack"
              @click="onBack"
              >{{ locale.navBarBackButtonText }}</TaButton
            >
            <TaButton
              class="ta-nav-bar_button"
              type="default"
              :icon="HomeOutlined"
              transparent
              v-if="showHome"
              @click="onBackHome"
              >{{ locale.navBarHomeButtonText }}</TaButton
            >
          </template>
        </ButtonGroup>
      </div>
      <div class="ta-nav-bar_title" ref="titleEl">
        {{ title }}
      </div>
      <div class="ta-nav-bar_right">
        <slot name="right" v-if="$slots.right"></slot>
        <template v-else>
          <ButtonGroup
            class="ta-nav-bar_button-group"
            size="large"
            :shape="iconOnly ? 'square' : 'rectangle'"
            pattern="borderless"
            v-if="rightButtons.length > 0"
          >
            <TaButton
              class="ta-nav-bar_button"
              :type="item.type || 'default'"
              :icon="item.icon"
              v-for="(item, index) in rightButtons"
              :key="index"
              transparent
              @click="onRightIconClick($event, item, index)"
              >{{ item.text }}</TaButton
            >
          </ButtonGroup>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef, type PropType } from 'vue'
import { Button as TaButton, ButtonGroup } from '../Button'
import type { ButtonOption, NavBarEmits, OnButtonClick, OnTitleDbClick } from './types'
import { useLocale } from '../ConfigProvider/context'
import {
  isString,
  iconValidator,
  type PropsToEmits,
  type VoidFnToBooleanFn,
  isNumber
} from '../helpers'
import LeftOutlined from '../Icon/icons/LeftOutlined'
import HomeOutlined from '../Icon/icons/HomeOutlined'
import { useDbclick } from '../hooks'

const buttonsValidator = (items: ButtonOption[]) => {
  return (
    Array.isArray(items) &&
    items.filter(item => {
      return !((item && isString(item.text)) || iconValidator(item.icon))
    }).length === 0
  )
}

const emitClickValidator: VoidFnToBooleanFn<OnButtonClick> = (payload, buttonEl) =>
  payload &&
  isNumber(payload.index) &&
  payload.item &&
  isString(payload.item.text) &&
  buttonEl instanceof HTMLElement

const emitTitleDbClickValidator: VoidFnToBooleanFn<OnTitleDbClick> = titleEl =>
  titleEl instanceof HTMLElement

export default defineComponent({
  name: 'ta-nav-bar',
  components: { TaButton, ButtonGroup },
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否展示返回按钮
    showBack: {
      type: Boolean,
      default: false
    },
    // 是否展示返回首页按钮
    showHome: {
      type: Boolean,
      default: false
    },
    leftButtons: {
      type: Array as PropType<ButtonOption[]>,
      validator: buttonsValidator,
      default: () => [] as ButtonOption[]
    },
    rightButtons: {
      type: Array as PropType<ButtonOption[]>,
      validator: buttonsValidator,
      default: () => [] as ButtonOption[]
    },
    iconOnly: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    backClick: emitClickValidator,
    homeClick: emitClickValidator,
    titleDbclick: emitTitleDbClickValidator,
    leftButtonClick: emitClickValidator,
    rightButtonClick: emitClickValidator
  } as PropsToEmits<NavBarEmits>,
  setup(props, { emit }) {
    const { locale } = useLocale()
    const titleEl = shallowRef<HTMLElement | null>(null)

    function emitClick(
      type: string,
      item: {
        item: {
          text: string
        }
        index: number
      },
      $el: EventTarget | null
    ) {
      emit(type as 'backClick', item, $el as HTMLElement)
    }

    function onBack(e: Event) {
      emitClick(
        'backClick',
        {
          index: 0,
          item: {
            text: 'back'
          }
        },
        e.currentTarget
      )
    }

    function onBackHome(e: Event) {
      emitClick(
        'homeClick',
        {
          item: {
            text: 'home'
          },
          index: props.showBack ? 1 : 0
        },
        e.currentTarget
      )
    }

    function onLeftIconClick(e: Event, item: ButtonOption, index: number) {
      emitClick(
        'leftButtonClick',
        {
          item: {
            text: item.text
          },
          index
        },
        e.currentTarget
      )
    }

    function onRightIconClick(e: Event, item: ButtonOption, index: number) {
      emitClick(
        'rightButtonClick',
        {
          item: {
            text: item.text
          },
          index
        },
        e.currentTarget
      )
    }

    useDbclick(titleEl, ($el, event) => {
      if (event === 'dbclick') {
        emit('titleDbclick', $el)
      }
    })

    return {
      titleEl,
      onBack,
      onBackHome,
      onLeftIconClick,
      onRightIconClick,
      locale,
      LeftOutlined,
      HomeOutlined
    }
  }
})
</script>
