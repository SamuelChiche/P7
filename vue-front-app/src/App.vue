<template>
  <div id="app">
    <Header/>
    <div id="nav">
       <span v-if="isLoggedIn"> <a @click="logout">Logout</a></span>
    <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'app',
  components: {
    Header
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn }
  },
  methods : {
    logout: function(){
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
