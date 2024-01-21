import type { ExtractPropTypes } from "vue"
import { useSize, useTheme } from "../../../share/useApi"
export const buttonProps = {
  /** @description 按钮大小 */
  size: useSize(),
  /** @description 按钮类型 */
  theme: useTheme(),
  /** @description 是否是朴素按钮 */
  plain: Boolean,
  /** @description 是否开启点击动画 */
  splash: Boolean,
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否是圆形按钮 */
  circle: Boolean,
  /** @description 是否是圆角按钮 */
  round: Boolean
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
