<template>
  <v-container fluid>
      <v-row>
          <v-col :md="8">
              <places-categories-list></places-categories-list>
          </v-col>
          <v-col :md="4">
                <v-text-field class="mb-4"
                    label="Пошук"
                    :rules="rules"
                    hide-details="auto"
                ></v-text-field>
              <v-btn dark block color="success" class="mb-4">Показати мапу</v-btn>
              <v-btn dark block color="orange" class="mb-4">Показати місця</v-btn>
              <v-btn dark block class="mb-4">Очистити фільтр</v-btn>
              <v-btn block class="mb-4">Сховати фільтр</v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>

import PlacesCategoriesList from '@/components/PlacesCategoriesList';

export default {
    data: () => ({
        checkbox1: true,
        checkedAll: false,
        rules: [
            value => (value && value.length >= 3) || 'Min 3 characters',
        ],
    }),
    computed: {
        categories() {
            return this.$store.getters.getPlacesCategories
        }
    },
    components: {
        PlacesCategoriesList
    }
}
</script>

<style>

</style>