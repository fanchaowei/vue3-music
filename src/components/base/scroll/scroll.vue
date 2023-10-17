<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
import type { IScrollOptions } from '@/types'
import type { IScrollEmits } from '@/types/emits'
import { useScroll } from './useScroll'
export default defineComponent({
  name: 'ScrollComponent',
})
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Partial<IScrollOptions>>(), {
  click: true,
  probeType: 0,
})

const emits = defineEmits<IScrollEmits>()

const rootRef = ref<HTMLElement | null>(null)

useScroll(rootRef as Ref<HTMLElement>, props, emits)
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
