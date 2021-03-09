<template>
<!-- Page profil -->
  <div class="profil container">
    <!-- Partie profile -->
    <div class="card shadow-sm">
      <div class="text-center py-5">
        <!-- Photo de l'utilisateur -->
        <img
          src="../assets/blank-profile-picture.png"
          alt=""
          class="rounded-circle shadow-sm"
          height="200px"
        />
        <!-- Nom de l'utilisateur -->
        <div class="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">
          <h4 class="font-weight-bold my-4">{{ name }}</h4>
          <hr />
          <!-- Si l'utilsateur est le détenteur du compte ou est admin -->
          <div
            v-if="(this.$route.params.id === JSON.parse($store.state.user).id) || JSON.parse(this.$store.state.user).is_admin == 1"
          >
            <!-- Bouton permettant la suppresion du compte -->
            <button class="btn btn-danger" data-toggle="modal"
                        data-target="#deleteConfirm">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Userpost composant / Partie post -->
    <Userpost />
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
            Êtes-vous sur de vouloir supprimer votre compte ?
          </div>
            
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">
              Annuler
            </button>
            <!-- Supprimer le compte -->
            <button type="button" class="btn btn-danger" @click="deleteUser">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importation composants
import UserServices from "../services/UserServices";
import Userpost from "../components/Userpost";

export default {
  components: {
    Userpost,
  },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  // Méthode appliqué au chargement de la page
  created() {
    this.getOneUser();
  },
  methods: {
    // Récuperation de l'utilisateur
    getOneUser() {
      console.log(JSON.parse(this.$store.state.user).is_admin);
      let userId = this.$route.params.id;
      UserServices.getOne(userId)
        .then((res) => {
          const userData = res.data[0];
          this.name = userData.name;
          this.email = userData.email;
        })
        .catch((err) => err);
    },
    // Supression du compte utilisateur
    deleteUser() {
      let id = JSON.parse(this.$store.state.user).id;
      UserServices.deleteOne(id).then(() => {
        this.$store.dispatch("logout").then(() => this.$router.push("/login"));
      });
    },
  },
};
</script>