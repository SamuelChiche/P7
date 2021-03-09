<template>
  <!-- Template création de post -->
  <div class="makeapost">
    <form>
      <div class="card gedf-card">
        <div class="card-header text-center">
          <img
            src="../assets/icon-left-font-black-resized.png"
            height="75px"
            width="225px"
            alt=""
          />
        </div>
        <div class="card-body">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="posts"
              role="tabpanel"
              aria-label="posts-tab"
            >
              <!-- Titre du post -->
              <div class="form-group">
                <label class="sr-only" for="inputTitle">Titre</label>
                <input
                  type="title"
                  class="form-control"
                  id="inputTitle"
                  placeholder="Titre"
                  v-model="title"
                  required
                />
              </div>
              <!-- Text du post  -->
              <div class="form-group">
                <label class="sr-only" for="message">Text</label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="3"
                  placeholder="Exprimez vous !"
                  v-model="text"
                ></textarea>
              </div>
              <!-- Importer une image -->
              <div class="image-preview text-center my-3">
                <img :src="this.image" class="img-fluid" />
              </div>
              <label class="btn btn-info btn-file">
                Ajouter une image <input type="file" name="file" @change="onFileSelected" style="display: none;"/>
              </label>
              <button @click="createPost" type="submit" class="btn btn-primary float-right">
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
import PostServices from "../services/PostServices";

export default {
  name: "Makeapost",
  data() {
    return {
      text: null,
      title: null,
      selectedFile: null,
      image: null,
    };
  },
  methods: {
    // Récuperation de l'image uploadé et affichage
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e) => {
        this.image = e.target.result;
      };
    },
    // Création de post
    createPost() {
      if (this.title === null) {
        alert("Un post doit contenir un titre !");
      } else {
        let fd = new FormData();
        let user_id = JSON.parse(this.$store.state.user).id;
        let user_name = JSON.parse(this.$store.state.user).name;
        fd.append("image", this.selectedFile);
        fd.append("title", this.title);
        fd.append("text", this.text);
        fd.append("user_id", user_id);
        fd.append("user_name", user_name);
        PostServices.create(fd).catch((err) => console.log(err));
      }
    },
  },
};
</script>