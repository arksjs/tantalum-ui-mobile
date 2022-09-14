import IndexPlugin from './index'
import * as Components from './components'
import * as apis from './components/api'

export default Object.assign(
  {
    install: IndexPlugin.install
  },
  Components,
  apis
)
