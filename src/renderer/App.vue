<template>
  <div id="app">
    <v-app light toolbar>
    <page-header />
      <main>
        <v-container fluid>
          <router-view />
        </v-container>
      </main>
    </v-app>
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
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  html { overflow-y: auto }
  main {
    padding-top: 60px;
  }
  div {
    user-select: none;
  }
  div:hover, button:hover {
    cursor: default;
  }
</style>
