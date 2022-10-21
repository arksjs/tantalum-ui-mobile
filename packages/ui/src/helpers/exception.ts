const TYPE = {
  DEFAULT: 'fail',
  PARAM_ERROR: 'Invalid param',
  CONFIG_ERROR: 'Invalid config',
  PROP_ERROR: 'Invalid Prop'
}

/**
 * 错误捕捉类
 */
class Exception extends Error {
  private source: string
  private type: string

  static TYPE = TYPE

  /**
   * 构造
   * @param error 错误
   * @param type 出错类型
   * @param source 出错来源
   */
  constructor(error: unknown, type = TYPE.DEFAULT, source = 'Exception') {
    let msg = 'unknown'

    if (error instanceof Exception) {
      // 继承之前的
      msg = error.message
      type = error.type
      source = error.source
    } else if (error instanceof Error) {
      msg = error.message
    } else if (error != null) {
      msg = (error as string).toString()
    }

    super(`[${source}] ${type}: ${msg}`)

    this.source = source
    this.type = type
  }

  getFailError() {
    return {
      errMsg: `${this.type}: ${this.message}`
    }
  }
}

export default Exception
