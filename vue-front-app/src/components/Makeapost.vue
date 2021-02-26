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
              aria-label="posts-tab"
            >
              <div class="form-group">
                <label for="inputTitle">Title</label>
                <input
                  type="title"
                  class="form-control"
                  id="inputTitle"
                  placeholder="Titre"
                  required
                  v-model="title"
                />
              </div>
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
import PostServices from '../services/PostServices';
export default {
  name: "Makeapost",
  data() {
    return {
      text: "",
      title: "",
    };
  },
  methods: {
    createPost(){
      let data = {
        title : this.title,
        text : this.text,
        user_id : JSON.parse(this.$store.state.user).id,
        user_name : JSON.parse(this.$store.state.user).name,
      }
      PostServices.create(data)
    },
  },
};
</script>