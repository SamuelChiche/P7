<template>
  <div id="app">
    <Header/>
    <div id="nav">
    <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'app',
  components: {
    Header,

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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
