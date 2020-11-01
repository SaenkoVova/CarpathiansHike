import Axios from 'axios';
import proxy from '@/proxy';
export default {
    state: {
        isAuthenticated: false,
        token: JSON.parse(window.localStorage.getItem('token')) || null
    },
    mutations: {
        SET_AUTH(state, payload) {
            window.localStorage.removeItem('token');
            window.localStorage.setItem('token', JSON.stringify(payload));
            state.isAuthenticated = true;
        },
        UNSET_AUTH(state) {
            window.localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.token = null;
        }
    },
    actions: {
        SIGN_UP({commit}, payload) {
            commit('CLEAN_ERROR')
            commit('SET_PROCESSING', true)
            Axios.post(`${proxy.domen}/auth/signup`, payload)
                .then((data) => {
                    commit('SET_AUTH', data.data.token)
                    commit('SET_USER', {name: data.data.name})
                    commit('SET_PROCESSING', false)
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.response.data.message)
                })
        },
        LOG_IN({commit}, payload) {
            commit('CLEAN_ERROR')
            commit('SET_PROCESSING', true)
            Axios.post(`${proxy.domen}/auth/signin`, payload)
                .then((data) => {
                    commit('SET_AUTH', data.data.token)
                    commit('SET_USER', {name: data.data.name})
                    commit('SET_PROCESSING', false)
                })
                .catch((error) => {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.response.data.message)
                })
        },
        LOG_OUT({commit}) {
            commit('SET_PROCESSING', true)
            commit('UNSET_USER')
            commit('UNSET_AUTH')
            commit('SET_PROCESSING', false)
        },
        AUTH_STATE_CHANGE({commit}, payload) {
            Axios.get(`${proxy.domen}/auth/authstatechange`,
                {
                    headers: {
                        Authorization: `Bearer ${payload}`
                    }
                }
            )
            .then((data) => {
                commit('SET_AUTH', payload)
                commit('SET_USER', data.data)
            })
            .catch(() => {
                commit('UNSET_AUTH')
            })
        }
    },
    getters: {
        getAuthenticated: (state) => state.isAuthenticated,
        getToken: (state) => state.token
    }
}