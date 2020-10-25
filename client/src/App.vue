<template>
  <v-app app>
    <app-header></app-header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import AppHeader from '@/components/AppHeader';
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    AppHeader
  },

  data: () => ({
    
  }),
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  created() {
    if(this.getToken) {
      this.$store.dispatch('AUTH_STATE_CHANGE', this.getToken)
    }
  }
};
</script>

<style scoped>
  .home-layout-margin {
    margin: 0 20px;
  }
</style>
