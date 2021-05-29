<template>
  <v-container>
    <v-btn @click="loadEmailAddresses" class="mb-5" large block>Отримати електронні адреси користувачів</v-btn>
      <template>
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="mb-5"
                  block
                  large
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                Локації додані користувачем
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="item in emails"
                  :key="item._id"
              >
                <v-list-item-title @click="loadUserLocations(item._id)">{{ item.email }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    <v-btn @click="loadLocations" large block>Завантажити кординати локацій</v-btn>

    <download-csv v-if="report.length"
        class="v-btn v-btn--block v-btn--is-elevated v-btn--has-bg  v-size--large btn"
        :data="report">
      Завантажити звіт
    </download-csv>
  </v-container>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'Reporting',
    data: () => ({
      report: [],
      emails: [],
      token: localStorage.getItem('token')
    }),
    methods: {
      loadEmailAddresses() {
        axios.get('reporting/loadUsersEmails', {
          headers: {
            Authorization: `Bearer_${this.token}`
          }
        })
          .then(res => {
            this.report = res.data
          })
      },
      loadUserLocations(userId) {
        axios.get('reporting/loadUserLocations', {
          headers: {
            Authorization: `Bearer_${this.token}`
          },
          params: {userId}
        })
          .then(res => {
            this.report = res.data
          })
      },
      loadLocations() {
        axios.get('reporting/loadLocations', {
          headers: {
            Authorization: `Bearer_${this.token}`
          }
        })
          .then(res => {
            this.report = res.data
          })
      },
      loadEmails() {
        axios.get('reporting/loadUsersEmails')
          .then(res => {
            this.emails = res.data
          })
      }
    },
    mounted() {
      this.loadEmails()
    }
  }
</script>

<style scoped>
  .btn {
    margin: 20px 0;
  }
</style>
