<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <keep-alive v-if="route.meta.keepAlive">
    <router-view />
  </keep-alive>
  <router-view v-else />
</template>

<style lang="scss" scoped>

</style>
