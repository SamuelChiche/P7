<template>
<!-- Page userboard -->
  <div class="userboard">
    <div class="container-fluid gedf-wrapper">
      
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6 gedf-main">
          <!-- Composant création de post -->
          <Makeapost />
          <!-- Composant affichant les posts -->
          <Post />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Importation des composants
import Makeapost from "../components/Makeapost";
import Post from "../components/Post";
export default {
  components: {
    Makeapost,
    Post,
  },
  name: "userboard",
};
</script>