<template>
  <ta-group title="基础用法">
    <div class="exp-popover-box">
      <ta-button
        size="small"
        id="popoverLeft"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverLeft'), (visible = true)"
      >
        左
      </ta-button>
      <ta-button
        size="small"
        id="popoverCenter"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverCenter'), (visible = true)"
      >
        中
      </ta-button>
      <ta-button
        size="small"
        id="popoverRight"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverRight'), (visible = true)"
      >
        右
      </ta-button>
    </div>
  </ta-group>
  <ta-group title="方向 placement=top/bottom/left/right">
    <div class="exp-popover-box2">
      <div>
        <ta-button
          size="small"
          id="popoverTop2"
          shape="circle"
          icon="UpOutlined"
          @click=";(placement = 'top'), (selector = '#popoverTop2'), (visible = true)"
        >
          上
        </ta-button>
      </div>
      <div>
        <ta-button
          size="small"
          id="popoverLeft2"
          shape="circle"
          icon="LeftOutlined"
          @click=";(placement = 'left'), (selector = '#popoverLeft2'), (visible = true)"
        >
          左
        </ta-button>
        <ta-button
          class="exp-popover-box2-ml"
          size="small"
          id="popoverRight2"
          shape="circle"
          icon="RightOutlined"
          @click=";(placement = 'right'), (selector = '#popoverRight2'), (visible = true)"
        >
          右
        </ta-button>
      </div>
      <div>
        <ta-button
          size="small"
          id="popoverBottom2"
          shape="circle"
          icon="DownOutlined"
          @click=";(placement = 'bottom'), (selector = '#popoverBottom2'), (visible = true)"
        >
          下
        </ta-button>
      </div>
    </div>
  </ta-group>
  <ta-group title="带选项">
    <ta-cell label="长文案">
      <ta-button
        size="small"
        id="popoverLongContent"
        shape="circle"
        icon="PlusOutlined"
        @click="
          ;(selector = '#popoverLongContent'),
            (content = '这是气泡内容这是气泡内容这是气泡内容这是气泡内容这是气泡内容这是气泡内容'),
            (visible = true)
        "
      >
      </ta-button>
    </ta-cell>
    <ta-cell label="不展示蒙层">
      <ta-button
        size="small"
        id="popoverNoMask"
        shape="circle"
        icon="PlusOutlined"
        @click="onShowNoMask"
      >
      </ta-button>
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="visible-state-change">
      <ta-button
        size="small"
        id="popoverEvent"
        shape="circle"
        icon="PlusOutlined"
        @click=";(selector = '#popoverEvent'), (visibleEvent = true), (visible = true)"
      >
      </ta-button>
    </ta-cell>
  </ta-group>
  <ta-group title="API">
    <ta-cell label="showPopover">
      <ta-button
        size="small"
        id="popoverApi"
        shape="circle"
        icon="PlusOutlined"
        @click="onCallApi('#popoverApi')"
      >
      </ta-button>
    </ta-cell>
  </ta-group>
  <ta-popover
    v-model:visible="visible"
    :selector="selector"
    :placement="placement"
    :content="content"
    @visibleStateChange="onVisibleStateChange"
  >
  </ta-popover>
  <ta-popover
    v-model:visible="noMaskVisible"
    selector="#popoverNoMask"
    :showMask="false"
    content="无蒙层气泡内容"
  >
  </ta-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { showToast, showPopover, type PlacementType, type PopupOnVisibleStateChange } from '@/index'

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
