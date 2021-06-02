<template>
    <v-container>
        <back-arrow :link="'/map'" :location="'карти'"></back-arrow>
        <v-container v-if="getProcessing" class="d-flex justify-center align-center" style="height: 80vh">
            <v-progress-circular 
            :size="200"
            indeterminate
            color="primary"
            ></v-progress-circular>
        </v-container>
        <v-container v-if="error">
            <v-alert
              border="top"
              color="red lighten-2"
              dark
              >
              {{error}}
              </v-alert>
        </v-container>
        <div v-if="!getProcessing && place">
            <v-row>
                <v-col :md="6" :sm="12" :xs="12">
                    <pages-headline :headline="place.place.title"></pages-headline>
                    <v-container fluid class="d-flex">
                        <p v-if="place.massif.title">{{place.massif.title}}</p>
                        <v-spacer></v-spacer>
                        <p>Дата: {{place.place.creationDate}}</p>
                    </v-container>
                    <div>
                        <article>
                            <p>{{place.place.info}}</p>
                        </article>
                    </div>
                    <div>
                        <p>Висота над рівнем моря {{place.place.height}} м</p>
                    </div>
                    <div>
                      <v-btn color="orange" dark @click="addToBookmarks">Додати до закладок</v-btn>
                    </div>
                </v-col>
                <v-col :md="6" :sm="12" :xs="12">
                    <div>
                        <ul class="d-flex justify-space-around pb-5">
                            <li v-if="place.place.transportHub">
                                <tooltip :description="'Транспортний вузол'" :icon="'mdi-cursor-pointer'"></tooltip>
                            </li>
                            <li v-if="place.place.tourCity">
                                <tooltip :description="'Важливе туристичне місто чи село'" :icon="'mdi-star-check'"></tooltip>
                            </li>
                            <li v-if="place.place.publicTransport">
                                <tooltip :description="'Є інформація про публічний транспорт'" :icon="'mdi-train-variant'"></tooltip>
                            </li>
                            <li v-if="place.place.railwayConnection">
                                <tooltip :description="'Є залізничне сполучення'" :icon="'mdi-go-kart-track'"></tooltip>
                            </li>
                        </ul>
                    </div>
                    <Map :place="place.place"></Map>
                </v-col>
            </v-row>
            <v-container fluid>
                <pages-headline :headline="`Маршрути сюди`"></pages-headline>
                <ul>
                    <li v-for="(item, index) in place.place.routes" :key="index">Заросляк - о.Несамовите - г. Пожижевська - Заросляк</li>
                    <li>Перехід по Чорногірському хребту</li>
                    <li>Чорногора з села Говерла</li>
                    <li>Говерла з с.Лазещина</li>
                    <li>Петрос з с.Лазещина</li>
                </ul>
            </v-container>
            <v-container fluid>
                <pages-headline :headline="`Найближчі населені пункти`"></pages-headline>
                <ul>
                    <li>Говерла (10.0 км)</li>
                    <li>Луги (11.5 км)</li>
                    <li>Вороненко (13.6 км)</li>
                </ul>
            </v-container>
            <v-container fluid>
                <pages-headline :headline="`Прогноз погоди для сусідніх населених пунктів`"></pages-headline>
                <ul class="d-flex">
                    <li class="ml-5 mr-5">Село Говерла</li>
                    <li class="ml-5 mr-5">Село Вороненко</li>
                    <li class="ml-5 mr-5">Село Лазещина</li>
                </ul>
            </v-container>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <reviews-list 
                            @pushReviewImageToGallery="pushReviewImageToGallery"
                            :allowReview="place.place.allowReview"
                            :mode="'place'"/>
                    </v-col>
                    <v-col>
                        <gallery :images="place.place.images"></gallery>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </v-container>
</template>

<script>

import BackArrow from '@/components/BackArrow';
import PagesHeadline from '@/components/PagesHeadline';
import Map from '@/components/Map';
import ReviewsList from '@/components/ReviewsList';
import Gallery from '@/components/Gallery';
import Tooltip from '@/components/Tooltip';
import Axios from 'axios';
import proxy from '@/proxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'PlaceDetails',
    data: () => ({
        place: null,
        error: null,
        snackbar: false,
        text: 'Закладку створено',
        timeout: 2000,
    }),
    props: {
        'id': {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapGetters([
            'getProcessing',
            'getToken'
        ])
    },
    mounted() {
         this.getPlace();
    },
    methods: {
        ...mapMutations([
            'SET_PROCESSING'
        ]),
        addToBookmarks() {
          Axios.post(`${proxy.domen}/user/addPlaceToBookmarks`, {
            placeId: this.id
          }, {
            headers: {
              Authorization: `Bearer ${this.getToken}`
            }
          })
            .then(res => {
              console.log(res.data)
              if(res.status === 200) {
                this.snackbar = true;
              }
            })
        },
        pushReviewImageToGallery(images) {
            this.place.place.images = [...this.place.place.images, ...images]
        },
        getPlace() {
            const id = this.$route.params.id;
            this.SET_PROCESSING(true);
            Axios.get(`${proxy.domen}/places/getPlaceById`, {
                params: {id}
            })
                .then((data) => {
                    this.place = data.data
                    this.SET_PROCESSING(false)
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                    this.SET_PROCESSING(false);
                })
        }
    },
    components: {
        BackArrow,
        PagesHeadline,
        Map,
        ReviewsList,
        Gallery,
        Tooltip
    }
}
</script>

<style scoped>
    ul {
        list-style: none;
        padding: 0;
    }
</style>
