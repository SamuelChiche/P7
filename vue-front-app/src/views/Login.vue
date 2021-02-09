<template>
  <div class="login container">
    <router-link to="/signup"></router-link>
    <form v-on:submit.prevent="login">
      <div class="form-group">
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
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          placeholder="Password"
          required
          v-model="password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Se connecter</button>
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
          .catch(err => console.log(err))
      }
    },
}
</script>