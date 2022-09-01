<template>
  <fx-group title="基础用法">
    <fx-cell label="基础">
      <fx-button
        size="small"
        id="popMenu"
        shape="circle"
        icon="MenuOutlined"
        @click=";(selector = '#popMenu'), (visible = true)"
      >
      </fx-button>
    </fx-cell>
    <fx-cell label="不展示蒙层">
      <fx-button
        size="small"
        id="popMenuNoMask"
        shape="circle"
        icon="MenuOutlined"
        @click="visible3 = true"
      >
      </fx-button>
    </fx-cell>
  </fx-group>
  <fx-group title="方向 placement=top/bottom/left/right">
    <div class="exp-popover-box2">
      <div>
        <fx-button
          size="small"
          id="popMenuTop2"
          shape="circle"
          icon="UpOutlined"
          @click="
            ;(placement2 = 'top'),
              (selector2 = '#popMenuTop2'),
              (visible2 = true)
          "
        >
          上
        </fx-button>
      </div>
      <div>
        <fx-button
          size="small"
          id="popMenuLeft2"
          shape="circle"
          icon="LeftOutlined"
          @click="
            ;(placement2 = 'left'),
              (selector2 = '#popMenuLeft2'),
              (visible2 = true)
          "
        >
          左
        </fx-button>
        <fx-button
          class="exp-popover-box2-ml"
          size="small"
          id="popMenuRight2"
          shape="circle"
          icon="RightOutlined"
          @click="
            ;(placement2 = 'right'),
              (selector2 = '#popMenuRight2'),
              (visible2 = true)
          "
        >
          右
        </fx-button>
      </div>
      <div>
        <fx-button
          size="small"
          id="popMenuBottom2"
          shape="circle"
          icon="DownOutlined"
          @click="
            ;(placement2 = 'bottom'),
              (selector2 = '#popMenuBottom2'),
              (visible2 = true)
          "
        >
          下
        </fx-button>
      </div>
    </div>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="confirm/cancel">
      <fx-button
        size="small"
        id="popMenuEvent"
        shape="circle"
        icon="MenuOutlined"
        @click="
          ;(selector = '#popMenuEvent'), (showEvent = true), (visible = true)
        "
      >
      </fx-button>
    </fx-cell>
    <fx-cell label="visible-state-change">
      <fx-button
        size="small"
        id="popMenuPopupEvent"
        shape="circle"
        icon="MenuOutlined"
        @click="
          ;(selector = '#popMenuPopupEvent'),
            (visibleEvent = true),
            (visible = true)
        "
      >
      </fx-button>
    </fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showPopMenu">
      <fx-button
        size="small"
        id="popMenuApi"
        shape="circle"
        icon="MenuOutlined"
        @click="onCallApi('#popMenuApi')"
      >
      </fx-button>
    </fx-cell>
  </fx-group>
  <fx-pop-menu
    v-model:visible="visible"
    :selector="selector"
    :options="options"
    @confirm="onConfirm"
    @cancel="onCancel"
    @visibleStateChange="onVisibleStateChange"
  >
  </fx-pop-menu>
  <fx-pop-menu
    v-model:visible="visible2"
    :selector="selector2"
    :placement="placement2"
    :options="options"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </fx-pop-menu>
  <fx-pop-menu
    v-model:visible="visible3"
    selector="#popMenuNoMask"
    :options="options"
    :showMask="false"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </fx-pop-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  showToast,
  showDialog,
  showPopMenu,
  PopupOnVisibleStateChange,
  PopMenuOnConfirm,
  PopupOnCancel,
  PlacementType
} from '@/index'

export default defineComponent({
  name: 'ExpPopMenu',
  setup() {
    const visible = ref(false)
    const selector = ref('')
    const placement2 = ref<PlacementType>('bottom')
    const visible2 = ref(false)
    const selector2 = ref('')
    const visible3 = ref(false)
    const showEvent = ref(false)
    const visibleEvent = ref(false)

    const options = [
      {
        icon: 'HeartOutlined',
        name: '爱心'
      },
      {
        icon: 'StarOutlined',
        name: '星星'
      },
      {
        icon: 'CircleOutlined',
        name: '圈圈',
        disabled: true
      }
    ]

    const onVisibleStateChange: PopupOnVisibleStateChange = res => {
      if (visibleEvent.value) {
        console.log('visible-state-change', res)
        showToast(`${res.state} 事件触发`)
      }
      if (res.state === 'hidden') {
        visibleEvent.value = false
        showEvent.value = false
      }
    }

    const onConfirm: PopMenuOnConfirm = res => {
      if (showEvent.value) {
        console.log('confirm', res)
        showDialog({
          title: '选择了',
          showCancel: false,
          content: `item.name: '${res.item.name}'\nindex: ${res.index}`
        })
      }
    }

    const onCancel: PopupOnCancel = res => {
      if (showEvent.value) {
        console.log('cancel', res)
        showToast('取消了')
      }
    }

    function onCallApi(selector: string) {
      showPopMenu({
        selector,
        options: options,
        placement: 'top',
        success: res => {
          console.log('success', res)
          if (res.confirm) {
            showToast(`选择了 ${res.detail.item.name}`)
          } else {
            showToast('取消了')
          }
        }
      })
    }

    return {
      visible,
      selector,

      placement2,
      visible2,
      selector2,

      visible3,

      options,

      showEvent,
      visibleEvent,

      onVisibleStateChange,
      onConfirm,
      onCancel,
      onCallApi
    }
  }
})
</script>
