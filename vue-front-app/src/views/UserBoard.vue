<template>
  <div class="userboard">
    <button @click="getUserId" class="btn btn-success">Mon profil</button>
    <div class="container-fluid gedf-wrapper">
      
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6 gedf-main">
          
          <Makeapost />
          <Post />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Makeapost from "../components/Makeapost";
import Post from "../components/Post";
export default {
  components: {
    Makeapost,
    Post,
  },
  name: "userboard",
  methods: {
    getUserId() {
      let user = JSON.parse(this.$store.state.user);
      this.$router.push({ name: "account", params: { id: user.id } });
    },
  },
};
</script>