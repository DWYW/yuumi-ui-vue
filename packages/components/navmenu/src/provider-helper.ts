import { computed } from 'vue'
import { getValueByPath } from '../../../share/helper'

export const providerKey = Symbol('tree:provider')
export interface ProviderState {
  dispatch: (name: 'node-expand'|'node-click'|'node-mouseenter'|'node-mouseleave', detail: any) => void
  getNodeLabel: (node: any) => string
  getLabelKey: () => string
  getNodeValue: (node: any) => string
  getValueKey: () => string
  getNodeChildren: (node: any) => any[]
  getChildrenKey: () => string
  getNodeExpand: (node: any) => boolean
  getExpandKey: () => string
  getSelectedNode: () => any
  childrenLoader?: (proxy: any) => Promise<any>
}

export default function useProvider(optionKey?: {[key: string]: string}) {
  const keys = computed(() => Object.assign({
    label: 'label',
    value: 'value',
    children: 'children',
    expand: 'expand'
  }, optionKey))

  function getNodeLabel (node: any) {
    return getValueByPath<string>(node, keys.value.label, '')
  }

  function getLabelKey () {
    return keys.value.label
  }

  function getNodeValue (node: any) {
    return getValueByPath<any>(node, keys.value.value, '')
  }

  function getValueKey () {
    return keys.value.value
  }

  function getNodeChildren (node: any) {
    return getValueByPath<any[]>(node, keys.value.children, [])
  }

  function getChildrenKey () {
    return keys.value.children
  }

  function getNodeExpand (node: any) {
    return getValueByPath<boolean>(node, keys.value.expand, false)
  }

  function getExpandKey () {
    return keys.value.expand
  }

  return {
    getNodeLabel,
    getLabelKey,
    getNodeValue,
    getValueKey,
    getNodeChildren,
    getChildrenKey,
    getNodeExpand,
    getExpandKey
  }
}

