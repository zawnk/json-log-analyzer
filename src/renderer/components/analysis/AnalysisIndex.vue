<template>
  <v-container fluid>
    <v-layout justify-center row>
      <v-flex>
        <table-filters />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <log-table />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TableFilters from './TableFilters'
import LogTable from './LogTable'

export default {
  components: {
    TableFilters,
    LogTable
  }
}
</script>

<style>

</style>
