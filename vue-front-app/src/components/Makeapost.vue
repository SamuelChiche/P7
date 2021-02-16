<template>
  <div class="makeapost">
    <form>
      <div class="card gedf-card">
        <div class="card-header text-center">Post</div>
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="posts"
              role="tabpanel"
              aria-labelledby="posts-tab"
            >
              <div class="form-group">
                <label class="sr-only" for="message">post</label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="3"
                  placeholder="What are you thinking?"
                  v-model="text"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="btn-toolbar float-right">
            <div class="btn-group">
              <button @click="createPost" type="submit" class="btn btn-primary">
                Partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Makeapost",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    createPost: function () {
      let text = this.text;
      let user_id = JSON.parse(this.$store.state.user).id;
      axios.post("http://localhost:3000/post", { text, user_id });
    },
  },
};
</script>