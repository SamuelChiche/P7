<template>
  <div class="post">
    <div
      class="card gedf-card my-5"
      v-for="(post, index) in posts_list"
      v-bind:key="index"
    >
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2">
              <img
                class="rounded-circle"
                width="45"
                src="../assets/blank-profile-picture.png"
                alt=""
              />
            </div>
            <div class="ml-2">
              <div class="h5 m-0">{{ post.user_id }}</div>
            </div>
          </div>
          <div>
            <div class="dropdown">
              <button
                class="btn btn-link dropdown-toggle"
                type="button"
                id="gedf-drop1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text">
          {{ post.text }}
        </p>
      </div>
      <div class="card-footer">
        <a href="#" class="card-link float-right"> Like</a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Userpost",
  data() {
    return {
      posts_list: [],
    };
  },
  mounted() {
    let userId = this.$route.params.id
    axios
      .get("http://localhost:3000/post/user/" + userId)
      .then((res) => (this.posts_list = res.data));
  },
};
</script>