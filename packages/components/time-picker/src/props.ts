import { useSize } from "../../../share/useApi"
import type { ExtractPropTypes, PropType } from "vue"

export const timePickerProps = {
  modelValue: [String, Array] as PropType<string | string[]>,
  placeholder: {
    type: String,
    default: "请选择时间"
  },
  startPlaceholder: {
    type: String,
    default: "开始时间"
  },
  endPlaceholder: {
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
  format: {
    type: String,
    default: "hh:mm:ss"
  },
  /** @description 是否开启选择范围 */
  range: Boolean,
  /** @description 是否是只读状态 */
  readonly: Boolean,
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 设置不可用的时 return number[] */
  disabledHours: Function,
  /** @description 设置不可用的分 return number[] */
  disabledMinutes: Function,
  /** @description 设置不可用的秒 return number[] */
  disabledSeconds: Function,
  /** @description 是否可清除 */
  clearable: Boolean,
  /** @description 是否立即响应 */
  immediate: Boolean,
  cancelBtnText: {
    type: String,
    default: "取消"
  },
  confirmBtnText: {
    type: String,
    default: "确认"
  }
}

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
