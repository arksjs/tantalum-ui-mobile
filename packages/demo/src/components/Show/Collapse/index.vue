<template>
  <ta-group title="基础用法">
    <ta-collapse v-model="activeNames">
      <ta-collapse-item title="标题1" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="标题2" name="row2">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="标题3" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
    </ta-collapse>
  </ta-group>
  <ta-group title="手风琴">
    <ta-collapse v-model="activeNames2" accordion>
      <ta-collapse-item title="标题1" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="标题2" name="row2">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="标题3" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
    </ta-collapse>
  </ta-group>
  <ta-group title="其他">
    <ta-collapse v-model="activeNames3">
      <ta-collapse-item title="默认展开" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="和 Cell 组合" name="row2">
        <ta-cell label="单元格" content="内容"></ta-cell>
        <ta-cell label="单元格" content="内容" description="描述信息"></ta-cell>
      </ta-collapse-item>
      <ta-collapse-item title="带图标" icon="MenuOutlined" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="禁用" disabled icon="StopOutlined" name="row4">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
    </ta-collapse>
  </ta-group>
  <ta-group title="Collapse 的事件 change">
    <ta-collapse v-model="activeNames4" @change="onChange">
      <ta-collapse-item title="标题1" name="第1项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="标题2" name="第2项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
      <ta-collapse-item title="标题3" name="第3项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
    </ta-collapse>
  </ta-group>
  <ta-group title="CollapseItem 的事件 toggle">
    <ta-collapse>
      <ta-collapse-item title="标题1" name="row1" @toggle="onToggle">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </ta-collapse-item>
    </ta-collapse>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
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
      activeNames4: reactive([])
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
