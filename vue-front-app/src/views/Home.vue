<template>
  <div class="home text-center" id="home">
    <main role="main">
      <h1 class="heading">Lorem, ipsum.</h1>
      <p class="lead">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam dolorem omnis molestias dolorum numquam consequuntur a, 
        quaerat minus in, hic quas, delectus 
      </p>
      <p>
        <button class="btn btn-lg btn-secondary" @click="$router.push('/signup')" id="signup_button">S'inscrire</button>
      </p>
      <div>
          Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
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
<style lang="scss">
#home{
    margin: 100px 500px 0px 500px;

}
</style>