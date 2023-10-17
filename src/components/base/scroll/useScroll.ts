import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'
import type { IScrollEmits } from '@/types/emits'
import type { IScrollOptions } from '@/types'
import type { Ref } from 'vue'

// 配置 DOM 元素探测插件
BScroll.use(ObserveDOM)

export function useScroll(
  wrapperRef: Ref<HTMLElement>,
  options: Partial<IScrollOptions>,
  emits: IScrollEmits,
) {
  const scroll = ref<BScroll | null>(null)

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    })
  })

  if (options.probeType && options.probeType > 0) {
    scroll.value?.on('scroll', (pos: { x: number; y: number }) => {
      emits('scroll', pos)
    })
  }

  onUnmounted(() => {
    scroll.value?.destroy()
  })
}
