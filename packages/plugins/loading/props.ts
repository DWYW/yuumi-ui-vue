import type { ExtractPropTypes } from "vue"

export const loadingProps = {
  uuid: { type: String },
  teleport: { type: String, default: "body" },
  spinner: { type: String, default: "pie" }
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
