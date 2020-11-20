<template>
  <v-container>
      <pages-headline :headline="'Панель керування'"></pages-headline>
      <v-row>
          <v-col>
            <div>
                <h2 class="title">Інформація про вхід</h2>
                <table>
                    <tr>
                        <td>Емейл</td>
                        <td>{{user.email}}</td>
                        <td><v-btn dark :color="'orange'">Змінити</v-btn></td>
                    </tr>
                    <tr>
                        <td>Ваше ім'я</td>
                        <td>{{user.name}}</td>
                        <td><v-btn dark :color="'orange'">Змінити</v-btn></td>
                    </tr>
                    <tr>
                        <td>Пароль</td>
                        <td>********</td>
                        <td><v-btn dark :color="'orange'">Змінити</v-btn></td>
                    </tr>
                </table>
            </div>
          </v-col>
          <v-col>
              <v-row>
                  <v-col>
                      <div>
                          <h2 class="title">Зображення профілю</h2>
                          <table>
                              <tr>
                                  <td v-if="!user.avatar"><img height="100" width="100" src="../assets/default-user-image.png" alt="avatar"></td>
                                  <td v-else><img :src="require(`../assets/${user.avatar}`)" alt="avatar"></td>
                                  <td><v-btn dark :color="'orange'">Змінити</v-btn></td>
                              </tr>
                          </table>
                      </div>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                      <div>
                          <h2 class="title">Налаштування емейл повідомлень</h2>
                          <table>
                              <tr>
                                  <td>Регулярна розсилка із новинами</td>
                                  <td>
                                    <v-checkbox
                                    v-model="user.newsSubscribe"
                                    ></v-checkbox>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Коментарі до об'єктів які ви додали</td>
                                  <td>
                                    <v-checkbox
                                    v-model="user.allowReview"
                                    ></v-checkbox>
                                  </td>
                              </tr>
                              <tr>
                                  <td>Відповіді на ваші коментарі</td>
                                  <td>
                                    <v-checkbox
                                    v-model="user.allowReply"
                                    ></v-checkbox>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </v-col>
              </v-row>
          </v-col>
      </v-row>

  </v-container>
</template>

<script>

import PagesHeadline from '@/components/PagesHeadline';
import Axios from 'axios';
import proxy from '@/proxy';
import { mapGetters } from 'vuex';

export default {
    name: 'Profile',
    data: () => ({
        user: null,
    }),
    computed: {
        ...mapGetters([
            'getToken'
        ])
    },
    methods: {
        getUser() {
            Axios.get(
                `${proxy.domen}/user/getUser`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getToken}`
                    }
                }
            )
                .then((data) => {
                    this.user = data.data.user
                    console.log(this.user)
                })
        },
        updateUser() {
            Axios.post(
                `${proxy.domen}/user/updateUser`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getToken}`
                    }
                }
            )
        }
    },
    mounted() {
        this.getUser();
    },
    components: {
        PagesHeadline
    }
}
</script>

<style>
    td {
        padding: 10px 20px 10px 0;
    }
</style>