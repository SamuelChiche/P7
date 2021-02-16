import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: '',
        user : {},
    },
    plugins: [createPersistedState()],
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, { token, user }) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({ commit }, userlogs) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://localhost:3000/user/login', data: userlogs, method: 'POST' })
                    .then(res => {
                        const token = res.data.token
                        const user = JSON.stringify(res.data.user)
                        axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
                        commit('auth_success', { token, user })
                        resolve(res)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        reject(err)
                    })
            })
        },
        register({ commit }, userlogs) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://localhost:3000/user/signup', data: userlogs, method: 'POST' })
                    .then(res => {
                        const token = res.data.token
                        const user = JSON.stringify(res.data.user)
                        axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
                        commit('auth_success', {token, user})
                        resolve(res)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('vuex')
                delete axios.defaults.headers.common['Authorization']
                resolve()
                reject()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})

