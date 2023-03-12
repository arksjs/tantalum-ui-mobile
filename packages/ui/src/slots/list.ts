import {
  isVNode,
  Fragment,
  type Component,
  type VNode,
  type VNodeNormalizedChildren
} from 'vue'
import { isObject } from '../helpers'

/**
 * 获取指定组件的VNode列表
 * @param children VNode列表
 * @param componentName 组件名称
 * @returns VNode列表项
 */
export function getComponentVNodeItems(
  children: VNodeNormalizedChildren | undefined,
  componentName: string | RegExp
) {
  let newChildren: VNode[] = []

  if (!Array.isArray(children)) {
    return newChildren
  }

  const nameRegex =
    componentName instanceof RegExp
      ? componentName
      : new RegExp(`^${componentName}$`)

  for (const child of children) {
    if (isVNode(child)) {
      if (child.type === Fragment) {
        newChildren = newChildren.concat(
          getComponentVNodeItems(child.children, componentName)
        )
      } else if (
        isObject(child.type) &&
        nameRegex.test((child.type as Component).name ?? '')
      ) {
        newChildren.push(child)
      }
    }
  }

  return newChildren
}
