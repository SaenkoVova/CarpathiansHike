<template>
  <v-container>
    <pages-headline :headline="'Прогноз погоди в Карпатах'"></pages-headline>
    <v-container fluid>
      <div v-for="item in getProvinces" :key="item.id">
        <h1 class="text-center display-1 ma-5">{{item.title}}</h1>
        <v-row>
          <v-col :md="2" v-for="n in 10" :key="n">
            <v-card>
              <v-card-title class="d-flex justify-center">
                <router-link :to="`/`" :tag="'span'" style="cursor: pointer;">
                    Лезещина
                </router-link>
              </v-card-title>
              <v-img
                class="white--text align-end"
                height="200px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
                src="https://karpaty.love/uploads/posts/2018-02/1517479038_goverla-3.jpg"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';

export default {
    name: 'Weather',
    data: () => ({

    }),
    computed: {
        getProvinces() {
            return this.$store.getters.getProvinces
        }
    },
    mounted() {
        
    },
    components: {
        PagesHeadline
    }
}
</script>

<style>

</style>