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
        SET_USER_COSMOS_ID: (state, cosmosId) => {
            state.user.name = cosmosId // this is work fine
            localStorage.setItem("user", JSON.stringify(state.user)) // work fine
        },
        REMOVE_INFO : (state) => {
            state.token = ''
            state.user = {}
            localStorage.setItem("token", '')
            localStorage.setItem("user", JSON.stringify(''))
        }
    },
    getters: {

    },
    actions: {
    },
    modules: {
    }
})
