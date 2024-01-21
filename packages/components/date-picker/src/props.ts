import { useDatePickerType, useSize } from "../../../share/useApi"
import type { ExtractPropTypes, PropType } from "vue"

export const datePickerProps = {
  modelValue: [Date, Array] as PropType<Date | Date[]>,
  type: useDatePickerType(),
  placeholder: {
    type: String,
    default: "请选择日期"
  },
  timePlaceholder: {
    type: String,
    default: "请选择时间"
  },
  startPlaceholder: {
    type: String,
    default: "开始日期"
  },
  startTimePlaceholder: {
    type: String,
    default: "开始时间"
  },
  endPlaceholder: {
    type: String,
    default: "结束日期"
  },
  endTimePlaceholder: {
    type: String,
    default: "结束时间"
  },
  /** @description 连字符 */
  hyphen: {
    type: String,
    default: "-"
  },
  /** @description 尺寸 */
  size: useSize(),
  /** @description 格式化的样式 */
  format: String,
  /** @description 是否是只读状态 */
  readonly: Boolean,
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 设置不可用的日期 */
  disabledDates: Function,
  /** @description 设置不可用的时 return number[] */
  disabledHours: Function,
  /** @description 设置不可用的分 return number[] */
  disabledMinutes: Function,
  /** @description 设置不可用的秒 return number[] */
  disabledSeconds: Function,
  /** @description 是否可清除 */
  clearable: Boolean,
  /** @description 最大选择天数 */
  maxdays: Number,
  masdaysErrMsg: {
    type: String,
    default: "您最多选择可以选择{maxdays}天"
  },
  cancelBtnText: {
    type: String,
    default: "取消"
  },
  confirmBtnText: {
    type: String,
    default: "确认"
  }
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
