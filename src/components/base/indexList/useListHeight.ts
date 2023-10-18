import { ref, watch, nextTick } from 'vue'
import type { ISingerColumn } from '@/types'
import type { Ref } from 'vue'

export default function useListHeight(
  groupRef: Ref<HTMLElement>,
  singersData: Readonly<Ref<ISingerColumn[]>>,
) {
  const listHeights = ref<number[]>([])

  watch(singersData, async () => {
    await nextTick()
    calculate()
  })

  const calculate = () => {
    if (!groupRef.value) {
      return
    }
    const listHeightsVal = listHeights.value
    listHeightsVal.length = 0
    let length = 0
    const childList = groupRef.value.children

    listHeightsVal.push(length)
    for (let i = 0; i < childList.length; i++) {
      length += childList[i].clientHeight
      listHeightsVal.push(length)
    }
  }

  return {
    listHeights,
  }
}
