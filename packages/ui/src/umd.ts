import IndexPlugin from './index'
import * as componentPlugins from './components/install'
import * as apis from './components/api'

export default Object.assign(
  {
    install: IndexPlugin.install
  },
  componentPlugins,
  apis
)
