<template>
  <v-container>
      <pages-headline :headline="`Пішохідні маршрути в Карпатах`"></pages-headline>
      <v-row>
          <v-col>
              <v-btn dark block>Допомога у виборі маршруту</v-btn>
          </v-col>
          <v-col>
              <v-btn block dark @click="show = !show">Показати фільтри</v-btn>
          </v-col>
      </v-row>
      <routes-filter v-if="show"></routes-filter>
      <v-container v-if="getProcessing" class="d-flex justify-center">
        <v-progress-circular 
        :size="200"
        indeterminate
        color="primary"
      ></v-progress-circular>
      </v-container>
        <routes-list :routes="routes" v-if="!getProcessing" class="mb-5 mt-5"></routes-list>
        <v-pagination
        @input="getRoutes"
        v-model="page"
        :length="4"
        circle
        ></v-pagination>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import RoutesList from '@/components/RoutesList';
import RoutesFilter from '@/components/RoutesFilter';
import Axios from 'axios';
import proxy from '@/proxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'Routes',
    data: () => ({
        show: false,
        page: 1,
        routes: [],
        showedItems: 10
    }),
    computed: {
        ...mapGetters([
            'getProcessing'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_PROCESSING'
        ]),
        getRoutes() {
            this.SET_PROCESSING(true)
            Axios.get(`${proxy.domen}/routes/getRoutes`,
            {
                params: {
                    showedItems: this.showedItems,
                    page: this.page
                }
            }
            )
            .then((data) => {
                this.routes = data.data.routes;
                this.SET_PROCESSING(false)
            })
        }
    },
    mounted() {
        this.getRoutes();
    },
    components: {
        PagesHeadline,
        RoutesList,
        RoutesFilter
    }
}
</script>

<style>

</style>