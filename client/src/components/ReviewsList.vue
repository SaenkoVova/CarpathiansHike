<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    
    <v-toolbar
      color="orange"
      dark
    >
      <v-toolbar-title>Коментарі</v-toolbar-title>
      <v-spacer></v-spacer>
        <auth-modal v-if="allowReview && !getAuthenticated" :title="'Додати коментар або фото'"></auth-modal>
        <review-modal v-if="allowReview && getAuthenticated" :mode="mode" @makeReview="pushToReviews"></review-modal>
    </v-toolbar>

    <v-container fluid>
        <v-list three-line>
            <template v-for="item in reviews">
                <v-list-item
                :key="item.title"
                >
                <v-list-item-content>
                    <v-list-item-title>{{item.owner.name}} {{item.creationTime}}</v-list-item-title>
                    <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
                    <div class="d-flex">
                      <div v-for="(filename, index) in item.attachments" :key="index" style="margin: 5px">
                        <img height="90" width="90" :src="require(`../assets/${filename}`)" :alt="filename">
                      </div>
                    </div>
                </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-container>
  </v-card>
</template>

<script>

import AuthModal from '@/components/AuthModal';
import ReviewModal from '@/components/ReviewModal';
import { mapGetters } from 'vuex';
import Axios from 'axios';
import proxy from '@/proxy';

export default {
    props: {
      'allowReview': {
        required: true,
        type: Boolean
      },
      'mode': {
        required: true,
        type: String
      }
    },
    data: () => ({
      reviews: []
    }),
    computed: {
      ...mapGetters([
        'getAuthenticated'
      ])
    },
    methods: {
      pushToReviews(review) {
        this.reviews.push(review);
        this.$emit('pushReviewImageToGallery', review.attachments);
      },
      getReviews() {
        const id = this.$route.params.id;
        Axios.get(
          `${proxy.domen}/reviews/getReviews`, {
            params: {id, mode: this.mode}
          }
        )
          .then((data) => {
            this.reviews = data.data.reviews;
          })
      }
    },
    mounted() {
      this.getReviews();
    },
    components: {
        AuthModal,
        ReviewModal
    }
}
</script>

<style>

</style>