export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits
