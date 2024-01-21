export const tableEmits = {
  select: null,
  selectAll: null,
  selectionChange: null,
  scroll: (e: Event) => e instanceof Event
}

export type TableEmits = typeof tableEmits
