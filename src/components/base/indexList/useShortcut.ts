import { computed } from 'vue'
import type { Ref } from 'vue'
import type { ISingerColumn } from '@/types'

export default function useShortcut(singersData: Ref<ISingerColumn[]>) {
  const shortcutList = computed(() => {
    return singersData.value.map((item) => {
      return item.title
    })
  })

  return {
    shortcutList,
  }
}
