import { ref, watch, nextTick, computed } from 'vue'
import type { ISingerColumn } from '@/types'
import type { Ref } from 'vue'

export default function useFixed(groupRef: Ref<HTMLElement>, singersData: ISingerColumn[]) {
  const listHeights = ref<number[]>([])
  const scrollY = ref<number>(0)
  const currentIndex = ref<number>(0)

  const fixedTitle = computed(() => {
    return singersData[currentIndex.value]?.title
  })

  watch(
    () => singersData,
    async () => {
      await nextTick()
      calculate()
    },
  )

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

  watch(scrollY, (newY: number) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
      }
    }
  })

  const onScroll = (pos: { y: number }) => {
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
  }
}
