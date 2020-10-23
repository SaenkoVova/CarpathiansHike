<template>
  <v-container v-if="place">
      <back-arrow :link="'/map'" :location="'карти'"></back-arrow>
      <v-row>
          <v-col :md="6" :sm="12" :xs="12">
                <pages-headline :headline="place.title"></pages-headline>
                <v-container fluid class="d-flex">
                    <p v-if="place.massif">{{place.massif}}</p>
                    <v-spacer></v-spacer>
                    <p>Додано користувачем: {{place.creator}} Дата: {{place.creationDate}}</p>
                </v-container>
                <div>
                    <article>
                        <p>{{place.info}}</p>
                    </article>
                </div>
                <div>
                    <p>Висота над рівнем моря {{place.height}} м</p>
                </div>
          </v-col>
          <v-col :md="6" :sm="12" :xs="12">
              <Map :place="place"></Map>
          </v-col>
      </v-row>
      <v-container fluid>
        <pages-headline :headline="`Маршрути сюди`"></pages-headline>
        <ul>
            <li>Заросляк - о.Несамовите - г. Пожижевська - Заросляк</li>
            <li>Перехід по Чорногірському хребту</li>
            <li>Чорногора з села Говерла</li>
            <li>Говерла з с.Лазещина</li>
            <li>Петрос з с.Лазещина</li>
        </ul>
      </v-container>
      <v-container fluid>
        <pages-headline :headline="`Найближчі населені пункти`"></pages-headline>
        <ul>
            <li>Говерла (10.0 км)</li>
            <li>Луги (11.5 км)</li>
            <li>Вороненко (13.6 км)</li>
        </ul>
      </v-container>
      <v-container fluid>
        <pages-headline :headline="`Прогноз погоди для сусідніх населених пунктів`"></pages-headline>
        <ul class="d-flex">
            <li class="ml-5 mr-5">Село Говерла</li>
            <li class="ml-5 mr-5">Село Вороненко</li>
            <li class="ml-5 mr-5">Село Лазещина</li>
        </ul>
      </v-container>
      <v-container fluid>
          <v-row>
              <v-col>
                  <reviews-list></reviews-list>
              </v-col>
              <v-col>
                  <gallery :images="images"></gallery>
              </v-col>
          </v-row>
      </v-container>
  </v-container>
</template>

<script>

import BackArrow from '@/components/BackArrow';
import PagesHeadline from '@/components/PagesHeadline';
import Map from '@/components/Map';
import ReviewsList from '@/components/ReviewsList';
import Gallery from '@/components/Gallery';

export default {
    name: 'PlaceDetails',
    data: () => ({
        place: null,
        images: [
            {
                id: 1,
                src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
            },
            {
                id: 2,
                src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
            },
            {
                id: 3,
                src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
            }
        ]
    }),
    props: {
        'id': {
            type: String,
            required: true
        }
    },
    mounted() {
         this.place = this.$store.getters.getPlaces.find(place => place.id === +this.id)
    },
    components: {
        BackArrow,
        PagesHeadline,
        Map,
        ReviewsList,
        Gallery
    }
}
</script>

<style>

</style>