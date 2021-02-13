<template>
  <button
    v-if="isLoggedIn"
    @click="logout"
    class="btn btn-primary float-right"
    id="logout_button"
  >
    Se déconnecter
  </button>
</template>

<script>
export default {
  name: "Logout",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => this.$router.push("/login"));
    },
  },
};
</script>
<style lang="scss">
#logout_button {
  margin-top: 20px;
}
</style>