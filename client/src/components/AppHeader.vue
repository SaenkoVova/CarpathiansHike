<template>
    <v-app-bar app dark style="z-index: 1001;">

        <v-toolbar-title>
            <router-link :to="'/'" tag="span" style="cursor: pointer;">Мандри Карпатами</router-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

        <app-nav></app-nav>

        <v-spacer></v-spacer>

        <auth-modal :title="'Вхід'" v-if="!getAuthenticated"></auth-modal>

        <div v-else>
            <v-btn dark :to="'/profile'">{{getUserName}}</v-btn>
            <v-btn dark @click="logOut">Вийти</v-btn>
        </div>
      
    </v-app-bar>
</template>

<script>

import AppNav from '@/components/AppNav';
import AuthModal from '@/components/AuthModal';
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        email: null
    }),
    computed: {
        ...mapGetters([
            'getAuthenticated',
            'getUserName'
        ])
    },
    methods: {
        logOut() {
            this.$store.dispatch('LOG_OUT');
        }
    },
    components: {
        AppNav,
        AuthModal
    }
}
</script>

<style>

</style>