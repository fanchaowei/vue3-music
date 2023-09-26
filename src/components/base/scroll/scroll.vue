<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Ref, PropType } from 'vue'
import useScroll from './useScroll'
export default defineComponent({
  name: 'ScrollComponent',
})
</script>

<script setup lang="ts">
const props = defineProps({
  click: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})

const rootRef = ref<HTMLElement | null>(null)

useScroll(rootRef as Ref<HTMLElement>, props)
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<style scoped lang=""></style>
