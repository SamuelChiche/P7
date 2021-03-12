<template>
  <div class="sign-up container">
    <form v-on:submit.prevent="register">
      <div class="form-group">
        <label for="inputName">Nom d'utilisateur</label>
        <input
          type="name"
          class="form-control"
          id="inputName"
          placeholder="Nom d'utilisateur"
          required
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          placeholder="Email"
          required
          v-model="email"
        />
      </div>
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
      <button type="submit" class="btn btn-blue">S'inscrire</button>
    </form>
    <div>
      Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/userboard"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss" scoped>
  a {
    color : #0054AD;
    font-weight: bold;
  }
</style>