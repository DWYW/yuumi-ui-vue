import { ExtractPropTypes } from "vue"

export function getComponentProps<T>(props: ExtractPropTypes<Record<string, any>>): T {
  const _props: Record<string, any> = {}

  for (const key in props) {
    _props[key] = props[key]
  }

  return _props as T
}
