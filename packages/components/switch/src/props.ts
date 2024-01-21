import { useSize } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const switchProps = {
  modelValue: Boolean,
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否是只读状态 */
  readonly: Boolean,
  /** @description 尺寸 */
  size: useSize(),
  openColor: {
    type: String,
    default: "#0d6efd"
  },
  closeColor: {
    type: String,
    default: "#d9d9d9"
  }
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
