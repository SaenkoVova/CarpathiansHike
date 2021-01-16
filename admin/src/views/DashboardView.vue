<template>
    <v-app
        id="dashboard-view"
        dark>
        <core-toolbar />

        <core-drawer />

        <v-main>
            <v-fade-transition mode="out-in">
                <router-view />
            </v-fade-transition>
        </v-main>
    </v-app>
</template>

<script>

import CoreToolbar from '@/components/core/Toolbar';
import CoreDrawer from '@/components/core/Drawer';

export default {
    name: 'DashboardView',
    components: {
        CoreToolbar,
        CoreDrawer
    }
}
</script>

<style>

</style>