<template>
    <v-app
        id="login-home"
        dark>
        <v-main>
            <transition mode="out-in">
                <router-view />
            </transition>
        </v-main>
    </v-app>
</template>