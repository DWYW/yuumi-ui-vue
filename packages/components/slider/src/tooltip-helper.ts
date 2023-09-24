import { ComponentInternalInstance } from "vue"

export function useTooltip(instance: ComponentInternalInstance) {
  const { proxy }: any = instance

  function showPopper(index: string|number) {
    if (!proxy.showTooltip) return
    const popper = proxy.$refs[`poppers[${index}]`]
    if (popper) popper.showPopper()
  }

  function updatePopper(index: string|number) {
    if (!proxy.showTooltip) return
    const popper = proxy.$refs[`poppers[${index}]`]
    if (popper && popper.popper) popper.popper.update()
  }

  function hidePopper(index: string|number) {
    if (!proxy.showTooltip) return
    const popper = proxy.$refs[`poppers[${index}]`]
    if (popper) popper.hidePopper()
  }

  return {
    showPopper,
    updatePopper,
    hidePopper
  }
}