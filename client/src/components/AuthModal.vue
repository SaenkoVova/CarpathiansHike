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
          {{title}}
        </v-btn>
      </template>
      <v-sheet
      >
        <div class="pt-5 pb-5 pl-5 pr-5 mb-5">
          <v-container fluid>
            <v-row>
              <v-col :md="11" :sm="11" :xs="11" :xl="11">
                <pages-headline :headline="'Увійдіть, будь ласка'"></pages-headline>    
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
          <v-text-field
            label="Email адреса"
            :rules="emailRules"
            hide-details="auto"
          ></v-text-field>
          <v-text-field
            label="Пароль"
            :rules="passRules"
            type="password"
            hide-details="auto"
          ></v-text-field>
          <v-text-field v-if="loading"
            color="success"
            loading
            disabled
          ></v-text-field>
          <v-container>
            <v-row>
              <v-col :md="2">
                <v-btn block @click="logIn" :disabled="loading">Увійти</v-btn>
              </v-col>
              <v-col :md="3">
                <v-btn block @click="sheet=false" :to="'/signup'" :disabled="loading">Зареєструватися</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';

export default {
  props: {
    'title': {
      type: String,
      required: true
    }
  },
  data: () => ({
    sheet: false,
    loading: false,
    emailRules: [
      value => !!value || 'Це поле обов`язкове.',
      value => (value && value.length >= 5) || 'Мінімум 5 символів',
    ],
    passRules: [
      value => !!value || 'Це поле обов`язкове.',
      value => (value && value.length >= 5) || 'Мінімум 5 символів',
    ],
  }),
  methods: {
    logIn() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.sheet = false;
        this.$router.push('/')
      }, 2000);
    }
  },
  components: {
    PagesHeadline
  }
}
</script>

<style>

</style>