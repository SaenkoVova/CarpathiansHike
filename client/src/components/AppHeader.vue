<template>
    <v-app-bar app dark style="z-index: 1001;">

        <v-toolbar-title>
            <router-link :to="'/'" tag="span" style="cursor: pointer;">В похід карпатами</router-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

        <app-nav></app-nav>

        <v-spacer></v-spacer>

        <auth-modal :title="'Вхід'"></auth-modal>
      
    </v-app-bar>
</template>

<script>

import AppNav from '@/components/AppNav';
import AuthModal from '@/components/AuthModal';

export default {
    data: () => ({
        email: null
    }),
    components: {
        AppNav,
        AuthModal
    }
}
</script>

<style>

</style>