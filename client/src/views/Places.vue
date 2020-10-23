<template>
  <v-container>
      <v-row>
        <v-col>
          <pages-headline :headline="'Всі об`єкти карти'"></pages-headline>
          <back-arrow :link="'/map'" :location="'карти'"></back-arrow>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <v-btn block dark @click="showFilter = !showFilter">Показати фільтр</v-btn>
            </v-col>
            <v-col>
              <v-btn block dark color="orange">Села та міста</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <places-filter v-if="showFilter"></places-filter>
      <places-list></places-list>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import BackArrow from '@/components/BackArrow';
import PlacesFilter from '@/components/PlacesFilter';
import PlacesList from '@/components/PlacesList';

export default {
    name: 'Places',
    data: () => ({
      showFilter: false
    }),
    components: {
      PagesHeadline,
      BackArrow,
      PlacesFilter,
      PlacesList
    }

}
</script>

<style>

</style>