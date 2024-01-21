import type { ExtractPropTypes, PropType } from "vue"

export const navsProps = {
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  optionKey: Object,
  /** @description 折叠图标 */
  expandIcon: {
    type: Object,
    default: () => ({ icon: "flat-arrow-right" })
  },
  /** @description 是否显示折叠图标 */
  expandIconVisible: {
    type: Boolean,
    default: true
  },
  /** @description 异步加载 */
  loadData: Function as PropType<(node: any) => Promise<any>>,
  /** @description 选中的节点 */
  selectedNode: Object
}

export type NavsProps = ExtractPropTypes<typeof navsProps>
