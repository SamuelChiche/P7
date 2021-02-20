<template>
  <div class="header">
    <div class="header container">
      <nav class="navbar">
        <router-link to="/" class="navbar-brand"
          ><img src="../assets/icon-left-font-monochrome-white.png" alt=""
        /></router-link>

        <div class="dropdown" v-if="isLoggedIn">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <font-awesome-icon icon="cog" />
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Logout />
            <MyAccount />
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
    isLoggedIn: function () {
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