<template>
  <div class="profile container">
    <div class="card shadow-sm">
      <div class="text-center py-5">
        <img
          src="../assets/blank-profile-picture.png"
          alt=""
          class="rounded-circle shadow-sm"
          height="200px"
        />

        <div class="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">
          <h4 class="font-weight-bold my-4">{{ name }}</h4>
          <hr />
          <div class="opacity-75 mb-4">
            {{ email }}
          </div>
          <div
            v-if="(this.$route.params.id === JSON.parse($store.state.user).id) || JSON.parse(this.$store.state.user).is_admin == 1"
          >
            <button class="btn btn-danger" @click="deleteUser">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
    <Userpost />
  </div>
</template>

<script>
import UserServices from "../services/UserServices"
import Userpost from "../components/Userpost";
export default {
  components: {
    Userpost,
  },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  created() {
    this.getOneUser()
  },
  methods: {
    getOneUser() {
      console.log(JSON.parse(this.$store.state.user).is_admin)
      let userId = this.$route.params.id;
      UserServices.getOne(userId)
        .then((res) => {
          const userData = res.data[0];
          this.name = userData.name;
          this.email = userData.email;
        })
        .catch((err) => err);
    },
    deleteUser() {
      let id = JSON.parse(this.$store.state.user).id
      UserServices.deleteOne(id)
        .then(() => {
          this.$store.dispatch("logout")
              .then(() => this.$router.push("/login"));
        })
    },
    
  },
};
</script>