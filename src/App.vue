<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>
<script setup lang="ts">
import HeaderLayout from '@/components/layout/header/header.vue'
</script>

<template>
  <HeaderLayout></HeaderLayout>
</template>

<style scoped>
html {
  font-size: 10px;
}
</style>
