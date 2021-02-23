<template>
    <div class="upost container">
    <div
      class="card gedf-card my-5"
      v-for="(post, index) in posts"
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
            <div class="dropdown">
              <button
                class="btn btn-link dropdown-toggle"
                type="button"
                id="gedf-drop1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="text-muted h7 mb-2">
          {{ post.created_at }}
        </div>
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
      </div>
      <div class="card-footer">
        <a href="#" class="card-link float-right"> Like</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data (){
        return {
            posts : []
        }
        
    },
    mounted () {
        this.getPost()
    },
    methods : {
        getPost : function() {
            let id = this.$route.params.id
            axios.get('http://localhost:3000/post/' + id)
                .then((res) => {
                    this.posts = res.data
                    console.log(this.posts)
                    })
                
        }
    }
}
</script>