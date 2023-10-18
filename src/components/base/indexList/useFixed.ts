import { ref, watch, computed } from 'vue'
import type { ISingerColumn } from '@/types'
import type { Ref } from 'vue'

export default function useFixed(
  listHeights: Ref<number[]>,
  singersData: Readonly<Ref<ISingerColumn[]>>,
) {
  const scrollY = ref<number>(0)
  const currentIndex = ref<number>(0)
  const distance = ref<number>(0)
  const TITLE_HEIGHT = 30

  const fixedStyle = computed(() => {
    const diff =
      distance.value > 0 && distance.value < TITLE_HEIGHT ? distance.value - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${diff}px, 0)`,
    }
  })

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    return singersData.value[currentIndex.value]?.title
  })

  watch(scrollY, (newY: number) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
        return
      }
    }
  })

  const onScroll = (pos: { y: number }) => {
    scrollY.value = -pos.y
  }

  return {
    onScroll,
    fixedTitle,
    currentIndex,
    fixedStyle,
  }
}
