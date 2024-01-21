import {
  isRatioImageMode,
  isValidDatePickerType,
  isValidPopperType,
  isValidTableColumnType,
  isValidTabsType
} from "../validator"
import type { PropType } from "vue"

export function usePopperType() {
  return {
    type: String,
    validator: isValidPopperType,
    default: "click"
  }
}

export function useTableColumnType() {
  return {
    type: String,
    validator: isValidTableColumnType
  }
}

export function useDatePickerType() {
  return {
    type: String,
    validator: isValidDatePickerType,
    default: "date"
  }
}

export function useRatioImageModeType() {
  return {
    type: String,
    validator: isRatioImageMode,
    default: "aspectFill"
  }
}

export function useTabsType() {
  return {
    type: String as PropType<"line" | "card">,
    validator: isValidTabsType,
    default: "line"
  }
}
