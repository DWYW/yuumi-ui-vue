export const scrollbarEmits = {
  init: null,
  scroll: (e: Event) => e instanceof Event
}

export type ScrollbarEmits = typeof scrollbarEmits
