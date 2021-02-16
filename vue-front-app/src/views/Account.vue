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
        </div>
      </div>
    </div>
    <Userpost/>
  </div>
</template>

<script>
import axios from "axios";
import Userpost from "../components/Userpost"
export default {
  components : {
    Userpost
  },
  data () {
    return {
      name: "",
      email: "",
    };
  },
  mounted: function () {
    let userId = this.$route.params.id;
    axios.get("http://localhost:3000/user/" + userId).then((res) => {
      const userData = res.data[0];
      this.name = userData.name;
      this.email = userData.email;
    });
  },
};
</script>