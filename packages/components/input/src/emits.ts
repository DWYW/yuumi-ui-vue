export const inputEmits = {
  "update:modelValue": (value: string) => typeof value === "string",
  input: (e: Event) => e instanceof Event,
  focus: (e: Event) => e instanceof Event,
  blur: (e: Event) => e instanceof Event,
  compositionstart: (e: Event) => e instanceof Event,
  compositionend: (e: Event) => e instanceof Event,
  clear: null
}

export type InputEmits = typeof inputEmits
