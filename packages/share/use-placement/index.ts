import {
  isNumberInputPlacement,
  isValidComponentPlacement,
  isValidTabsPosition
} from "../validator"

export function useNumberInputPlacement() {
  return {
    type: String,
    validator: isNumberInputPlacement,
    default: "default"
  }
}

export function usePlacement(defaultPlacement = "auto") {
  return {
    type: String,
    validator: isValidComponentPlacement,
    default: defaultPlacement
  }
}

export function usePlacementWithNoDefault() {
  return {
    type: String,
    validator: isValidComponentPlacement
  }
}

export function useAlign(align = "center") {
  return {
    type: String,
    validator: (value: string) => /left|center|right/.test(value),
    default: align
  }
}

export function useTabsPosition() {
  return {
    type: String,
    validator: isValidTabsPosition,
    default: "top"
  }
}
