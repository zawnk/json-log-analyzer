<template>
  <v-layout shrink column>
    <v-layout shrink row v-if="this.$store.state.files.fileList.length <= 0">
      <v-flex shrink class="grey--text text--lighten-1">No JSON files selected</v-flex>
    </v-layout>
    <v-layout shrink row v-else>
      <v-list dense class="grey lighten-5">
        <template v-for="(path, index) in this.$store.state.files.fileList">
          <v-divider v-if="index >= 1" :key="index + '-divider'" class="ml-2" inset></v-divider>
          <v-list-tile :key="index">
            <v-list-tile-content>{{ path }}</v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click.stop="removeFileFromList(index)">
                <v-icon color="error">remove</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-layout>
    <v-layout shrink row fill-height align-baseline v-if="this.$store.state.files.fileList.length > 0">
      <v-btn class="secondary">
        Start analyzing
      </v-btn>
      <v-flex align-end>{{this.$store.state.files.fileList.length}} file{{ this.$store.state.files.fileList.length>1 ? 's' : '' }}</v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    methods: {
      removeFileFromList (index) {
        this.$store.dispatch('removeFileWithIndex', index)
      }
    },
    mounted () {
    }
  }
</script>

<style>
</style>
