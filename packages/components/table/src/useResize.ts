import { Ref } from "vue"

export function useResize(
  el: Ref<HTMLElement | undefined>,
  thead: Ref<HTMLElement | undefined>,
  tbody: Ref<HTMLElement | undefined>,
  tfoot: Ref<HTMLElement | undefined>
) {
  function updateTableCellSize() {
    if (!thead.value || !tbody.value) return
    const bodyCols = tbody.value.querySelectorAll<HTMLElement>("colgroup col")
    const headCols = thead.value.querySelectorAll<HTMLElement>("colgroup col")
    const footCols = tfoot.value ? tfoot.value.querySelectorAll<HTMLElement>("colgroup col") : []

    const itemsWidth: number[] = []
    let itemTotalWidth = 0
    for (let i = 0; i < bodyCols.length; i++) {
      const itemWidth = bodyCols[i].offsetWidth
      itemsWidth.push(itemWidth)
      itemTotalWidth += itemWidth
    }

    itemsWidth.forEach((width, i) => {
      headCols[i].setAttribute("width", `${(width / itemTotalWidth) * 100}%`)
      if (footCols[i]) {
        footCols[i].setAttribute("width", `${(width / itemTotalWidth) * 100}%`)
      }
    })
  }

  function updateTableWidth(scrollbarWidth = 0) {
    const tbodyTableEl = tbody.value ? tbody.value.querySelector("table") : null
    if (!tbodyTableEl) return
    const theadTableEl = thead.value ? thead.value.querySelector("table") : null
    if (!theadTableEl) return
    theadTableEl.style.width = `${tbodyTableEl.clientWidth + scrollbarWidth}px`

    const tfootTableEl = tfoot.value ? tfoot.value.querySelector("table") : null
    if (!tfootTableEl) return
    tfootTableEl.style.width = `${tbodyTableEl.clientWidth + +scrollbarWidth}px`
  }

  function updateTableWrapperSize() {
    if (!el.value || !thead.value || !tbody.value) return
    const wrapperHeight = el.value.getBoundingClientRect().height
    const tableHeadHeight = thead.value.getBoundingClientRect().height
    const tableFootHeight = tfoot.value ? tfoot.value.getBoundingClientRect().height : 0
    tbody.value.style.maxHeight = `${wrapperHeight - tableHeadHeight - tableFootHeight}px`
  }

  return {
    updateTableCellSize,
    updateTableWidth,
    updateTableWrapperSize
  }
}
