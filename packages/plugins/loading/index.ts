import { defineComponent, h, isVNode, nextTick, ref } from "vue"
import { pluginMount, pluginUnmount } from "../instance"
import type { VNode } from "vue"
import Loading from "./Loading.vue"
import SpinnerPie from "./SpinnerPie.vue"
import SpinnerRect from "./SpinnerRect.vue"

// <SpinnerRect v-if="spinner === 'rect'" />
// <SpinnerPie v-else/>

export interface CreateLoadingOption {
  uuid?: string
  teleport?: string
  spinner?: "circle" | "rect" | VNode
}

export interface YuumiLoading {
  createLoading: (option?: CreateLoadingOption) => VNode
  removeLoading: (vnode: VNode) => void
  removeAllLoading: () => void
}

const loadings = new Map()
let uuid = 0

export function createLoading(option?: CreateLoadingOption) {
  const { spinner, ..._option } = Object.assign(
    {
      uuid: getLoadingId()
    },
    option
  )

  const _component = defineComponent({
    setup() {
      const messageEl = ref()

      return () =>
        h(
          Loading,
          Object.assign({}, _option, {
            onBeforeEnter: () => {
              nextTick(() => {
                loadings.set(vnode, messageEl.value)
              })
            },
            onBeforeLeave: () => {
              loadings.delete(vnode)
            },
            onAfterLeave: () => {
              pluginUnmount(vnode)
            },
            ref: (el: any) => (messageEl.value = el)
          }),
          {
            default: () => {
              if (spinner && spinner === "rect") {
                return h(SpinnerRect)
              }

              if (spinner && spinner === "circle") {
                return h(SpinnerPie)
              }

              return isVNode(spinner) ? spinner : h(SpinnerPie)
            }
          }
        )
    }
  })
  const vnode = h(_component)
  pluginMount(vnode, Loading.name)
  return vnode
}

export function removeLoading(node: VNode) {
  const target = loadings.get(node)
  if (!target) return
  target.hide()
}

export function removeAllLoading() {
  nextTick(() => loadings.forEach(item => item.hide()))
}

export const getLoadingId = function () {
  return (++uuid).toString()
}

export const getLoadingWithId = (id: string) => {
  for (const key of loadings.keys()) {
    const item = loadings.get(key)
    if (item.props.uuid === id) {
      return [key, item]
    }
  }
}
