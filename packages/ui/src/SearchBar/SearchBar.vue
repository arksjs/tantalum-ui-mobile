<template>
  <div :class="classes">
    <form
      :class="innerClasses"
      @submit.prevent="onSearch(searchText)"
      ref="innerEl"
      :style="innerStyles"
    >
      <TaInput
        :class="fieldClasses"
        :placeholder="placeholder"
        type="search"
        :readonly="readonly"
        v-model="searchText"
        :focus="focus"
        :maxlength="maxlength"
        showClear
        @input="onInput"
        @focus="proxyEvent"
        @blur="proxyEvent"
        @click="onClick"
      >
        <template #prepend>
          <Icon :icon="SearchOutlined" />
        </template>
      </TaInput>
      <button class="ta-search_button">Search</button>
      <TaButton
        class="ta-search_cancel-button"
        size="middle"
        type="default"
        formType="button"
        pattern="borderless"
        :ghost="ghost"
        :transparent="!ghost"
        v-if="showCancel"
        @click="onCancel"
      >
        {{ locale.searchBarCancelText }}
      </TaButton>
    </form>
    <Dropdown :selector="innerEl ?? undefined" v-if="initDropdown" v-model:visible="suggestVisible">
      <template #default="{ height }">
        <div class="ta-search_suggest" :style="getSuggestStyles(height)">
          <div class="ta-search_suggest-list" v-if="suggestList.length > 0">
            <Cell
              v-for="item in suggestList"
              :key="item.text"
              class="ta-search_suggest-item"
              clickable
              @click="onSuggestItemClick(item.text)"
            >
              <template #label>
                <div class="ta-search_suggest-item-text" v-html="highlightText(item.text)"></div>
              </template>
              <Tag size="middle" v-for="tag in item.tags" :key="tag">{{ tag }}</Tag>
            </Cell>
          </div>
          <div class="ta-search_suggest-empty" v-if="showEmpty">
            <slot name="empty">
              <Empty :description="emptyText" type="search" />
            </slot>
          </div>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
  type PropType
} from 'vue'
import { Icon } from '../Icon'
import { Input as TaInput } from '../Input'
import { Button as TaButton } from '../Button'
import { Dropdown } from '../Dropdown'
import { Cell } from '../Cell'
import { Tag } from '../Tag'
import { Empty } from '../Empty'
import {
  isString,
  isStringArray,
  isStringOrStringArray,
  emitClickValidator,
  type VoidFnToBooleanFn,
  type PropsToEmits,
  isStringOrNumber
} from '../helpers'
import { useLocale } from '../ConfigProvider/context'
import type { OnInput, SearchBarEmits, SuggestItem, SuggestList } from './types'
import SearchOutlined from '../Icon/icons/SearchOutlined'
import {
  getClasses,
  getFieldClasses,
  getInnerClasses,
  getInnerStyles,
  getSuggestStyles
} from './util'

type Placeholders = string | string[]

const emitValidator: VoidFnToBooleanFn<OnInput> = (payload, setSuggestList) =>
  isString(payload) && typeof setSuggestList === 'function'

