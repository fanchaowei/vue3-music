<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>
<script setup lang="ts">
import HeaderLayout from '@/components/layout/header/header.vue'
import TabLayout from '@/components/layout/tab/tab.vue'
</script>

<template>
  <HeaderLayout></HeaderLayout>
  <TabLayout></TabLayout>
  <router-view></router-view>
</template>

<style scoped></style>
