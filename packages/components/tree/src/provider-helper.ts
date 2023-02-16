import { computed } from 'vue'
import { getValueByPath } from '../../../share/helper'

export const providerKey = Symbol('tree:provider')
export interface ProviderState {
  dispatch: (name: 'checked'|'node-expand'|'node-click', detail: any) => void
  getNodeLabel: (node: any) => string
  getLabelKey: () => string
  getNodeValue: (node: any) => string
  getValueKey: () => string
  getNodeChildren: (node: any) => any[]
  getChildrenKey: () => string
  getNodeDisabled: (node: any) => boolean
  getDisabledKey: () => string
  getNodeChecked: (node: any) => boolean
  getCheckedKey: () => string
  getNodeExpand: (node: any) => boolean
  getExpandKey: () => string
  childrenLoader?: (proxy: any) => Promise<any>
}

export default function useProvider(optionKey?: {[key: string]: string}) {
  const keys = computed(() => Object.assign({
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled',
    checked: 'checked',
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

  function getNodeDisabled (node: any) {
    return getValueByPath<boolean>(node, keys.value.disabled, false)
  }

  function getDisabledKey () {
    return keys.value.disabled
  }

  function getNodeChecked (node: any) {
    return getValueByPath<boolean>(node, keys.value.checked, false)
  }

  function getCheckedKey () {
    return keys.value.checked
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
    getNodeDisabled,
    getDisabledKey,
    getNodeChecked,
    getCheckedKey,
    getNodeExpand,
    getExpandKey
  }
}

