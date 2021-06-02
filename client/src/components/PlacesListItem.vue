<template>
  <v-col :md="4" :sm="1" :xs="1">
      <v-card
  >
    <v-img
      class="white--text align-end"
      height="250px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
      :src="require(`../assets/${place.data.previewImage}`)"
    >
      <v-card-title>
          <router-link :to="`/places/${place.data._id}`" :tag="'span'" style="cursor: pointer;">
              {{place.data.title}}
          </router-link>
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0 d-flex align-center">
        <span class="ml-2">
            {{place.category.title}}
        </span>
        <v-spacer></v-spacer>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <p>Висота над рівнем моря: {{place.data.height}} м</p>
      <article>
          <span>{{place.data.info.slice(0, 200)}}</span>
          <router-link :to="`/places/${place.data._id}`" :tag="'span'" style="cursor: pointer; color: orange;">
              <span>...</span>
          </router-link>
      </article>
    </v-card-text>

    <v-card-actions>
      <v-btn :to="`/places/${place.data._id}`"
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
    methods: {
        
    }
}
</script>

<style>

</style>
