import { h, mergeProps, Ref, resolveComponent, withModifiers } from 'vue'
import { LOAD_STATUS } from './children-helper'
import { isDescendantElement } from '../../../share/validator'

export interface UseExpandOption {
  expand: Ref<boolean>
  updateExpand: (v: boolean) => void
}
export interface ExpandHooks {
  expandBefore?: (e: any) => void
  expand?: (e: any) => Promise<any>
  expandAfter?: (e: any) => void
}

export default function useExpand({ expand, updateExpand }: UseExpandOption, hooks: ExpandHooks) {
  const _YuumiIcon = resolveComponent('YuumiIcon')

  function expandRender (this: any) {
    const { loadStatus, isLeaf, expandIcon, expandIconVisible } = this

    let _props: any = null
    if (loadStatus === LOAD_STATUS.LOADING) {
      _props = mergeProps({ icon: 'line-loading' })
    } else if (!isLeaf && expandIconVisible) {
      _props = mergeProps(expandIcon)
    }

    return _props &&  h('div', {
      class: ['expand-icon', {
        '__active': expand.value,
        '__loading': loadStatus === LOAD_STATUS.LOADING
      }],
      onClick: withModifiers(expandFunc.bind(this), ['stop'])
    }, [
      h(_YuumiIcon, _props)
    ])
  }

  function expandFunc(this: any, e: Event) {
    hooks.expandBefore && hooks.expandBefore(e)

    const { checkbox } = this
    const target = e.target as HTMLElement
    if (checkbox && isDescendantElement(target, checkbox.$el, checkbox.$el.parentElement)) return

    const promise = hooks.expand ? hooks.expand(e) : Promise.resolve()
    promise.then(() => {
      updateExpand(!expand.value)
      hooks.expandAfter && hooks.expandAfter(e)
    }).catch(() => {})
  }

  return { expandRender, expandFunc }
}
