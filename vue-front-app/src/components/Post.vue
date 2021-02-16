<template>
    <div class="card gedf-card my-5">
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
                  <div class="h5 m-0">{{username}}</div>
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
                  >
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <p class="card-text">
              {{posttext}}
            </p>
          </div>
          <div class="card-footer">
            <a href="#" class="card-link float-right"> Like</a>
          </div>
        </div>
</template>
<script>
export default {
    name : 'Post',
    data () {
        return{
            username : 'Lorem ipsum',
            posttext : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod tempora hic dolores neque sed itaque repudiandae ipsum? Accusantium ducimus in voluptas perspiciatis veritatis ab tenetur.'      
        }
    }
}
</script>