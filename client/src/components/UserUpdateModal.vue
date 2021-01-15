<template>
  <v-dialog
      v-model="dialog"
      scrollable
      max-width="500px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Змінити
        </v-btn>
      </template>
      <v-card>
            <v-form v-model="valid" ref="form" @submit.prevent="updateUserData">
                <v-card-title>Змінити {{modalTitle}}</v-card-title>
                <v-divider></v-divider>
                <v-card-text v-if="modalId === 'email'">
                    <v-text-field class="mt-2"
                        :label="modalDataValue"
                        v-model="email"
                        :rules="emailRules"
                        required
                        solo
                    ></v-text-field>
                </v-card-text>
                <v-card-text v-if="modalId === 'name'">
                    <v-text-field class="mt-2"
                        :label="modalDataValue"
                        v-model="name"
                        :rules="nameRules"
                        required
                        solo
                    ></v-text-field>
                </v-card-text>
                <v-card-text v-if="modalId === 'password'">
                    <v-text-field class="mt-2"
                        label="Теперішній пароль"
                        v-model="currentPassword"
                        :rules="passwordRules"
                        type="password"
                        required
                        solo
                    ></v-text-field>
                    <v-text-field class="mt-2"
                        label="Новий пароль"
                        v-model="newPassword"
                        :rules="passwordRules"
                        type="password"
                        required
                        solo
                    ></v-text-field>
                    <v-text-field class="mt-2"
                        label="Повторіть новий пароль"
                        v-model="newPasswordConfirm"
                        :rules="passwordRules"
                        type="password"
                        required
                        solo
                    ></v-text-field>
                </v-card-text>
                <v-card-text v-if="modalId === 'avatar'">
                    <v-file-input
                        accept="image/*"
                        name="images"
                        label="Оберіть забраження"
                        chips
                        clearable
                        v-model="files"
                    ></v-file-input>
                </v-card-text>
                <v-alert v-if="getError"
                    border="left"
                    color="red lighten-2"
                    class="mx-2"
                    dark
                    >
                    {{getError}}
                </v-alert>
                <v-alert v-if="success" class="mx-2"
                    type="success"
                >{{success}}</v-alert>
                <v-divider></v-divider>
                <v-card-actions>
                <v-btn
                    color="orange"
                    text
                    :disabled="getProcessing"
                    @click="disposeModal"
                >
                    Закрити
                </v-btn>
                <v-btn
                    color="orange"
                    text
                    :disabled="!valid || getProcessing"
                    @click="updateUserData"
                >
                    Встановити {{modalTitle}}
                </v-btn>
                </v-card-actions>
            </v-form>
      </v-card>
    </v-dialog>
</template>

<script>
import Axios from 'axios';
import proxy from '../proxy';
import { mapGetters, mapMutations } from 'vuex';

export default {
    props: {
        'modalTitle': {
            required: true,
            type: String
        },
        'modalId': {
            required: true,
            type: String
        },
        'modalDataValue': {
            required: false,
            type: String
        }
    },
    data: () =>({
        dialog: false,
        files: [],
        valid: false,
        success: false,
        email: null,
        name: null,
        currentPassword: null,
        newPassword: null,
        newPasswordConfirm: null,
        error: null,
        emailRules: [
            v => !!v || 'Поле обов`язкове',
            v => /.+@.+\..+/.test(v) || 'E-mail невірний',
        ],
        nameRules: [
            v => !!v || 'Поле обов`язкове',
        ],
        passwordRules: [
            v => !!v || 'Поле обов`язкове',
            v => (v && v.length >= 5) || 'Пароль має бути більше 5 символів',
        ]
    }),
    computed: {
        ...mapGetters([
            'getToken',
            'getError',
            'getProcessing'
        ]),
    },
    methods: {
        ...mapMutations([
            'SET_ERROR',
            'CLEAN_ERROR',
            'SET_PROCESSING',
            'SET_USER'
        ]),
        updateUserData() {
            this.CLEAN_ERROR();
            this.success = null;
            this.SET_PROCESSING(true);
            let data = {}
            let controllerName = null;
            if(this.modalId === 'email') {
                data.email = this.email;
                controllerName = 'updateEmail'
            }
            if(this.modalId === 'name') {
                data.name = this.name
                controllerName = 'updateName';
                this.SET_USER({name: this.name})
            }
            if(this.modalId === 'password') {
                if(this.newPassword !== this.newPasswordConfirm) {
                    this.SET_ERROR('Нові паролі не збігаються');
                    this.SET_PROCESSING(false);
                    return;
                }
            }
            if(this.modalId === 'password') {
                data.newPassword = this.newPassword;
                data.currentPassword = this.currentPassword;
                controllerName = 'updatePassword';
            }
            if(this.modalId === 'avatar') {
                data = new FormData();
                controllerName = 'updateAvatar';
                    data.append('image', this.files);
            }
            let config = {
                headers: {
                    Authorization: `Bearer ${this.getToken}`,
                }
            }
            if(this.modalId === 'avatar') {
                config = {
                    headers: {
                        Authorization: `Bearer ${this.getToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            }
            Axios.post(`${proxy.domen}/user/${controllerName}`, data, config)
                .then((data) => {
                    if(this.modalId === 'email') {
                        this.$emit('emailUpdated', this.email);
                    }
                    if(this.modalId === 'name') {
                        this.$emit('nameUpdated', this.name);
                    }
                    if(this.modalId === 'avatar') {
                        this.$emit('avatarUpdated', data.data.originalname)
                    }
                    this.success = data.data.message;
                    this.resetForm();
                    this.SET_PROCESSING(false);
                })
                .catch((error) => {
                    this.SET_ERROR(error.response.data.message);
                    this.SET_PROCESSING(false);
                }) 
        },
        disposeModal() {
            this.resetForm();
            this.success = false;
            this.dialog = false;
            this.CLEAN_ERROR();
        },
        resetForm() {
            this.$refs.form.reset();
        }
    }
}
</script>

<style>

</style>