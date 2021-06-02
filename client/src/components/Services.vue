<template>
  <v-container>
      <h1 class="text-center display-2 mb-5">Сервіси та розділи</h1>
      <h2 class="text-center title mb-2">Всі сервіси та розділи цього сайту доступні безкоштовно</h2>
      <v-row>
          <v-col class="d-flex flex-column align-center " :xs="12" :sm="12" :md="4" v-for="(item, index) in services" :key="index">
              <v-icon :size="100" :color="item.color">{{item.logo}}</v-icon>
              <h2 class="text-center title">{{item.title}}</h2>
              <p class="text-center">{{item.description}}</p>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    services: [
      {
        color: '#333333',
        logo: 'mdi-alert-circle-check-outline',
        title: 'Інформація',
        description: 'За допомогою користувачів платформи ми збираємо інформацію про туризм в Карпатах. Вершини, маршрути, цікаві місця, джерела, колиби та інше. Все, що може знадобитися в поході. В нас є каталоги: місць, сіл та міст, маршрутів.'
      },
      {
        color: '#31708f',
        logo: 'mdi-map-marker-radius-outline',
        title: 'Карта',
        description: 'На основі зібраної інформації ми підтримуємо інтерактивну карту. Із допомогою карти побудова марштуру є значно легшою. Інформація на карті є завжди актуальною та може бути доповнена будь яким учасником спільноти'
      },
      {
        color: '#8a6d3b',
        logo: 'mdi-map-marker-path',
        title: 'Маршрути походів',
        description: 'На цьому сайті сформовано каталог маршрутів для походів Карпатами. Це найповніша інтерактивна база маршрутів, інтегрована з базами об`єктів, місць, населених пунктів, транспортної інформації.'
      }
    ]
  })
}
</script>

<style>

</style>
