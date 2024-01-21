export const numberInputEmits = {
  "update:modelValue": (value: number) => typeof value === "number",
  input: (e: Event) => e instanceof Event,
  focus: (e: Event) => e instanceof Event,
  blur: (e: Event) => e instanceof Event,
  change: (value: number) => typeof value === "number"
}

export type NumberInputEmits = typeof numberInputEmits
