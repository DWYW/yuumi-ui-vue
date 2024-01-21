import { useAlign } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const dividerProps = {
  /** @description 对齐方式 */
  align: useAlign()
}

export type DividerProps = ExtractPropTypes<typeof dividerProps>
