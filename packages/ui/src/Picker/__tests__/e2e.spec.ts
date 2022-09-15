import { describe, test, expect, beforeEach } from 'vitest'
import { timeout } from '@arksjs/test-utils/utils'
import { E2E_TIMEOUT, BASE_URL, setupPuppeteer } from '@arksjs/test-utils/e2e'

describe('e2e: Picker', () => {
  const { page, texts, nextFrame, click } = setupPuppeteer()

  beforeEach(async () => {
    await page().goto(BASE_URL)
    await page().waitForSelector('#app')
  })

  test(
    'test showPicker',
    async () => {
      await page().evaluate(() => {
        // 注：这里是在DevTool运行的代码，不能接受函数外的参数
        const { createApp } = (window as any).Vue
        const ArkUI = (window as any).ArkUI

        createApp({
          template: `
            <button id="button" @click="onShowPicker">showPicker</button>
          `,
          setup: () => {
            const options: number[] = []
            for (let i = 2000; i <= 2020; i++) {
              options.push(i)
            }
            const multiOptions = [options, ['春', '夏', '秋', '冬']]

            function onShowPicker() {
              ArkUI.showPicker({
                options: multiOptions
              })
            }
            return { onShowPicker }
          }
        })
          .use(ArkUI)
          .mount('#app')
      })

      // 点击展开
      await click('#button')
      await nextFrame()
      expect(await texts('.selected')).toStrictEqual(['2000', '春'])

      // 模拟滚动滚动条
      await page().$eval('.ak-picker-view_list', node => (node.scrollTop = 30))
      await timeout(500)
      expect(await texts('.selected')).toStrictEqual(['2001', '春'])
    },
    E2E_TIMEOUT
  )
})
