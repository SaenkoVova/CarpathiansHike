<template>
    <v-container>
        <back-arrow :link="'/routes'" :location="'списку'"></back-arrow>
        <v-container v-if="getProcessing" class="d-flex justify-center align-center" style="height: 80vh">
            <v-progress-circular 
            :size="200"
            indeterminate
            color="primary"
            ></v-progress-circular>
        </v-container>
        <div v-if="!getProcessing && route">
            <pages-headline :headline="`${route.start.title} - ${route.end.title}`"></pages-headline>
            <v-row>
                <v-col>
                    <p>Довжина: {{route.route.distance}} км</p>
                    <p>Тривалість: {{route.route.duration}} год</p>
                    <p>Рівень: {{route.route.level}}</p>
                    <p>
                        <span>Вершини на маршруті:</span>
                        <router-link class="ma-1" v-for="item in route.routePeaks" :key="item._id" :to="`/places/${item._id}`">
                            <span>{{item.title}}</span>
                        </router-link>
                    </p>
                    <p>
                        <span>Цікаве на маршруті:</span>
                        <router-link class="ma-1" v-for="item in route.routeInteresting" :key="item._id" :to="`/places/${item._id}`">
                            <span>{{item.title}}</span>
                        </router-link>
                    </p>
                    <p>Прогноз погоди в населених пунктах в районі маршруту:</p>
                    <ul>
                        <router-link v-for="item in route.nearestPlaces" :key="item._id" :to="`/places/${item._id}`">
                            <li>{{item.title}}</li>
                        </router-link>
                    </ul>
                </v-col>
                <v-col>
                    <article>
                        <p>{{route.route.description}}</p>
                    </article>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <gallery :images="route.route.images"></gallery>
                </v-col>
                <v-col>
                    <reviews-list></reviews-list>
                </v-col>
            </v-row>
            <v-row>
                <Map :route="route"></Map>
            </v-row>
        </div>
    </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import Gallery from '@/components/Gallery';
import ReviewsList from '@/components/ReviewsList';
import Map from '@/components/Map';
import BackArrow from '@/components/BackArrow';
import Axios from 'axios';
import proxy from '@/proxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    data: () => ({
        route: null
    }),
    computed: {
        ...mapGetters([
            'getProcessing'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_PROCESSING'
        ]),
        getRoutes() {
            const id = this.$route.params.id;
            this.SET_PROCESSING(true);
            Axios.get(`${proxy.domen}/routes/getRouteById`, {
                params: {id}
            })
                .then((data) => {
                    this.route = data.data
                    this.SET_PROCESSING(false)
                })
                .catch((error) => {
                    this.error = error.response.data.message;
                    this.SET_PROCESSING(false);
                })
        }
    },
    name: 'RouteDetails',
    components: {
        PagesHeadline,
        Gallery,
        ReviewsList,
        Map,
        BackArrow
    },
    mounted() {
        this.getRoutes();
    }
}
</script>

<style>

</style>