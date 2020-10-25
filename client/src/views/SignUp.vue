<template>
  <v-container>
      <pages-headline :headline="'Реєстрація новго профілю'"></pages-headline>
        <v-form v-model="valid">
            <v-text-field
                label="Ваше ім'я"
                :rules="nameRules"
                hide-details="auto"
                v-model="name"
            ></v-text-field>
            <v-text-field
                label="Ваше email адреса"
                :rules="emailRules"
                v-model="email"
                hide-details="auto"
            ></v-text-field>
            <v-row>
                <v-col>
                    <v-text-field
                        label="Пароль"
                        :rules="passRules"
                        hide-details="auto"
                        type="password"
                        v-model="password"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field
                        label="Повторіть пароль"
                        :rules="passRules"
                        hide-details="auto"
                        type="password"
                        v-model="passConfirm"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-checkbox color="primary"
                v-model="getNews"
                :label="'Підписати мене на новини сайту'"
            ></v-checkbox>
            <v-btn block class="pa-5 mb-5" @click="signUp" :disabled="processing || !valid">Зареєструвати акаунт</v-btn>
        </v-form>
        <v-alert v-if="error"
            border="top"
            color="red lighten-2"
            dark
            >
            {{error}}
            </v-alert>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import {mapMutations} from 'vuex';

export default {
    name: 'SignUp',
    data: () => ({
        nameRules: [
            value => !!value || 'Це поле обов`язкове.',
        ],
        emailRules: [
            value => !!value || 'Це поле обов`язкове.',
            value => (value && value.length >= 5) || 'Мінімум 5 символів'
        ],
        passRules: [
            value => !!value || 'Це поле обов`язкове.',
            value => (value && value.length >= 5) || 'Мінімум 5 символів',
        ],
        getNews: true,
        name: null,
        email: null,
        password: null,
        passConfirm: null,
        valid: false
    }),
    computed: {
        error() {
            return this.$store.getters.getError;
        },
        processing() {
            return this.$store.getters.getProcessing;
        },
        getAuthenticated() {
            return this.$store.getters.getAuthenticated;
        }
    },
    watch: {
        getAuthenticated(val) {
            if(val === true){
                this.$router.go(-1)
            }
        }
    },
    methods: {
        ...mapMutations(['SET_ERROR']),
        signUp() {
            if(this.password !== this.passConfirm) {
                this.SET_ERROR(`Паролі не збігаються`)
            }
            else {
                this.$store.dispatch('SIGN_UP', {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    getNews: this.getNews
                })
            }
        }
    },
    components: {
        PagesHeadline
    }
}
</script>

<style>

</style>