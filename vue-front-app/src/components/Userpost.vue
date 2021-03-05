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
                  :to="{ name: 'account', params: { id: post.user_id }}"
                  >{{ post.user_name }}</router-link
                >
              </div>
            </div>
          </div>
          <div>
            <div class="dropdown" v-if="post.user_id == current_user_id">
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
                <li class="dropdown-item">
                  <a @click="modifyPost(post.post_id)"> Modifier </a>
                </li>
                <li class="dropdown-item">
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
          @click ="this.src=post.image"
        />
      </div>
      <div class="card-footer">
        <section class="mt-3">
          <form>
            <div class="input-group input-group">
              <input
                class="form-control"
                  id="message"
                  placeholder="What are you thinking?"
                  v-model="comment_text"
              />
              <div class="input-group-append">
                <button @click="createComment(post.post_id)" type="submit" class="text-decoration-none text-white btn btn-primary">
                
                  Comment
                </button>
              </div>
            </div>
          </form>
        </section>
        <div>
          <div
            class="card p-2 mt-3"
            v-for="(comment, post_id) in comments_list.filter((comment) => {
              return comment.post_id == post.post_id;
            })"
            v-bind:key="post_id"
          >
            <div class="d-flex">
              <img
                class="profile-pic rounded-circle"
                src="../assets/blank-profile-picture.png"
                width="40"
                height="40"
                alt="..."
              />
              <div class="flex-grow-1 pl-2">
                <router-link
                  :to="{ name: 'account', params: { id: comment.user_id } }"
                  >{{
                    users_list
                      .map((user) => {
                        if (user.id === comment.user_id) return user.name;
                      })
                      .join("")
                  }}</router-link
                >
                <p class="small m-0 text-muted">{{comment.updated_at}}</p>
              </div>
              <div>
                <div
                  class="dropdown"
                  v-if="
                    post.user_id === current_user_id ||
                    comment.user_id === current_user_id
                  "
                >
                  <button
                    class="btn btn-link dropdown-toggle"
                    type="button"
                    id="gedf-drop1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></button>
                  <div class="dropdown-menu">
                    <li class="dropdown-item">
                      <a @click="modifyComment(comment.comment_id)">
                        Modifier
                      </a>
                    </li>
                    <li class="dropdown-item">
                      <a @click="deleteComment(comment.comment_id)">
                        Supprimer <font-awesome-icon icon="trash" />
                      </a>
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <p class="card-text h7 mb-1">
                {{ comment.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PostServices from "../services/PostServices"
import CommentServices from "../services/CommentServices"
import UserServices from '../services/UserServices';

export default {
  name: "Userpost",
  data() {
    return {
      posts_list: [],
      comment_text: "",
      comments_list: [],
      users_list: [],
      current_user_id: JSON.parse(this.$store.state.user).id,
    };
  },
  created() {
    this.getPostFromUser(),
    this.getAllComments(),
    this.getAllUsers()
  },
  methods : {
    getPostFromUser() {
      let userId = this.$route.params.id
      PostServices.getFromUser(userId)
      .then((res) => (this.posts_list = res.data));
    },
    getAllComments(){
        CommentServices.getAll().then((res) => {
        this.comments_list = res.data;
        console.log(this.comments_list);
      })
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
    deleteComment(id) {
      CommentServices.delete(id).then(window.location.reload());
    },
  }
};
</script>