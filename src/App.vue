<script setup lang="ts">
import { ConfigProvider } from 'vant'
import { commonStore } from '@/store'

const router = useRouter()

const common = commonStore()
const theme = computed(() => common.theme)

const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name as string)
})
</script>

<template>
  <ConfigProvider :theme="theme">
    <RouterView v-slot="{ Component, route }">
      <KeepAlive :include="keepAliveRouteNames">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </RouterView>
  </ConfigProvider>
</template>

<style lang="scss" scoped>
</style>
