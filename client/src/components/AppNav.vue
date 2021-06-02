<template>
  <v-toolbar-items>
      <v-btn v-for="(item, index) in nav" :key="index" :to="item.path" large depressed>
          {{item.title}}
      </v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
    data: () => ({
        nav: [
            {
                title: 'Карта',
                path: '/map'
            },
            {
                title: 'Маршрути',
                path: '/routes'
            },
            {
                title: 'Місця',
                path: '/places'
            },
            {
                title: 'Про сайт',
                path: '/about'
            }
        ]
    })
}
</script>

<style scoped>
    .nav-btn {
        margin: 10px;
    }
</style>
