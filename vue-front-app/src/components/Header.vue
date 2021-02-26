<template>
  <div class="header">
    <div class="header container">
      <nav class="navbar justify-content-between">
        <router-link to="/" class="navbar-brand"
          ><img src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania"
        /></router-link>

        <div class="navbar" v-if="isLoggedIn">
          <a @click="$router.push('/userboard')" class="btn btn-secondary mr-2">
            Accueil
          </a>
          <MyAccount />
          <div class="dropdown" >
           <a
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <font-awesome-icon icon="cog" />
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Logout />
          </div>
        </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>

import Logout from "../components/Logout";
import MyAccount from "../components/MyAccount";

export default {
  name: "Header",
  components: {
    Logout,
    MyAccount,
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss">
.header {
  background-color: #091f43;

  img {
    width: 250px;
    height: 80px;
  }
  margin-bottom: 30px;
}
</style>