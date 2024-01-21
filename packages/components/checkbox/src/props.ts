import { useSize } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const checkboxProps = {
  modelValue: [String, Number, Boolean],
  /** @description 唯一标识 */
  unique: {
    type: [String, Number, Boolean],
    required: true
  },
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 尺寸 */
  size: useSize(),
  /** @description 选中显示的图标 */
  checkedIcon: {
    type: Object,
    default: () => ({
      icon: "checkbox-selected"
    })
  },
  /** @description 未选中显示的图标 */
  uncheckedIcon: {
    type: Object,
    default: () => ({
      icon: "checkbox-unselected"
    })
  },
  indeterminate: Boolean,
  indeterminateIcon: {
    type: Object,
    default: () => ({
      icon: "line-checkbox-indeterminate"
    })
  }
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
