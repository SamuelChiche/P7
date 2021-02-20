<template>
    <a @click="getUserId" class="dropdown-item">Mon profil</a>
</template>
<script>
export default {
    Name : 'MyAccount',
    methods: {
    getUserId() {
      let user = JSON.parse(this.$store.state.user);
      this.$router.push({ name: "account", params: { id: user.id } });
    },
  },
    
}
</script>