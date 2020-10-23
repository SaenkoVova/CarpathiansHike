<template>
  <v-row>
      <v-col>
              <p>Показувати об'єкти:</p>
              <v-checkbox v-for="category in categories.slice(0, categories.length/2)" :key="category.id"
                v-model="category.id"
                :label="category.title"
                :disabled="checkedAll"
                ></v-checkbox>
          </v-col>
          <v-col>
              <v-checkbox
                class="ma-0"
                v-model="checkedAll"
                label="Всі"
                ></v-checkbox>
                <v-checkbox v-for="(category, index) in categories.slice(categories.length/2, categories.length)" :key="category.id"
                v-model="category.id"
                v-bind:class="[{'ma-0' : index === 0}, {'pa-0': index === 0}]"
                :label="category.title"
                :disabled="checkedAll"
                ></v-checkbox>
          </v-col>
  </v-row>
</template>

<script>
export default {
    data: () => ({
        checkbox1: true,
        checkedAll: false,
    }),
    computed: {
        categories() {
            return this.$store.getters.getPlacesCategories
        }
    }
}
</script>

<style>

</style>