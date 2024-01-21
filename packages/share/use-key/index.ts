export function useOptionKey() {
  return {
    type: Object,
    default: () => ({
      label: "label",
      value: "value"
    })
  }
}

export function useCascaderOptionKey() {
  return {
    type: Object,
    default: () => ({
      label: "label",
      value: "value",
      disabled: "disabled",
      children: "children"
    })
  }
}
