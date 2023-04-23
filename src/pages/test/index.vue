<script lang="ts" setup>
import { testStore } from '@/store/modules'

const test = testStore()
</script>

<template>
  <div class="text-24px text-green">
    测试页面<a class="text">{{ test.name }}</a>
  </div>
</template>

<style lang="scss" scoped>
.text {
  @apply text-coolGray underline cursor-pointer hover:text-blue-6;
}
</style>
