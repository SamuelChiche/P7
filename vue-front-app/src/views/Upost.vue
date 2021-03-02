<template>
  <div class="upost container">
    <div
      class="card gedf-card my-5"

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
                  :to="{ name: 'account', params: { id: post_user_id } }"
                  >{{ post_username }}</router-link
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
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <router-link
          :to="{ name: 'upost', params: { id: post_id } }"
          class="card-link"
        >
          <h5 class="card-title">
            {{ post_title }}
          </h5>
        </router-link>
        <p class="card-text">
          {{ post_text }}
        </p>
      </div>
      <div class="card-footer">
      </div>
    </div>
  </div>
</template>

<script>
import PostServices from "../services/PostServices";
export default {
  data() {
    return {
      post_username : '',
      post_user_id : '',
      post_title : '',
      post_text : '',
      post_id : ''
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      let id = this.$route.params.id;
      PostServices.getOne(id)
      .then((res) => {
        this.post_username = res.data.user_name;
        this.post_user_id = res.data.user_id;
        this.post_title = res.data.title;
        this.post_id = res.data.post_id;
        this.post_text = res.data.text;
        console.log(this.post_username);
      });
    },
  },
};
</script>