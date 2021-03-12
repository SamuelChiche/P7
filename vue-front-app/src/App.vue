<template>
<!-- App -->
  <div id="app">
    <!-- Composant en-tête -->
    <Header/>
    <div id="nav">
      <!-- Affichage des pages de l'application -->
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
  // Déconnecte l'utilisateur si le token est invalide
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.resonse.status === 403 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  .btn-blue {
    color : #fff;
    background-color: #091f43;
    border-color: #091f43;
  }
}
</style>
