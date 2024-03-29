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
        <div :style="getSuggestStyles(height)">
          <div class="ta-search_suggest-list">
            <Cell
              v-for="item in suggestList"
              :key="item.text"
              :label="item.text.toString()"
              class="ta-search_suggest-item"
              clickable
              @click="onSuggestItemClick(item.text)"
            >
              <Tag size="middle" v-for="tag in item.tags" :key="tag">{{ tag }}</Tag>
            </Cell>
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
  components: { Icon, TaInput, TaButton, Dropdown, Cell, Tag },
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
  setup(props, { emit }) {
    const { locale } = useLocale()
    const placeholder = ref('')
    const searchText = ref('')
    const initDropdown = ref(false)
    const suggestVisible = ref(false)
    const suggestList = ref<SuggestItem[]>([])
    const innerEl = shallowRef<HTMLFormElement | null>(null)

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

      if (newList.length > 0) {
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
      innerEl
    }
  }
})
</script>
