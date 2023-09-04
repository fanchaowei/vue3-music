<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
import useSlider from './useSlider'
export default defineComponent({
  name: 'SliderComponent',
})
</script>

<script setup lang="ts">
const { sliders } = defineProps<{
  sliders: { id: number; pic: string; link: string }[]
}>()

const rootRef = ref<HTMLElement | null>(null)
const { currentPageIndex } = useSlider(rootRef as Ref<HTMLElement>)
</script>

<template>
  <div ref="rootRef" class="slide-wrapper">
    <div class="slide-content">
      <div v-for="item in sliders" :key="item.id" class="slide-page">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        v-for="(item, index) in sliders"
        :key="item.id"
        class="dot"
        :class="{ active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-wrapper {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  position: relative;
  .slide-content {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slide-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
