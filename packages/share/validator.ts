export function isDefined(value: any) {
  return value !== null && value !== undefined
}

export function isValidComponentSize(value: string) {
  return ["xl", "lg", "md", "sm", "xm"].indexOf(value) >= 0
}

export function isValidComponentTheme(value: string) {
  return ["default", "primary", "success", "danger", "warn"].indexOf(value) >= 0
}

export function isValidDatePickerType(value: string) {
  return ["date", "datetime", "range", "rangetime"].indexOf(value) > -1
}

export function isValidWarningTheme(value: string) {
  return ["default", "primary", "success", "warn", "danger"].indexOf(value) >= 0
}

export function isValidNotificationTheme(value: string) {
  return ["default", "primary", "success", "warn", "danger"].indexOf(value) >= 0
}

export function isValidNotificationDirection(value: string) {
  return ["tr", "tl", "br", "bl"].indexOf(value) >= 0
}

export function isValidComponentPlacement(value: string) {
  return (
    [
      "auto",
      "auto-start",
      "auto-end",
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "right",
      "right-start",
      "right-end",
      "left",
      "left-start",
      "left-end"
    ].indexOf(value) > -1
  )
}

export function isValidAlign(value: string) {
  return ["left", "center", "right"].indexOf(value) >= 0
}

export function isValidTableSize(value: string) {
  return ["default", "middle", "small"].indexOf(value) >= 0
}

export function isValidTableColumnFixed(value: string) {
  return ["left", "right"].indexOf(value) >= 0
}

export function isValidPopperType(value: string) {
  return ["click", "hover", "custom"].indexOf(value) >= 0
}

export function isInputType(value: string) {
  return ["text", "password"].indexOf(value) >= 0
}

export const tableColumnType = {
  selection: "selection"
}

export function isValidTableColumnType(value: string) {
  return ["selection"].indexOf(value) >= 0
}

export function isValidStepDirection(value: string) {
  return ["horizontal", "vertical"].indexOf(value) >= 0
}

export function isValidTabsPosition(value: string) {
  return ["top", "bottom", "left", "right"].indexOf(value) >= 0
}

export function isValidTabsType(value: string) {
  return ["line", "card"].indexOf(value) >= 0
}

export function isValidTooltipTheme(value: string) {
  return ["light", "dark"].indexOf(value) >= 0
}

export function isDescendantElement(
  element: HTMLElement,
  ancestor: HTMLElement,
  root?: HTMLElement
) {
  let _el: any = element

  while (_el) {
    if (_el === ancestor || _el === root) break
    _el = _el.parentElement
  }

  return _el !== null && _el !== undefined && _el !== root
}

export function isNumberInputPlacement(value: string) {
  return ["default", "left", "right"].indexOf(value) >= 0
}

export function isRatioImageMode(value: string) {
  return (
    [
      "scaleToFill",
      "aspectFit",
      "aspectFill",
      "top",
      "bottom",
      "center",
      "left",
      "right",
      "top left",
      "top right",
      "bottom left",
      "bottom right"
    ].indexOf(value) > -1
  )
}
