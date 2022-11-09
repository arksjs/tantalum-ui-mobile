<!--.vitepress/theme/CodeDemo.vue-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

// const demoLink = computed(() => `http://localhost:3001/#/${props.name}?docs=1`)
const demoLink = computed(
  () => `/tantalum-ui-mobile/demo/#/${props.name}?docs=1`
)
</script>

<template>
  <div class="code-demo">
    <div class="code-demo-lt">
      <slot></slot>
    </div>
    <div class="code-demo-rt">
      <iframe class="code-demo-iframe" :src="demoLink" frameborder="0"></iframe>
    </div>
  </div>
</template>
