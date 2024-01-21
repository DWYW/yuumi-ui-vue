import type { ExtractPropTypes } from "vue"

export const drawerProps = {
  modelValue: Boolean,
  position: {
    type: String,
    validator: (value: string) => {
      return ["top", "bottom", "left", "right"].indexOf(value) > -1
    },
    default: "right"
  },
  width: String,
  height: String
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
