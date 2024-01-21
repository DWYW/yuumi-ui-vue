import { useSize } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const radioProps = {
  modelValue: String,
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
      icon: "radio-selected"
    })
  },
  /** @description 未选中显示的图标 */
  uncheckedIcon: {
    type: Object,
    default: () => ({
      icon: "radio-unselected"
    })
  }
}

export type RadioProps = ExtractPropTypes<typeof radioProps>
