<template>
  <v-container fluid class="pa-0">
    <v-container fluid class="d-flex">
        <auth-modal style="z-index: 1000" :title="'Додати на карту'"></auth-modal>
    </v-container>
    <v-row>
        <v-col :md="3" v-if="showFilters">
            <v-container>
                <places-categories-list></places-categories-list>
            </v-container>
        </v-col>
        <v-col :md="9" v-if="showFilters">
            <Map :loadFullMap="'load'"></Map>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>

import Map from '@/components/Map';
import AuthModal from '@/components/AuthModal';
import PlacesCategoriesList from '@/components/PlacesCategoriesList';

export default {
    name: 'MapView',
    data: () => ({
        showFilters: true
    }),
    components: {
        Map,
        AuthModal,
        PlacesCategoriesList
    }
}
</script>

<style>

</style>