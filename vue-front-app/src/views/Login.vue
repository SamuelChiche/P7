<template>
<!-- Page de connexion -->
  <div class="login container">
    <!-- Formulaire de connexion -->
    <form v-on:submit.prevent="login">
      <div class="form-group">
        <!-- Email -->
        <label for="inputEmail">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          placeholder="Email"
          autofocus
          required
          v-model="email"
        />
      </div>
      <!-- Mot de passe -->
      <div class="form-group">
        <label for="inputPassword">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          placeholder="Mot de passe"
          required
          v-model="password"
        />
      </div>
      <!--  -->
      <button type="submit" class="btn btn-blue">Se connecter</button>
    </form>
    <div>
          Pas encore de compte ? <router-link to="/signup">S'inscrire</router-link>
    </div>
  </div>
</template>

<script>
export default {
    name : "Login",
    data (){
        return {
            email : null,
            password : null,
            message : null,
        }
    },
    methods : {
      login : function(){
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', {email, password})
          .then(()=> this.$router.push('/userboard'))
          .catch(err => {
            console.log(err);
            alert("L'adresse mail ou le mot de passe sont erronés !")
          })
      }
    },
}
</script>
<style lang="scss" scoped>
  a {
    color : #0054AD;
    font-weight: bold;
    
  }
</style>