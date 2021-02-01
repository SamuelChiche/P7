<template>
    <div class="sign-up container">
        <h1>
            This is my signup page
        </h1>
            <form v-on:submit.prevent>
      <div class="form-group">
        <label for="inputPassword">Name</label>
        <input
          type="name"
          class="form-control"
          id="inputName"
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
          id="inputEmail"
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
          id="inputPassword"
          placeholder="Password"
          required
          v-model="password"
        />
      </div>

      <button @click="formSubmit()" class="btn btn-primary">Sign in</button>
    </form>
    <h3 class="text-center">{{message}}</h3>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name : "Signup",
    data : function(){
        return {
            name : null,
            email : null,
            password : null,
            message : null
        }
    },
    methods : {
        formSubmit : function (){
            const data = {
            name : this.name,
            email : this.email,
            password : this.password
        }
        axios.post("http://localhost:3000/user/signup", data)
            .then(res => this.message = res.data.message)
        }
    },
}
</script>