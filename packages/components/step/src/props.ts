import { useStepDirection } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const stepProps = {
  /** @description 方向 */
  direction: useStepDirection(),
  /** @description 激活项下标 */
  active: {
    type: Number,
    default: 0
  },
  /** @description 更小尺寸 */
  mini: Boolean,
  /** @description 是否错误 */
  error: Boolean
}

export type StepProps = ExtractPropTypes<typeof stepProps>

export const stepItemProps = {
  /** @description 标题 */
  title: String,
  /** @description 图标 */
  icon: String
}

export type StepItemProps = ExtractPropTypes<typeof stepItemProps>
