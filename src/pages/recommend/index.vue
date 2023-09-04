<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { fetchGetRecommend } from '@/service'
export default defineComponent({
  name: 'RecommendPage',
})
</script>

<script setup lang="ts">
onMounted(async () => {
  const res = await fetchGetRecommend()
  console.log(res)
})
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
