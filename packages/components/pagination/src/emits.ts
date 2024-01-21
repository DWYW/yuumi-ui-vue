export const paginationEmits = {
  change: (e: number) => typeof e === "number"
}

export type PaginationEmits = typeof paginationEmits
