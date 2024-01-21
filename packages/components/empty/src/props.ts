import type { ExtractPropTypes } from "vue"

export const emptyProps = {
  image: String,
  imageSize: {
    type: Number,
    default: 64
  },
  description: String
}

export type EmptyProps = ExtractPropTypes<typeof emptyProps>
