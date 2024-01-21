import { usePlacementWithNoDefault } from "../../../share/useApi"
import type { ExtractPropTypes, PropType } from "vue"

export const sliderProps = {
  modelValue: { type: [Number, Array] as PropType<number | Array<number>> },
  /** @description 是否是禁用状态 */
  disabled: Boolean,
  /** @description 是否开启range模式 */
  range: Boolean,
  /** @description 步长 */
  step: {
    type: Number,
    default: 1
  },
  /** @description 最小值 */
  min: {
    type: Number,
    default: 0
  },
  /** @description 最大值 */
  max: {
    type: Number,
    default: 100
  },
  /** @description 尺寸 */
  size: {
    type: Number,
    default: 6
  },
  /** @description 按钮颜色 */
  btnColor: String,
  /** @description slider的颜色，多个表示渐变色 */
  colors: Array as PropType<Array<string>>,
  /** @description slider背景颜色，多个表示渐变色 */
  backgroundColors: Array as PropType<Array<string>>,
  /** @description 自定义显示的格式器 */
  formatter: Function,
  /** @description 是否启用Tooltip */
  showTooltip: {
    type: Boolean,
    default: true
  },
  /** @description 是否显示分割点 */
  showStops: Boolean,
  /** @description 是否是垂直模式 */
  vertical: Boolean,
  /** @description 是否是反向模式 */
  reverse: Boolean,
  /** @description tooltip显示的位置 */
  placement: usePlacementWithNoDefault()
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
