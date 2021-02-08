<template>
    <div class="sign-up container">
            <form v-on:submit.prevent="register">
      <div class="form-group">
        <label for="inputName">Name</label>
        <input
          type="name"
          class="form-control"
          id="name"
          placeholder="Name"
          required
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Email"
          required
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
          v-model="password"
        />
      </div>
      <div class="form-group">
        <label for="inputPassword">Password confirmation</label>
        <input
          type="password"
          class="form-control"
          id="password-confirm"
          placeholder="Repeat Password"
          required
          v-model="password_confirmation"
        />
      </div>

      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
    <h3 class="text-center">{{message}}</h3>
    </div>
</template>
<script>
export default {
    data (){
        return {
            name : '',
            email : '',
            password : '',
            password_confirmation : '',
            message : ''
        }
    },
    methods : {
      register : function() {
        let data = {
          name : this.name,
          email : this.email,
          password : this.password
        }
        this.$store.dispatch('register', data)
          .then(()=> this.$router.push('/'))
          .catch(err => console.log(err))
      }
    }
}
</script>