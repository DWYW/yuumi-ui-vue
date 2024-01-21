import { useAlign } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const paginationProps = {
  /** @description 当前页码 */
  page: {
    type: [Number, String],
    validator: (value: any) => Number(value) >= 0,
    default: 1
  },
  /** @description 总页数 */
  pageTotal: {
    type: [Number, String],
    validator: (value: any) => Number(value) >= 0
  },
  /** @description 总记录数 */
  total: {
    type: [Number, String],
    validator: (value: any) => Number(value) >= 0,
    default: 0
  },
  /** @description 是否显示总记录数 */
  totalVisible: {
    type: Boolean,
    default: true
  },
  /** @description 最长显示的btn数量 */
  maxLength: {
    type: Number,
    default: 5,
    validator: (value: number) => {
      return value % 2 === 1 && value >= 3
    }
  },
  /** @description 对齐方式 */
  align: useAlign(),
  prevBtnText: {
    type: String,
    default: "上一页"
  },
  nextBtnText: {
    type: String,
    default: "下一页"
  }
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
