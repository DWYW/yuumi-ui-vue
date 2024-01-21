import type { ExtractPropTypes } from "vue"
import { useSize, useStep, useNumberInputPlacement } from "../../../share/useApi"

export const numberInputProps = {
  modelValue: [String, Number],
  /** @description NumberInput的尺寸 */
  size: useSize(),
  /** @description 最小值 */
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER
  },
  /** @description 最大值 */
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER
  },
  /** @description 步长 */
  step: useStep(),
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否隐藏操作按钮 */
  hideBtn: Boolean,
  /** @description 按钮的位置 */
  btnPlacement: useNumberInputPlacement()
}

export type NumberInputProps = ExtractPropTypes<typeof numberInputProps>
