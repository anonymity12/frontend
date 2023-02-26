import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user"))
    },
    mutations: {
        // set
        SET_TOKENN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USER: (state, user) => {
            state.user = user
            localStorage.setItem("user", JSON.stringify(user))
        },
        // 0226 not used by anyone now
        SET_USER_COSMOS_ID: (state, cosmosId) => {
            state.user.name = cosmosId // this is work fine
            localStorage.setItem("user", JSON.stringify(state.user)) // work fine
        },
        REMOVE_INFO : (state) => {
            state.token = ''
            state.user = {}
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    },
    getters: {

    },
    actions: {
    },
    modules: {
    }
})
