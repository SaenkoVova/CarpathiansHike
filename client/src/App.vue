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

export default {
  name: 'App',

  components: {
    AppHeader
  },

  data: () => ({
    
  }),
};
</script>

<style scoped>
  .home-layout-margin {
    margin: 0 20px;
  }
</style>
