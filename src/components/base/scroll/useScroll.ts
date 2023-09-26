import BScroll from '@better-scroll/core'
import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'

interface Options {
  click?: boolean
}

export default function useScroll(wrapperRef: Ref<HTMLElement>, options: Options) {
  const scroll = ref<BScroll | null>(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    })
  })

  onUnmounted(() => {
    scroll.value?.destroy()
  })
}
