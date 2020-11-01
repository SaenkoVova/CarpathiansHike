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
              <v-btn block dark @click="showFilter = !showFilter">{{filterButtonTitle}}</v-btn>
            </v-col>
            <v-col>
              <v-btn block dark color="orange">Села та міста</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <places-filter v-if="showFilter" :categories="placesCategories"></places-filter>
      <places-list :places="places" v-if="!getProcessing"></places-list>
      <v-container v-if="getProcessing" class="d-flex justify-center">
        <v-progress-circular 
        :size="200"
        indeterminate
        color="primary"
      ></v-progress-circular>
      </v-container>
      <v-pagination
      @input="getPlaces"
      v-model="page"
      :length="4"
      circle
    ></v-pagination>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import BackArrow from '@/components/BackArrow';
import PlacesFilter from '@/components/PlacesFilter';
import PlacesList from '@/components/PlacesList';
import Axios from 'axios';
import proxy from '@/proxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Places',
    data: () => ({
      showFilter: false,
      placesCategories: [],
      places: [],
      page: 1,
      showedItems: 10
    }),
    computed: {
      ...mapGetters([
        'getProcessing'
      ]),
      filterButtonTitle() {
        return this.showFilter ? 'Сховати фільтр' : 'Показати фільтр'
      }
    },
    methods: {
      ...mapMutations(['SET_PROCESSING']),
      getPlacesCategories() {
        Axios.get(`${proxy.domen}/categories/getPlacesCategories`)
          .then((data) => {
            this.placesCategories = data.data.categories
          })
      },
      getPlaces() {
        this.SET_PROCESSING(true)
        Axios.get(`${proxy.domen}/places/getPlaces`,
          {
            params: {
              showedItems: this.showedItems,
              page: this.page
            }
          }
        )
          .then((data) => {
            this.places = data.data.places;
            this.SET_PROCESSING(false)
          })
      }
    },
    created() {
      this.getPlacesCategories();
      this.getPlaces();
    },
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