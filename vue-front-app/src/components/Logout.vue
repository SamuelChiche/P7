<template>
  <a
    v-if="isLoggedIn"
    @click="logout"
    id="logout_button"
    class="dropdown-item"
  >
    Se déconnecter
  </a>
</template>

<script>

export default {
  name: "Logout",
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout () {
      this.$store.dispatch("logout")
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>

<style lang="scss">

</style>