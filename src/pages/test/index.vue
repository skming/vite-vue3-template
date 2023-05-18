<script lang="ts" setup>
import { testStore } from '@/store'

const test = testStore()
</script>

<template>
  <div class="text-28px text-green dark:text-green-500">
    测试页面<a class="text">{{ test.name }}</a>
  </div>
</template>

<style lang="scss" scoped>
.text {
  @apply text-coolGray dark:text-white underline cursor-pointer hover:text-blue-6;
}
</style>
