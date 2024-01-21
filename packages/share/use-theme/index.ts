import { isValidComponentTheme, isValidTooltipTheme } from "../validator"

export function useTheme() {
  return {
    type: String,
    validator: isValidComponentTheme,
    default: "default"
  }
}

export function useTooltipTheme() {
  return {
    type: String,
    validator: isValidTooltipTheme,
    default: "light"
  }
}
