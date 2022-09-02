import { E2E_TIMEOUT, BASE_URL, setupPuppeteer } from '@arksjs/test-utils/e2e'

describe('e2e: Input', () => {
  const { page, isVisible, typeValue, isFocused, value, focus, blur, timeout } =
    setupPuppeteer()

  beforeEach(async () => {
    await page().goto(BASE_URL)
    await page().waitForSelector('#app')
  })

  test(
    'test input',
    async () => {
      await page().evaluate(() => {
        const { createApp, ref } = (window as any).Vue
        const ArkUI = (window as any).ArkUI
        createApp({
          template: `
            <ak-input type="digit" v-model="inputValue" />
          `,
          setup: () => {
            const inputValue = ref('123')
            return { inputValue }
          }
        })
          .use(ArkUI)
          .mount('#app')
      })

      expect(await value('input')).toBe(`123`)
      await typeValue('input', 'a1234')
      expect(await value('input')).toBe(`1234`)
    },
    E2E_TIMEOUT
  )

  test(
    'test prop focus',
    async () => {
      await page().evaluate(() => {
        const { createApp } = (window as any).Vue
        const ArkUI = (window as any).ArkUI
        createApp({
          template: `
            <ak-input focus />
          `
        })
          .use(ArkUI)
          .mount('#app')
      })

      expect(await isFocused('input')).toBe(true)
    },
    E2E_TIMEOUT
  )

  test(
    'test prop showClear',
    async () => {
      await page().evaluate(() => {
        const { createApp } = (window as any).Vue
        const ArkUI = (window as any).ArkUI
        createApp({
          template: `
            <ak-input show-clear />
          `
        })
          .use(ArkUI)
          .mount('#app')
      })

      // 默认focus 没有 showClear 按钮
      await focus('input')
      expect(await isVisible('.ak-input_clear')).toBe(false)

      // 当出现文字的时候有 showClear 按钮
      await typeValue('input', '123')
      await timeout(200)
      expect(await isVisible('.ak-input_clear')).toBe(true)

      // 当失去焦点的时候没有 showClear 按钮
      await blur('input')
      await timeout(1000)
      expect(await isVisible('.ak-input_clear')).toBe(false)
    },
    E2E_TIMEOUT
  )
})
