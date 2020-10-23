<template>
  <div>
      <v-row>
          <routes-list-item v-for="item in routes" :key="item.id" :route="item"></routes-list-item>
      </v-row>
  </div>
</template>

<script>

import RoutesListItem from '@/components/RoutesListItem';

export default {
    computed: {
        routes() {
            return this.$store.getters.getRoutes
        }
    },
    components: {
        RoutesListItem
    }
}
</script>

<style>

</style>