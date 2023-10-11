<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { fetchGetSingers } from '@/service'
import { ISingerColumn } from '@/types'
import IndexList from '@/components/base/indexList/indexList.vue'

export default defineComponent({
  name: 'SingerPage',
})
</script>

<script setup lang="ts">
const singersData = ref<ISingerColumn[]>([])

onMounted(async () => {
  const res = await fetchGetSingers()
  singersData.value = res.singers
})
</script>

<template>
  <div v-loading="!singersData.length" class="singer">
    <IndexList :singers-data="singersData" />
  </div>
</template>

<style scoped lang="scss">
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
