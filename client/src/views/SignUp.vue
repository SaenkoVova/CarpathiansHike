<template>
  <v-container>
      <pages-headline :headline="'Реєстрація новго профілю'"></pages-headline>
        <v-text-field
            label="Ваше ім'я"
            :rules="nameRules"
            hide-details="auto"
        ></v-text-field>
        <v-text-field
            label="Ваше email адреса"
            :rules="emailRules"
            hide-details="auto"
        ></v-text-field>
        <v-row>
            <v-col>
                <v-text-field
                    label="Пароль"
                    :rules="passRules"
                    hide-details="auto"
                    type="password"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field
                    label="Повторіть пароль"
                    :rules="passRules"
                    hide-details="auto"
                    type="password"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-checkbox color="primary"
            v-model="getNews"
            :label="'Підписати мене на новини сайту'"
        ></v-checkbox>
        <v-btn dark block class="pa-5">Зареєструвати акаунт</v-btn>
  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';

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
            value => (value && value.length >= 5) || 'Мінімум 5 символів'
        ],
        getNews: true
    }),
    components: {
        PagesHeadline
    }
}
</script>

<style>

</style>