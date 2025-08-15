<script lang="ts" setup>
import { testStore } from '@/store'

const test = testStore()
</script>

<template>
  <div class="text-28px text-green dark:text-green-500">
    测试页面<a class="text">{{ test.fullName }}</a>
  </div>
  <VanButton @click="test.updateState(new Date().getTime().toString())">
    更新
  </VanButton>
</template>

<style lang="scss" scoped>
.text {
  @apply text-orange-500 dark:text-white underline cursor-pointer hover:text-orange-600;
}
</style>
