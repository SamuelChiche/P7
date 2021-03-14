<template>
  <!-- Template posts fait par un utilisateur -->
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
            <div
              v-if="
                post.user_id == current_user_id ||
                JSON.parse($store.state.user).is_admin == 1
              "
            >
              <!-- Bouton modification -->
              <div class="justify-content-between">
                <button
                  @click="postEditor(post.text, post.title, post.post_id)"
                  data-toggle="modal"
                  data-target="#editPostModal"
                  class="btn"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <!-- Bouton de suppression -->
                <button
                  @click="postDeletionConfirm(post.post_id)"
                  class="btn"
                  aria-label="delete-post"
                  data-toggle="modal"
                  data-target="#deleteConfirm"
                >
                  <font-awesome-icon icon="trash" />
                </button>
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
          class="img-fluid rounded"
          v-if="post.image != undefined"
          @click="this.src = post.image"
          width="100%"
        />
      </div>
      <div class="card-footer">
        <section class="mt-3">
          <form>
            <div class="input-group input-group">
              <!-- Zone de text -->
              <input
                class="form-control"
                placeholder="Laissez un commentaire !"
                v-model="comment_text"
              />
              <div class="input-group-append">
                <!-- Bouton d'envoi -->
                <button
                  @click="createComment(post.post_id)"
                  type="submit"
                  class="text-decoration-none text-white btn btn-blue"
                >
                  Envoyer
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
                <p class="small m-0 text-muted">{{ comment.updated_at }}</p>
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
                      <a
                        @click="commentEditor(comment.text, comment.comment_id)"
                        data-toggle="modal"
                        data-target="#editCommentModal"
                      >
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
    <!-- Edit comment modal -->
    <div
      class="modal fade"
      id="editCommentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editCommentModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifiez votre commentaire !</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >Message:</label
                >
                <textarea
                  class="form-control"
                  id="message-text"
                  v-model="comment_edit"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Fermer
            </button>
            <!-- Modifier le commentaire -->
            <button
              type="button"
              class="btn btn-primary"
              @click="editComment()"
            >
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit post modal -->
    <div
      class="modal fade"
      id="editPostModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editPostModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifiez votre post !</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Titre:</label>
                <input
                  class="form-control"
                  id="message-text"
                  v-model="post_edit_title"
                  type="title"
                />
              </div>
              <div class="form-group">
                <label for="message-title" class="col-form-label"
                  >Message:</label
                >
                <textarea
                  class="form-control"
                  id="message-text"
                  v-model="post_edit_text"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Fermer
            </button>
            <!-- Modifier le post -->
            <button type="button" class="btn btn-blue" @click="editPost()">
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal confiramation suppression -->
    <div
      class="modal fade"
      id="deleteConfirm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteConfirm"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Attention !</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Êtes-vous sur de vouloir supprimer ce post ?
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">
              Annuler
            </button>
            <!-- Supprimer le post -->
            <button type="button" class="btn btn-danger" @click="deletePost">
              Supprimer le post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importation des appels API
import PostServices from "../services/PostServices";
import CommentServices from "../services/CommentServices";
import UserServices from "../services/UserServices";

export default {
  name: "Userpost",
  data() {
    return {
      posts_list: [],
      comments_list: [],
      users_list: [],
      comment_text: null,
      comment_edit_id: null,
      comment_edit: null,
      post_edit_id: null,
      post_edit_text: null,
      post_edit_title: null,
      post_delete_id: null,
      current_user_id: JSON.parse(this.$store.state.user).id,
    };
  },
  created() {
    // Méthodes appliqué à la création de la page
    this.getPostFromUser(), this.getAllComments(), this.getAllUsers();
  },
  methods: {
    // Récupération des posts de l'utilisateur
    getPostFromUser() {
      let userId = this.$route.params.id;
      PostServices.getFromUser(userId)
        .then((res) => (this.posts_list = res.data))
        .catch((err) => err);
    },
    // Récupération des commentaires
    getAllComments() {
      CommentServices.getAll()
        .then((res) => {
          this.comments_list = res.data;
        })
        .catch((err) => err);
    },
    // Récupération des utilisateurs
    getAllUsers() {
      UserServices.getAll()
        .then((res) => {
          this.users_list = res.data;
        })
        .catch((err) => err);
    },
    // Création d'un commentaire
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
    postDeletionConfirm(id) {
      this.post_delete_id = id;
    },
    // Suppression d'un post
    deletePost() {
      let id = this.post_delete_id;
      PostServices.delete(id).then(window.location.reload());
    },
    // Suppression d'un commentaire
    deleteComment(id) {
      CommentServices.delete(id).then(window.location.reload());
    },
    // Ouverture de l'editeur de post
    postEditor(post_text, post_title, id) {
      this.post_edit_id = id;
      this.post_edit_text = post_text;
      this.post_edit_title = post_title;
    },
    // Modification d'un post
    editPost() {
      let id = this.post_edit_id;
      let text = this.post_edit_text;
      let title = this.post_edit_title;
      let data = {
        title,
        text,
      };
      PostServices.edit(id, data).then(window.location.reload());
    },
    // Récupération de valeurs lors de l'ouverture de l'editeur de commentaire
    commentEditor(comment, id) {
      this.comment_edit_id = id;
      this.comment_edit = comment;
    },
    // Modification d'un commentaire
    editComment() {
      let id = this.comment_edit_id;
      let text = this.comment_edit;
      let data = {
        text,
      };
      CommentServices.edit(id, data).then(window.location.reload());
    },
  },
};
</script>
<style lang="scss" scoped>
a {
  color: black;
}
</style>