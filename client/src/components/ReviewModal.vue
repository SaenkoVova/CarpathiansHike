<template>
  <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
        >
          Додати коментар або фото
        </v-btn>
      </template>
      <v-sheet
      >
        <v-form class="pt-5 pb-5 pl-5 pr-5 mb-5" enctype="multipart/form-data">
          <v-container fluid>
            <v-row>
              <v-col :md="11" :sm="11" :xs="11" :xl="11">
                <pages-headline :headline="'Залиште свій відгук'"></pages-headline>    
              </v-col>
              <v-col :md="1" :sm="1" :xs="1" :xl="1">
                <v-btn
                  icon
                  @click="sheet = false"
                >
                  <v-icon dark>
                    mdi-close
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
            <v-textarea
            outlined
            v-model="review"
          name="input-7-1"
          label="Ваш відгук"
        ></v-textarea>
        <v-file-input
        accept="image/*"
        name="images"
        label="Оберіть забраження"
        chips
        clearable
        v-model="files"
        multiple
      ></v-file-input>
      <v-alert v-if="getError"
            border="top"
            color="red lighten-2"
            dark
            >
            {{getError}}
            </v-alert>
            <v-alert v-if="success"
            elevation="10"
            type="success"
          >{{success}}</v-alert>
        <v-btn @click="makeReview" :disabled="!review || processing" :color="'orange'">Відправити</v-btn>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import Axios from 'axios';
import proxy from '@/proxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    props: {
      'mode': {
        type: String,
        required: true
      }
    },
    data: () => ({
        sheet: false,
        files: [],
        review: '',
        processing: false,
        success: ''
    }),
    computed: {
      ...mapGetters([
        'getToken',
        'getError'
      ])
    },
    methods: {
        ...mapMutations([
          'SET_PROCESSING',
          'SET_ERROR',
          'CLEAN_ERROR'
        ]),
        makeReview() {
          this.CLEAN_ERROR();
          this.success = null;
          this.processing = true;
          const formData = new FormData();
          for(const item of this.files) {
            formData.append('images', item);
          }
          formData.append('review', this.review);
          formData.append('placeId', this.$route.params.id);
          formData.append('mode', this.mode);
          Axios.post(`${proxy.domen}/reviews/makeReview`, formData,
          {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          })
            .then((data) => {
              this.success = data.data.message;
              data.data.comment.owner = data.data.user.name;
              this.$emit('makeReview', data.data.comment);
              this.files = [];
              this.review = '';
              this.processing = false;
            })
            .catch((error) => {
              this.SET_ERROR(error.response.data.message);
              this.processing = false;
            })
        }
    },
    components: {
        PagesHeadline
    }
}
</script>