<script setup lang="ts">
const router = useRouter()

const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name as string)
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="keepAliveRouteNames">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<style lang="scss" scoped>
</style>
