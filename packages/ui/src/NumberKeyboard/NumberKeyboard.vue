<template>
  <Drawer
    class="ta-number-keyboard"
    placement="bottom"
    :visible="visible"
    :showMask="false"
    :title="title"
    :showClose="showHeaderConfirm"
    @visibleStateChange="onVisibleStateChange2"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
    <div @click.stop="noop">
      <div :class="bodyClasses">
        <ul class="ta-number-keyboard_list">
          <li
            class="ta-number-keyboard_item"
            :class="['span-' + (item.span || 1)]"
            v-for="(item, index) in numberList"
            :key="index"
          >
            <div class="ta-number-keyboard_button" @click="onNumberClick(item)">
              <Icon v-if="item.icon" :icon="item.icon" />
              <template v-else>{{ item.text }}</template>
            </div>
          </li>
        </ul>
        <div
          class="ta-number-keyboard_right-column"
          v-if="type === 'rightColumn'"
        >
          <div class="ta-number-keyboard_backspace">
            <div
              class="ta-number-keyboard_button"
              @click="onNumberClick(backspaceItem)"
            >
              <Icon :icon="BackspaceOutlined" />
            </div>
          </div>
          <div class="ta-number-keyboard_confirm">
            <div
              class="ta-number-keyboard_confirm-button"
              @click="onConfirmClick"
            >
              {{ locale.numberKeyboardConfirmText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import { Drawer } from '../Drawer'
import { isString, isStringArray, noop } from '../helpers/util'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupExtendProps } from '../popup/popup'
import type { OnCancel, OnVisibleStateChange } from '../popup/types'
import { useLocale } from '../ConfigProvider/context'
import { formStringValueEmits } from '../Form/form'
import type { EmptyObject, PropsToEmits } from '../helpers/types'
import type {
  NumberKeyboardItem,
  KeyboardType,
  NumberKeyboardEmits
} from './types'
import BackspaceOutlined from '../Icon/icons/BackspaceOutlined'
import KeyboardOutlined from '../Icon/icons/KeyboardOutlined'
import { getBodyClasses, isShowHeaderConfirm } from './util'

export default defineComponent({
  name: 'ta-number-keyboard',
  components: { Drawer, Icon },
  props: {
    ...popupExtendProps,
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: null
    },
    // 键盘模式
    type: {
      type: String as PropType<KeyboardType>,
      default: 'default'
    },
    // 自定义键盘额外的键
    customKey: {
      type: [Array, String] as PropType<string | string[]>,
      default: () => [] as string[]
    }
  },
  emits: {
    ...popupEmits,
    ...formStringValueEmits,
    delete: payload => payload && isString(payload.deleteKey),
    close: payload => payload && isString(payload.source)
  } as PropsToEmits<NumberKeyboardEmits>,
  setup(props, ctx) {
    const { locale } = useLocale()
    const { emit } = ctx
    let valueCache = ''
    const backspaceItem: NumberKeyboardItem = {
      text: 'backspace',
      type: 'backspace',
      icon: BackspaceOutlined
    }

    const popup = usePopupExtend<EmptyObject>(ctx)

    const onVisibleStateChange2: OnVisibleStateChange = e => {
      popup.onVisibleStateChange(e)

      if (e.state === 'show') {
        valueCache =
          (typeof props.modelValue === 'string' && props.modelValue) || ''
      }
    }

    const showHeaderConfirm = computed(() =>
      isShowHeaderConfirm({
        type: props.type,
        customKey: props.customKey
      })
    )

    const bodyClasses = computed(() =>
      getBodyClasses(
        {
          type: props.type,
          title: props.title
        },
        showHeaderConfirm.value
      )
    )

    const numberList = computed(() => {
      const list: NumberKeyboardItem[] = []

      for (let i = 1; i <= 9; i++) {
        list.push({
          text: i.toString(),
          type: 'text'
        })
      }

      const customKey =
        typeof props.customKey === 'string'
          ? [props.customKey]
          : isStringArray(props.customKey)
          ? (props.customKey as string[])
          : []

      if (props.type === 'rightColumn') {
        if (customKey.length > 1) {
          list.push(
            {
              text: customKey[0],
              type: 'text'
            },
            { text: '0', type: 'text' },
            {
              text: customKey[1],
              type: 'text'
            }
          )
        } else if (customKey.length > 0) {
          list.push(
            { text: '0', type: 'text', span: 2 },
            {
              text: customKey[0],
              type: 'text'
            }
          )
        } else {
          list.push({ text: '0', type: 'text', span: 3 })
        }
      } else {
        if (customKey.length > 0) {
          list.push(
            {
              text: customKey[0],
              type: 'text'
            },
            { text: '0', type: 'text' }
          )
        } else {
          list.push(
            {
              text: 'confirm',
              type: 'confirm',
              icon: KeyboardOutlined
            },
            { text: '0', type: 'text' }
          )
        }

        list.push(backspaceItem)
      }

      return list
    })

    function onNumberClick(item: NumberKeyboardItem) {
      if (item.type === 'text') {
        valueCache += item.text
        emit('input', item.text)
        emit('update:modelValue', valueCache)
      } else if (item.type === 'backspace') {
        const deleteKey = valueCache.substr(-1)
        valueCache = valueCache.substr(0, valueCache.length - 1)
        emit('delete', {
          deleteKey
        })
        emit('update:modelValue', valueCache)
      } else if (item.type === 'confirm') {
        popup.customConfirm({})
      }
    }

    function onConfirmClick() {
      popup.customConfirm({})
    }

    function onConfirm() {
      close('confirm')
    }

    const onCancel: OnCancel = res => {
      close(res.source)
    }

    function close(source: string) {
      emit('change', valueCache)
      valueCache = ''

      emit('close', {
        source
      })
    }

    return {
      ...popup,
      noop,
      onVisibleStateChange2,
      showHeaderConfirm,
      bodyClasses,
      numberList,
      onNumberClick,
      onConfirmClick,
      onConfirm,
      onCancel,
      backspaceItem,
      locale,
      BackspaceOutlined
    }
  }
})
</script>
