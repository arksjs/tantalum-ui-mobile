<template>
  <fx-group title="基础用法">
    <fx-timeline>
      <fx-timeline-item title="成功获得0.01元收益"
        >搞半天就这点？</fx-timeline-item
      >
      <fx-timeline-item title="十天后到账"
        >0.01元还要十天到账？</fx-timeline-item
      >
      <fx-timeline-item title="爱要不要">不要了，滚。</fx-timeline-item>
    </fx-timeline>
  </fx-group>
  <fx-group title="自定义轴点颜色（color）">
    <fx-timeline>
      <fx-timeline-item dotColor="#52c41a" title="成功获得0.01元收益"
        >搞半天就这点？</fx-timeline-item
      >
      <fx-timeline-item dotColor="#faad14" title="十天后到账"
        >0.01元还要十天到账？</fx-timeline-item
      >
      <fx-timeline-item dotColor="#ff4d4f" title="爱要不要"
        >不要了，滚。</fx-timeline-item
      >
    </fx-timeline>
  </fx-group>
  <fx-group title="自定义轴点（TimelineItem Slot dot）">
    <fx-timeline>
      <fx-timeline-item title="成功获得0.01元收益" content="搞半天就这点？">
        <template #dot>
          <div class="exp-timeline-custom-dot">
            <fx-icon icon="HeartOutlined"></fx-icon>
          </div>
        </template>
      </fx-timeline-item>
      <fx-timeline-item title="十天后到账" content="0.01元还要十天到账？">
        <template #dot>
          <div class="exp-timeline-custom-dot">
            <fx-icon icon="HeartOutlined"></fx-icon>
          </div>
        </template>
      </fx-timeline-item>
      <fx-timeline-item title="爱要不要" content="不要了，滚。">
        <template #dot>
          <div class="exp-timeline-custom-dot">
            <fx-icon icon="HeartOutlined"></fx-icon>
          </div>
        </template>
      </fx-timeline-item>
    </fx-timeline>
  </fx-group>
  <fx-group title="自定义内容（TimelineItem default/title）">
    <fx-timeline dot>
      <fx-timeline-item>
        <template #title>
          【珠海市】快件已送达【正方云创园】，如有疑问请电联：<a
            href="tel:10000"
            >10000</a
          >，感谢您使用中通快递
        </template>
        2021-04-13 12:42:57
      </fx-timeline-item>
      <fx-timeline-item>
        <template #title>
          【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a
          >）
        </template>
        2021-04-13 11:22:16
      </fx-timeline-item>
      <fx-timeline-item title="【珠海市】快件离开【珠海中心】已发往【珠海一部】"
        >2021-04-13 09:04:03</fx-timeline-item
      >
    </fx-timeline>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpTimeline'
})
</script>
