export function useStep() {
  return {
    type: Number,
    validator: (value: number) => value > 0 && value < Number.MAX_SAFE_INTEGER,
    default: 1
  }
}
