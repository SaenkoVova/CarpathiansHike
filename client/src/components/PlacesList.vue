<template>
  <v-container fluid>
      <v-row>
          <places-list-item v-for="place in places" :key="place.id" :place="place"></places-list-item>
      </v-row>
  </v-container>
</template>

<script>
import PlacesListItem from '@/components/PlacesListItem';

export default {
    computed: {
        places() {
            return this.$store.getters.getPlaces
        }
    },
    components: {
        PlacesListItem
    }
}
</script>

<style>

</style>