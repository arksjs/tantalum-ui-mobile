import {
  isVNode,
  Fragment,
  type Component,
  type VNode,
  type VNodeNormalizedChildren
} from 'vue'
import { isObject } from '../helpers'

export function getComponentChildren(
  children: VNodeNormalizedChildren | undefined,
  componentName: string
) {
  let newChildren: VNode[] = []

  if (!Array.isArray(children)) {
    return newChildren
  }

  for (const child of children) {
    if (isVNode(child)) {
      if (child.type === Fragment) {
        newChildren = newChildren.concat(
          getComponentChildren(child.children, componentName)
        )
      } else if (
        isObject(child.type) &&
        (child.type as Component).name === componentName
      ) {
        newChildren.push(child)
      }
    }
  }

  return newChildren
}
