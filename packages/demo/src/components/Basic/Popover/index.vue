<template>
  <fx-group title="基础用法">
    <div class="exp-popover-box">
      <fx-button
        size="small"
        id="popoverLeft"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverLeft'), (visible = true)"
      >
        左
      </fx-button>
      <fx-button
        size="small"
        id="popoverCenter"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverCenter'), (visible = true)"
      >
        中
      </fx-button>
      <fx-button
        size="small"
        id="popoverRight"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverRight'), (visible = true)"
      >
        右
      </fx-button>
    </div>
  </fx-group>
  <fx-group title="方向 placement=top/bottom/left/right">
    <div class="exp-popover-box2">
      <div>
        <fx-button
          size="small"
          id="popoverTop2"
          shape="circle"
          icon="UpOutlined"
          @click="
            ;(placement = 'top'), (selector = '#popoverTop2'), (visible = true)
          "
        >
          上
        </fx-button>
      </div>
      <div>
        <fx-button
          size="small"
          id="popoverLeft2"
          shape="circle"
          icon="LeftOutlined"
          @click="
            ;(placement = 'left'),
              (selector = '#popoverLeft2'),
              (visible = true)
          "
        >
          左
        </fx-button>
        <fx-button
          class="exp-popover-box2-ml"
          size="small"
          id="popoverRight2"
          shape="circle"
          icon="RightOutlined"
          @click="
            ;(placement = 'right'),
              (selector = '#popoverRight2'),
              (visible = true)
          "
        >
          右
        </fx-button>
      </div>
      <div>
        <fx-button
          size="small"
          id="popoverBottom2"
          shape="circle"
          icon="DownOutlined"
          @click="
            ;(placement = 'bottom'),
              (selector = '#popoverBottom2'),
              (visible = true)
          "
        >
          下
        </fx-button>
      </div>
    </div>
  </fx-group>
  <fx-group title="带选项">
    <fx-cell label="长文案">
      <fx-button
        size="small"
        id="popoverLongContent"
        shape="circle"
        icon="PlusOutlined"
        @click="
          ;(selector = '#popoverLongContent'),
            (content =
              '这是气泡内容这是气泡内容这是气泡内容这是气泡内容这是气泡内容这是气泡内容'),
            (visible = true)
        "
      >
      </fx-button>
    </fx-cell>
    <fx-cell label="不展示蒙层">
      <fx-button
        size="small"
        id="popoverNoMask"
        shape="circle"
        icon="PlusOutlined"
        @click="onShowNoMask"
      >
      </fx-button>
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="visible-state-change">
      <fx-button
        size="small"
        id="popoverEvent"
        shape="circle"
        icon="PlusOutlined"
        @click="
          ;(selector = '#popoverEvent'), (visibleEvent = true), (visible = true)
        "
      >
      </fx-button>
    </fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showPopover">
      <fx-button
        size="small"
        id="popoverApi"
        shape="circle"
        icon="PlusOutlined"
        @click="onCallApi('#popoverApi')"
      >
      </fx-button>
    </fx-cell>
  </fx-group>
  <fx-popover
    v-model:visible="visible"
    :selector="selector"
    :placement="placement"
    :content="content"
    @visibleStateChange="onVisibleStateChange"
  >
  </fx-popover>
  <fx-popover
    v-model:visible="noMaskVisible"
    selector="#popoverNoMask"
    :showMask="false"
    content="无蒙层气泡内容"
  >
  </fx-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  showToast,
  showPopover,
  PlacementType,
  PopupOnVisibleStateChange
} from '@/index'

export default defineComponent({
  name: 'ExpPopover',
  setup() {
    const visible = ref(false)
    const noMaskVisible = ref(false)
    const visibleEvent = ref(false)
    const selector = ref('')
    const content = ref('这是气泡内容')
    const placement = ref<PlacementType>('bottom')

    function onShowNoMask() {
      noMaskVisible.value = true
      setTimeout(() => {
        noMaskVisible.value = false
      }, 5000)
    }

    const onVisibleStateChange: PopupOnVisibleStateChange = res => {
      if (visibleEvent.value) {
        console.log('visible-state-change', res)
        showToast(`${res.state} 事件触发`)
      }
      if (res.state === 'hidden') {
        selector.value = ''
        placement.value = 'bottom'
        content.value = '这是气泡内容'
        visibleEvent.value = false
      }
    }

    function onCallApi(selector: string) {
      showPopover({
        selector,
        content: '这是气泡内容',
        placement: 'top',
        success: res => {
          console.log('success', res)
        }
      })
    }
    return {
      visible,
      noMaskVisible,
      visibleEvent,

      selector,
      content,
      placement,

      onShowNoMask,
      onVisibleStateChange,
      onCallApi
    }
  }
})
</script>
