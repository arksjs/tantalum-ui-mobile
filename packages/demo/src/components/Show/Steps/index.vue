<template>
  <ak-group title="基础用法">
    <ak-steps v-model:activeIndex="stepIndex">
      <ak-step v-for="(item, index) in steps" :key="index" :title="item.title">
        {{ item.content }}
      </ak-step>
    </ak-steps>
  </ak-group>
  <ak-group title="小点模式">
    <ak-steps v-model:activeIndex="stepIndex" dot>
      <ak-step v-for="(item, index) in steps" :key="index" :title="item.title">
        {{ item.content }}
      </ak-step>
    </ak-steps>
  </ak-group>
  <ak-group title="自定义图标">
    <ak-steps v-model:activeIndex="stepIndex">
      <ak-step v-for="(item, index) in steps" :key="index" :title="item.title">
        <template #step="{ finish, active }">
          <ak-icon v-if="finish" icon="CheckOutlined"></ak-icon>
          <ak-icon v-else-if="active" icon="LoadingOutlined" spin></ak-icon>
        </template>
        {{ item.content }}
      </ak-step>
    </ak-steps>
  </ak-group>
  <ak-group title="横向">
    <ak-steps v-model:activeIndex="stepIndex" horizontal>
      <ak-step v-for="(item, index) in steps" :key="index" :title="item.title">
        {{ item.content }}
      </ak-step>
    </ak-steps>
  </ak-group>
  <ak-group title="横向（不要标题 & 小点）">
    <ak-steps :activeIndex="1" horizontal dot>
      <ak-step v-for="(item, index) in orderSteps" :key="index">{{
        item.content
      }}</ak-step>
    </ak-steps>
  </ak-group>
  <ak-group title="Slot title">
    <ak-steps>
      <ak-step title="【珠海市】快件已送达【正方云创园】，感谢您使用中通快递">
        2021-04-13 12:42:57
      </ak-step>
      <ak-step>
        <template #title>
          【珠海市】【珠海一部】快递小哥正在派件（<a href="tel:10000">10000</a
          >）
        </template>
        2021-04-13 11:22:16
      </ak-step>
      <ak-step title="【珠海市】快件离开【珠海中心】已发往【珠海一部】">
        2021-04-13 09:04:03
      </ak-step>
    </ak-steps>
  </ak-group>
  <ak-fixed>
    <div class="exp-steps-next">
      <ak-button
        @click="stepIndex = (stepIndex + 1) % steps.length"
        type="primary"
      >
        下一步
      </ak-button>
    </div>
  </ak-fixed>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ExpSteps',
  setup() {
    const stepIndex = ref(1)

    return {
      stepIndex,
      steps: [
        {
          title: '已完成',
          content: '这一步过了哈'
        },
        {
          title: '进行中',
          content: '目前到这一步'
        },
        {
          title: '待处理',
          content: '还没到这一步'
        }
      ],

      orderSteps: [
        {
          content: '买家下单'
        },
        {
          content: '商家接单'
        },
        {
          content: '商家发货'
        },
        {
          content: '买家提货'
        },
        {
          content: '交易完成'
        }
      ]
    }
  }
})
</script>
