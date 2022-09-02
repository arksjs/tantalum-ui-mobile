<script setup lang="ts">
import { getColorGroups } from '@/helpers/color'
import { showToast } from '@/Toast'
import { showNotify } from '@/Notify'
import { ref } from 'vue'

const primaryColor = ref('')
const colors = ref<string[]>([])

function onSubmitColor() {
  try {
    colors.value = getColorGroups(primaryColor.value)
  } catch (e) {
    showNotify({
      type: 'danger',
      title: (e as Error).message
    })
  }
}
</script>

<template>
  <ak-group title="设置主色">
    <ak-form>
      <ak-form-item name="color" label="颜色值" required>
        <ak-input v-model="primaryColor" focus placeholder="请输入颜色值" />
      </ak-form-item>
      <template #footer>
        <ak-button
          type="primary"
          form-type="submit"
          :color="(colors.length && primaryColor) || undefined"
          @click="onSubmitColor"
          >生成色卡</ak-button
        >
      </template>
    </ak-form>
  </ak-group>
  <ak-group title="色卡列表" v-if="colors.length">
    <ak-copy
      :text="color"
      class="exp-colorCard-item"
      :class="['color-' + (index + 1)]"
      :style="{ backgroundColor: color }"
      v-for="(color, index) in colors"
      :key="color"
      @success="showToast('复制成功')"
    >
      {{ color }}
    </ak-copy>
  </ak-group>
</template>
