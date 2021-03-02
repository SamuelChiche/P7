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
        <router-link
          :to="{ name: 'upost', params: { id: post.post_id } }"
          class="card-link"
        >
          <h5 class="card-title">
            {{ post.title }}
          </h5>
        </router-link>
        <p class="card-text">
          {{ post.text }}
        </p>
        <img
          :src="post.image"
          height="400px"
          width="800px"
          v-if="post.image != undefined"
        />
      </div>
      <div class="card-footer">
        <form>
          <textarea
            class="form-control"
            id="message"
            rows="1"
            placeholder="What are you thinking?"
            v-model="comment_text"
          ></textarea>
          <button type="submit" @click="createComment(post.post_id)">
            Commenter
          </button>
        </form>
        <div
          v-for="(comment, post_id) in comments_list.filter((comment) => {
            return comment.post_id == post.post_id;
          })"
          v-bind:key="post_id"
        >
          <div>
            {{
              users_list
                .map((user) => {
                  if (user.id === comment.user_id) return user.name;
                })
                .join("")
            }}
          </div>
          <div>
            {{ comment.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostServices from "../services/PostServices";
import CommentServices from "../services/CommentServices";
import UserServices from "../services/UserServices";

export default {
  name: "Post",
  components: {},
  data() {
    return {
      posts_list: [],
      comment_text: "",
      comments_list: [],
      users_list: [],
    };
  },
  created() {
    this.getAllPosts();
    this.getAllComments();
    this.getAllUsers();
  },
  methods: {
    getAllPosts() {
      PostServices.getAll()
        .then((res) => {
          this.posts_list = res.data;
          console.log(this.posts_list);
        })
        .catch((err) => err);
    },
    getAllComments() {
      CommentServices.getAll().then((res) => {
        this.comments_list = res.data;
        console.log(this.comments_list);
      });
    },
    getAllUsers() {
      UserServices.getAll().then((res) => {
        this.users_list = res.data;
        console.log(this.users_list);
      });
    },
    createComment(post_id) {
      let user_id = JSON.parse(this.$store.state.user).id;
      let text = this.comment_text;
      let data = {
        user_id,
        post_id,
        text,
      };
      CommentServices.create(data);
    },
    deletePost(id) {
      PostServices.delete(id).then(window.location.reload());
    },
  },
  computed: {},
};
</script>