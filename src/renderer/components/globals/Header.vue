<template>
  <v-toolbar fixed app dark class="primary">
    <v-toolbar-title class="mr-5" style="user-select: none">
        JLA v0.1
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn v-if="this.$store.state.files.fileList.length <= 0" flat @click.stop="setFileList">
        Open Json logs...
      </v-btn>
      <v-btn v-if="this.$store.state.files.fileList.length > 0 && this.$route.name === 'landing-page'" flat @click.stop="addFiles">
        Add more files
        <v-icon class="pl-1">playlist_add</v-icon>
      </v-btn>
      <v-btn v-if="this.$route.name === 'analysis-index'" flat @click.stop="reset">
        Reset
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click.stop="shutDownApp">
        <span>Quit</span>
        <v-icon small>close</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
const remote = require('electron').remote
export default {
  data () {
    return {
    }
  },
  methods: {
    setFileList () {
      let filePaths = remote.dialog.showOpenDialog({
        title: 'Open your JSON log(s)',
        properties: [
          'openFile',
          'multiSelections'
        ]
      })
      if (filePaths) {
        this.$store.dispatch('files/setFileList', filePaths)
      }
    },
    addFiles () {
      let filePaths = remote.dialog.showOpenDialog({
        title: 'Open your JSON log(s)',
        properties: [
          'openFile',
          'multiSelections'
        ]
      })
      if (filePaths) {
        this.$store.dispatch('files/addNewPathsToFileList', filePaths)
      }
    },
    reset () {
      this.$store.dispatch('files/clearFiles')
      this.$router.push({ name: 'landing-page' })
    },
    shutDownApp () {
      remote.getCurrentWindow().close()
    }
  }
}
</script>

<style>
div.v-toolbar__title {
  -webkit-app-region: drag;
}
.v-toolbar__content {
  padding-right: 0;
}
</style>
