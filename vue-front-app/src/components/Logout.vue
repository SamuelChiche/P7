<template>
<!-- Bouton de déconnexion -->
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
    // Récupération du status de connexion dans le store VueX
    isLoggedIn () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    // Déconnecte l'utilisateur
    logout () {
      this.$store.dispatch("logout")
        .then(() => this.$router.push("/login"));
    },
  },
};
</script>