<template>
  <v-container v-if="route">
      <back-arrow :link="'/routes'" :location="'списку'"></back-arrow>
      <pages-headline :headline="route.path"></pages-headline>
      <v-row>
            <v-col>
                <p>{{route.description}}</p>
                <p>Довжина: {{route.distance}} км</p>
                <p>Тривалість: {{route.duration}} год</p>
                <p>Рівень: {{route.level}}</p>
                <p>Вершини на маршруті: Туркул, Данцер</p>
                <p>Цікаве на маршруті: Озеро Несамовите , Ринок на Заросляку , Каплиця</p>
                <p>Прогноз погоди в населених пунктах в районі маршруту:</p>
                <ul>
                    <li>Селище міського типу Ворохта</li>
                    <li>Село Говерла</li>
                    <li>Село Бистрець</li>
                </ul>
            </v-col>
            <v-col>
                <article>
                    <p>{{route.text}}</p>
                </article>
            </v-col>
      </v-row>
      <v-row>
          <v-col>
              <gallery :images="images"></gallery>
          </v-col>
          <v-col>
              <reviews-list></reviews-list>
          </v-col>
      </v-row>
      <v-row>
        <Map :route="route"></Map>
      </v-row>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import Gallery from '@/components/Gallery';
import ReviewsList from '@/components/ReviewsList';
import Map from '@/components/Map';
import BackArrow from '@/components/BackArrow';

export default {
    props: {
        'id': {
            type: String,
            required: true
        }
    },
    data: () => ({
        route: null,
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
    computed: {
        getRoutes() {
            return this.$store.getters.getRoutes
        }
    },
    name: 'RouteDetails',
    components: {
        PagesHeadline,
        Gallery,
        ReviewsList,
        Map,
        BackArrow
    },
    mounted() {
        this.route = this.getRoutes.find(i => i.id === +this.id);
    }
}
</script>

<style>

</style>