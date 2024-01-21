import { useRatioImageModeType } from "../../../share/useApi"
import type { ExtractPropTypes } from "vue"

export const ratioImageProps = {
  /** @description 宽/高 */
  ratio: { type: Number, default: 1 },
  /** @description 图片资源地址 */
  image: String,
  /** @description 默认图片地址 */
  placeholderImage: String,
  /** @description 圆角 */
  radius: {
    type: Number,
    default: 0
  },
  /** @description 缩放与裁剪 */
  mode: useRatioImageModeType()
}

export type RatioImageProps = ExtractPropTypes<typeof ratioImageProps>
