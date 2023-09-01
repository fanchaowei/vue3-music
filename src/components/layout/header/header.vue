<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HeaderLayout',
})
</script>

<script setup lang="ts"></script>

<template>
  <div class="header">
    <span class="icon"></span>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 4.4rem;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 0.6rem;
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 0.9rem;
    @include bg-image('logo');
    background-size: 3rem 3.2rem;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 4.4rem;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 1.2rem;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}
</style>
