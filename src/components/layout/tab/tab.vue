<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'TabLayout',
})
</script>

<script setup lang="ts">
const tabs = ref([
  {
    name: '推荐',
    path: '/recommend',
  },
  {
    name: '歌手',
    path: '/singer',
  },
  {
    name: '排行',
    path: '/top-list',
  },
  {
    name: '搜索',
    path: '/search',
  },
])
</script>

<template>
  <div class="tab">
    <router-link v-for="tab in tabs" :key="tab.path" class="tab-item" :to="tab.path">
      <span class="tab-link">
        {{ tab.name }}
      </span>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;

  .tab-item {
    flex: 1;
    text-align: center;

    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }

    // TODO
    &.router-link-active {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
