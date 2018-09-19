<template>
  <v-toolbar fixed dark>
    <v-toolbar-title class="mr-5" style="user-select: none">
        JLA
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat>
        Test
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click.stop="shutDownApp">
        <span>Quit</span>
        <v-icon small left>close</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
const remote = require('electron').remote
export default {
  methods: {
    shutDownApp () {
      remote.getCurrentWindow().close()
    }
  }
}
</script>

<style>

</style>
