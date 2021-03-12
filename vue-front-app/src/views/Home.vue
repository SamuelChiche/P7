<template>
<!-- Page d'accueil -->
  <div class="home" id="home">
    <main role="main row">
      <div class="col align-self-center text-center">
        <h1 class="heading"><img src="../assets/icon-left-font-black-resized.png" alt="logo groupomania" class="img-fluid" width="600px" height="200px"></h1>
        <p class="lead">
          Bienvenue sur le réseau social interne de l'entreprise Groupomania.  Ici vous pourrez échanger avec vos collègues sur les sujets qui vous intéressent !
        </p>
        <p>
          <!-- Lien vers page inscription -->
          <button
            class="btn btn-lg btn-secondary"
            @click="$router.push('/signup')"
            id="signup_button"
          >
            S'inscrire
          </button>
        </p>
        <!-- Lien vers page connexion -->
        <div>
          Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style lang="scss" scoped >
  #home {
    margin-top : 100px;
    margin-left : 50px;
    margin-right: 50px;
    a {
    color : #0054AD;
    font-weight: bold;
    }
  }
  @media screen and (max-width : 400px) {
    .lead {
      font-size: 1rem;
    }
  }

  
</style>