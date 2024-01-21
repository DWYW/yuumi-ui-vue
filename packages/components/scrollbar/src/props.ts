import type { ExtractPropTypes } from "vue"

export const scrollbarProps = {
  behavior: {
    type: String,
    default: "hover",
    validator: (value: string) => ["hover", "always"].indexOf(value) > -1
  },
  dynamic: {
    type: Boolean
  }
}

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>
