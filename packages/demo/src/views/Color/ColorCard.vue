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
  <ta-group title="设置主色">
    <ta-form>
      <ta-form-item name="color" label="颜色值" required>
        <ta-input v-model="primaryColor" focus placeholder="请输入颜色值" />
      </ta-form-item>
      <template #footer>
        <ta-button
          type="primary"
          form-type="submit"
          :color="(colors.length && primaryColor) || undefined"
          @click="onSubmitColor"
          >生成色卡</ta-button
        >
      </template>
    </ta-form>
  </ta-group>
  <ta-group title="色卡列表" v-if="colors.length">
    <ta-copy
      :text="color"
      class="exp-colorCard-item"
      :class="['color-' + (index + 1)]"
      :style="{ backgroundColor: color }"
      v-for="(color, index) in colors"
      :key="color"
      @success="showToast('复制成功')"
    >
      {{ color }}
    </ta-copy>
  </ta-group>
</template>
