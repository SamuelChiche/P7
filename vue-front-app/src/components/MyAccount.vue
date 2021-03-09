<template>
<!-- Bouton vers page profile utilisateur -->
    <button @click="getUserId"
            class="btn btn-secondary mr-2"
            type="button"
            id="myProfile"
            aria-label="my-account"

          >
            <font-awesome-icon icon="user" />
    </button>
</template>
<script>
export default {
    Name : 'MyAccount',
    methods: {
    // Envoie l'utilisateur vers sa page profile
    getUserId() {
      let user = JSON.parse(this.$store.state.user);
      this.$router.push({ name: "account", params: { id: user.id } });
    },
  },
    
}
</script>