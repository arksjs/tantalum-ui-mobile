<template>
  <div class="ak-nav-bar ak-horizontal-hairline">
    <div class="ak-nav-bar_inner">
      <div class="ak-nav-bar_left">
        <slot name="left" v-if="$slots.left"></slot>
        <ButtonGroup
          v-else-if="leftButtons.length > 0 || showBack || showHome"
          class="ak-nav-bar_button-group"
          :shape="iconOnly ? 'square' : 'rectangle'"
          pattern="borderless"
        >
          <template v-if="leftButtons.length > 0">
            <Button
              class="ak-nav-bar_button"
              transparent
              :type="item.type || 'default'"
              :icon="item.icon"
              v-for="(item, index) in leftButtons"
              :key="index"
              @click="onLeftIconClick($event, item, index)"
              >{{ item.text }}</Button
            >
          </template>
          <template v-else>
            <Button
              class="ak-nav-bar_button"
              type="default"
              :icon="LeftOutlined"
              transparent
              v-if="showBack"
              @click="onBack"
              >{{ locale.navBarBackButtonText }}</Button
            >
            <Button
              class="ak-nav-bar_button"
              type="default"
              :icon="HomeOutlined"
              transparent
              v-if="showHome"
              @click="onBackHome"
              >{{ locale.navBarHomeButtonText }}</Button
            >
          </template>
        </ButtonGroup>
      </div>
      <div class="ak-nav-bar_title" ref="titleEl">
        {{ title }}
      </div>
      <div class="ak-nav-bar_right">
        <slot name="right" v-if="$slots.right"></slot>
        <template v-else>
          <ButtonGroup
            class="ak-nav-bar_button-group"
            :shape="iconOnly ? 'square' : 'rectangle'"
            pattern="borderless"
            v-if="rightButtons.length > 0"
          >
            <Button
              class="ak-nav-bar_button"
              :type="item.type || 'default'"
              :icon="item.icon"
              v-for="(item, index) in rightButtons"
              :key="index"
              transparent
              @click="onRightIconClick($event, item, index)"
              >{{ item.text }}</Button
            >
          </ButtonGroup>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import { Button, ButtonGroup } from '../Button'
import type {
  ButtonOption,
  NavBarEmits,
  OnButtonClick,
  OnTitleDbClick
} from './types'
import { useLocale } from '../ConfigProvider/context'
import { iconValidator } from '../helpers/validator'
import type { PropsToEmits, VoidFnToBooleanFn } from '../helpers/types'
import LeftOutlined from '../Icon/icons/LeftOutlined'
import HomeOutlined from '../Icon/icons/HomeOutlined'
import { useDbclick } from '../hooks/use-event'

const buttonsValidator = (items: ButtonOption[]) => {
  return (
    Array.isArray(items) &&
    items.filter(item => {
      return !(
        (item && typeof item.text === 'string') ||
        iconValidator(item.icon)
      )
    }).length === 0
  )
}

const emitClickValidator: VoidFnToBooleanFn<OnButtonClick> = (
  payload,
  buttonEl
) =>
  payload &&
  typeof payload.index === 'number' &&
  payload.item &&
  typeof payload.item.text === 'string' &&
  buttonEl instanceof HTMLElement

const emitTitleDbClickValidator: VoidFnToBooleanFn<OnTitleDbClick> = titleEl =>
  titleEl instanceof HTMLElement

export default defineComponent({
  name: 'ak-nav-bar',
  components: { Button, ButtonGroup },
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
    const titleEl = ref<HTMLDivElement>()

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
