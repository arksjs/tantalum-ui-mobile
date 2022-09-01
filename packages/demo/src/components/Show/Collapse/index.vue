<template>
  <fx-group title="基础用法">
    <fx-collapse v-model:activeNames="activeNames">
      <fx-collapse-item title="标题1" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="标题2" name="row2">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="标题3" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
    </fx-collapse>
  </fx-group>
  <fx-group title="手风琴">
    <fx-collapse v-model:activeNames="activeNames2" accordion>
      <fx-collapse-item title="标题1" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="标题2" name="row2">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="标题3" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
    </fx-collapse>
  </fx-group>
  <fx-group title="其他">
    <fx-collapse v-model:activeNames="activeNames3">
      <fx-collapse-item title="默认展开" name="row1">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="和 Cell 组合" name="row2">
        <fx-cell label="单元格" content="内容"></fx-cell>
        <fx-cell label="单元格" content="内容" description="描述信息"></fx-cell>
      </fx-collapse-item>
      <fx-collapse-item title="带图标" icon="MenuOutlined" name="row3">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="禁用" disabled icon="StopOutlined" name="row4">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
    </fx-collapse>
  </fx-group>
  <fx-group title="Collapse 的事件 change">
    <fx-collapse v-model:activeNames="activeNames4" @change="onChange">
      <fx-collapse-item title="标题1" name="第1项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="标题2" name="第2项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
      <fx-collapse-item title="标题3" name="第3项">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
    </fx-collapse>
  </fx-group>
  <fx-group title="CollapseItem 的事件 toggle">
    <fx-collapse>
      <fx-collapse-item title="标题1" name="row1" @toggle="onToggle">
        <div class="exp-collapse-pad">
          代码是写出来给人看的，附带能在机器上运行
        </div>
      </fx-collapse-item>
    </fx-collapse>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast, CollapseOnChange, CollapseItemOnToggle } from '@/index'

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
