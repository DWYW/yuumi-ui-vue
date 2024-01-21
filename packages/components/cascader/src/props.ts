import { useSize, useTheme } from "../../../share/useApi"
import type { ExtractPropTypes, PropType } from "vue"

export const cascaderProps = {
  modelValue: [Array],
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否是只读状态 */
  readonly: Boolean,
  /** @description 空值提示 */
  placeholder: {
    type: String,
    default: "请选择"
  },
  /** @description 选项组 */
  options: {
    type: Array,
    default: () => []
  },
  /** @description 选项为空的时候下拉提示词 */
  optionsEmptyPlaceholder: {
    type: String,
    default: "暂无可选项"
  },
  /** @description 异步加载选项 */
  optionsLoader: {
    type: Function as PropType<() => Promise<any>>
  },
  optionsLoaderPlaceholder: {
    type: String,
    default: "请稍后···"
  },
  /** @description 防止默认值没有对应的选项 */
  fallbackOptions: Array as PropType<any[]>,
  /** @description 映射关系 */
  optionKey: Object,
  /** @description 尺寸 */
  size: useSize(),
  /** @description 主题类型 */
  theme: useTheme(),
  /** @description 是否每一个选择都响应 */
  every: Boolean,
  /** @description 连字符 */
  hyphen: { type: String, default: "/" },
  /** @description 自定义格式化显示 */
  labelFormat: Function,
  /** @description 是否可清除 */
  clearable: Boolean
}

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>
