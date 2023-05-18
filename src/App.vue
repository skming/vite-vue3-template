<script setup lang="ts">
import { commonStore } from './store/modules/common'

const { cachesList } = commonStore()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :includes="cachesList">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style lang="scss" scoped>
</style>
