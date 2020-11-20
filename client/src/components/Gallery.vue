<template>
  <v-card v-if="images"
    class="mx-auto"
    max-width="500"
  >
    
    <v-toolbar
      color="orange"
      dark
    >
      <v-toolbar-title>Фотогалерея</v-toolbar-title>
    </v-toolbar>

    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(image, index) in images"
          :key="index"
          :cols="6"
        >
          <v-card >
            <v-img @click="show"
              :src="require(`../assets/${image}`)"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
    props: {
      'images': {
        type: Array,
        required: true
      }
    },
    methods: {
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }
    }
}
</script>

<style>

</style>