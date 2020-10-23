<template>
  <v-col :md="4" :sm="1" :xs="1">
      <v-card
  >
    <v-img
      class="white--text align-end"
      height="250px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
      :src="place.image"
    >
      <v-card-title>
          <router-link :to="`/places/${place.id}`" :tag="'span'" style="cursor: pointer;">
              {{place.title}}
          </router-link>
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0 d-flex align-center">
        <span>
            <img src="../assets/mountains.png" height="32" width="32">
        </span>
        <span>
            {{getCategoryById(place.categoryId).title}}
        </span>
        <v-spacer></v-spacer>
        <span>
            5 коментарів
        </span>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <p>Висота над рівнем моря: {{place.height}} м</p>
      <article>
          <span>{{place.info.slice(0, 200)}}</span>
          <router-link :to="`/places/${place.id}`" :tag="'span'" style="cursor: pointer; color: orange;">
              <span>...</span>
          </router-link>
      </article>
    </v-card-text>

    <v-card-actions>
      <v-btn :to="`/places/${place.id}`"
        color="orange"
        dark
        block
      >
        Дивитись повністю
        <v-icon
            right
            dark
        >
            mdi-eye
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
</template>

<script>
export default {
    props: {
        'place': {
            type: Object,
            required: true
        }
    },
    computed: {
        getCategories() {
            return this.$store.getters.getPlacesCategories;
        }
    },
    methods: {
        getCategoryById(id) {
            const category = this.getCategories.find(i => i.id === id);
            return category;
        }
    }
}
</script>

<style>

</style>