<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import Scroll from '../scroll/scroll.vue'
import useFixed from './useFixed'
import useListHeight from './useListHeight'
import useShortcut from './useShortcut'

import type { ISingerColumn } from '@/types'
import type { Ref } from 'vue'
export default defineComponent({
  name: 'IndexList',
})
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    singersData: ISingerColumn[]
  }>(),
  {
    singersData: () => [],
  },
)
const { singersData } = toRefs(props)

const groupRef = ref<HTMLElement | null>(null)

const { listHeights } = useListHeight(groupRef as Ref<HTMLElement>, singersData)

const { onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(listHeights, singersData)

const { shortcutList } = useShortcut(singersData)
</script>

<template>
  <Scroll class="index-list" :probe-type="3" @scroll="onScroll">
    <ul ref="groupRef">
      <li v-for="group in singersData" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.list" :key="item.id" class="item">
            <img v-lazy="item.pic" class="avatar" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div v-show="fixedTitle" class="fixed" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div class="shortcut">
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          class="item"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<style scoped lang="scss">
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
