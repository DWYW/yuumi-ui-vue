import type { ExtractPropTypes } from "vue"
import { useSize } from "../../../share/useApi"
import { isInputType } from "../../../share/validator"

export const inputProps = {
  modelValue: String,
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否是只读状态 */
  readonly: Boolean,
  /** @description 是否自动获取焦点 */
  autoFocus: Boolean,
  /** @description 最大输入长度 */
  maxlength: Number,
  /** @description 空值提示 */
  placeholder: String,
  /** @description Input的尺寸 */
  size: useSize(),
  /** @description Input类型 */
  type: {
    type: String,
    validator: isInputType,
    default: "text"
  },
  /** @description 输入限制 */
  limit: [Function, RegExp],
  clearable: Boolean,
  /** @description 是否是圆角按钮 */
  round: Boolean,
  /** @description 是否清除空白字符 */
  trim: Boolean,
  /** @description 前置图标 */
  prefixIcon: String,
  /** @description 后置图标 */
  suffixIcon: String
}

export type InputProps = ExtractPropTypes<typeof inputProps>
