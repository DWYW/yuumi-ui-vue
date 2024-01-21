import { useTabsPosition, useTabsType } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const tabsProps = {
  modelValue: [String, Number],
  /** @description 位置 */
  position: useTabsPosition(),
  /** @description 类型 */
  type: useTabsType()
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabsItemProps = {
  label: String,
  value: [String, Number]
}

export type TabsItemProps = ExtractPropTypes<typeof tabsItemProps>
