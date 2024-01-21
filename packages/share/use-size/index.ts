import { isValidComponentSize, isValidTableSize } from "../validator"

export function useSize() {
  return {
    type: String,
    validator: isValidComponentSize,
    default: "md"
  }
}

export function useTableSize() {
  return {
    type: String,
    validator: isValidTableSize,
    default: "default"
  }
}
