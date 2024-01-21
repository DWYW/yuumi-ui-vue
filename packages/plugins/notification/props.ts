import type { ExtractPropTypes } from "vue"
import { useTheme } from "../../share/useApi"

export const notificationProps = {
  direction: { type: String, default: "tr" },
  offset: { type: Number },
  position: { type: Number },
  theme: useTheme(),
  duration: { type: Number, default: 3000 }
}

export type NotificationProps = ExtractPropTypes<typeof notificationProps>
