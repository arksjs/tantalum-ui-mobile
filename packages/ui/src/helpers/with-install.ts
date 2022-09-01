import type { App } from 'vue'
import type { SFCWithInstall } from './types'
import { noop } from './util'

export const withInstall = function <T>(component: T) {
  const _component: SFCWithInstall<T> = Object.assign(component, {
    install(app: App) {
      app.component((component as any).name, component)
    }
  })

  return _component
}

export const multiWithInstall = function <T>(
  component: T,
  moreComponents: any[]
) {
  const _component: SFCWithInstall<T> = Object.assign(component, {
    install(app: App) {
      app.component((component as any).name, component)

      moreComponents.forEach(moreComponent => {
        app.component(moreComponent.name, moreComponent)
      })
    }
  })

  return _component
}

export const withNoopInstall = function <T>(component: T) {
  const _component: SFCWithInstall<T> = Object.assign(component, {
    install: noop
  })

  return _component
}
