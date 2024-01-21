import type { ExtractPropTypes } from "vue"
import { usePlacement, usePopperType } from "../../../share/useApi"

export const popperProps = {
  /** @description 位置 */
  placement: usePlacement("bottom"),
  /** @description 备选位置 */
  fallbackPlacements: {
    type: Array,
    default: () => ["top", "right", "left"]
  },
  /** @description 间隙 */
  space: {
    type: Number,
    default: 6
  },
  /** @description 类型 */
  type: usePopperType(),
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否阻止event冒泡 */
  stop: Boolean
}

export type PopperProps = ExtractPropTypes<typeof popperProps>
