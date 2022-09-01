import DefaultTheme from 'vitepress/theme'
import CodeDemo from './CodeDemo.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  enhanceApp({ app }) {
    app.component('CodeDemo', CodeDemo)
  }
}
