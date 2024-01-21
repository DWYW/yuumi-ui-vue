import { isValidAlign, isValidTableColumnFixed } from "../../../share/validator"
import { useTableColumnType, useTableSize } from "../../../share/useApi"
import type { ExtractPropTypes, PropType } from "vue"

export const tableProps = {
  /** @description table的数据 */
  data: {
    type: Array as PropType<any[]>,
    required: true,
    default: () => []
  },
  /** @description 是否显示border */
  border: Boolean,
  /** @description 是否启用斑马线 */
  stripe: Boolean,
  /** @description 表格大小 */
  size: useTableSize(),
  /** @description row class generate function */
  rowClassName: Function,
  /** @description cell class generate function */
  cellClassName: Function,
  /** @description 是否显示总计 */
  summary: Boolean,
  summaryText: {
    type: String,
    default: "合计"
  },
  /** @description 总计的计算函数 */
  summaryMethod: Function,
  /** @description 是否重置滚动位置 */
  resetScroll: { type: Boolean },
  /** @description 空值提示 */
  emptyPlaceholder: { type: String, default: "暂无数据" }
}

export type TableProps = ExtractPropTypes<typeof tableProps>

export const tableColumnProps = {
  /** @description td th width */
  width: {
    type: Number,
    default: 100
  },
  /** @description th context */
  title: String,
  /** @description getValueByPath path param */
  prop: String,
  /** @description 占位符 */
  placeholder: {
    type: String,
    default: "-"
  },
  /** @description 对齐方式 */
  align: {
    type: String,
    validator: isValidAlign,
    default: "left"
  },
  /** @description 固定定位 */
  fixed: {
    type: String,
    validator: isValidTableColumnFixed
  },
  /** @description 类型 */
  type: useTableColumnType()
}

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
