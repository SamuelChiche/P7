<template>
  <div class="makeapost">
    <form>
      <div class="card gedf-card">
        <div class="card-header text-center"> Postez vos envies </div>
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="posts"
              role="tabpanel"
              aria-label="posts-tab"
            >
              <div class="form-group">
                <label for="inputTitle"></label>
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
              <div class="image-preview text-center my-3">
                <img :src="this.image">
              </div>
              <input type="file" name='file' @change="onFileSelected">
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
      selectedFile : null,
      image : null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile =  event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(this.selectedFile)
      reader.onload = e => {
        this.image = e.target.result
      }
    },
    createPost(){
      let fd = new FormData()
      let user_id = JSON.parse(this.$store.state.user).id
      let user_name = JSON.parse(this.$store.state.user).name
      fd.append('image', this.selectedFile)
      fd.append('title', this.title)
      fd.append('text', this.text)
      fd.append('user_id', user_id)
      fd.append('user_name', user_name)
      PostServices.create(fd)
        .catch((err) => console.log(err))
    },
  },
};
</script>