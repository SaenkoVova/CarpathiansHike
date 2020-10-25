export default {
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        UNSET_USER(state) {
            state.user = null
        }
    },
    getters: {
        getUserName: (state) => state.user.name
    }
}