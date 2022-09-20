<template>
  <ak-group title="基础用法">
    <ak-collapse v-model:activeNames="activeNames">
      <ak-collapse-item title="标题1" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="标题2" name="row2">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="标题3" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
    </ak-collapse>
  </ak-group>
  <ak-group title="手风琴">
    <ak-collapse v-model:activeNames="activeNames2" accordion>
      <ak-collapse-item title="标题1" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="标题2" name="row2">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="标题3" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
    </ak-collapse>
  </ak-group>
  <ak-group title="其他">
    <ak-collapse v-model:activeNames="activeNames3">
      <ak-collapse-item title="默认展开" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="和 Cell 组合" name="row2">
        <ak-cell label="单元格" content="内容"></ak-cell>
        <ak-cell label="单元格" content="内容" description="描述信息"></ak-cell>
      </ak-collapse-item>
      <ak-collapse-item title="带图标" icon="MenuOutlined" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="禁用" disabled icon="StopOutlined" name="row4">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
    </ak-collapse>
  </ak-group>
  <ak-group title="Collapse 的事件 change">
    <ak-collapse v-model:activeNames="activeNames4" @change="onChange">
      <ak-collapse-item title="标题1" name="第1项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="标题2" name="第2项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
      <ak-collapse-item title="标题3" name="第3项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
    </ak-collapse>
  </ak-group>
  <ak-group title="CollapseItem 的事件 toggle">
    <ak-collapse>
      <ak-collapse-item title="标题1" name="row1" @toggle="onToggle">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ak-collapse-item>
    </ak-collapse>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  showToast,
  type CollapseOnChange,
  type CollapseItemOnToggle
} from '@/index'

export default defineComponent({
  name: 'ExpCollapse',
  data() {
    return {
      activeNames: [],
      activeNames2: [],
      activeNames3: ['row1'],
      activeNames4: []
    }
  },
  setup() {
    const onChange: CollapseOnChange = activeNames => {
      console.log('change', activeNames)
      showToast(
        (activeNames.length > 0 ? activeNames.join('，') : '没有项') + '展开'
      )
    }

    const onToggle: CollapseItemOnToggle = res => {
      console.log('toggle', res)
      showToast(res.spread ? '展开' : '收起')
    }

    return {
      onChange,
      onToggle
    }
  }
})
</script>
