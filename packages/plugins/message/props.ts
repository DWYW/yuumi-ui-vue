import type { ExtractPropTypes } from "vue"
import { useTheme } from "../../share/useApi"
export const messageProps = {
  offset: { type: Number },
  top: { type: Number },
  theme: useTheme(),
  duration: { type: Number, default: 3000 }
}

export type MessageProps = ExtractPropTypes<typeof messageProps>
