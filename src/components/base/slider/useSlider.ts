import { onMounted, ref, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export default function useSlider(wrapperRef: Ref<HTMLElement>) {
  const slider = ref<BScroll | null>(null)
  const currentPageIndex = ref(0)
  onMounted(() => {
    slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    })

    slider.value.on('slideWillChange', (page: any) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value?.destroy()
  })

  return {
    slider,
    currentPageIndex,
  }
}
