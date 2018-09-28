<template>
  <v-layout shrink column v-if="loading">
    <v-flex class="text-xs-center">
      <h1>LOADING</h1>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout shrink column v-else>
    <v-flex>
      <!-- // TODO: before here the selection screen with all the obj keys
      // TODO: test text search/filters in combination with pagination, maybe the items need to be filtered directly -->
      <v-flex v-for="(data, key, index) of this.fileContent" :key=index>
        {{ key }}
        <v-data-table
          class="elevation-1"
          :loading="loading"
          :items="data"
          :headers="tableheaders"
          :pagination.sync="pagination"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.level }}</td>
            <td>{{ props.item.message }}</td>
            <td>{{ props.item.timestamp }}</td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
        <br />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
const fs = require('fs')
var LineByLineReader = require('line-by-line')

export default {
  data () {
    return {
      fileContent: {},
      error: false,
      errorMessage: '',
      tableheaders: [
        { text: 'Error Level', value: 'level' },
        { text: 'Description', value: 'message' },
        { text: 'Timestamp', value: 'timestamp' }
      ],
      pagination: { 'sortBy': 'timestamp', 'descending': true, 'rowsPerPage': 250 }
    }
  },
  computed: {
    ...mapState('global', [
      'loading'
    ]),
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  methods: {
    parseFileContent () {
      for (let f of this.$store.state.files.fileList) {
        this.$store.dispatch('global/setLoading', true)

        try {
          let content = JSON.parse(fs.readFileSync(f).toString())
          if (!(content instanceof Array)) {
            throw new Error('Parsed JSON is not an array of JSONs')
          }
          this.$set(this.fileContent, f, content)
          this.$store.dispatch('global/setLoading', false)
        } catch (err) {
          // Fallback, reading log line by line
          if (err.message.includes('Unexpected token {') || err.message.includes('array')) {
            this.$set(this.fileContent, f, [])
            let arr = []
            let lr = new LineByLineReader(f)

            lr.on('error', (err) => {
              this.error = true
              this.errorMessage = `Error parsing the JSON log \n ${err.message}`
            })

            lr.on('line', (line) => {
              arr.push(JSON.parse(line))
            })

            lr.on('end', () => {
              this.$set(this.fileContent, f, arr)
              this.$store.dispatch('global/setLoading', false)
              this.$emit('filedone')
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
  }
}
</script>

<style>

</style>
