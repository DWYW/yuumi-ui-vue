import { usePlacement, useTooltipTheme } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const tooltipProps = {
  /** @description 提示的内容 */
  content: String,
  /** @description 显示的位置 */
  placement: usePlacement(),
  /** @description 主题类型 */
  theme: useTooltipTheme()
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
