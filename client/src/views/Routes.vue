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
        <routes-list class="mb-5 mt-5"></routes-list>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import RoutesList from '@/components/RoutesList';
import RoutesFilter from '@/components/RoutesFilter';

export default {
    name: 'Routes',
    data: () => ({
        show: false
    }),
    components: {
        PagesHeadline,
        RoutesList,
        RoutesFilter
    }
}
</script>

<style>

</style>