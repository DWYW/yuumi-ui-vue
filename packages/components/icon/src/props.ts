import { ExtractPropTypes } from "vue"
export const iconProps = {
  /** @description 字体 */
  family: String,
  /** @description icon name */
  icon: String
}

export type IconProps = ExtractPropTypes<typeof iconProps>
