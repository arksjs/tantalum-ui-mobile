import { getCurrentInstance, onMounted } from 'vue'
import { capitalize, kebabCase2CamelCase } from '../helpers/util'
import Exception from '../helpers/exception'

function getComponentName(name: string) {
  return capitalize(kebabCase2CamelCase(name).replace(/^ak/i, ''))
}

function getListAndItemName(name: string) {
  const listName = name === 'Step' ? 'Steps' : name.replace('Item', '')
  const itemName = listName === 'Steps' ? 'Step' : listName + 'Item'

  return {
    listName,
    itemName
  }
}

export function useException() {
  const instance = getCurrentInstance()

  // 处理组件名称
  let source = ''

  function updateSource() {
    source = getComponentName(instance?.type.name ?? '')
  }

  updateSource()

  onMounted(() => updateSource())

  function printError(message: string) {
    console.error(new Exception(message, Exception.TYPE.DEFAULT, source))
  }

  function printWarn(message: string) {
    console.warn(new Exception(message, Exception.TYPE.DEFAULT, source).message)
  }

  /**
   * 打印组件prop错误
   * @param message 错误信息
   */
  function printPropError(message: string) {
    console.error(new Exception(message, Exception.TYPE.PROP_ERROR, source))
  }

  /**
   * 打印组件参数错误
   * @param message
   */
  function printParamError(message: string) {
    console.error(new Exception(message, Exception.TYPE.PARAM_ERROR, source))
  }

  function printListItemNotFoundError(key: string, isProp = false) {
    const msg = `The "${source}Item[${key}]" not found.`

    isProp ? printPropError(msg) : printParamError(msg)
  }

  function printNotInOptionsError(key: string, isProp = false) {
    const msg = `The "options[${key}]" not found.`

    isProp ? printPropError(msg) : printParamError(msg)
  }

  function printItemIsolationWarn() {
    const { listName, itemName } = getListAndItemName(source)

    printWarn(`${itemName} is not in ${listName}.`)
  }

  function createException(error: unknown) {
    return new Exception(error, Exception.TYPE.DEFAULT, source)
  }

  return {
    printWarn,
    printError,
    printPropError,
    printParamError,
    printListItemNotFoundError,
    printNotInOptionsError,

    printItemIsolationWarn,

    createException
  }
}
