import { useOptionKey, useSize, useTheme } from "../../../share/useApi"
import type { ExtractPropTypes, PropType } from "vue"

export const selectProps = {
  /** @description multiple 为 Array，否则为 String */
  modelValue: [String, Array],
  /** @description 是否为多选 */
  multiple: Boolean,
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否是只读状态 */
  readonly: Boolean,
  /** @description 空值提示 */
  placeholder: {
    type: String,
    default: "请选择"
  },
  /** @description 尺寸 */
  size: useSize(),
  /** @description 主题类型 */
  theme: useTheme(),
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
  optionKey: useOptionKey(),
  /** @description 是否可过滤选项 */
  filterable: Boolean,
  /** @description 选项过滤函数 */
  filterMethod: Function,
  /** @description 是否可清除 */
  clearable: Boolean,
  /** @description 是否启用远程加载 */
  remote: Boolean,
  /** @description 远程加载选项 */
  remoteMethod: {
    type: Function as PropType<() => Promise<any>>
  }
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
