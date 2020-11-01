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
    props: {
        'places': {
            type: Array,
            required: true
        }
    },
    components: {
        PlacesListItem
    }
}
</script>

<style>

</style>