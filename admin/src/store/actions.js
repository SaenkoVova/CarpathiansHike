import axios from 'axios';

export default {
    login({ commit }, userData) {
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios.post('/auth/signin', {email: userData.username, password: userData.password})
                .then(response => {
                    const token = response.data.token;
                    const user = response.data.name;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', user);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    commit('auth_success', {token, user})
                    resolve(response);
                })
                .catch(err => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(err);
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}