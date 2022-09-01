<script setup lang="ts">
import { getColorGroups } from '@/helpers/color'
import { showToast } from '@/Toast'
import { showNotify } from '@/Notify'
import { ref } from 'vue'

function getThemeColorCode(name: string, color: string, isDefault = true) {
  const colors = getColorGroups(color)
  const noDefault = isDefault ? '' : ' !default'

  return `
$${name}-color-1: ${colors[0]}${noDefault};
$${name}-color-2: ${colors[1]}${noDefault};
$${name}-color-3: ${colors[2]}${noDefault};
$${name}-color-4: ${colors[3]}${noDefault};
$${name}-color-5: ${colors[4]}${noDefault};
$${name}-color-6: ${colors[5]}${noDefault};
$${name}-color-7: ${colors[6]}${noDefault};
$${name}-color-8: ${colors[7]}${noDefault};
$${name}-color-9: ${colors[8]}${noDefault};
$${name}-color-10: ${colors[9]}${noDefault};
`
}

const primary = ref('#125c9b')
const success = ref('#057748')
const warning = ref('#96480c')
const danger = ref('#b2252e')
const themeCode = ref('')

function onCreateColor() {
  try {
    const code = [
      getThemeColorCode('primary', primary.value, true),
      getThemeColorCode('success', success.value, true),
      getThemeColorCode('warning', warning.value, true),
      getThemeColorCode('danger', danger.value, true)
    ].join('')

    themeCode.value = code
    console.log(code)
  } catch (e) {
    showNotify({
      type: 'danger',
      title: (e as Error).message
    })
  }
}
</script>

<template>
  <fx-group title="设置主题颜色">
    <fx-form>
      <fx-form-item name="primary" label="primary 色" required>
        <fx-input v-model="primary" />
      </fx-form-item>
      <fx-form-item name="success" label="success 色" required>
        <fx-input v-model="success" />
      </fx-form-item>
      <fx-form-item name="warning" label="warning 色" required>
        <fx-input v-model="warning" />
      </fx-form-item>
      <fx-form-item name="danger" label="danger 色" required>
        <fx-input v-model="danger" />
      </fx-form-item>
      <template #footer>
        <fx-button type="primary" @click="onCreateColor">生成主题</fx-button>
      </template>
    </fx-form>
    <div class="exp-customTheme-code" v-if="themeCode">
      <pre>
      {{ themeCode }}
      </pre>
      <fx-copy @success="showToast('复制成功')" :text="themeCode"
        >复制代码
      </fx-copy>
    </div>
  </fx-group>
</template>
