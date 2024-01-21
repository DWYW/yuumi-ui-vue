import type { ExtractPropTypes } from "vue"

export const dialogProps = {
  modelValue: Boolean,
  title: {
    type: String
  },
  width: {
    type: String
  },
  closeEnable: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: "取消"
  },
  cancelEnable: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: "确认"
  },
  confirmEnable: {
    type: Boolean,
    default: true
  },
  async: {
    type: Boolean,
    default: false
  },
  alignCenter: Boolean,
  stopPenetrate: Boolean
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
