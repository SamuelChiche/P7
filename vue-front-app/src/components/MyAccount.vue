<template>
    <button @click="getUserId"
            class="btn btn-secondary mr-2"
            type="button"
            id="myProfile"
          >
            <font-awesome-icon icon="user" />
    </button>
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