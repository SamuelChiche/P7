import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import store from './store/store';

Vue.config.devtools = true

Vue.prototype.$http = axios

const token = store.state.token

if (token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
}

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
