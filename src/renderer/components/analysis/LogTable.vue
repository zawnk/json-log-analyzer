<template>
  <v-layout shrink column v-if="this.$store.state.global.loading">
    <h1>LOADING</h1>
  </v-layout>
  <v-layout shrink column v-else>
    <v-flex>
      <v-flex v-for="(fc, index) of this.fileContent" :key=index>
      {{ fc.level }} | {{ fc.message }}
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
const fs = require('fs')
export default {
  data () {
    return {
      fileContent: {}
    }
  },
  methods: {
    async parseFileContent () {
      for (let f of this.$store.state.files.fileList) {
        try {
          fs.readFile(f, (err, data) => {
            if (err) {
              throw Error('Error when parsing files')
            }
            this.fileContent[f] = JSON.parse(data.toString())
          })
        } catch (err) {
          this.fileContent = err
        }
      }
    }
  },
  mounted () {
    this.parseFileContent()
    this.$store.dispatch('setLoading', false)
  }
}
</script>

<style>

</style>
