<template>
  <div id="app">
    <page-header />
    <router-view />
  </div>
</template>

<script>
import PageHeader from '@/components/globals/Header.vue'

export default {
  name: 'json-log-analyzer',
  components: {
    PageHeader
  }
}
</script>

<style>
  html { overflow-y: auto }
</style>