export default defineComponent({
  name: 'ta-search-bar',
  components: { Icon, TaInput, TaButton, Dropdown, Cell, Tag, Empty },
  props: {
    ghost: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 100
    },
    // 背景颜色
    background: {
      type: String
    },
    placeholders: {
      type: [String, Array] as PropType<Placeholders>,
      validator: isStringOrStringArray,
      default: () => [] as string[]
    },
    placeholderInterval: {
      type: Number,
      default: 5000
    },
    inputMode: {
      type: Boolean,
      default: false
    },
    // 是否高亮搜索匹配的文本
    highlight: {
      type: Boolean,
      default: false
    },
    // 搜索为空时显示的文本
    emptyText: {
      type: String
    }
  },
  emits: {
    cancelClick: emitClickValidator,
    input: emitValidator,
    focus: emitValidator,
    blur: emitValidator,
    search: payload => payload && isString(payload.text) && isString(payload.source),
    fieldClick: payload => payload && isString(payload.text)
  } as PropsToEmits<SearchBarEmits>,
  setup(props, { emit, slots }) {
    const { locale } = useLocale()
    const placeholder = ref('')
    const searchText = ref('')
    const initDropdown = ref(false)
    const suggestVisible = ref(false)
    const suggestList = ref<SuggestItem[]>([])
    const innerEl = shallowRef<HTMLFormElement | null>(null)

    const showEmpty = computed(() => {
      return !!(
        suggestList.value.length === 0 &&
        searchText.value &&
        (props.emptyText || slots.empty)
      )
    })

    function proxyEvent(e: Event) {
      emitHook(e.type, searchText.value)
    }

    function onInput(text: string) {
      emitHook('input', text)
    }

    const emitHook = (type: string, text: string) => {
      emit(type as 'input', text, res => {
        setSuggestList(res, text !== searchText.value)
      })
    }

    function setSuggestList(res: SuggestList, expired: boolean) {
      if (expired) {
        return
      }

      const newList: SuggestItem[] = []

      if (Array.isArray(res)) {
        res.forEach(v => {
          if (isStringOrNumber(v)) {
            newList.push({
              text: v.toString(),
              tags: []
            })
          } else if (v) {
            if (isStringOrNumber(v.text)) {
              v.text = v.text.toString()
              v.tags = isStringArray(v.tags) ? v.tags : []
              newList.push(v)
            }
          }
        })
      }

      suggestList.value = newList
      if (newList.length > 0 || showEmpty.value) {
        initDropdown.value = true
        suggestVisible.value = true
      } else {
        suggestVisible.value = false
      }
    }

    function onSearch(text: string, source = 'search') {
      suggestVisible.value = false

      if (text === '' && placeholder.value) {
        searchText.value = text = placeholder.value
      }

      emit('search', {
        text,
        source
      })
    }

    function onSuggestItemClick(text: string | number) {
      searchText.value = text.toString()

      onSearch(text.toString(), 'suggest')
    }

    function onCancel(e: MouseEvent) {
      emit('cancelClick', e)
    }

    function onClick() {
      emit('fieldClick', {
        text: searchText.value || placeholder.value || ''
      })
    }

    let phTimer: number
    let phIndex = 0
    let phs: string[] = []
    let isTimerReady = false

    const phsStart = () => {
      phsStop()

      if (isTimerReady && phs.length > 1) {
        phTimer = window.setTimeout(() => {
          phIndex = (phIndex + 1) % phs.length
          placeholder.value = phs[phIndex]
          phsStart()
        }, props.placeholderInterval)
      }
    }

    const phsStop = () => clearTimeout(phTimer)

    watch(
      () => props.placeholders,
      (val: Placeholders) => {
        phsStop()

        if (isString(val)) {
          placeholder.value = val
          phs = [val]
        } else if (isStringArray(val) && val.length > 0) {
          phIndex = 0
          placeholder.value = val[phIndex]
          phs = val

          phsStart()
        } else {
          placeholder.value = ''
          phs = []
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    function highlightText(text: number | string) {
      if (!props.highlight) {
        return text.toString().trim()
      }

      return text
        .toString()
        .trim()
        .replace(
          new RegExp(searchText.value, 'gi'),
          match => `<span class="highlight">${match}</span>`
        )
    }

    onBeforeMount(() => {
      isTimerReady = true
      phsStart()
    })

    onBeforeUnmount(() => phsStop())

    const classes = computed(() => getClasses(props.inputMode))
    const innerClasses = computed(() => getInnerClasses(props.showCancel))
    const innerStyles = computed(() => getInnerStyles(props.background))
    const fieldClasses = computed(() => getFieldClasses(props.ghost))

    return {
      classes,
      innerClasses,
      innerStyles,
      fieldClasses,
      getSuggestStyles,
      placeholder,
      initDropdown,
      suggestVisible,
      suggestList,
      searchText,
      proxyEvent,
      onInput,
      onSearch,
      onSuggestItemClick,
      onCancel,
      onClick,
      locale,
      setSuggestList: (res: SuggestList) => setSuggestList(res, false),
      SearchOutlined,
      innerEl,
      highlightText,
      showEmpty
    }
  }
})
</script>
