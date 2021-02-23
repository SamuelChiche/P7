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
              <div class="h5 m-0">
                <router-link
                  :to="{ name: 'account', params: { id: post.user_id } }"
                  >{{ post.user_name }}</router-link
                >
              </div>
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
              <div class="dropdown-menu">
                <li></li>
                <li
                  v-if="post.user_id == JSON.parse($store.state.user).id"
                  class="dropdown-item"
                >
                  <a @click="modifyPost(post.post_id)"> Modifier </a>
                </li>
                <li
                  v-if="post.user_id == JSON.parse($store.state.user).id"
                  class="dropdown-item"
                >
                  <a @click="deletePost(post.post_id)">
                    Supprimer <font-awesome-icon icon="trash" />
                  </a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-muted h7 mb-2">
          {{post.created_at}}
        </div>
        <a class="card-link" href="#">
          <h5 class="card-title">
            {{ post.title }}
          </h5>
        </a>
        <p class="card-text">
          {{ post.text }}
        </p>
      </div>
      <div class="card-footer">
        <button @click="upvotePost(post.post_id)" class="btn" ><font-awesome-icon icon="chevron-up" /></button>
        {{post.post_score}}
        <button @click="downvotePost(post.post_id)" class="btn" ><font-awesome-icon icon="chevron-down" /></button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Post",
  components: {},
  data() {
    return {
      posts_list: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/post")
      .then((res) => {
        this.posts_list = res.data;
      })
      .catch((err) => err);
  },
  methods: {
    deletePost: function (id) {
      axios.delete("http://localhost:3000/post/" + id);
    },
    upvotePost: function (id) {
      let user_id = JSON.parse(this.$store.state.user).id
      let like = 1;

      axios.post("http://localhost:3000/post/" + id + "/like", {like, user_id})

    },
    downvotePost: function(id) {
      let user_id = JSON.parse(this.$store.state.user).id
      let like = -1
      axios.post("http://localhost:3000/post/" + id + "/like", {like, user_id})
    }
  },
  computed : {
    
  }
};
</script>