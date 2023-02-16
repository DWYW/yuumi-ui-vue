import { ComputedRef, Ref, VNodeRef } from 'vue'
import { LOAD_STATUS } from './children-helper'

interface UseCheckOption {
  childrenRefs: Ref<VNodeRef[]>
  children: Ref<any[]>
  isLeaf: ComputedRef<boolean>
  loadStatus: Ref<number>
  node: any
}

export default function useCheck ({ children, childrenRefs, isLeaf, loadStatus, node }: UseCheckOption, loader: (node: any) => boolean) {
  function getInitValue () {
    if (isLeaf.value || loadStatus.value === LOAD_STATUS.DEFAULT) {
      return loader(node)
    }

    return children.value.every((child: any) => loader(child))
  }

  function onUpdateValue (this: any, v: boolean) {
    this.checked = v
  }

  function onChange (this: any, detail: any) {
    this.$emit('change', detail)
    updateChildrenChecked(this.childrenRefs, detail.checked)
    this.dispatch('checked', { ...detail, instance: this })
  }

  // 向下修改
  function updateChildrenChecked(refs: VNodeRef[], v: boolean) {
    refs.forEach((ref: any) => {
      if (ref.checked !== v) {
        ref.checked = v
      }

      updateChildrenChecked(ref.childrenRefs, v)
    })
  }

  // 监听由于子节点变化导致的向上修改
  function onChildCheckedChange(this: any) {
    const v = childrenRefs.value.every((child: any) => child.checked)

    if (v !== this.checked) {
      this.checked = v
      this.$emit("change", { value: this.value, checked: v})
    }
  }

  return {
    getInitValue,
    onUpdateValue,
    onChange,
    onChildCheckedChange,
    updateChildrenChecked
  }
}