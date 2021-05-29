<template>
  <v-container>
      <pages-headline :headline="'Панель керування'"></pages-headline>
      <v-row v-if="user">
          <v-col>
            <div>
                <h2 class="title">Інформація про вхід</h2>
                <table>
                    <tr>
                        <td>Емейл</td>
                        <td>{{user.email}}</td>
                        <td>
                            <user-update-modal
                            :modalTitle="'емейл'"
                            :modalDataValue="user.email"
                            :modalId="'email'"
                            @emailUpdated="updateEmail"></user-update-modal>
                        </td>
                    </tr>
                    <tr>
                        <td>Ваше ім'я</td>
                        <td>{{user.name}}</td>
                        <td>
                            <user-update-modal 
                            :modalTitle="'ім`я'"
                            :modalDataValue="user.name"
                            :modalId="'name'"
                            @nameUpdated="updateName"
                            ></user-update-modal>
                        </td>
                    </tr>
                    <tr>
                        <td>Пароль</td>
                        <td>********</td>
                        <td>
                            <user-update-modal
                            :modalTitle="'пароль'"
                            :modalId="'password'">
                            </user-update-modal>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
              <h1 class="title">Олюблені маршрути</h1>
              <v-btn color="orange" dark v-for="(item, index) in user.routes" :key="index" :to="`/routes/${item._id}`">
                {{item.path}}
              </v-btn>
            </div>
          </v-col>
          <v-col>
              <v-row>
                  <v-col>
                      <div>
                          <h2 class="title">Зображення профілю</h2>
                          <table>
                              <tr>
                                  <td v-if="!user.avatar">
                                      <img height="100" width="100" src="../assets/default-user-image.png" alt="avatar">
                                    </td>
                                  <td v-else>
                                      <img height="100" width="100" :src="require(`../assets/avatars/${user.avatar}`)" alt="avatar">
                                    </td>
                                  <td>
                                      <user-update-modal
                                      :modalTitle="'зображення профілю'"
                                      :modalId="'avatar'"
                                      @avatarUpdated="updateAvatar">
                                      </user-update-modal>
                                  </td>
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
                          <v-btn dark block :color="'orange'">Зберегти зміни</v-btn>
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
import UserUpdateModal from '@/components/UserUpdateModal';

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
                        Authorization: `Bearer ${this.getToken}`,
                    }
                }
            )
                .then((data) => {
                    this.user = data.data.user
                    console.log(this.user)
                })
        },
        updateEmail(email) {
            this.user.email = email;
        },
        updateName(name) {
            this.user.name = name;
        },
        updateAvatar(avatar) {
            this.user.avatar = avatar;
        }
    },
    mounted() {
        this.getUser()
    },
    components: {
        PagesHeadline,
        UserUpdateModal
    }
}
</script>

<style scoped>
    table {
        width: 100%;
    }
    td {
        padding: 10px 20px 10px 0;
    }
</style>
