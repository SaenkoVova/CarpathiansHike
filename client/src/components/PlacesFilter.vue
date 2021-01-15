<template>
  <v-container fluid>
      <v-row>
          <v-col :md="8">
              <places-categories-list :categories="categories" @stateChanged="stateChanged"></places-categories-list>
          </v-col>
          <v-col :md="4">
                <v-text-field class="mb-4"
                    label="Пошук"
                    :rules="rules"
                    hide-details="auto"
                    v-model="search"
                ></v-text-field>
              <v-btn dark block color="success" class="mb-4" :to="'/map'">Показати мапу</v-btn>
              <v-btn dark block color="orange" class="mb-4" @click="startFilter">Показати місця</v-btn>
              <v-btn block class="mb-4" @click="hideFilter">Сховати фільтр</v-btn>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>

import PlacesCategoriesList from '@/components/PlacesCategoriesList';

export default {
    props: {
        'categories': {
            type: Array,
            required: true
        }
    },
    data: () => ({
        checkbox1: true,
        checkedAll: false,
        search: '',
        rules: [
            value => (value && value.length >= 3 || value.length === 0) || 'Довжина має бути більше 3-ох символів або 0',
        ],
        selectedCategories: []
    }),
    methods: {
        stateChanged(state) {
            state.state ? this.selectedCategories.push(state.id) : 
                this.selectedCategories = this.selectedCategories.filter(c => c != state.id);
        },
        startFilter() {
            this.search = this.search.trim();
            if(this.search.length === 0 || this.search.length >= 3) {
                this.$emit('startFilter', this.selectedCategories, this.search)
            }
        },
        hideFilter() {
            this.$emit('hideFilter');
        }
    },
    components: {
        PlacesCategoriesList
    }
}
</script>

<style>

</style>