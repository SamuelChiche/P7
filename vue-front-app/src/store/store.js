import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

// VueX Store
export default new Vuex.Store({
    // Stockage du status de connexion, du token d'authentification ainsi que des données de l'utilisateur
    state: {
        status: '',
        token: '',
        user : {},
    },
    // Utilisation de Persisted State pour conserver le store lors de la fermeture ou du rafraichissement de la page
    plugins: [createPersistedState()],
    // Mutations effectuées suivant les résultats obtenus lors de la connexion / inscription
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
        // Méthode de connexion
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
        // Méthode d'inscription
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
        // Méthode de déconnexion
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
    // Outils pour verifier facilement le status de connexion de l'utilsateur
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})

