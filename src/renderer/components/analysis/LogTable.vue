<template>
  <v-layout shrink column v-if="this.$store.state.global.loading">
    <h1>LOADING</h1>
  </v-layout>
  <v-layout shrink column v-else>
    <v-flex>
      <!-- // TODO: before here the selection screen with all the obj keys
      // TODO: table in here
      // TODO: parse multiline json with automatic fixing (prepend '{' and append '}' and seperate lines by ',') -->
      <v-flex v-for="(data, key, index) of this.fileContent" :key=index>
        {{ key }}
        <v-flex v-for="(line, index) of data" :key=index>
          {{ line }}
        </v-flex>
        <br />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
const fs = require('fs')
var LineByLineReader = require('line-by-line')

export default {
  data () {
    return {
      fileContent: {},
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    parseFileContent () {
      for (let f of this.$store.state.files.fileList) {
        try {
          let content = JSON.parse(fs.readFileSync(f).toString())
          if (!(content instanceof Array)) {
            throw new Error('Parsed JSON is not an array of JSONs')
          }
          this.$set(this.fileContent, f, content)
        } catch (err) {
          // Fallback, reading log line by line
          if (err.message.includes('Unexpected token {') || err.message.includes('array')) {
            this.$set(this.fileContent, f, [])
            let lr = new LineByLineReader(f)

            lr.on('error', (err) => {
              this.error = true
              this.errorMessage = `Error parsing the JSON log \n ${err.message}`
            })

            lr.on('line', (line) => {
              this.fileContent[f].push(JSON.parse(line))
            })
          } else {
            this.error = true
            this.errorMessage = `Error parsing the JSON log \n ${err.message}`
          }
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
