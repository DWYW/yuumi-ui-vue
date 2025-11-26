import { useSlots, type VNode } from "vue"
import { getValueByPath } from "../../../share/helper"
import { isDefined } from "../../../share/validator"
import YuumiTableColumn from "./Column.vue"

export interface SticyPosition {
  isLast?: boolean
  isFirst?: boolean
  left?: number
  right?: number
}

export function useHelper() {
  const slot = useSlots()

  function getColumnsFromSlot(): VNode[] {
    if (typeof slot.default !== "function") return []
    const fixedLeft: VNode[] = []
    const fixedRight: VNode[] = []
    const general: VNode[] = []
    let vnodes: VNode[] = slot.default()
    const types = ["Symbol(Fragment)", "Symbol()", "Symbol(v-fgt)"]

    while (vnodes.length) {
      const vnode = vnodes.shift()!
      const vnodeType = vnode.type.toString()
      if (types.includes(vnodeType)) {
        if (vnode.children && vnode.children.length) {
          vnodes = (vnode.children as VNode[]).concat(vnodes)
        }
        continue
      }

      if (getValueByPath(vnode, "type.name") !== YuumiTableColumn.name) {
        continue
      }

      const fixedProp = getValueByPath(vnode, "props.fixed")
      if (fixedProp === "left") {
        fixedLeft.push(vnode)
      } else if (fixedProp === "right") {
        fixedRight.push(vnode)
      } else {
        general.push(vnode)
      }
    }
    return fixedLeft.concat(general, fixedRight)
  }

  function getColumnStickyPositions(columns: VNode[]) {
    const positions: (SticyPosition | null)[] = Array(columns.length).fill(null)
    const lefts: number[] = []
    const rights: number[] = []
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
      const fixedProp = getValueByPath(column, "props.fixed")
      const itemWidth =
        getValueByPath<number>(column, "props.width", 0) ||
        getValueByPath<number>(column, "type.props.width.default", 0)

      if (fixedProp === "left") {
        lefts.push(itemWidth)
      } else if (fixedProp === "right") {
        rights.push(itemWidth)
      }
    }

    lefts.reduce((left, item, index) => {
      positions.splice(index, 1, {
        left: left,
        isLast: lefts.length - 1 === index,
        isFirst: index === 0
      })
      return left + item
    }, 0)

    rights.reduce((right, item, index) => {
      positions.splice(columns.length - 1 - index, 1, {
        right: right,
        isFirst: rights.length - 1 === index,
        isLast: index === 0
      })
      return right + item
    }, 0)

    return positions
  }

  function getColumnProps(column: VNode) {
    const typeProps = getValueByPath<{ [x: string]: any }>(column, "type.props", {})
    const props = getValueByPath<{ [x: string]: any }>(column, "props", {})

    const res: { [x: string]: any } = {}
    for (const key in typeProps) {
      res[key] = isDefined(props[key]) ? props[key] : typeProps[key].default
    }

    return res
  }

  return {
    getColumnsFromSlot,
    getColumnStickyPositions,
    getColumnProps
  }
}
